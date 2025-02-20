import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { COLORS } from '../constants/colors';
import { CustomButton } from '../components/buttons/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigation = useNavigation<NavigationProp>();

    return (
        <ImageBackground
            source={require('../../girisekranresmi/girisekranresmi.jpeg')}
            style={styles.container}
        >
            <View style={styles.overlay}>
                <TouchableOpacity
                    style={styles.logoContainer}
                    onPress={() => navigation.navigate('Welcome')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.logoText}>SocialHub</Text>
                </TouchableOpacity>

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Join Our Community of{'\n'}Hobby Enthusiasts</Text>

                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email address"
                            placeholderTextColor={COLORS.text.secondary}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor={COLORS.text.secondary}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        <View style={styles.rememberContainer}>
                            <TouchableOpacity
                                style={styles.checkbox}
                                onPress={() => setRememberMe(!rememberMe)}
                            >
                                <View style={[styles.checkboxInner, rememberMe && styles.checkboxChecked]} />
                            </TouchableOpacity>
                            <Text style={styles.rememberText}>Remember me</Text>
                            <TouchableOpacity style={styles.forgotPassword}>
                                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>

                        <CustomButton
                            title="Sign In"
                            onPress={() => { }}
                            variant="primary"
                        />

                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Don't have an account? </Text>
                            <TouchableOpacity>
                                <Text style={styles.signupLink}>Sign up</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.googleContainer}>
                            <CustomButton
                                title="Continue with Google"
                                onPress={() => { }}
                                variant="secondary"
                            />
                        </View>
                    </View>
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
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 20,
    },
    logoContainer: {
        paddingTop: 40,
        paddingHorizontal: 10,
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.white,
        textAlign: 'center',
        marginBottom: 40,
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    input: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
        padding: 15,
        marginBottom: 16,
        fontSize: 16,
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
        borderColor: COLORS.white,
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
        backgroundColor: COLORS.white,
    },
    rememberText: {
        color: COLORS.white,
        flex: 1,
    },
    forgotPassword: {
        marginLeft: 'auto',
    },
    forgotPasswordText: {
        color: COLORS.white,
        textDecorationLine: 'underline',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signupText: {
        color: COLORS.white,
    },
    signupLink: {
        color: COLORS.white,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    googleContainer: {
        marginTop: 20,
    },
}); 