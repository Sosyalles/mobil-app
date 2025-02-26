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
  createdAt: string;
  updatedAt: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password);
      if (response.status === 'success' && response.data) {
        await AsyncStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        setIsAuthenticated(true);
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

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await AuthService.register(email, password, name);
      if (response.status === 'success' && response.data) {
        // Kayıt başarılı olduktan sonra otomatik giriş yap
        const loginResponse = await AuthService.login(email, password);
        if (loginResponse.status === 'success' && loginResponse.data) {
          await AsyncStorage.setItem('token', loginResponse.data.token);
          setUser(loginResponse.data.user);
          setIsAuthenticated(true);
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
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Çıkış hatası:', error);
      Alert.alert('Hata', 'Çıkış yapılırken bir hata oluştu.');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
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