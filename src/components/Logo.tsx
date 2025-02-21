import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startBounceAnimation = () => {
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Animasyonu 2 saniye sonra tekrar başlat
        setTimeout(startBounceAnimation, 2000);
      });
    };

    startBounceAnimation();

    return () => {
      bounceAnim.setValue(0);
    };
  }, []);

  // Standardize the size to medium
  const fontSize = 28;
  const iconSize = 20;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.textOrange, { fontSize }]}>Social</Text>
        <Text style={[styles.textGray, { fontSize }]}>Hub</Text>
        <Animated.View style={[styles.iconContainer, { transform: [{ translateY: bounceAnim }] }]}>
          <Ionicons
            name="flash"
            size={iconSize}
            color="#FF7F50"
          />
        </Animated.View>
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
  iconContainer: {
    marginLeft: 1,
  },
}); 