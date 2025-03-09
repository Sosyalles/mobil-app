import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    Platform,
    Modal,
    FlatList,
    Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const countries = [
    { id: 'TR', name: 'Türkiye' },
    { id: 'US', name: 'Amerika Birleşik Devletleri' },
    { id: 'GB', name: 'İngiltere' },
    { id: 'DE', name: 'Almanya' },
    { id: 'FR', name: 'Fransa' },
    { id: 'IT', name: 'İtalya' },
];

const citiesByCountry = {
    TR: [
        'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
        'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
        'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum',
        'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin',
        'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli',
        'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir',
    ],
    US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas'],
    GB: ['Londra', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool', 'Newcastle', 'Sheffield', 'Bristol'],
    DE: ['Berlin', 'Hamburg', 'Münih', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig'],
    FR: ['Paris', 'Marsilya', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier'],
    IT: ['Roma', 'Milano', 'Napoli', 'Torino', 'Palermo', 'Cenova', 'Bologna', 'Floransa'],
};

const defaultPhotos = [
    require('../assets/images/resim-sanat.jpeg'),
    require('../assets/images/fotografcılık.jpeg'),
    require('../assets/images/resim-sanat.jpeg'),
    require('../assets/images/fotografcılık.jpeg'),
    require('../assets/images/resim-sanat.jpeg'),
];

const defaultInterests = [
    'Art & Design', 'Photography', 'Workshops', 'Music',
    'Travel', 'Food & Cooking', 'Sports', 'Technology',
    'Reading', 'Writing', 'Movies', 'Theater',
    'Dance', 'Fashion', 'Gaming', 'Fitness',
    'Nature', 'Animals', 'Science', 'History'
];

const EditProfileScreen: React.FC = () => {
    const { user, updateProfile, updateUserDetail } = useAuth();
    const navigation = useNavigation<NavigationProp>();
    const [showCountryModal, setShowCountryModal] = useState(false);
    const [showCityModal, setShowCityModal] = useState(false);
    const [searchCountry, setSearchCountry] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const [selectedPhotos, setSelectedPhotos] = useState<any[]>([defaultPhotos[0]]);
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [showInterestsModal, setShowInterestsModal] = useState(false);
    const [searchInterest, setSearchInterest] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        username: user?.username || '',
        bio: user?.bio || '',
        country: 'Türkiye',
        countryId: 'TR',
        city: 'İstanbul',
        interests: ['Art & Design', 'Photography', 'Workshops', 'Music'],
    });

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchCountry.toLowerCase())
    );

    const filteredCities = citiesByCountry[formData.countryId as keyof typeof citiesByCountry].filter(city =>
        city.toLowerCase().includes(searchCity.toLowerCase())
    );

    const filteredInterests = defaultInterests.filter(interest =>
        interest.toLowerCase().includes(searchInterest.toLowerCase()) &&
        !formData.interests.includes(interest)
    );

    const handleSave = async () => {
        if (!formData.firstName || !formData.lastName) {
            Alert.alert('Hata', 'Ad ve soyad alanları boş bırakılamaz.');
            return;
        }

        // formData değerlerini detaylı loglama
        console.log('Güncellenecek formData:', {
            firstName: formData.firstName,
            lastName: formData.lastName,
            bio: formData.bio,
            bioLength: formData.bio ? formData.bio.length : 0
        });

        setIsLoading(true);

        try {
            // 1. Ad ve soyad bilgilerini /users/profile endpointiyle güncelle
            console.log('Profil bilgilerini güncelleme isteği gönderiliyor...');
            const profileResponse = await updateProfile({
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim()
            });

            console.log('Profil güncelleme yanıtı:', profileResponse);

            // 2. Biyografiyi /users/detail endpointiyle ayrıca güncelle
            if (formData.bio !== undefined) {
                console.log('Biyografi bilgilerini güncelleme isteği gönderiliyor...');
                const bioResponse = await updateUserDetail({
                    bio: formData.bio.trim()
                });
                console.log('Biyografi güncelleme yanıtı:', bioResponse);
            }

            Alert.alert('Başarılı', 'Profil bilgileriniz başarıyla güncellendi.');
            navigation.goBack();
        } catch (error) {
            console.error('Profil güncelleme hatası:', error);
            Alert.alert('Hata', 'Profil güncellenirken bir hata oluştu.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButton}>İptal</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profili Düzenle</Text>
                <TouchableOpacity onPress={handleSave} disabled={isLoading}>
                    <Text style={[styles.saveButton, isLoading && styles.disabledButton]}>
                        {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {/* Profile Photo Section */}
                <View style={styles.photoSection}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={selectedPhotos[0]}
                            style={styles.profileImage}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.changePhotoButton}
                        onPress={() => setShowPhotoModal(true)}
                    >
                        <Text style={styles.changePhotoText}>Fotoğrafları Düzenle</Text>
                    </TouchableOpacity>

                    {/* Photo Gallery */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.photoGallery}
                    >
                        {selectedPhotos.map((photo, index) => (
                            <View key={index} style={styles.galleryImageContainer}>
                                <Image source={photo} style={styles.galleryImage} />
                                <TouchableOpacity
                                    style={styles.removePhotoButton}
                                    onPress={() => {
                                        const newPhotos = selectedPhotos.filter((_, i) => i !== index);
                                        setSelectedPhotos(newPhotos.length > 0 ? newPhotos : [defaultPhotos[0]]);
                                    }}
                                >
                                    <Ionicons name="close-circle" size={24} color="#FF3B30" />
                                </TouchableOpacity>
                            </View>
                        ))}
                        {selectedPhotos.length < 5 && (
                            <TouchableOpacity
                                style={styles.addPhotoButton}
                                onPress={() => {
                                    if (selectedPhotos.length < 5) {
                                        const availablePhotos = defaultPhotos.filter(
                                            photo => !selectedPhotos.includes(photo)
                                        );
                                        if (availablePhotos.length > 0) {
                                            setSelectedPhotos([...selectedPhotos, availablePhotos[0]]);
                                        }
                                    }
                                }}
                            >
                                <Ionicons name="add-circle-outline" size={40} color="#FF7F50" />
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>

                {/* Form Fields */}
                <View style={styles.formSection}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Ad</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.firstName}
                            onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                            placeholder="Adınız"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Soyad</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.lastName}
                            onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                            placeholder="Soyadınız"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Kullanıcı Adı</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.username}
                            onChangeText={(text) => setFormData({ ...formData, username: text })}
                            placeholder="Kullanıcı adınız"
                            autoCapitalize="none"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Biyografi</Text>
                        <TextInput
                            style={[styles.input, styles.bioInput]}
                            placeholder="Kendinizi tanıtın..."
                            placeholderTextColor="#999"
                            multiline
                            value={formData.bio || ''}
                            onChangeText={(text) => setFormData({ ...formData, bio: text })}
                            editable={true}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Ülke</Text>
                        <TouchableOpacity
                            style={styles.citySelectButton}
                            onPress={() => setShowCountryModal(true)}
                        >
                            <Text style={styles.citySelectText}>{formData.country}</Text>
                            <Ionicons name="chevron-down-outline" size={20} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Şehir</Text>
                        <TouchableOpacity
                            style={styles.citySelectButton}
                            onPress={() => setShowCityModal(true)}
                        >
                            <Text style={styles.citySelectText}>{formData.city}</Text>
                            <Ionicons name="chevron-down-outline" size={20} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>İlgi Alanları</Text>
                        <View style={styles.interestsContainer}>
                            {formData.interests.map((interest, index) => (
                                <View key={index} style={styles.interestTag}>
                                    <Text style={styles.interestText}>{interest}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            const newInterests = formData.interests.filter((_, i) => i !== index);
                                            setFormData({ ...formData, interests: newInterests });
                                        }}
                                    >
                                        <Ionicons name="close-circle" size={20} color="#FF7F50" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <TouchableOpacity
                                style={styles.addInterestButton}
                                onPress={() => setShowInterestsModal(true)}
                            >
                                <Ionicons name="add-circle-outline" size={24} color="#FF7F50" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Photo Selection Modal */}
            <Modal
                visible={showPhotoModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowPhotoModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Fotoğraf Seçin</Text>
                            <TouchableOpacity onPress={() => setShowPhotoModal(false)}>
                                <Ionicons name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.photoGrid}>
                            {defaultPhotos.map((photo, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.photoGridItem,
                                        selectedPhotos.includes(photo) && styles.selectedPhotoGridItem
                                    ]}
                                    onPress={() => {
                                        if (selectedPhotos.includes(photo)) {
                                            setSelectedPhotos(selectedPhotos.filter(p => p !== photo));
                                        } else if (selectedPhotos.length < 5) {
                                            setSelectedPhotos([...selectedPhotos, photo]);
                                        }
                                    }}
                                >
                                    <Image source={photo} style={styles.photoGridImage} />
                                    {selectedPhotos.includes(photo) && (
                                        <View style={styles.selectedOverlay}>
                                            <Ionicons name="checkmark-circle" size={24} color="#FF7F50" />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Ülke Seçim Modalı */}
            <Modal
                visible={showCountryModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowCountryModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Ülke Seçin</Text>
                            <TouchableOpacity onPress={() => setShowCountryModal(false)}>
                                <Ionicons name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.searchContainer}>
                            <Ionicons name="search-outline" size={20} color="#666" />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Ülke ara..."
                                value={searchCountry}
                                onChangeText={setSearchCountry}
                            />
                        </View>

                        <FlatList
                            data={filteredCountries}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.cityItem}
                                    onPress={() => {
                                        setFormData({
                                            ...formData,
                                            country: item.name,
                                            countryId: item.id,
                                            city: citiesByCountry[item.id][0] // İlk şehri seç
                                        });
                                        setShowCountryModal(false);
                                        setSearchCountry('');
                                    }}
                                >
                                    <Text style={styles.cityItemText}>{item.name}</Text>
                                    {formData.country === item.name && (
                                        <Ionicons name="checkmark" size={24} color="#FF7F50" />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>

            {/* Şehir Seçim Modalı */}
            <Modal
                visible={showCityModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowCityModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Şehir Seçin</Text>
                            <TouchableOpacity onPress={() => setShowCityModal(false)}>
                                <Ionicons name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.searchContainer}>
                            <Ionicons name="search-outline" size={20} color="#666" />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Şehir ara..."
                                value={searchCity}
                                onChangeText={setSearchCity}
                            />
                        </View>

                        <FlatList
                            data={filteredCities}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.cityItem}
                                    onPress={() => {
                                        setFormData({ ...formData, city: item });
                                        setShowCityModal(false);
                                        setSearchCity('');
                                    }}
                                >
                                    <Text style={styles.cityItemText}>{item}</Text>
                                    {formData.city === item && (
                                        <Ionicons name="checkmark" size={24} color="#FF7F50" />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>

            {/* İlgi Alanları Seçim Modalı */}
            <Modal
                visible={showInterestsModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowInterestsModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>İlgi Alanı Ekle</Text>
                            <TouchableOpacity onPress={() => setShowInterestsModal(false)}>
                                <Ionicons name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.searchContainer}>
                            <Ionicons name="search-outline" size={20} color="#666" />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="İlgi alanı ara..."
                                value={searchInterest}
                                onChangeText={setSearchInterest}
                            />
                        </View>

                        <FlatList
                            data={filteredInterests}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.cityItem}
                                    onPress={() => {
                                        setFormData({
                                            ...formData,
                                            interests: [...formData.interests, item]
                                        });
                                        setShowInterestsModal(false);
                                        setSearchInterest('');
                                    }}
                                >
                                    <Text style={styles.cityItemText}>{item}</Text>
                                    <Ionicons name="add-circle-outline" size={24} color="#FF7F50" />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 50 : 35,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#333',
    },
    cancelButton: {
        fontSize: 17,
        color: '#666',
    },
    saveButton: {
        fontSize: 17,
        color: '#FF7F50',
        fontWeight: '600',
    },
    disabledButton: {
        opacity: 0.5,
    },
    content: {
        flex: 1,
    },
    photoSection: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    profileImageContainer: {
        marginBottom: 12,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F0F0F0',
    },
    defaultProfileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    changePhotoButton: {
        marginTop: 8,
    },
    changePhotoText: {
        color: '#FF7F50',
        fontSize: 16,
        fontWeight: '500',
    },
    formSection: {
        padding: 16,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: '#333',
    },
    bioInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    interestTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF3E9',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        margin: 4,
    },
    interestText: {
        color: '#FF7F50',
        fontSize: 14,
        marginRight: 4,
    },
    addInterestButton: {
        padding: 8,
        marginLeft: 4,
        alignSelf: 'center',
    },
    citySelectButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        padding: 12,
        backgroundColor: '#FAFAFA',
    },
    citySelectText: {
        fontSize: 16,
        color: '#333',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        margin: 16,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
    },
    cityItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    cityItemText: {
        fontSize: 16,
        color: '#333',
    },
    photoGallery: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    galleryImageContainer: {
        marginRight: 12,
        position: 'relative',
    },
    galleryImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    removePhotoButton: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: 'white',
        borderRadius: 12,
    },
    addPhotoButton: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FF7F50',
        borderStyle: 'dashed',
    },
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 8,
    },
    photoGridItem: {
        width: '31%',
        aspectRatio: 1,
        margin: '1%',
        borderRadius: 8,
        overflow: 'hidden',
    },
    selectedPhotoGridItem: {
        borderWidth: 2,
        borderColor: '#FF7F50',
    },
    photoGridImage: {
        width: '100%',
        height: '100%',
    },
    selectedOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    warningText: {
        color: 'orange',
        fontSize: 12,
        marginTop: 5,
        fontStyle: 'italic'
    },
}); 