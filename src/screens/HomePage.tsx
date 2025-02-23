import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { Logo } from '../components/Logo';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../components/buttons/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';
import BottomNavigation from '../components/BottomNavigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CategoryItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  bgColor: string;
  onPress: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ icon, label, bgColor, onPress }) => (
  <TouchableOpacity style={styles.categoryItem} onPress={onPress}>
    <View style={[styles.categoryIconContainer, { backgroundColor: bgColor }]}>
      <Ionicons name={icon} size={24} color="#FF9F4A" />
    </View>
    <Text style={styles.categoryLabel}>{label}</Text>
  </TouchableOpacity>
);

const HomePage: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { isAuthenticated } = useAuth();
  const scrollY = useRef(new Animated.Value(0)).current;

  const loginBannerTranslateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const loginBannerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const categories = [
    { icon: 'brush-outline' as const, label: 'Sanat', bgColor: '#FFF3E9' },
    { icon: 'football-outline' as const, label: 'Spor', bgColor: '#EBF5FF' },
    { icon: 'game-controller-outline' as const, label: 'Oyun', bgColor: '#FFF9E5' },
    { icon: 'leaf-outline' as const, label: 'Doğa', bgColor: '#FFE9E5' },
    { icon: 'desktop-outline' as const, label: 'Teknoloji', bgColor: '#F0F0F0' },
  ];

  const featuredEvents = [
    {
      id: 1,
      title: 'Resim Atölyesi',
      date: '24 Mart 2024',
      image: require('../assets/images/resim-sanat.jpeg'),
    },
    {
      id: 2,
      title: 'Yoga & Meditasyon',
      date: '25 Mart 2024',
      image: require('../assets/images/yoga-meditasyon.jpeg'),
    },
    {
      id: 3,
      title: 'Fotoğrafçılık Kursu',
      date: '26 Mart 2024',
      image: require('../assets/images/fotografcılık.jpeg'),
    },
    {
      id: 4,
      title: 'Doğa Yürüyüşü',
      date: '27 Mart 2024',
      image: require('../assets/images/yuruyus.jpeg'),
    },
    {
      id: 5,
      title: 'Yazılım Workshop',
      date: '28 Mart 2024',
      image: require('../assets/images/teknoloji.jpeg'),
    },
  ];

  const technoEvents = [
    {
      id: 1,
      title: 'Techno Night',
      date: '30 Mart 2024',
      image: require('../assets/images/teknoloji.jpeg'),
    },
    {
      id: 2,
      title: 'Electronic Fest',
      date: '31 Mart 2024',
      image: require('../assets/images/teknoloji.jpeg'),
    },
    {
      id: 3,
      title: 'Underground Party',
      date: '1 Nisan 2024',
      image: require('../assets/images/teknoloji.jpeg'),
    },
    {
      id: 4,
      title: 'Deep House Night',
      date: '2 Nisan 2024',
      image: require('../assets/images/teknoloji.jpeg'),
    },
    {
      id: 5,
      title: 'EDM Festival',
      date: '3 Nisan 2024',
      image: require('../assets/images/teknoloji.jpeg'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Logo size="small" />
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#FF9F4A" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Etkinlik veya hobi ara..."
          placeholderTextColor="#999999"
        />
      </View>

      <Animated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={require('../assets/images/homepage-enust-resim.jpeg')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Hobileriniz artık{'\n'}daha yakın!</Text>
            <CustomButton
              title="Keşfetmeye Başla"
              onPress={() => navigation.navigate('DiscoverScreen')}
              variant="primary"
              style={styles.heroButton}
            />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryItem}
                onPress={() => navigation.navigate('DiscoverScreen')}
              >
                <View style={[styles.categoryIconContainer, { backgroundColor: category.bgColor }]}>
                  <Ionicons name={category.icon} size={24} color="#FF9F4A" />
                </View>
                <Text style={styles.categoryLabel}>{category.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Events */}
        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Öne Çıkan Etkinlikler</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventsScrollContent}
          >
            {featuredEvents.map((event) => (
              <TouchableOpacity key={event.id} style={styles.eventCard}>
                <Image
                  source={event.image}
                  style={styles.eventImage}
                  resizeMode="cover"
                />
                <View style={styles.eventOverlay}>
                  <View style={styles.eventContent}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDate}>{event.date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Techno Events */}
        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Techno</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventsScrollContent}
          >
            {technoEvents.map((event) => (
              <TouchableOpacity key={event.id} style={styles.eventCard}>
                <Image
                  source={event.image}
                  style={styles.eventImage}
                  resizeMode="cover"
                />
                <View style={[styles.eventOverlay, styles.technoOverlay]}>
                  <View style={[styles.eventContent, styles.technoContent]}>
                    <Text style={[styles.eventTitle, styles.technoTitle]}>{event.title}</Text>
                    <Text style={[styles.eventDate, styles.technoDate]}>{event.date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fabButton}
        onPress={() => {
          // Directly navigate to CreateEventScreen without authentication check
          navigation.navigate('CreateEventScreen');
        }}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Login Banner */}
      <Animated.View
        style={[
          styles.loginBanner,
          {
            transform: [{ translateY: loginBannerTranslateY }],
            opacity: loginBannerOpacity,
          },
        ]}
      >
        <View style={styles.loginBannerContent}>
          <Text style={styles.loginBannerTitle}>Latest hot spots near you</Text>
          <Text style={styles.loginBannerText}>
            Get into your account for tickets,{'\n'}recommendations, and more
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('WelcomeScreen')}
          >
            <Text style={styles.loginButtonText}>LOG IN / SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <View style={styles.bottomNavigationContainer}>
        <BottomNavigation />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    flex: 1,
  },
  notificationButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Inter-Regular',
  },
  content: {
    flex: 1,
    paddingBottom: 60,
  },
  heroSection: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    height: 340,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 24,
    justifyContent: 'flex-end',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 24,
    fontFamily: 'Inter-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    lineHeight: 40,
  },
  heroButton: {
    backgroundColor: '#FF9F4A',
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 8,
  },
  categoriesSection: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginHorizontal: 16,
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '20%',
    alignItems: 'center',
    padding: 8,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
  },
  eventsSection: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  eventsScrollContent: {
    paddingRight: 16,
  },
  eventCard: {
    width: 280,
    height: 180,
    marginLeft: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  eventOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  eventContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 12,
    borderRadius: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  eventDate: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Inter-Regular',
  },
  loginBanner: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  loginBannerContent: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  loginBannerTitle: {
    color: '#999999',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  loginBannerText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: '100%',
    maxWidth: 200,
  },
  loginButtonText: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  technoOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  technoContent: {
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  technoTitle: {
    color: '#FFFFFF',
  },
  technoDate: {
    color: '#CCCCCC',
  },
  fabButton: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF7F50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bottomNavigationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
});

export default HomePage; 