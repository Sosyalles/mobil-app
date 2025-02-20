import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

const TABS = [
  {
    id: '1',
    title: 'Ana Sayfa',
    icon: 'home-outline' as const,
    active: true,
  },
  {
    id: '2',
    title: 'Keşfet',
    icon: 'compass-outline' as const,
    active: false,
  },
  {
    id: '3',
    title: 'Etkinlikler',
    icon: 'calendar-outline' as const,
    active: false,
  },
  {
    id: '4',
    title: 'Profil',
    icon: 'person-outline' as const,
    active: false,
  },
];

const BottomNavigation = () => {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, tab.active && styles.activeTab]}
        >
          <Ionicons
            name={tab.icon}
            size={24}
            color={tab.active ? theme.colors.primary : theme.colors.text.secondary}
          />
          <Text
            style={[
              styles.tabTitle,
              tab.active && styles.activeTabTitle,
            ]}
          >
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    paddingBottom: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  activeTab: {
    backgroundColor: 'rgba(255,127,80,0.1)',
  },
  tabTitle: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  activeTabTitle: {
    color: theme.colors.primary,
  },
});

export default BottomNavigation; 