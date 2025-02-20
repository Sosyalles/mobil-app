import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

type TypographyVariant = 
  | 'title' 
  | 'subtitle' 
  | 'body' 
  | 'caption' 
  | 'button';

interface TypographyProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
  style?: TextStyle;
  color?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  children,
  style,
  color
}) => {
  return (
    <Text 
      style={[
        styles[variant], 
        { color: color || COLORS.TEXT_PRIMARY },
        style
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
}); 