import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import HomePage from '../screens/HomePage';
import DiscoverPage from '../screens/DiscoverPage';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SelectCountryScreen from '../screens/SelectCountryScreen';
import SelectCityScreen from '../screens/SelectCityScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
    console.log('RootNavigator rendered');

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="WelcomeScreen"
            >
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
                <Stack.Screen name="SelectCountryScreen" component={SelectCountryScreen} />
                <Stack.Screen name="SelectCityScreen" component={SelectCityScreen} />
                <Stack.Screen name="HomeScreen" component={HomePage} />
                <Stack.Screen name="DiscoverPage" component={DiscoverPage} />
                <Stack.Screen name="MessagesScreen" component={HomePage} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}; 