import React, { createContext, useState, useContext } from 'react';
import { AuthService } from '../services/api/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

type User = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  profilePhoto: string | null;
  photos: any[];
  city: string;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updatedUser: User) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => { },
  register: async () => { },
  logout: async () => { },
  updateUser: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password);
      if (response.status === 'success' && response.data) {
        await AsyncStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Giriş hatası:', error);
      const errorMessage = error.response?.data?.message || error.message;
      Alert.alert(
        'Giriş Başarısız',
        errorMessage === 'Invalid credentials' ? 'Email veya şifre hatalı.' : 'Giriş yapılırken bir hata oluştu.'
      );
      return false;
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const response = await AuthService.register(email, password, firstName, lastName);
      if (response.status === 'success' && response.data) {
        // Kayıt başarılı olduktan sonra otomatik giriş yap
        const loginResponse = await AuthService.login(email, password);
        if (loginResponse.status === 'success' && loginResponse.data) {
          await AsyncStorage.setItem('token', loginResponse.data.token);
          setUser(loginResponse.data.user);
          return true;
        }
      }
      return false;
    } catch (error: any) {
      console.error('Kayıt hatası:', error);
      const errorMessage = error.response?.data?.message || error.message;

      let userMessage = 'Kayıt olurken bir hata oluştu.';
      if (errorMessage.includes('Email already exists')) {
        userMessage = 'Bu email adresi zaten kullanımda. Lütfen başka bir email adresi deneyin.';
      } else if (errorMessage.includes('Username already exists')) {
        userMessage = 'Bu kullanıcı adı zaten kullanımda. Lütfen başka bir kullanıcı adı deneyin.';
      }

      Alert.alert('Kayıt Başarısız', userMessage);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Çıkış hatası:', error);
      Alert.alert('Hata', 'Çıkış yapılırken bir hata oluştu.');
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 