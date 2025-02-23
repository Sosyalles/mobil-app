import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

const CATEGORIES: {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    id: '1',
    title: 'Oyunlar',
    icon: 'game-controller',
  },
  {
    id: '2',
    title: 'Yemek',
    icon: 'restaurant',
  },
  {
    id: '3',
    title: 'Müzik',
    icon: 'musical-notes',
  },
  {
    id: '4',
    title: 'Gruplar',
    icon: 'people',
  },
];

const CategorySection = () => {
  return (
    <View style={styles.container}>
      {CATEGORIES.map((category) => (
        <TouchableOpacity key={category.id} style={styles.categoryButton}>
          <View style={styles.iconContainer}>
            <Ionicons name={category.icon} size={24} color={theme.colors.text.primary} />
          </View>
          <Text style={styles.categoryTitle}>{category.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
  },
  categoryButton: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  categoryTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
});

export default CategorySection; 