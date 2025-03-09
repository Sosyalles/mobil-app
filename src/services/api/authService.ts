import axios from 'axios';

const BASE_URL = 'http://192.168.1.54:3000';

// Axios instance oluştur
const api = axios.create({
    baseURL: `${BASE_URL}/api`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Axios interceptor ekleyelim - istek ve yanıtları loglamak için
api.interceptors.request.use(
    (config) => {
        console.log('🚀 API İsteği Gönderiliyor:', {
            url: config.url,
            method: config.method,
            baseURL: config.baseURL,
            headers: config.headers,
            data: config.data
        });
        return config;
    },
    (error) => {
        console.error('❌ API İstek Hatası:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log('✅ API Yanıtı Alındı:', {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: response.data
        });
        return response;
    },
    (error) => {
        console.error('❌ API Yanıt Hatası:', {
            message: error.message,
            response: {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                headers: error.response?.headers
            },
            request: {
                url: error.config?.url,
                method: error.config?.method,
                baseURL: error.config?.baseURL,
                data: error.config?.data
            }
        });
        return Promise.reject(error);
    }
);

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
}

interface LoginResponse {
    status: string;
    message: string;
    data: {
        token: string;
        user: User;
    };
}

interface RegisterResponse {
    status: string;
    message: string;
    data: User;
}

interface ProfileUpdateRequest {
    firstName?: string;
    lastName?: string;
    email?: string;
    username?: string;
    bio?: string;
    city?: string;
}

interface ProfileUpdateResponse {
    status: string;
    message: string;
    data: User;
}

interface UserDetail {
    id: number;
    userId: number;
    bio: string | null;
    location: string | null;
    interests: string[];
    createdAt: string;
    updatedAt: string;
}

interface UserDetailUpdateRequest {
    bio?: string;
    location?: string;
    interests?: string[];
    profilePhoto?: string;
    profilePhotos?: string[];
}

interface UserDetailUpdateResponse {
    status: string;
    message: string;
    data: UserDetail;
}

export class AuthService {
    static async login(email: string, password: string): Promise<LoginResponse> {
        try {
            const response = await api.post('/auth/login', {
                email,
                password,
            });
            return response.data;
        } catch (error: any) {
            console.error('Login API Hatası:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                url: error.config?.url
            });
            throw new Error(`Giriş başarısız oldu: ${error.response?.data?.message || error.message}`);
        }
    }

    static async register(email: string, password: string, name: string): Promise<RegisterResponse> {
        try {
            // İsmi firstName ve lastName olarak böl
            const [firstName, ...lastNameParts] = name.split(' ');
            const lastName = lastNameParts.join(' ') || firstName; // Eğer soyadı yoksa adı kullan
            const username = email.split('@')[0]; // Email'in @ işaretinden önceki kısmını username olarak kullan

            const requestData = {
                email,
                password,
                username,
                firstName,
                lastName
            };

            console.log('Register isteği gönderiliyor:', {
                url: `${BASE_URL}/api/auth/register`,
                data: { ...requestData, password: '***' } // Şifreyi gizleyerek logla
            });

            const response = await api.post('/auth/register', requestData);

            console.log('Register yanıtı alındı:', {
                status: response.status,
                data: response.data
            });

            return response.data;
        } catch (error: any) {
            console.error('Register API Hatası:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                url: error.config?.url
            });
            throw new Error(`Kayıt işlemi başarısız oldu: ${error.response?.data?.message || error.message}`);
        }
    }

    static async updateProfile(token: string, data: ProfileUpdateRequest): Promise<ProfileUpdateResponse> {
        try {
            // bio değerini detaylar olarak göndermeyi deneyelim
            const jsonData = JSON.stringify(data);

            console.log('Profil güncelleme isteği gönderiliyor:', {
                endpoint: '/users/profile',
                rawData: data,
                jsonData: jsonData
            });

            // Bio değerini özel olarak ekleyelim
            const bioData = data.bio ? { bio: data.bio } : {};
            console.log('Bio verisi:', bioData);

            const response = await api.patch('/users/profile', jsonData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Ham API Yanıtı:', {
                status: response.status,
                headers: response.headers,
                data: response.data,
                requestData: jsonData
            });

            return response.data;
        } catch (error: any) {
            console.error('Profil güncelleme hatası:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                url: error.config?.url,
                requestData: error.config?.data
            });
            throw new Error(`Profil güncellenemedi: ${error.response?.data?.message || error.message}`);
        }
    }

    static async updateUserDetail(token: string, data: UserDetailUpdateRequest): Promise<UserDetailUpdateResponse> {
        try {
            const jsonData = JSON.stringify(data);
            console.log('Kullanıcı detayları güncelleme isteği gönderiliyor:', {
                endpoint: '/users/profile/detail',
                data: data,
                jsonData: jsonData
            });

            const response = await api.patch('/users/profile/detail', jsonData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Kullanıcı detayları güncelleme yanıtı:', {
                status: response.status,
                data: response.data
            });

            return response.data;
        } catch (error: any) {
            console.error('Kullanıcı detayları güncelleme hatası:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                url: error.config?.url,
                requestData: error.config?.data
            });
            throw new Error(`Kullanıcı detayları güncellenemedi: ${error.response?.data?.message || error.message}`);
        }
    }
}