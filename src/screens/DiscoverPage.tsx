import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    SafeAreaView,
    StatusBar,
    Modal,
    FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import BottomNavigation from '../navigation/BottomNavigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DiscoverPage'>;

const DiscoverPage: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCity, setSelectedCity] = useState('İstanbul');
    const [searchQuery, setSearchQuery] = useState('');
    const [recentCities, setRecentCities] = useState(['İstanbul', 'Ankara', 'İzmir', 'Bursa']);
    const [showAllEvents, setShowAllEvents] = useState(false);
    const [shareModalVisible, setShareModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const turkishCities = [
        'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin', 'Aydın', 'Balıkesir',
        'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli',
        'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari',
        'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir',
        'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir',
        'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat',
        'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman',
        'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
    ];

    // Arama sorgusuna göre şehirleri filtrele
    const filteredCities = searchQuery
        ? turkishCities.filter(city =>
            city.toLowerCase().includes(searchQuery.toLowerCase()))
        : turkishCities;

    const categories = [
        { icon: 'basketball-outline', label: 'Spor', id: '1' },
        { icon: 'people-outline', label: 'Takım Sporu', id: '2' },
        { icon: 'school-outline', label: 'Eğitim', id: '3' },
        { icon: 'chatbubbles-outline', label: 'Sosyal Etkinlik', id: '4' },
        { icon: 'color-palette-outline', label: 'Antrenman', id: '5' },
    ];

    const events = [
        {
            id: '1',
            title: 'Basketbol Arkadaş Arıyorum - 3v3 Maç',
            location: 'İstanbul Spor Kompleksi',
            time: 'Pzt 15 Tem',
            image: require('../assets/images/resim-sanat.jpeg'),
            city: 'İstanbul',
            participants: 3,
            category: 'Spor'
        },
        {
            id: '2',
            title: 'Hafta Sonu Basketbol Turnuvası',
            location: 'İstanbul Spor Salonu',
            time: 'Cum 22 Tem',
            image: require('../assets/images/fotografcılık.jpeg'),
            city: 'İstanbul',
            participants: 8,
            category: 'Takım Sporu'
        },
        {
            id: '3',
            title: 'İstanbul Kadıköy Kitap Kulübü',
            location: 'Kadıköy Moda Sahili',
            time: 'Sal 16 Tem',
            image: require('../assets/images/resim-sanat.jpeg'),
            city: 'İstanbul',
            participants: 6,
            category: 'Eğitim'
        },
        {
            id: '4',
            title: 'Ankara Kızılay Koşu Grubu',
            location: 'Ankara Kızılay Meydanı',
            time: 'Çar 17 Tem',
            image: require('../assets/images/resim-sanat.jpeg'),
            city: 'Ankara',
            participants: 5,
            category: 'Spor'
        },
        {
            id: '5',
            title: 'Ankara Gençlik Parkı Piknik',
            location: 'Ankara Gençlik Parkı',
            time: 'Paz 21 Tem',
            image: require('../assets/images/fotografcılık.jpeg'),
            city: 'Ankara',
            participants: 10,
            category: 'Sosyal Etkinlik'
        },
        {
            id: '6',
            title: 'İzmir Kordon Yoga Buluşması',
            location: 'İzmir Kordon Boyu',
            time: 'Sal 16 Tem',
            image: require('../assets/images/fotografcılık.jpeg'),
            city: 'İzmir',
            participants: 12,
            category: 'Antrenman'
        },
        {
            id: '7',
            title: 'İzmir Alsancak Sokak Müziği',
            location: 'İzmir Alsancak',
            time: 'Cum 19 Tem',
            image: require('../assets/images/resim-sanat.jpeg'),
            city: 'İzmir',
            participants: 8,
            category: 'Sosyal Etkinlik'
        },
        {
            id: '8',
            title: 'Bursa Fotoğrafçılık Atölyesi',
            location: 'Bursa Kültür Merkezi',
            time: 'Cts 20 Tem',
            image: require('../assets/images/resim-sanat.jpeg'),
            city: 'Bursa',
            participants: 7,
            category: 'Sosyal Etkinlik'
        },
        {
            id: '9',
            title: 'Bursa Uludağ Doğa Yürüyüşü',
            location: 'Uludağ Milli Parkı',
            time: 'Paz 21 Tem',
            image: require('../assets/images/fotografcılık.jpeg'),
            city: 'Bursa',
            participants: 15,
            category: 'Spor'
        },
        {
            id: '10',
            title: 'Antalya Plaj Voleybolu',
            location: 'Antalya Konyaaltı Plajı',
            time: 'Paz 21 Tem',
            image: require('../assets/images/fotografcılık.jpeg'),
            city: 'Antalya',
            participants: 6,
            category: 'Takım Sporu'
        },
        {
            id: '11',
            title: 'Antalya Kaleiçi Tarih Turu',
            location: 'Antalya Kaleiçi',
            time: 'Cts 20 Tem',
            image: require('../assets/images/resim-sanat.jpeg'),
            city: 'Antalya',
            participants: 9,
            category: 'Eğitim'
        },
        {
            id: '12',
            title: 'Eskişehir Öğrenci Buluşması',
            location: 'Eskişehir Porsuk Çayı',
            time: 'Per 18 Tem',
            image: require('../assets/images/resim-sanat.jpeg'),
            city: 'Eskişehir',
            participants: 15,
            category: 'Sosyal Etkinlik'
        },
        {
            id: '13',
            title: 'Eskişehir Bisiklet Turu',
            location: 'Eskişehir Kent Merkezi',
            time: 'Cts 20 Tem',
            image: require('../assets/images/fotografcılık.jpeg'),
            city: 'Eskişehir',
            participants: 12,
            category: 'Spor'
        },
        {
            id: '14',
            title: 'Adana Kebap Festivali',
            location: 'Adana Merkez Park',
            time: 'Cum 19 Tem',
            image: require('../assets/images/resim-sanat.jpeg'),
            city: 'Adana',
            participants: 25,
            category: 'Sosyal Etkinlik'
        },
        {
            id: '15',
            title: 'Trabzon Horon Gecesi',
            location: 'Trabzon Meydan',
            time: 'Cts 20 Tem',
            image: require('../assets/images/fotografcılık.jpeg'),
            city: 'Trabzon',
            participants: 18,
            category: 'Sosyal Etkinlik'
        },
        {
            id: '16',
            title: 'Konya Sema Gösterisi',
            location: 'Konya Mevlana Kültür Merkezi',
            time: 'Çar 17 Tem',
            image: require('../assets/images/resim-sanat.jpeg'),
            city: 'Konya',
            participants: 14,
            category: 'Eğitim'
        },
        {
            id: '17',
            title: 'Gaziantep Yemek Atölyesi',
            location: 'Gaziantep Mutfak Müzesi',
            time: 'Per 18 Tem',
            image: require('../assets/images/fotografcılık.jpeg'),
            city: 'Gaziantep',
            participants: 10,
            category: 'Eğitim'
        },
        {
            id: '18',
            title: 'Samsun Sahil Koşusu',
            location: 'Samsun Sahil Parkuru',
            time: 'Pzt 15 Tem',
            image: require('../assets/images/resim-sanat.jpeg'),
            city: 'Samsun',
            participants: 8,
            category: 'Spor'
        }
    ];

    // Şehre göre filtreleme
    const filteredEvents = showAllEvents
        ? events
        : events.filter(event => event.city === selectedCity);

    const handleCitySelect = (city: string) => {
        setSelectedCity(city);
        setModalVisible(false);
        setSearchQuery('');

        // Son ziyaret edilen şehirleri güncelle
        if (!recentCities.includes(city)) {
            const updatedRecentCities = [city, ...recentCities.slice(0, 3)];
            setRecentCities(updatedRecentCities);
        } else if (recentCities[0] !== city) {
            const filteredCities = recentCities.filter(c => c !== city);
            setRecentCities([city, ...filteredCities.slice(0, 3)]);
        }
    };

    const handleJoinEvent = () => {
        navigation.navigate('WelcomeScreen');
    };

    const handleShareEvent = (event: any) => {
        setSelectedEvent(event);
        setShareModalVisible(true);
    };

    const handleShareVia = (platform: string) => {
        // Burada gerçek paylaşım işlemi yapılabilir
        console.log(`Etkinlik ${platform} üzerinden paylaşılıyor: ${selectedEvent?.title}`);
        setShareModalVisible(false);
    };

    console.log('DiscoverPage rendered');

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={styles.container}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color="#999999" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Etkinlik, aktivite veya arkadaş ara..."
                        placeholderTextColor="#999999"
                    />
                </View>

                {/* Location Button */}
                <TouchableOpacity
                    style={styles.locationButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Ionicons name="location-outline" size={16} color="#FF9F4A" />
                    <Text style={styles.locationText}>{selectedCity}</Text>
                    <Ionicons name="chevron-down-outline" size={14} color="#FF9F4A" style={styles.locationIcon} />
                </TouchableOpacity>

                {/* City Selection Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Nerede Buluşmak İstersin?</Text>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Ionicons name="close-outline" size={24} color="#333" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.searchContainerModal}>
                                <Ionicons name="search-outline" size={20} color="#999999" style={styles.searchIcon} />
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Şehir ara..."
                                    placeholderTextColor="#999999"
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                />
                                {searchQuery ? (
                                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                                        <Ionicons name="close-circle" size={20} color="#999999" />
                                    </TouchableOpacity>
                                ) : null}
                            </View>

                            {/* Son Ziyaret Edilen Şehirler */}
                            {!searchQuery && (
                                <View style={styles.recentCitiesContainer}>
                                    <Text style={styles.recentCitiesTitle}>Son Ziyaret Edilenler</Text>
                                    <View style={styles.recentCitiesList}>
                                        {recentCities.map((city, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={styles.recentCityItem}
                                                onPress={() => handleCitySelect(city)}
                                            >
                                                <Ionicons name="time-outline" size={14} color="#999999" style={styles.recentCityIcon} />
                                                <Text style={styles.recentCityText}>{city}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    <View style={styles.divider} />
                                </View>
                            )}

                            <FlatList
                                data={filteredCities}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.cityItem,
                                            selectedCity === item ? styles.selectedCityItem : null
                                        ]}
                                        onPress={() => handleCitySelect(item)}
                                    >
                                        <View style={styles.cityItemContent}>
                                            <Ionicons
                                                name="location"
                                                size={18}
                                                color={selectedCity === item ? "#FF9F4A" : "#BBBBBB"}
                                                style={styles.cityIcon}
                                            />
                                            <Text style={[
                                                styles.cityText,
                                                selectedCity === item ? styles.selectedCityText : null
                                            ]}>
                                                {item}
                                            </Text>
                                        </View>
                                        {selectedCity === item && (
                                            <View style={styles.checkmarkContainer}>
                                                <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.cityList}
                                numColumns={1}
                            />
                        </View>
                    </View>
                </Modal>

                {/* Categories */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Kategoriler</Text>
                    <TouchableOpacity onPress={() => setShowAllEvents(!showAllEvents)}>
                        <Text style={styles.seeAllText}>
                            {showAllEvents ? 'Şehre Göre Filtrele' : 'Tümünü Gör'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesContainer}
                >
                    {categories.map((category) => (
                        <TouchableOpacity key={category.id} style={styles.categoryItem}>
                            <View style={styles.categoryIconContainer}>
                                <Ionicons name={category.icon as keyof typeof Ionicons.glyphMap} size={26} color="#FF9F4A" />
                            </View>
                            <Text style={styles.categoryLabel}>{category.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Events Count */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        {showAllEvents ? 'Tüm Buluşmalar' : `${selectedCity}'da Buluşmalar`}
                    </Text>
                    <Text style={styles.eventsCount}>{filteredEvents.length} etkinlik</Text>
                </View>

                {/* Events List */}
                <ScrollView style={styles.eventsList}>
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <TouchableOpacity key={event.id} style={styles.eventCard}>
                                <Image source={event.image} style={styles.eventImage} />
                                <View style={styles.eventDetails}>
                                    <Text style={styles.eventTitle}>{event.title}</Text>
                                    <View style={styles.eventInfoRow}>
                                        <Ionicons name="time-outline" size={14} color="#FF9F4A" style={styles.eventInfoIcon} />
                                        <Text style={styles.eventTime}>{event.time}</Text>
                                    </View>
                                    <View style={styles.eventInfoRow}>
                                        <Ionicons name="location-outline" size={14} color="#666666" style={styles.eventInfoIcon} />
                                        <Text style={styles.eventLocation}>{event.location}</Text>
                                    </View>
                                    <View style={styles.eventInfoRow}>
                                        <Ionicons name="pricetag-outline" size={14} color="#666666" style={styles.eventInfoIcon} />
                                        <Text style={styles.eventCategory}>{event.category}</Text>
                                    </View>
                                    <View style={styles.eventParticipants}>
                                        <View style={styles.avatarGroup}>
                                            <View style={[styles.avatar, { backgroundColor: '#FFD6BA' }]} />
                                            <View style={[styles.avatar, { backgroundColor: '#BAE1FF', marginLeft: -8 }]} />
                                            <View style={[styles.avatar, { backgroundColor: '#C3FFC0', marginLeft: -8 }]} />
                                        </View>
                                        <Text style={styles.participantsText}>{event.participants} kişi katılıyor</Text>
                                    </View>
                                    <View style={styles.eventActions}>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <Ionicons name="heart-outline" size={22} color="#999999" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.actionButton}
                                            onPress={() => handleShareEvent(event)}
                                        >
                                            <Ionicons name="share-social-outline" size={22} color="#999999" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.joinButton}
                                            onPress={handleJoinEvent}
                                        >
                                            <Text style={styles.joinButtonText}>Katıl</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.noEventsContainer}>
                            <Ionicons name="calendar-outline" size={60} color="#DDDDDD" />
                            <Text style={styles.noEventsText}>
                                {showAllEvents ? 'Henüz etkinlik bulunmuyor' : `${selectedCity}'da henüz etkinlik bulunmuyor`}
                            </Text>
                            <TouchableOpacity style={styles.createEventButton}>
                                <Text style={styles.createEventButtonText}>Etkinlik Oluştur</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </View>

            {/* Bottom Navigation */}
            <BottomNavigation />

            {/* Share Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={shareModalVisible}
                onRequestClose={() => setShareModalVisible(false)}
            >
                <View style={styles.shareModalOverlay}>
                    <View style={styles.shareModalContent}>
                        <View style={styles.shareModalHeader}>
                            <Text style={styles.shareModalTitle}>Etkinliği Paylaş</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setShareModalVisible(false)}
                            >
                                <Ionicons name="close-outline" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        {selectedEvent && (
                            <View style={styles.shareEventInfo}>
                                <Image source={selectedEvent.image} style={styles.shareEventImage} />
                                <Text style={styles.shareEventTitle}>{selectedEvent.title}</Text>
                                <Text style={styles.shareEventLocation}>{selectedEvent.location}</Text>
                                <Text style={styles.shareEventTime}>{selectedEvent.time}</Text>
                            </View>
                        )}

                        <View style={styles.shareOptions}>
                            <TouchableOpacity
                                style={styles.shareOption}
                                onPress={() => handleShareVia('WhatsApp')}
                            >
                                <View style={[styles.shareIconContainer, { backgroundColor: '#25D366' }]}>
                                    <Ionicons name="logo-whatsapp" size={28} color="#FFFFFF" />
                                </View>
                                <Text style={styles.shareOptionText}>WhatsApp</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.shareOption}
                                onPress={() => handleShareVia('Gmail')}
                            >
                                <View style={[styles.shareIconContainer, { backgroundColor: '#EA4335' }]}>
                                    <Ionicons name="mail" size={28} color="#FFFFFF" />
                                </View>
                                <Text style={styles.shareOptionText}>Gmail</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.shareOption}
                                onPress={() => handleShareVia('Instagram')}
                            >
                                <View style={[styles.shareIconContainer, { backgroundColor: '#C13584' }]}>
                                    <Ionicons name="logo-instagram" size={28} color="#FFFFFF" />
                                </View>
                                <Text style={styles.shareOptionText}>Instagram</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.shareOption}
                                onPress={() => handleShareVia('Twitter')}
                            >
                                <View style={[styles.shareIconContainer, { backgroundColor: '#1DA1F2' }]}>
                                    <Ionicons name="logo-twitter" size={28} color="#FFFFFF" />
                                </View>
                                <Text style={styles.shareOptionText}>Twitter</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.copyLinkButton}
                            onPress={() => handleShareVia('Kopyala')}
                        >
                            <Ionicons name="copy-outline" size={20} color="#FFFFFF" style={styles.copyIcon} />
                            <Text style={styles.copyLinkText}>Bağlantıyı Kopyala</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        marginHorizontal: 16,
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333333',
    },
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF3E9',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
        marginHorizontal: 16,
        marginTop: 10,
        shadowColor: '#FF9F4A',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    locationText: {
        color: '#FF9F4A',
        marginLeft: 4,
        fontSize: 14,
        fontWeight: '600',
    },
    locationIcon: {
        marginLeft: 4,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 16,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333333',
    },
    seeAllText: {
        fontSize: 14,
        color: '#FF9F4A',
        fontWeight: '500',
    },
    eventsCount: {
        fontSize: 14,
        color: '#666666',
    },
    categoriesContainer: {
        paddingHorizontal: 12,
        marginBottom: 8,
        maxHeight: 80,
    },
    categoryItem: {
        alignItems: 'center',
        marginHorizontal: 8,
    },
    categoryIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF3E9',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#FF9F4A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    categoryLabel: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: '500',
        color: '#333333',
    },
    eventsList: {
        flex: 1,
        paddingHorizontal: 16,
    },
    eventCard: {
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        overflow: 'hidden',
    },
    eventImage: {
        width: '100%',
        height: 160,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    eventDetails: {
        padding: 16,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 8,
    },
    eventInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    eventInfoIcon: {
        marginRight: 6,
    },
    eventTime: {
        fontSize: 14,
        color: '#FF9F4A',
        fontWeight: '500',
    },
    eventLocation: {
        fontSize: 14,
        color: '#666666',
    },
    eventParticipants: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 12,
    },
    avatarGroup: {
        flexDirection: 'row',
        marginRight: 8,
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
    },
    participantsText: {
        fontSize: 13,
        color: '#666666',
    },
    eventActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 4,
    },
    actionButton: {
        padding: 6,
        marginLeft: 12,
    },
    joinButton: {
        backgroundColor: '#FF9F4A',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginLeft: 16,
        shadowColor: '#FF9F4A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    joinButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 20,
        paddingBottom: 30,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333333',
    },
    closeButton: {
        padding: 6,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
    },
    searchContainerModal: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        marginTop: 16,
        marginBottom: 8,
    },
    cityList: {
        paddingBottom: 20,
    },
    cityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginVertical: 4,
        marginHorizontal: 0,
        backgroundColor: '#F8F8F8',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    cityItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cityIcon: {
        marginRight: 10,
    },
    selectedCityItem: {
        backgroundColor: '#FFF3E9',
        borderLeftWidth: 3,
        borderLeftColor: '#FF9F4A',
    },
    checkmarkContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FF9F4A',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cityText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
    },
    selectedCityText: {
        color: '#FF9F4A',
        fontWeight: '700',
    },
    recentCitiesContainer: {
        marginBottom: 16,
    },
    recentCitiesTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666666',
        marginBottom: 10,
        marginLeft: 4,
    },
    recentCitiesList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 8,
    },
    recentCityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    recentCityIcon: {
        marginRight: 4,
    },
    recentCityText: {
        fontSize: 14,
        color: '#333333',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginTop: 4,
    },
    noEventsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noEventsText: {
        color: '#666666',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 20,
    },
    createEventButton: {
        backgroundColor: '#FF9F4A',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
        shadowColor: '#FF9F4A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    createEventButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },
    eventCategory: {
        fontSize: 14,
        color: '#666666',
        fontWeight: '500',
    },
    // Share Modal Styles
    shareModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    shareModalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    shareModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    shareModalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333333',
    },
    shareEventInfo: {
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    shareEventImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        marginBottom: 12,
    },
    shareEventTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 4,
    },
    shareEventLocation: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 2,
    },
    shareEventTime: {
        fontSize: 14,
        color: '#FF9F4A',
        fontWeight: '500',
    },
    shareOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    shareOption: {
        width: '45%',
        alignItems: 'center',
        marginBottom: 20,
    },
    shareIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    shareOptionText: {
        fontSize: 14,
        color: '#333333',
        fontWeight: '500',
    },
    copyLinkButton: {
        flexDirection: 'row',
        backgroundColor: '#FF9F4A',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#FF9F4A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    copyIcon: {
        marginRight: 8,
    },
    copyLinkText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default DiscoverPage; 