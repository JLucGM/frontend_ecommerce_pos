'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

const AuthContext = createContext<{
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  login: () => void;
  logout: () => void;
  setUser: (user: { email: string; name: string }) => void; // Nueva función para actualizar el usuario
} | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('myToken='))
      ?.split('=')[1];

    if (token) {
      try {
        const decoded = jwt.decode(token) as { email: string; name: string };
        setUser(decoded); // Guarda el nombre y el email en el estado
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    document.cookie = 'myToken=; path=/; max-age=-1'; // Eliminar la cookie
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};