import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Animated,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
    Platform
} from 'react-native';
import { COLORS } from '../constants/colors';
import { CustomButton } from '../components/buttons/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Logo } from '../components/Logo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'RegisterScreen'>;

export const RegisterScreen: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<NavigationProp>();
    const buttonScale = new Animated.Value(1);
    const { register } = useAuth();

    const validateForm = (): boolean => {
        // Validation rules
        const nameRegex = /^[A-Za-zÇçĞğİıÖöŞşÜü\s]{2,50}$/;
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^.{6,}$/; // Sadece minimum 6 karakter olması yeterli

        if (!firstName.trim() || !nameRegex.test(firstName)) {
            Alert.alert('Invalid First Name', 'Please enter a valid first name (2-50 characters)');
            return false;
        }

        if (!lastName.trim() || !nameRegex.test(lastName)) {
            Alert.alert('Invalid Last Name', 'Please enter a valid last name (2-50 characters)');
            return false;
        }

        if (!username.trim() || !usernameRegex.test(username)) {
            Alert.alert('Invalid Username', 'Username must be 3-20 characters long and can only contain letters, numbers, and underscores');
            return false;
        }

        if (!email.trim() || !emailRegex.test(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address');
            return false;
        }

        if (!password.trim() || !passwordRegex.test(password)) {
            Alert.alert('Geçersiz Şifre', 'Şifre en az 6 karakter uzunluğunda olmalıdır');
            return false;
        }

        if (password !== confirmPassword) {
            Alert.alert('Password Mismatch', 'Passwords do not match');
            return false;
        }

        return true;
    };

    const handleRegister = async () => {
        Keyboard.dismiss();
        if (validateForm()) {
            setLoading(true);
            try {
                // AuthContext'teki register fonksiyonunu kullan
                const success = await register(email, password, `${firstName} ${lastName}`);

                if (success) {
                    // Kayıt başarılı olduğunda
                    Alert.alert('Başarılı', 'Kayıt işlemi tamamlandı!', [
                        {
                            text: 'Tamam',
                            onPress: () => {
                                // Ana sayfaya yönlendirme
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'HomeScreen' }],
                                });
                            }
                        }
                    ]);
                } else {
                    // Kayıt başarısız olduğunda
                    Alert.alert('Hata', 'Bu e-posta adresi zaten kullanımda. Lütfen başka bir e-posta adresi deneyin.');
                }
            } catch (error) {
                Alert.alert('Hata', 'Kayıt işlemi sırasında bir hata oluştu');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleButtonPress = () => {
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start(handleRegister);
    };

    const buttonAnimatedStyle = {
        transform: [{ scale: buttonScale }]
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/images/girisekranresmi.jpeg')}
                    style={styles.container}
                >
                    <View style={styles.overlay}>
                        <TouchableOpacity
                            style={styles.logoContainer}
                            onPress={() => {
                                Keyboard.dismiss();
                                navigation.navigate('WelcomeScreen');
                            }}
                            activeOpacity={0.7}
                        >
                            <Logo size="medium" />
                        </TouchableOpacity>

                        <ScrollView
                            contentContainerStyle={styles.scrollViewContent}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.contentContainer}>
                                <Text style={styles.title}>Create Your{'\n'}SocialHub Account</Text>
                                <Text style={styles.subtitle}>Join a community that shares your passions!</Text>

                                <View style={styles.formContainer}>
                                    <View style={styles.nameContainer}>
                                        <TextInput
                                            style={[styles.input, styles.halfInput]}
                                            placeholder="First Name"
                                            placeholderTextColor={COLORS.textSecondary}
                                            value={firstName}
                                            onChangeText={setFirstName}
                                            autoCapitalize="words"
                                            selectionColor={COLORS.primary}
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                            maxLength={20}
                                            numberOfLines={1}
                                        />
                                        <TextInput
                                            style={[styles.input, styles.halfInput]}
                                            placeholder="Last Name"
                                            placeholderTextColor={COLORS.textSecondary}
                                            value={lastName}
                                            onChangeText={setLastName}
                                            autoCapitalize="words"
                                            selectionColor={COLORS.primary}
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                            maxLength={20}
                                            numberOfLines={1}
                                        />
                                    </View>

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Username"
                                        placeholderTextColor={COLORS.textSecondary}
                                        value={username}
                                        onChangeText={setUsername}
                                        autoCapitalize="none"
                                        selectionColor={COLORS.primary}
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                        maxLength={20}
                                        numberOfLines={1}
                                    />

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email address"
                                        placeholderTextColor={COLORS.textSecondary}
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        selectionColor={COLORS.primary}
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                        maxLength={50}
                                        numberOfLines={1}
                                    />

                                    <View style={styles.passwordContainer}>
                                        <TextInput
                                            style={[styles.input, styles.passwordInput]}
                                            placeholder="Password"
                                            placeholderTextColor={COLORS.textSecondary}
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!passwordVisible}
                                            selectionColor={COLORS.primary}
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                            maxLength={30}
                                            numberOfLines={1}
                                        />
                                        <TouchableOpacity
                                            style={styles.eyeIcon}
                                            onPress={() => setPasswordVisible(!passwordVisible)}
                                        >
                                            <Ionicons
                                                name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                                                size={24}
                                                color={COLORS.textSecondary}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Confirm Password"
                                        placeholderTextColor={COLORS.textSecondary}
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        secureTextEntry={!passwordVisible}
                                        selectionColor={COLORS.primary}
                                        returnKeyType="done"
                                        onSubmitEditing={Keyboard.dismiss}
                                        maxLength={30}
                                        numberOfLines={1}
                                    />

                                    <Animated.View style={[styles.signUpButton, buttonAnimatedStyle]}>
                                        <CustomButton
                                            title="Sign Up"
                                            onPress={handleButtonPress}
                                            variant="primary"
                                        />
                                    </Animated.View>

                                    <View style={styles.loginContainer}>
                                        <Text style={styles.loginText}>Already have an account? </Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                Keyboard.dismiss();
                                                navigation.navigate('LoginScreen');
                                            }}
                                        >
                                            <Text style={styles.loginLink}>Log In</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.googleContainer}>
                                        <Animated.View style={[styles.googleButton, buttonAnimatedStyle]}>
                                            <CustomButton
                                                title="Continue with Google"
                                                onPress={() => {
                                                    Keyboard.dismiss();
                                                    // TODO: Implement Google Sign-In
                                                }}
                                                variant="secondary"
                                                icon={<Icon name="google" size={20} color={COLORS.textPrimary} style={styles.googleIcon} />}
                                            />
                                        </Animated.View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F2EA',
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
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 12,
        fontFamily: 'Inter-Bold',
        letterSpacing: -0.5,
        lineHeight: 40,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#E6E6E6',
        textAlign: 'center',
        marginBottom: 40,
        fontFamily: 'Inter-Regular',
        letterSpacing: -0.2,
        lineHeight: 24,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: 20,
        gap: 16,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 0,
    },
    input: {
        backgroundColor: '#F5F2EA',
        borderRadius: 30,
        padding: 15,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: '#1E1E1E',
        letterSpacing: -0.2,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 0,
        overflow: 'hidden',
    },
    halfInput: {
        flex: 1,
        maxWidth: '48%',
    },
    passwordContainer: {
        position: 'relative',
        width: '100%',
        marginBottom: 0,
    },
    passwordInput: {
        flex: 1,
        paddingRight: 50,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        paddingHorizontal: 10,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpButton: {
        borderRadius: 30,
        backgroundColor: '#A8E0D1',
        marginTop: 16,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    loginText: {
        color: '#FFFFFF',
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        letterSpacing: -0.2,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    loginLink: {
        color: '#FF9F4A',
        fontWeight: '600',
        textDecorationLine: 'underline',
        fontFamily: 'Inter-SemiBold',
        fontSize: 14,
        letterSpacing: -0.2,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    googleContainer: {
        marginTop: 8,
    },
    googleButton: {
        borderRadius: 30,
        backgroundColor: '#F5F2EA',
        borderWidth: 1,
        borderColor: '#1E1E1E',
    },
    googleIcon: {
        marginRight: 8,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});

export default RegisterScreen; 