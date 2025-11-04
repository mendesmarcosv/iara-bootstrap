// Context de Autenticação
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../lib/api/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Carregar token do localStorage ao montar
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedEmail = localStorage.getItem('user_email');
    
    if (storedToken) {
      setToken(storedToken);
      setUserEmail(storedEmail);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin({ email, password });
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_email', email);
      setToken(response.token);
      setUserEmail(email);
    } catch (error: any) {
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await apiRegister({ email, password });
      // Após registrar, já faz login automaticamente
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_email', email);
      setToken(response.token);
      setUserEmail(email);
    } catch (error: any) {
      throw error;
    }
  };

  const logout = () => {
    apiLogout();
    setToken(null);
    setUserEmail(null);
  };

  const value: AuthContextType = {
    isAuthenticated: !!token,
    token,
    userEmail,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

