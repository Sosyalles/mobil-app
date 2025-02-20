import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    variant: 'primary' | 'secondary';
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    variant
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                variant === 'primary' ? styles.primaryButton : styles.secondaryButton
            ]}
            onPress={onPress}
        >
            <Text style={[
                styles.buttonText,
                variant === 'primary' ? styles.primaryText : styles.secondaryText
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButton: {
        backgroundColor: COLORS.white,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    primaryText: {
        color: COLORS.background,
    },
    secondaryText: {
        color: COLORS.white,
    },
}); 