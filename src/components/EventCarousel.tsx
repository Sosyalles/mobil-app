import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

const FEATURED_EVENTS = [
  {
    id: '1',
    title: 'Kutu Oyunu Gecesi',
    schedule: 'Her Çarşamba 19:00',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1000&auto=format&fit=crop',
  },
  // Add more events as needed
];

const EventCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <View style={styles.container}>
      {FEATURED_EVENTS.map((event, index) => (
        <View key={event.id} style={styles.slide}>
          <Image source={{ uri: event.image }} style={styles.image} />
          <View style={styles.overlay}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.schedule}>{event.schedule}</Text>
          </View>
          <View style={styles.pagination}>
            {FEATURED_EVENTS.map((_, dotIndex) => (
              <View
                key={dotIndex}
                style={[
                  styles.paginationDot,
                  dotIndex === activeSlide && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: width * 0.6,
    backgroundColor: theme.colors.white,
  },
  slide: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.md,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: theme.spacing.xs,
  },
  schedule: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
  },
  pagination: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: theme.colors.white,
  },
});

export default EventCarousel; 