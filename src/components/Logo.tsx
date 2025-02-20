import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  // Standardize the size to medium
  const fontSize = 28;
  const iconSize = 20;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.textOrange, { fontSize }]}>Social</Text>
        <Text style={[styles.textGray, { fontSize }]}>Hub</Text>
        <Ionicons 
          name="flash" 
          size={iconSize} 
          color="#FF7F50" 
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textOrange: {
    fontWeight: '700',
    color: '#FF7F50',
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
  },
  textGray: {
    fontWeight: '700',
    color: '#6D6D6D',
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
  },
  icon: {
    marginLeft: 1,
  },
}); 