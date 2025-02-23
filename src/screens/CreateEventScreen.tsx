import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { CustomButton } from '../components/buttons/CustomButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import turkishProvinces from '../data/turkish_provinces.json';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type CategoryItem = {
  id: string, 
  name: string, 
  icon: keyof typeof Ionicons.glyphMap
};

const CATEGORIES: CategoryItem[] = [
  { id: '1', name: 'Sanat', icon: 'brush-outline' },
  { id: '2', name: 'Spor', icon: 'football-outline' },
  { id: '3', name: 'Oyun', icon: 'game-controller-outline' },
  { id: '4', name: 'Doğa', icon: 'leaf-outline' },
  { id: '5', name: 'Teknoloji', icon: 'desktop-outline' },
];

const LOCATIONS = [
  { id: '0', name: 'Online' },
  ...turkishProvinces.provinces.map((province, index) => ({
    id: `${index + 1}`, 
    name: province
  })),
  { id: 'other', name: 'Diğer' },
];

const CreateEventScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ id: string, name: string } | null>(null);
  const [district, setDistrict] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleCreateEvent = () => {
    console.log('Event Created:', {
      title,
      description,
      date,
      category: selectedCategory,
      location: selectedLocation,
      district,
    });
    navigation.goBack();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const CategoryModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showCategoryModal}
      onRequestClose={() => setShowCategoryModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.centeredModalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Kategori Seç</Text>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.modalItem}
                onPress={() => {
                  setSelectedCategory(category);
                  setShowCategoryModal(false);
                }}
              >
                <Ionicons 
                  name={category.icon} 
                  size={24} 
                  color="#FF7F50" 
                  style={styles.modalItemIcon}
                />
                <Text style={styles.modalItemText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowCategoryModal(false)}
            >
              <Text style={styles.modalCloseButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const LocationModal = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredLocations = LOCATIONS.filter((location) => {
      // First, prioritize locations that start with the search query
      const startsWithQuery = location.name.toLowerCase().startsWith(searchQuery.toLowerCase());
      
      // Then, include locations that contain the search query
      const containsQuery = location.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return startsWithQuery || containsQuery;
    }).sort((a, b) => {
      // Sort to bring locations starting with the query to the top
      const aStartsWith = a.name.toLowerCase().startsWith(searchQuery.toLowerCase());
      const bStartsWith = b.name.toLowerCase().startsWith(searchQuery.toLowerCase());
      
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      
      return a.name.localeCompare(b.name);
    });

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showLocationModal}
        onRequestClose={() => setShowLocationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.centeredModalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Lokasyon Seç</Text>
              
              {/* Search Input */}
              <View style={styles.searchContainer}>
                <Ionicons 
                  name="search-outline" 
                  size={20} 
                  color="#999999" 
                  style={styles.searchIcon} 
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="İl ara..."
                  placeholderTextColor="#999999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              <ScrollView 
                style={styles.locationScrollView}
                showsVerticalScrollIndicator={true}
              >
                {filteredLocations.map((location) => (
                  <TouchableOpacity
                    key={location.id}
                    style={styles.modalItem}
                    onPress={() => {
                      setSelectedLocation(location);
                      setShowLocationModal(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{location.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setShowLocationModal(false)}
              >
                <Text style={styles.modalCloseButtonText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Etkinlik Oluştur</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Event Title */}
        <Text style={styles.label}>Etkinlik Başlığı</Text>
        <TextInput
          style={styles.input}
          placeholder="Etkinlik adını girin"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#999999"
        />

        {/* Event Description */}
        <Text style={styles.label}>Açıklama</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Etkinlik hakkında detayları yazın"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          placeholderTextColor="#999999"
        />

        {/* Date Selection */}
        <Text style={styles.label}>Tarih</Text>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <View style={styles.dateContainer}>
            <View style={styles.dateDayContainer}>
              <Text style={styles.dateDayText}>
                {date.getDate()}
              </Text>
              <Text style={styles.dateMonthText}>
                {date.toLocaleString('default', { month: 'short' })}
              </Text>
            </View>
            <View style={styles.dateDetailsContainer}>
              <Text style={styles.dateDetailsText}>
                {formatDate(date)}
              </Text>
            </View>
          </View>
          <Ionicons name="calendar-outline" size={24} color="#FF7F50" />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Category Selection */}
        <Text style={styles.label}>Kategori</Text>
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={() => setShowCategoryModal(true)}
        >
          {selectedCategory ? (
            <View style={styles.selectedItemContainer}>
              <Ionicons 
                name={selectedCategory.icon} 
                size={24} 
                color="#FF7F50" 
                style={styles.dropdownIcon}
              />
              <Text style={styles.dropdownText}>{selectedCategory.name}</Text>
            </View>
          ) : (
            <Text style={styles.dropdownPlaceholder}>Kategori Seç</Text>
          )}
          <Ionicons name="chevron-down" size={20} color="#999999" />
        </TouchableOpacity>

        {/* Location Selection */}
        <Text style={styles.label}>Lokasyon</Text>
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={() => setShowLocationModal(true)}
        >
          <Text style={styles.dropdownText}>
            {selectedLocation ? selectedLocation.name : 'Lokasyon Seç'}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#999999" />
        </TouchableOpacity>

        {/* District Input */}
        <Text style={styles.label}>İlçe</Text>
        <TextInput
          style={styles.input}
          placeholder="İlçe adını girin"
          value={district}
          onChangeText={setDistrict}
          placeholderTextColor="#999999"
        />

        {/* Create Event Button */}
        <CustomButton
          title="Etkinlik Oluştur"
          onPress={handleCreateEvent}
          variant="primary"
          style={styles.createButton}
          disabled={!title || !selectedCategory || !selectedLocation}
        />
      </ScrollView>

      {/* Modals */}
      <CategoryModal />
      <LocationModal />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    fontFamily: 'Inter-SemiBold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'Inter-Medium',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Inter-Regular',
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  selectionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectionButtonText: {
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Inter-Regular',
  },
  selectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  selectionItem: {
    width: '30%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#FF7F50',
  },
  selectionItemText: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'Inter-Medium',
  },
  selectedItemText: {
    color: '#FFFFFF',
  },
  createButton: {
    marginTop: 24,
    marginBottom: 32,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Inter-Regular',
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#999999',
    fontFamily: 'Inter-Regular',
  },
  selectedItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownIcon: {
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredModalContainer: {
    width: '90%',
    maxHeight: '80%',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    padding: 20,
    maxHeight: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalItemIcon: {
    marginRight: 12,
  },
  modalItemText: {
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Inter-Regular',
  },
  modalCloseButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: '#FF7F50',
    fontFamily: 'Inter-Medium',
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateDayContainer: {
    backgroundColor: '#FF7F50',
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dateDayText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold',
  },
  dateMonthText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Inter-Medium',
  },
  dateDetailsContainer: {
    flex: 1,
  },
  dateDetailsText: {
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Inter-Regular',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    width: '100%',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Inter-Regular',
  },
  locationScrollView: {
    maxHeight: '65%',
    width: '100%',
  },
});

export default CreateEventScreen; 