import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Sabit değerler tanımlayalım
const ICON_SIZE = 25;
const TEXT_SIZE = 12;

const TABS = [
  {
    id: '1',
    title: 'Ana Sayfa',
    icon: 'home-outline',
    activeIcon: 'home',
    route: 'HomeScreen',
  },
  {
    id: '2',
    title: 'Keşfet',
    icon: 'compass-outline',
    activeIcon: 'compass',
    route: 'DiscoverPage',
  },
  {
    id: '3',
    title: 'Mesaj',
    icon: 'chatbubbles-outline',
    activeIcon: 'chatbubbles',
    route: 'MessagesScreen',
  },
  {
    id: '4',
    title: 'Profil',
    icon: 'person-outline',
    activeIcon: 'person',
    route: 'ProfileScreen',
  },
];

const BottomNavigation = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const [activeTab, setActiveTab] = React.useState('1');

  useEffect(() => {
    const currentRouteName = route.name;
    const tab = TABS.find(tab => tab.route === currentRouteName);
    if (tab) {
      setActiveTab(tab.id);
    }
  }, [route]);

  const handleTabPress = (tab: typeof TABS[0]) => {
    setActiveTab(tab.id);

    // Konsola bilgi yazdıralım
    console.log(`Tab pressed: ${tab.title}, Route: ${tab.route}`);

    // Profil ve Mesaj butonlarına tıklandığında WelcomeScreen'e yönlendir
    if (tab.id === '4' || tab.id === '3') {
      navigation.navigate('WelcomeScreen');
    }
    // Sadece mevcut sayfalar için yönlendirme yapalım
    else if (tab.route === 'HomeScreen' || tab.route === 'DiscoverPage') {
      navigation.navigate(tab.route as keyof RootStackParamList);
    } else {
      // Henüz oluşturulmamış sayfalar için uyarı gösterelim
      console.log(`${tab.route} sayfası henüz oluşturulmadı`);
      // Alternatif olarak ana sayfaya yönlendirebiliriz
      // navigation.navigate('HomeScreen');
    }
  };

  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={() => handleTabPress(tab)}
        >
          <Ionicons
            name={(activeTab === tab.id ? tab.activeIcon : tab.icon) as keyof typeof Ionicons.glyphMap}
            size={ICON_SIZE}
            color={activeTab === tab.id ? theme.colors.primary : theme.colors.text.secondary}
          />
          <Text
            style={[
              styles.tabTitle,
              activeTab === tab.id && styles.activeTabTitle,
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
    justifyContent: 'center',
    height: 60,
  },
  tabTitle: {
    fontSize: TEXT_SIZE,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  activeTabTitle: {
    color: theme.colors.primary,
  },
});

export default BottomNavigation; 