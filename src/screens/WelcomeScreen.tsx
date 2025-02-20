import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { CustomButton } from '../components/buttons/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Logo } from '../components/Logo';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'WelcomeScreen'>;

export const WelcomeScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

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
                        title="LOG IN / SIGN UP"
                        onPress={() => navigation.navigate('LoginScreen')}
                        variant="primary"
                    />
                    <CustomButton
                        title="BROWSE FIRST"
                        onPress={() => navigation.navigate('HomeScreen')}
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