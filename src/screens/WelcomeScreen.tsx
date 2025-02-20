import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { CustomButton } from '../components/buttons/CustomButton';
import { COLORS } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export const WelcomeScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <ImageBackground
            source={require('../../girisekranresmi/girisekranresmi.jpeg')}
            style={styles.container}
        >
            <View style={styles.overlay}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>SocialHub</Text>
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>FIND YOUR{'\n'}KIND OF SHOWS</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <CustomButton
                        title="LOG IN / SIGN UP"
                        onPress={() => navigation.navigate('Login')}
                        variant="primary"
                    />
                    <CustomButton
                        title="BROWSE FIRST"
                        onPress={() => { }}
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
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 20,
    },
    logoContainer: {
        paddingTop: 40,
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.white,
        textAlign: 'center',
        marginTop: 20,
    },
    buttonContainer: {
        gap: 16,
        marginBottom: 40,
    },
}); 