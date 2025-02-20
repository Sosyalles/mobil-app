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
    TouchableWithoutFeedback 
} from 'react-native';
import { COLORS } from '../constants/colors';
import { CustomButton } from '../components/buttons/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Logo } from '../components/Logo';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;

export const ResetPasswordScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation<NavigationProp>();
    const buttonScale = new Animated.Value(1);

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

    const handleResetPassword = () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }
        // TODO: Implement password reset logic
        Alert.alert('Success', 'Password reset instructions have been sent to your email');
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
                                navigation.navigate('LoginScreen');
                            }}
                            activeOpacity={0.7}
                        >
                            <Logo size="medium" />
                        </TouchableOpacity>

                        <View style={styles.contentContainer}>
                            <Text style={styles.title}>Reset Your Password</Text>
                            <Text style={styles.subtitle}>Enter your email address and we'll send you instructions to reset your password.</Text>

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
                                    returnKeyType="done"
                                    onSubmitEditing={Keyboard.dismiss}
                                />

                                <Animated.View style={[styles.resetButton, buttonAnimatedStyle]}>
                                    <CustomButton
                                        title="Reset Password"
                                        onPress={handleResetPassword}
                                        variant="primary"
                                    />
                                </Animated.View>

                                <TouchableOpacity 
                                    style={styles.backToLogin}
                                    onPress={() => navigation.navigate('LoginScreen')}
                                >
                                    <Text style={styles.backToLoginText}>Back to Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
        paddingHorizontal: 20,
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
    resetButton: {
        borderRadius: 30,
        backgroundColor: '#A8E0D1',
        marginTop: 10,
    },
    backToLogin: {
        marginTop: 20,
        alignItems: 'center',
    },
    backToLoginText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        textDecorationLine: 'underline',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
});

export default ResetPasswordScreen; 