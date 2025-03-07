import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Platform,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SelectCityScreen'>;

// Ülkelere göre şehirler
const citiesByCountry: { [key: string]: string[] } = {
    'TR': ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya'],
    'US': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia'],
    'GB': ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool'],
    'DE': ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt'],
    'FR': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
    'IT': ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo'],
    'ES': ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza'],
    'NL': ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'],
};

const SelectCityScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { user, updateUser } = useAuth();
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [cities, setCities] = useState<string[]>([]);

    useEffect(() => {
        // Kullanıcının ülkesine göre şehirleri yükle
        if (user && user.country) {
            const countryCities = citiesByCountry[user.country] || [];
            setCities(countryCities);
            console.log('Seçilen ülke:', user.country);
            console.log('Yüklenen şehirler:', countryCities);
        } else {
            console.log('Ülke seçilmemiş, TR varsayılan olarak kullanılıyor');
            setCities(citiesByCountry['TR'] || []);
        }
    }, [user]);

    const selectCity = (city: string) => {
        console.log('Şehir seçildi:', city);
        setSelectedCity(city);
    };

    const goToHomeScreen = () => {
        if (!selectedCity) return;

        // Kullanıcı bilgisini güncelle
        if (user) {
            updateUser({
                ...user,
                city: selectedCity
            });
        }

        console.log('Ana sayfaya yönlendiriliyor...');
        navigation.navigate('HomeScreen');
    };

    const renderCityItem = ({ item }: { item: string }) => (
        <TouchableOpacity
            style={[
                styles.cityItem,
                selectedCity === item && styles.selectedCity
            ]}
            onPress={() => selectCity(item)}
        >
            <Ionicons name="location" size={24} color="#FFFFFF" style={styles.cityIcon} />
            <Text style={styles.cityName}>{item}</Text>
            {selectedCity === item && (
                <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ImageBackground
                source={require('../assets/images/girisekranresmi.jpeg')}
                style={styles.background}
            >
                <View style={styles.overlay}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Şehir Seçimi</Text>
                        <Text style={styles.subtitle}>Hangi şehirde yaşıyorsun?</Text>
                    </View>

                    {cities.length > 0 ? (
                        <FlatList
                            data={cities}
                            renderItem={renderCityItem}
                            keyExtractor={item => item}
                            contentContainerStyle={styles.list}
                        />
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Bu ülke için şehir bulunamadı</Text>
                        </View>
                    )}

                    <TouchableOpacity
                        style={[
                            styles.continueButton,
                            !selectedCity && styles.disabledButton
                        ]}
                        onPress={goToHomeScreen}
                        disabled={!selectedCity}
                    >
                        <Text style={styles.buttonText}>Devam Et</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        justifyContent: 'space-between',
    },
    header: {
        marginTop: 40,
        marginBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    list: {
        paddingBottom: 20,
    },
    cityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        marginBottom: 10,
    },
    selectedCity: {
        backgroundColor: 'rgba(255, 127, 80, 0.3)',
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    cityIcon: {
        marginRight: 15,
    },
    cityName: {
        fontSize: 16,
        color: '#FFFFFF',
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        padding: 20,
    },
    continueButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: Platform.OS === 'ios' ? 20 : 10,
    },
    disabledButton: {
        backgroundColor: 'rgba(255, 127, 80, 0.5)',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SelectCityScreen; 