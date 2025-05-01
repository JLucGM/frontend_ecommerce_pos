// services/auth.ts
import axios from 'axios';
import { API_URL } from './apiConfig';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { useAuth } from '@/context/AuthContext';

const SECRET_KEY = process.env.SECRET_KEY || '16a91c59880c0387284be7beff8014c7ba034abf34718ff6725a7ca8292d39098acdf46b639c2e4ee6096790ab6cc890ad726374e822b8a0b1c8d6a46c48609a'; // Usa una clave segura desde las variables de entorno

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}login`, { email, password });

    if (response.data && response.data.token) {
      const { id, email, name } = response.data.user;

      // Guardar el token de Laravel en localStorage
      localStorage.setItem("token", response.data.token); // Almacena el token de Laravel

      // Generar un token JWT con el nombre y el email (opcional)
      const jwtToken = jwt.sign(
        { id, email, name },
        SECRET_KEY,
        { expiresIn: '30d' } // 30 días de expiración
      );

      // Guardar el token JWT en una cookie
      document.cookie = serialize('myToken', jwtToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 días
      });

      return { user: { id, email, name }, token: response.data.token }; // Retorna el usuario y el token de Laravel
    } else {
      throw new Error('No se recibió un token de autenticación.');
    }
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const getProfile = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const logout = async (token: string) => {
  try {
    const response = await axios.post(`${API_URL}logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Eliminar el token de la cookie
    document.cookie = serialize('myToken', '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: -1, // Expira la cookie inmediatamente
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during logout:', error.response?.data);
    } else {
      console.error('Error during logout:', error);
    }
    throw error;
  }
};

// Nueva función para el registro de usuario
export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}register`, { name, email, password });
    // console.log('Response:', response.data); // Agregado para depuración

    if (response.data && response.data.message) {
      return response.data; // Retorna la respuesta del registro
    } else {
      throw new Error('No se recibió un mensaje de éxito.');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};