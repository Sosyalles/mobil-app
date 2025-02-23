import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Logo } from '../components/Logo';
import BottomNavigation from '../components/BottomNavigation';
import { theme } from '../theme';

interface MessageItem {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: string;
  isOnline?: boolean;
}

const MESSAGES: MessageItem[] = [
  {
    id: '1',
    name: 'Sarah Miller',
    message: 'Hey! Are we still meeting for coffee to...',
    time: '2m ago',
    avatar: 'https://i.pravatar.cc/100?img=1',
    isOnline: true,
  },
  {
    id: '2',
    name: 'James Wilson',
    message: 'The project proposal looks great! I\'ve a...',
    time: '1h ago',
    avatar: 'https://i.pravatar.cc/100?img=2',
  },
  {
    id: '3',
    name: 'Emily Chen',
    message: 'Thanks for the update on the design c...',
    time: '3h ago',
    avatar: 'https://i.pravatar.cc/100?img=3',
    isOnline: true,
  },
  {
    id: '4',
    name: 'Michael Thompson',
    message: 'Looking forward to our team lunch ne...',
    time: 'Yesterday',
    avatar: 'https://i.pravatar.cc/100?img=4',
  },
  {
    id: '5',
    name: 'Rachel Anderson',
    message: 'Can you send me the latest marketing ...',
    time: 'Yesterday',
    avatar: 'https://i.pravatar.cc/100?img=5',
  },
  {
    id: '6',
    name: 'David Martinez',
    message: 'Great work on the presentation yester...',
    time: '2 days ago',
    avatar: 'https://i.pravatar.cc/100?img=6',
  },
];

const MessageItem: React.FC<{ item: MessageItem }> = ({ item }) => (
  <TouchableOpacity style={styles.messageItem}>
    <View style={styles.avatarContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      {item.isOnline && <View style={styles.onlineIndicator} />}
    </View>
    <View style={styles.messageContent}>
      <View style={styles.messageHeader}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={styles.messageText} numberOfLines={1}>
        {item.message}
      </Text>
    </View>
  </TouchableOpacity>
);

const MessagesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Logo size="small" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Messages</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity>
              <Feather name="edit" size={24} color={theme.colors.text.secondary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color={theme.colors.text.secondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages"
            placeholderTextColor={theme.colors.text.secondary}
          />
        </View>

        <ScrollView style={styles.messagesList}>
          {MESSAGES.map((message) => (
            <MessageItem key={message.id} item={message} />
          ))}
        </ScrollView>
      </View>

      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    position: 'relative',
  },
  headerLeft: {
    position: 'absolute',
    left: theme.spacing.md,
  },
  headerRight: {
    position: 'absolute',
    right: theme.spacing.md,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    height: 40,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
  },
  messagesList: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  messageContent: {
    flex: 1,
    marginLeft: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  time: {
    fontSize: 14,
    color: '#6D6D6D',
  },
  messageText: {
    fontSize: 14,
    color: '#6D6D6D',
  },
});

export default MessagesScreen; 