import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, StyleProp, View } from 'react-native';
import { COLORS } from '../../constants/colors';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
    style?: StyleProp<ViewStyle>;
    icon?: React.ReactNode;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ 
    title, 
    onPress,
    variant = 'primary',
    style,
    icon,
}) => {
    const buttonStyles = [
        styles.button,
        variant === 'primary' && styles.primaryButton,
        variant === 'secondary' && styles.secondaryButton,
        style,
    ];

    const textStyles = [
        styles.buttonText,
        variant === 'primary' && styles.primaryText,
        variant === 'secondary' && styles.secondaryText,
    ];

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <View style={buttonStyles}>
                {icon}
                <Text style={textStyles}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
    },
    secondaryButton: {
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.textPrimary,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        letterSpacing: -0.2,
    },
    primaryText: {
        color: COLORS.textPrimary,
        fontWeight: '600',
    },
    secondaryText: {
        color: COLORS.textPrimary,
        fontWeight: '600',
    },
}); 