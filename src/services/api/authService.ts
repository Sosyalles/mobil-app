import axios from 'axios';

const BASE_URL = 'http://192.168.55.5:3000';
const API_URL = `${BASE_URL}/api`;

// Axios instance oluştur
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

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

export class AuthService {
    static async login(email: string, password: string): Promise<LoginResponse> {
        try {
            const response = await axiosInstance.post('/api/auth/login', {
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
        const endpoint = '/api/auth/register';
        try {
            // İsmi firstName ve lastName olarak böl
            const [firstName, ...lastNameParts] = name.split(' ');
            const lastName = lastNameParts.join(' ') || firstName; // Eğer soyadı yoksa adı kullan
            const username = email.split('@')[0]; // Email'in @ işaretinden önceki kısmını username olarak kullan

            console.log('Register isteği gönderiliyor:', {
                url: `${BASE_URL}${endpoint}`,
                data: { email, username, firstName, lastName } // Güvenlik için şifreyi loglama
            });

            const response = await axiosInstance.post(endpoint, {
                email,
                password,
                username,
                firstName,
                lastName
            });

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
} 