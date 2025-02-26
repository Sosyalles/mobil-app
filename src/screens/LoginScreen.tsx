import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Animated, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { COLORS } from '../constants/colors';
import { CustomButton } from '../components/buttons/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';
import { Logo } from '../components/Logo';
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<NavigationProp>();
    const buttonScale = new Animated.Value(1);
    const { login } = useAuth();

    const handleButtonPress = () => {
        Keyboard.dismiss();
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
        ]).start();
    };

    const buttonAnimatedStyle = {
        transform: [{ scale: buttonScale }]
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Hata', 'Lütfen email ve şifrenizi giriniz.');
            return;
        }

        setLoading(true);
        try {
            const success = await login(email, password);
            if (!success) {
                Alert.alert('Giriş Başarısız', 'E-posta veya şifre hatalı. Lütfen bilgilerinizi kontrol edin veya yeni bir hesap oluşturun.');
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                });
            }
        } catch (error) {
            Alert.alert('Hata', 'Giriş yapılırken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
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
                                <Text style={styles.title}>Join a Community That{'\n'}Shares Your Passions!</Text>
                                <Text style={styles.subtitle}>Discover new hobbies, meet like-minded people, and join events around you.</Text>

                                <View style={styles.formContainer}>
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
                                    />
                                    <View style={styles.passwordContainer}>
                                        <TextInput
                                            style={styles.passwordInput}
                                            placeholder="Password"
                                            placeholderTextColor={COLORS.textSecondary}
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!showPassword}
                                            selectionColor={COLORS.primary}
                                            returnKeyType="done"
                                            onSubmitEditing={Keyboard.dismiss}
                                        />
                                        <TouchableOpacity
                                            style={styles.eyeIcon}
                                            onPress={() => setShowPassword(!showPassword)}
                                        >
                                            <Ionicons
                                                name={showPassword ? "eye-outline" : "eye-off-outline"}
                                                size={24}
                                                color={COLORS.textSecondary}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.rememberContainer}>
                                        <TouchableOpacity
                                            style={styles.checkbox}
                                            onPress={() => setRememberMe(!rememberMe)}
                                        >
                                            <View style={[styles.checkboxInner, rememberMe && styles.checkboxChecked]} />
                                        </TouchableOpacity>
                                        <Text style={styles.rememberText}>Remember me</Text>
                                        <TouchableOpacity
                                            style={styles.forgotPassword}
                                            onPress={() => {
                                                Keyboard.dismiss();
                                                navigation.navigate('ResetPasswordScreen');
                                            }}
                                        >
                                            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <Animated.View style={[styles.signInButton, buttonAnimatedStyle]}>
                                        <CustomButton
                                            title={loading ? "" : "Sign In"}
                                            onPress={handleLogin}
                                            variant="primary"
                                            disabled={loading}
                                            icon={loading ? <ActivityIndicator color={COLORS.textPrimary} /> : undefined}
                                        />
                                    </Animated.View>

                                    <View style={styles.signupContainer}>
                                        <Text style={styles.signupText}>Don't have an account? </Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                Keyboard.dismiss();
                                                navigation.navigate('RegisterScreen');
                                            }}
                                        >
                                            <Text style={styles.signupLink}>Sign Up</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.googleContainer}>
                                        <Animated.View style={[styles.googleButton, buttonAnimatedStyle]}>
                                            <CustomButton
                                                title="Continue with Google"
                                                onPress={handleButtonPress}
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
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
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
    },
    input: {
        backgroundColor: '#F5F2EA',
        borderRadius: 30,
        padding: 15,
        marginBottom: 16,
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
    },
    rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderRadius: 4,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxInner: {
        width: 12,
        height: 12,
        borderRadius: 2,
    },
    checkboxChecked: {
        backgroundColor: COLORS.primary,
    },
    rememberText: {
        color: '#FFFFFF',
        flex: 1,
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        letterSpacing: -0.2,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    forgotPassword: {
        marginLeft: 'auto',
    },
    forgotPasswordText: {
        color: '#FFFFFF',
        textDecorationLine: 'underline',
        fontFamily: 'Inter-Medium',
        fontSize: 14,
        letterSpacing: -0.2,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signupText: {
        color: '#FFFFFF',
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        letterSpacing: -0.2,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    signupLink: {
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
        marginTop: 20,
    },
    signInButton: {
        borderRadius: 30,
        backgroundColor: '#A8E0D1',
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
    buttonText: {
        color: theme.colors.white,
        fontSize: theme.typography.fontSize.md,
        fontFamily: theme.typography.fontFamily.semiBold,
    },
    passwordContainer: {
        position: 'relative',
        width: '100%',
        marginBottom: 16,
    },
    passwordInput: {
        backgroundColor: '#F5F2EA',
        borderRadius: 30,
        padding: 15,
        paddingRight: 50,
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
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
});

export default LoginScreen;