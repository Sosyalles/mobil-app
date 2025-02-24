import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import { CustomButton } from '../components/buttons/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Logo } from '../components/Logo';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'WelcomeScreen'>;

// API istekleri için kullanılacak fonksiyonlar
const API_URL = 'https://api.example.com'; // API URL'inizi buraya ekleyin

// Kullanıcı kaydı için fonksiyon
const registerUser = async (userData: { email: string; password: string; name: string }) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Kayıt işlemi başarısız oldu');
        }

        return data;
    } catch (error) {
        console.error('Kayıt hatası:', error);
        throw error;
    }
};

// Kullanıcı girişi için fonksiyon
const loginUser = async (credentials: { email: string; password: string }) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Giriş işlemi başarısız oldu');
        }

        return data;
    } catch (error) {
        console.error('Giriş hatası:', error);
        throw error;
    }
};

export const WelcomeScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    // Kullanıcı girişi veya kaydı için LoginScreen'e yönlendirme
    const handleAuthNavigation = () => {
        navigation.navigate('LoginScreen');
    };

    // Misafir olarak gezinme
    const handleBrowseAsGuest = () => {
        navigation.navigate('HomeScreen');
    };

    return (
        <ImageBackground
            source={require('../assets/images/girisekranresmi.jpeg')}
            style={styles.container}
        >
            <View style={styles.overlay}>
                <View style={styles.logoContainer}>
                    <Logo size="medium" />
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>FIND YOUR{'\n'}KIND OF SHOWS</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <CustomButton
                        title="GİRİŞ YAP / KAYIT OL"
                        onPress={handleAuthNavigation}
                        variant="primary"
                    />
                    <CustomButton
                        title="ÖNCE GÖZ AT"
                        onPress={handleBrowseAsGuest}
                        variant="secondary"
                    />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 20,
    },
    logoContainer: {
        paddingTop: 40,
        paddingHorizontal: 10,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 42,
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Inter-Bold',
        letterSpacing: -0.5,
        lineHeight: 50,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    buttonContainer: {
        gap: 16,
        marginBottom: 40,
    },
});

export default WelcomeScreen; 