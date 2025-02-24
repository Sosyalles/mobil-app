import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Logo } from '../components/Logo';
import { CustomButton } from '../components/buttons/CustomButton';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;

// API URL
const API_URL = 'https://api.example.com'; // API URL'inizi buraya ekleyin

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Kullanıcı kaydı için fonksiyon
    const handleRegister = async () => {
        if (!email || !password || !name) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Kayıt işlemi başarısız oldu');
            }

            Alert.alert('Başarılı', 'Kayıt işlemi tamamlandı, lütfen giriş yapın');
            setIsLogin(true);
        } catch (error: any) {
            Alert.alert('Hata', error.message || 'Kayıt işlemi sırasında bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    // Kullanıcı girişi için fonksiyon
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Hata', 'Lütfen e-posta ve şifrenizi girin');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Giriş işlemi başarısız oldu');
            }

            // Token'ı saklama işlemi burada yapılabilir
            // AsyncStorage.setItem('userToken', data.token);

            // Ana sayfaya yönlendirme
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
            });
        } catch (error: any) {
            Alert.alert('Hata', error.message || 'Giriş işlemi sırasında bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setEmail('');
        setPassword('');
        setName('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidView}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>

                    <View style={styles.logoContainer}>
                        <Logo size="small" />
                    </View>

                    <Text style={styles.title}>
                        {isLogin ? 'Hoş Geldiniz!' : 'Hesap Oluştur'}
                    </Text>
                    <Text style={styles.subtitle}>
                        {isLogin
                            ? 'Etkinliklere katılmak için giriş yapın'
                            : 'Yeni bir hesap oluşturarak etkinliklere katılın'}
                    </Text>

                    <View style={styles.formContainer}>
                        {!isLogin && (
                            <View style={styles.inputContainer}>
                                <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Adınız"
                                    value={name}
                                    onChangeText={setName}
                                    autoCapitalize="words"
                                />
                            </View>
                        )}

                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="E-posta"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Şifre"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color="#999"
                                />
                            </TouchableOpacity>
                        </View>

                        {isLogin && (
                            <TouchableOpacity style={styles.forgotPassword}>
                                <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
                            </TouchableOpacity>
                        )}

                        <CustomButton
                            title={isLogin ? "GİRİŞ YAP" : "KAYIT OL"}
                            onPress={isLogin ? handleLogin : handleRegister}
                            variant="primary"
                            disabled={loading}
                            style={styles.authButton}
                        />

                        {loading && (
                            <ActivityIndicator
                                size="large"
                                color="#FF9F4A"
                                style={styles.loader}
                            />
                        )}

                        <View style={styles.switchContainer}>
                            <Text style={styles.switchText}>
                                {isLogin ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}
                            </Text>
                            <TouchableOpacity onPress={toggleAuthMode}>
                                <Text style={styles.switchButton}>
                                    {isLogin ? "Kayıt Ol" : "Giriş Yap"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    keyboardAvoidView: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 0,
        zIndex: 10,
        padding: 8,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 40,
    },
    formContainer: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
        height: 56,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333333',
    },
    eyeIcon: {
        padding: 8,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: '#FF9F4A',
        fontSize: 14,
        fontWeight: '500',
    },
    authButton: {
        marginTop: 8,
    },
    loader: {
        marginTop: 20,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    switchText: {
        fontSize: 14,
        color: '#666666',
    },
    switchButton: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF9F4A',
        marginLeft: 4,
    },
});

export default LoginScreen;