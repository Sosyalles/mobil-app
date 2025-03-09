import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Modal,
    Pressable,
    Dimensions,
    Platform,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from '../navigation/BottomNavigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const defaultProfilePhoto = require('../assets/images/resim-sanat.jpeg');

const ProfileScreen: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigation = useNavigation<NavigationProp>();
    const [showSettings, setShowSettings] = useState(false);
    const [showPhotoModal, setShowPhotoModal] = useState(false);

    const interests = [
        'Art & Design',
        'Photography',
        'Workshops',
        'Music'
    ];

    const recentActivities = [
        {
            id: 1,
            title: 'Art Workshop',
            date: '2 days ago',
            image: require('../assets/images/resim-sanat.jpeg'),
        },
        {
            id: 2,
            title: 'Photo Exhibition',
            date: '1 week ago',
            image: require('../assets/images/fotografcılık.jpeg'),
        },
    ];

    const handleLogout = async () => {
        await logout();
        setShowSettings(false);
        navigation.navigate('WelcomeScreen');
    };

    if (!isAuthenticated) {
        return (
            <View style={styles.container}>
                <View style={styles.notAuthContainer}>
                    <Text style={styles.notAuthText}>
                        Bu sayfayı görüntülemek için giriş yapmalısınız
                    </Text>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => navigation.navigate('LoginScreen')}
                    >
                        <Text style={styles.loginButtonText}>Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
                <BottomNavigation />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerUsername}>{user?.username}</Text>
                <TouchableOpacity onPress={() => setShowSettings(true)}>
                    <Ionicons name="settings-outline" size={24} color="#666" />
                </TouchableOpacity>
            </View>

            {/* Settings Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showSettings}
                onRequestClose={() => setShowSettings(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setShowSettings(false)}
                >
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.settingsItem}>
                            <Ionicons name="person-outline" size={24} color="#333" />
                            <Text style={styles.settingsText}>Hesap Ayarları</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingsItem}>
                            <Ionicons name="notifications-outline" size={24} color="#333" />
                            <Text style={styles.settingsText}>Bildirimler</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingsItem}>
                            <Ionicons name="lock-closed-outline" size={24} color="#333" />
                            <Text style={styles.settingsText}>Gizlilik</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingsItem}>
                            <Ionicons name="help-circle-outline" size={24} color="#333" />
                            <Text style={styles.settingsText}>Yardım</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.settingsItem, styles.logoutButton]}
                            onPress={handleLogout}
                        >
                            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
                            <Text style={[styles.settingsText, styles.logoutText]}>Çıkış Yap</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>

            <ScrollView style={styles.content}>
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    {/* Profile Image */}
                    <TouchableOpacity
                        style={styles.profileImageContainer}
                        onPress={() => setShowPhotoModal(true)}
                    >
                        <Image
                            source={defaultProfilePhoto}
                            style={styles.profileImage}
                        />
                        <View style={styles.onlineIndicator} />
                    </TouchableOpacity>

                    {/* Profile Info */}
                    <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
                    <Text style={styles.userBio}>{user?.bio || 'Creative enthusiast | Art lover | Workshop host'}</Text>
                    <View style={styles.locationContainer}>
                        <Ionicons name="location-outline" size={16} color="#666666" />
                        <Text style={styles.locationText}>{user?.city || 'İstanbul'}</Text>
                    </View>

                    {/* Edit Profile Button */}
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => navigation.navigate('EditProfileScreen')}
                    >
                        <Text style={styles.editButtonText}>Profili Düzenle</Text>
                    </TouchableOpacity>

                    {/* Stats */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>47</Text>
                            <Text style={styles.statLabel}>Events</Text>
                        </View>
                    </View>

                    {/* Interests */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Interests</Text>
                        <View style={styles.interestsContainer}>
                            {interests.map((interest, index) => (
                                <View key={index} style={styles.interestTag}>
                                    <Text style={styles.interestText}>{interest}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Recent Activities */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Recent Activities</Text>
                        {recentActivities.map((activity) => (
                            <TouchableOpacity
                                key={activity.id}
                                style={styles.activityCard}
                            >
                                <Image
                                    source={activity.image}
                                    style={styles.activityImage}
                                />
                                <View style={styles.activityInfo}>
                                    <Text style={styles.activityTitle}>{activity.title}</Text>
                                    <Text style={styles.activityDate}>{activity.date}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Photo Modal */}
            <Modal
                visible={showPhotoModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowPhotoModal(false)}
            >
                <View style={styles.photoModal}>
                    <TouchableOpacity
                        style={styles.modalPhotoOverlay}
                        onPress={() => setShowPhotoModal(false)}
                    >
                        <View style={styles.modalPhotoContainer}>
                            <Image
                                source={defaultProfilePhoto}
                                style={styles.modalPhoto}
                                resizeMode="contain"
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>

            <BottomNavigation />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 50 : 35,
        paddingBottom: 15,
        backgroundColor: '#FFFFFF',
    },
    headerUsername: {
        fontSize: 26,
        fontWeight: '700',
        color: '#333',
    },
    content: {
        flex: 1,
    },
    profileSection: {
        alignItems: 'center',
        padding: 20,
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 16,
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
    onlineIndicator: {
        position: 'absolute',
        right: 2,
        bottom: 2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4CAF50',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    userName: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 4,
    },
    userBio: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 8,
        textAlign: 'center',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    locationText: {
        fontSize: 14,
        color: '#666666',
        marginLeft: 4,
    },
    editButton: {
        backgroundColor: '#FF7F50',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 20,
        marginBottom: 20,
    },
    editButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 24,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333333',
    },
    statLabel: {
        fontSize: 14,
        color: '#666666',
        marginTop: 4,
    },
    section: {
        width: '100%',
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 12,
        textAlign: 'left',
        width: '100%',
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
    },
    interestTag: {
        backgroundColor: '#FFF3E9',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        margin: 4,
    },
    interestText: {
        color: '#FF7F50',
        fontSize: 14,
    },
    activityCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    activityImage: {
        width: 80,
        height: 80,
        backgroundColor: '#F0F0F0',
    },
    activityInfo: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
    },
    activityTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
        marginBottom: 4,
    },
    activityDate: {
        fontSize: 12,
        color: '#666666',
    },
    notAuthContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    notAuthText: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: '#FF7F50',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 25,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    settingsText: {
        fontSize: 16,
        marginLeft: 15,
        color: '#333',
    },
    logoutButton: {
        marginTop: 20,
        borderBottomWidth: 0,
    },
    logoutText: {
        color: '#FF3B30',
    },
    photoModal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalPhotoOverlay: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalPhotoContainer: {
        width: '90%',
        aspectRatio: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
    },
    modalPhoto: {
        width: '100%',
        height: '100%',
    },
});

export default ProfileScreen; 