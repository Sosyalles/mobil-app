import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TABS: Array<{
  id: string, 
  title: string, 
  icon: keyof typeof Ionicons.glyphMap, 
  screen: keyof RootStackParamList
}> = [
  {
    id: '1',
    title: 'Ana Sayfa',
    icon: 'home-outline',
    screen: 'HomeScreen',
  },
  {
    id: '2',
    title: 'Keşfet',
    icon: 'compass-outline',
    screen: 'DiscoverScreen',
  },
  {
    id: '3',
    title: 'Mesajlar',
    icon: 'chatbubble-outline',
    screen: 'MessagesScreen',
  },
  {
    id: '4',
    title: 'Profil',
    icon: 'person-outline',
    screen: 'ProfileScreen',
  },
];

const BottomNavigation = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const handleTabPress = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = route.name === tab.screen;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => handleTabPress(tab.screen)}
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={isActive ? theme.colors.primary : theme.colors.text.secondary}
            />
            <Text
              style={[
                styles.tabTitle,
                isActive && styles.activeTabTitle,
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        );
      })}
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