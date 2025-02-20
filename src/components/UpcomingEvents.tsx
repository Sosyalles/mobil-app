import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

const UpcomingEvents = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Events</Text>
      {/* TODO: Implement actual upcoming events list */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: theme.spacing.sm,
  },
});

export default UpcomingEvents; 