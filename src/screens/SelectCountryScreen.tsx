import React, { useState } from 'react';
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

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SelectCountryScreen'>;

// Basitleştirilmiş ülke listesi
const countries = [
    { id: 'TR', name: 'Türkiye', flag: '🇹🇷' },
    { id: 'US', name: 'Amerika Birleşik Devletleri', flag: '🇺🇸' },
    { id: 'GB', name: 'Birleşik Krallık', flag: '🇬🇧' },
    { id: 'DE', name: 'Almanya', flag: '🇩🇪' },
    { id: 'FR', name: 'Fransa', flag: '🇫🇷' },
    { id: 'IT', name: 'İtalya', flag: '🇮🇹' },
    { id: 'ES', name: 'İspanya', flag: '🇪🇸' },
    { id: 'NL', name: 'Hollanda', flag: '🇳🇱' },
];

const SelectCountryScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { user, updateUser } = useAuth();
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    const selectCountry = (countryId: string) => {
        console.log('Ülke seçildi:', countryId);
        setSelectedCountry(countryId);
    };

    const goToNextScreen = () => {
        if (!selectedCountry) return;

        // Kullanıcı bilgisini güncelle
        if (user) {
            updateUser({
                ...user,
                country: selectedCountry
            });
        }

        console.log('SelectCityScreen ekranına yönlendiriliyor...');
        navigation.navigate('SelectCityScreen');
    };

    const renderCountryItem = ({ item }: { item: typeof countries[0] }) => (
        <TouchableOpacity
            style={[
                styles.countryItem,
                selectedCountry === item.id && styles.selectedCountry
            ]}
            onPress={() => selectCountry(item.id)}
        >
            <Text style={styles.countryFlag}>{item.flag}</Text>
            <Text style={styles.countryName}>{item.name}</Text>
            {selectedCountry === item.id && (
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
                        <Text style={styles.title}>Ülke Seçimi</Text>
                        <Text style={styles.subtitle}>Hangi ülkede yaşıyorsun?</Text>
                    </View>

                    <FlatList
                        data={countries}
                        renderItem={renderCountryItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.list}
                    />

                    <TouchableOpacity
                        style={[
                            styles.continueButton,
                            !selectedCountry && styles.disabledButton
                        ]}
                        onPress={goToNextScreen}
                        disabled={!selectedCountry}
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
    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        marginBottom: 10,
    },
    selectedCountry: {
        backgroundColor: 'rgba(255, 127, 80, 0.3)',
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    countryFlag: {
        fontSize: 24,
        marginRight: 15,
    },
    countryName: {
        fontSize: 16,
        color: '#FFFFFF',
        flex: 1,
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

export default SelectCountryScreen; 