import React from 'react';
import { 
  View, 
  Image, 
  StyleSheet, 
  TouchableOpacity,
  ImageSourcePropType
} from 'react-native';
import { Event } from '../../../types/event';
import { Typography } from '../../common/Typography';
import { COLORS } from '../../../theme/colors';

interface EventCardProps {
  event: Event;
  onPress?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onPress 
}) => {
  // Format date to a readable string
  const formattedDate = event.date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Safely handle image source
  const imageSource: ImageSourcePropType | undefined = event.imageUrl 
    ? { uri: event.imageUrl } 
    : require('../../../assets/images/placeholder-image.jpeg');

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {imageSource && (
        <Image 
          source={imageSource} 
          style={styles.image} 
        />
      )}
      <View style={styles.content}>
        <Typography variant="subtitle">
          {event.title}
        </Typography>
        <Typography variant="body">
          {event.description}
        </Typography>
        <View style={styles.metaContainer}>
          <Typography variant="caption">
            📅 {formattedDate}
          </Typography>
          <Typography variant="caption">
            📍 {event.location}
          </Typography>
          <Typography variant="caption">
            👥 {event.participantCount} Katılımcı
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: COLORS.SECONDARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
}); 