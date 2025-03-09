import React, { createContext, useState, useContext } from 'react';
import { AuthService } from '../services/api/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  profilePhoto: string | null;
  photos: string[];
  city: string;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
  country: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: { firstName: string; lastName: string; bio?: string }) => Promise<boolean>;
  updateUserDetail: (data: { bio?: string }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await AuthService.login(email, password);
      if (response.status === 'success' && response.data) {
        await AsyncStorage.setItem('token', response.data.token);

        // Kullanıcı verisini güncelle
        const userData = {
          ...response.data.user,
          country: response.data.user.country || ''
        };

        setUser(userData);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Giriş hatası:', error);
      const errorMessage = error.response?.data?.message || error.message;

      let userMessage = 'Giriş yapılırken bir hata oluştu.';
      if (errorMessage.includes('Invalid credentials')) {
        userMessage = 'Geçersiz e-posta veya şifre. Lütfen tekrar deneyin.';
      }

      Alert.alert('Giriş Başarısız', userMessage);
      return false;
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    try {
      console.log(`Registering user with email: ${email}, firstName: ${firstName}, lastName: ${lastName}`);

      // firstName ve lastName'i birleştirerek name oluştur
      const name = `${firstName} ${lastName}`;

      const response = await AuthService.register(email, password, name);

      if (response.status === 'success' && response.data) {
        // Kullanıcı verisini güncelle
        const userData: User = {
          ...response.data,
          country: '', // Eğer API'den dönmüyorsa boş string ekleyelim
        };
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      }

      Alert.alert('Kayıt Başarısız', 'Kayıt işlemi sırasında bir hata oluştu.');
      return false;
    } catch (error: any) {
      console.error('Kayıt hatası:', error);
      const errorMessage = error.response?.data?.message || error.message;

      let userMessage = 'Kayıt olurken bir hata oluştu.';
      if (errorMessage.includes('email already exists')) {
        userMessage = 'Bu e-posta adresi zaten kullanımda.';
      }

      Alert.alert('Kayıt Başarısız', userMessage);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Çıkış hatası:', error);
      Alert.alert('Hata', 'Çıkış yapılırken bir hata oluştu.');
    }
  };

  const updateProfile = async (data: { firstName: string; lastName: string; bio?: string }): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Hata', 'Oturum bulunamadı. Lütfen tekrar giriş yapın.');
        return false;
      }

      console.log('Profil güncelleme isteği gönderiliyor:', {
        ...data,
        token: 'HIDDEN'
      });

      const response = await AuthService.updateProfile(token, data);

      console.log('Profil güncelleme yanıtı:', {
        status: response.status,
        message: response.message
      });

      if (response.status === 'success' && response.data) {
        // Mevcut kullanıcı bilgilerini koru, sadece güncellenen alanları değiştir
        setUser(prevUser => ({
          ...prevUser!,
          ...response.data
        }));
        Alert.alert('Başarılı', 'Profiliniz başarıyla güncellendi.');
        return true;
      }

      Alert.alert('Hata', response.message || 'Profil güncellenirken bir hata oluştu.');
      return false;
    } catch (error: any) {
      console.error('Profil güncelleme hatası:', error);
      Alert.alert(
        'Hata',
        error.response?.data?.message || 'Profil güncellenirken bir hata oluştu.'
      );
      return false;
    }
  };

  const updateUserDetail = async (data: { bio?: string }): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Hata', 'Oturum bulunamadı. Lütfen tekrar giriş yapın.');
        return false;
      }

      console.log('Kullanıcı detayları güncelleme isteği gönderiliyor:', {
        ...data,
        token: 'HIDDEN'
      });

      // Parametreleri doğru sırayla gönderiyoruz: token, data
      const result = await AuthService.updateUserDetail(token, data);

      if (result.status === 'success') {
        // Kullanıcı nesnesini güncelle, bio alanını ekle
        setUser(prevUser => {
          if (prevUser) {
            return {
              ...prevUser,
              bio: data.bio || prevUser.bio
            };
          }
          return prevUser;
        });

        Alert.alert('Başarılı', 'Biyografi başarıyla güncellendi.');
        return true;
      }

      Alert.alert('Hata', result.message || 'Biyografi güncellenirken bir hata oluştu.');
      return false;
    } catch (error) {
      console.error('Kullanıcı detayları güncelleme hatası:', error);
      Alert.alert('Hata', 'Biyografi güncellenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
        updateUserDetail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 