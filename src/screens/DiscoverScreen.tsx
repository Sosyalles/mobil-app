import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { Event as DateTimePickerEvent } from '@react-native-community/datetimepicker';
import turkishProvinces from '../data/turkish_provinces.json';
import BottomNavigation from '../components/BottomNavigation';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

type Category = {
  id: number;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

type Event = {
  id: number;
  title: string;
  date: string;
  venue: string;
  image: string;
  category: string;
};

const categories: Category[] = [
  { id: 1, name: 'Spor', icon: 'basketball', color: '#FF6B6B' },
  { id: 2, name: 'Takım Sporu', icon: 'people', color: '#4ECDC4' },
  { id: 3, name: 'Eğitim', icon: 'school', color: '#45B7D1' },
  { id: 4, name: 'Sosyal Etkinlik', icon: 'chatbubbles', color: '#FDCB6E' },
  { id: 5, name: 'Antrenman', icon: 'fitness', color: '#6C5CE7' },
];

const locations = Object.keys(turkishProvinces.provinces);

const popularEvents: Event[] = [
  {
    id: 1,
    title: 'Basketbol Arkadaş Arıyorum - 3v3 Maç',
    date: 'Pzt 15 Tem',
    venue: 'Kadıköy Spor Kompleksi',
    image: 'https://picsum.photos/200/300',
    category: 'Spor',
  },
  {
    id: 2,
    title: 'Hafta Sonu Basketbol Turnuvası',
    date: 'Cum 19 Tem',
    venue: 'İstanbul Üniversitesi Spor Salonu',
    image: 'https://picsum.photos/200/301',
    category: 'Takım Sporu',
  },
  {
    id: 3,
    title: 'Yeni Başlayanlar İçin Basketbol Günü',
    date: 'Çar 24 Tem',
    venue: 'Beşiktaş Açık Saha',
    image: 'https://picsum.photos/200/302',
    category: 'Eğitim',
  },
  {
    id: 4,
    title: 'Sosyal Basketbol Buluşması',
    date: 'Paz 28 Tem',
    venue: 'Caddebostan Sahil Spor Alanı',
    image: 'https://picsum.photos/200/303',
    category: 'Sosyal Etkinlik',
  },
  {
    id: 5,
    title: 'Profesyonel Oyuncularla Basketbol Kampı',
    date: 'Sal 30 Tem',
    venue: 'Fenerbahçe Spor Kompleksi',
    image: 'https://picsum.photos/200/304',
    category: 'Antrenman',
  },
];

const DiscoverScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  
  // Modal visibility states
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [locationSearchQuery, setLocationSearchQuery] = useState('');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate data fetching
    setTimeout(() => {
      // Here you would typically fetch new data
      setRefreshing(false);
    }, 2000);
  }, []);

  const filteredEvents = useMemo(() => {
    return popularEvents.filter(event => 
      (selectedCategory ? event.category === selectedCategory : true) &&
      (searchQuery ? 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        event.venue.toLowerCase().includes(searchQuery.toLowerCase()) : 
        true
      ) &&
      (selectedLocation ? event.venue.toLowerCase().includes(selectedLocation.toLowerCase()) : true)
    );
  }, [selectedCategory, searchQuery, selectedLocation]);

  const DateSelectionModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isDateModalVisible}
      onRequestClose={() => setDateModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Date Range</Text>
          
          <View style={styles.datePickerContainer}>
            <Text style={styles.datePickerLabel}>Start Date</Text>
            <DateTimePicker
              value={selectedStartDate || new Date()}
              mode="date"
              display="calendar"
              onChange={(event: any, selectedDate?: Date) => {
                try {
                  if (event.type === 'set' && selectedDate) {
                    setSelectedStartDate(selectedDate);
                  }
                } catch (error) {
                  console.error('Date selection error:', error);
                }
              }}
              minimumDate={new Date()}
              maximumDate={new Date(new Date().getFullYear() + 1, 11, 31)}
            />
          </View>

          <View style={styles.datePickerContainer}>
            <Text style={styles.datePickerLabel}>End Date</Text>
            <DateTimePicker
              value={selectedEndDate || new Date()}
              mode="date"
              display="calendar"
              onChange={(event: any, selectedDate?: Date) => {
                try {
                  if (event.type === 'set' && selectedDate) {
                    setSelectedEndDate(selectedDate);
                  }
                } catch (error) {
                  console.error('Date selection error:', error);
                }
              }}
              minimumDate={selectedStartDate || new Date()}
              maximumDate={new Date(new Date().getFullYear() + 1, 11, 31)}
            />
          </View>

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={() => {
                setSelectedStartDate(null);
                setSelectedEndDate(null);
                setDateModalVisible(false);
              }}
            >
              <Text style={styles.modalCancelButtonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.modalConfirmButton}
              onPress={() => setDateModalVisible(false)}
            >
              <Text style={styles.modalConfirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const DateButton = () => (
    <TouchableOpacity 
      style={styles.filterButton}
      activeOpacity={0.7}
      onPress={() => setDateModalVisible(true)}
    >
      <Text style={styles.filterButtonText}>
        {selectedStartDate && selectedEndDate 
          ? `${selectedStartDate.toLocaleDateString()} - ${selectedEndDate.toLocaleDateString()}` 
          : 'Select Dates'}
      </Text>
    </TouchableOpacity>
  );

  const LocationButton = () => (
    <TouchableOpacity 
      style={styles.filterButton}
      activeOpacity={0.7}
      onPress={() => setLocationModalVisible(true)}
    >
      <Text style={styles.filterButtonText}>
        {selectedLocation || 'Select Location'}
      </Text>
    </TouchableOpacity>
  );

  const LocationModal = () => {
    const filteredLocations = turkishProvinces.provinces.filter(province => 
      province.toLowerCase().includes(locationSearchQuery.toLowerCase())  
    );

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLocationModalVisible}
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { maxHeight: height * 0.8 }]}>
            <Text style={styles.modalTitle}>Select Location</Text>
            
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#6D6D6D" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search location"
                value={locationSearchQuery}
                onChangeText={setLocationSearchQuery}
                placeholderTextColor="#6D6D6D"
              />
            </View>

            <FlatList
              data={filteredLocations}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.locationItem}
                  onPress={() => {
                    setSelectedLocation(item);
                    setLocationModalVisible(false);
                  }}
                >
                  <Text style={styles.locationText}>{item}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={() => {
                setSelectedLocation(null);
                setLocationSearchQuery('');
                setLocationModalVisible(false);
              }}
            >
              <Text style={styles.modalCancelButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const CategoryCard = ({ 
    name, 
    icon, 
    color, 
    isSelected 
  }: { 
    name: string; 
    icon: keyof typeof Ionicons.glyphMap; 
    color: string; 
    isSelected: boolean 
  }) => (
    <TouchableOpacity 
      style={[
        styles.categoryCard, 
        isSelected && styles.selectedCategoryCard
      ]}
      onPress={() => setSelectedCategory(isSelected ? null : name)}
      activeOpacity={0.7}
    >
      <View 
        style={[
          styles.categoryIconContainer, 
          { backgroundColor: isSelected ? color : '#E0E0E0' }
        ]}
      >
        <Ionicons 
          name={icon} 
          size={18} 
          color={isSelected ? "#FFFFFF" : "#6D6D6D"} 
        />
      </View>
      <Text style={[
        styles.categoryText, 
        isSelected && styles.selectedCategoryText
      ]}>
        {name}
      </Text>
    </TouchableOpacity>
  );

  const EventCard = ({ event }: { event: Event }) => (
    <TouchableOpacity 
      style={styles.eventCard}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: event.image }} 
        style={styles.eventImage} 
        blurRadius={Platform.OS === 'ios' ? 0 : 0}
      />
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle} numberOfLines={2}>
          {event.title}
        </Text>
        <View style={styles.eventDetailsContainer}>
          <Text style={styles.eventDate}>{event.date}</Text>
          <Text style={styles.eventVenue} numberOfLines={1}>
            {event.venue}
          </Text>
        </View>
      </View>
      <View style={styles.eventActionContainer}>
        <TouchableOpacity style={styles.eventActionButton}>
          <Ionicons name="heart-outline" size={20} color="#FF7F50" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventActionButton}>
          <Ionicons name="share-social-outline" size={20} color="#6D6D6D" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#FF7F50']}
            tintColor={'#FF7F50'}
            title={'Yenileniyor...'}
            titleColor={'#FF7F50'}
            progressViewOffset={50}
          />
        }
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#6D6D6D" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for an event, artist or venue"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#6D6D6D"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#6D6D6D" />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.filterContainer}
          >
            <DateButton />
            <LocationButton />
          </ScrollView>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                name={category.name} 
                icon={category.icon}
                color={category.color}
                isSelected={selectedCategory === category.name}
              />
            ))}
          </ScrollView>

          <View style={styles.resultCountContainer}>
            <Text style={styles.resultCountText}>
              {filteredEvents.length} Events Found
            </Text>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false} 
            style={styles.eventsContainer}
          >
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </ScrollView>

          <DateSelectionModal />
          <LocationModal />
        </SafeAreaView>
      </ScrollView>
      <View style={styles.bottomNavigationContainer}>
        <BottomNavigation />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
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
  scrollViewContent: {
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginHorizontal: 16,
    marginVertical: 16,
    height: 45,
    shadowColor: '#6D6D6D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
    color: '#6D6D6D',
  },
  searchInput: {
    flex: 1,
    color: '#6D6D6D',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#FF7F50',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    height: 35,
    justifyContent: 'center',
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  categoryCard: {
    width: width * 0.2,
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    shadowColor: '#6D6D6D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 4,
  },
  selectedCategoryCard: {
    transform: [{ scale: 1.05 }],
    shadowOpacity: 0.3,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryText: {
    color: '#6D6D6D',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#FF7F50',
  },
  sectionTitleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  eventsContainer: {
    paddingHorizontal: 16,
  },
  eventCard: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#6D6D6D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  eventInfo: {
    flex: 1,
    marginLeft: 12,
  },
  eventDetailsContainer: {
    flexDirection: 'column',
  },
  eventTitle: {
    color: '#6D6D6D',
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'Poppins-SemiBold',
  },
  eventDate: {
    color: '#FF7F50',
    fontSize: 14,
    marginBottom: 2,
    fontFamily: 'Poppins-Medium',
  },
  eventVenue: {
    color: '#6D6D6D',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  eventActionContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  eventActionButton: {
    padding: 5,
  },
  resultCountContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
  },
  resultCountText: {
    color: '#6D6D6D',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    color: '#6D6D6D',
  },
  datePickerContainer: {
    width: '100%',
    marginBottom: 15,
  },
  datePickerLabel: {
    fontFamily: 'Poppins-Medium',
    color: '#6D6D6D',
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  modalCancelButton: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    fontFamily: 'Poppins-Medium',
    color: '#6D6D6D',
  },
  modalConfirmButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FF7F50',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalConfirmButtonText: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
  locationItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#6D6D6D',
  },
});

export default DiscoverScreen; 