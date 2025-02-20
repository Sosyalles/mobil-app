import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { theme } from '../theme';
import { Logo } from '../components/Logo';
import { EventCard } from '../components/features/events/EventCard';
import { EventService } from '../services/api/eventService';
import { Event } from '../types/event';

const HomePage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const events = await EventService.getEvents({ limit: 3 });
        setUpcomingEvents(events);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Logo size="medium" />
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#FF7F50" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Kutu Oyunu Gecesi</Text>
          <Text style={styles.heroSubtitle}>Her Çarşamba 19:00</Text>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <TouchableOpacity style={styles.categoryButton}>
            <Ionicons name="game-controller-outline" size={24} color="#FF7F50" />
            <Text style={styles.categoryText}>Oyunlar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Ionicons name="restaurant-outline" size={24} color="#FF7F50" />
            <Text style={styles.categoryText}>Yemek</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Ionicons name="musical-notes-outline" size={24} color="#FF7F50" />
            <Text style={styles.categoryText}>Müzik</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Ionicons name="people-outline" size={24} color="#FF7F50" />
            <Text style={styles.categoryText}>Gruplar</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Events Section */}
        <View style={styles.upcomingEventsSection}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {upcomingEvents.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              onPress={() => {/* Navigate to event details */}}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#FF7F50" />
          <Text style={[styles.navText, styles.activeNavText]}>Ana Sayfa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="compass-outline" size={24} color="#6D6D6D" />
          <Text style={styles.navText}>Keşfet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar-outline" size={24} color="#6D6D6D" />
          <Text style={styles.navText}>Etkinlikler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#6D6D6D" />
          <Text style={styles.navText}>Profil</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  notificationButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 90 : 60,
    marginBottom: 70,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  heroSection: {
    height: 200,
    backgroundColor: '#A8E0D1',
    padding: 20,
    justifyContent: 'flex-end',
    borderRadius: 15,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#6D6D6D',
    fontFamily: 'Inter-Regular',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF5E1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 12,
    color: '#1E1E1E',
    fontFamily: 'Inter-Medium',
    letterSpacing: -0.2,
  },
  upcomingEventsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: -0.5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? 25 : 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#6D6D6D',
    marginTop: 4,
    fontFamily: 'Inter-Medium',
    letterSpacing: -0.2,
  },
  activeNavText: {
    color: '#FF7F50',
    fontFamily: 'Inter-SemiBold',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: Platform.OS === 'ios' ? 90 : 80,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF7F50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 1000,
  },
});

export default HomePage; 