// ReqRes API - Autenticação
import axios from 'axios';

const REQRES_BASE_URL = process.env.REACT_APP_REQRES_BASE_URL || 'https://reqres.in/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  id?: number;
}

// Login
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(
      `${REQRES_BASE_URL}/login`,
      credentials,
      {
        headers: {
          'x-api-key': 'reqres-free-v1'
        }
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || 'Erro ao fazer login. Verifique suas credenciais.'
    );
  }
};

// Register
export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(
      `${REQRES_BASE_URL}/register`,
      credentials,
      {
        headers: {
          'x-api-key': 'reqres-free-v1'
        }
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || 'Erro ao criar conta. Tente novamente.'
    );
  }
};

// Logout (apenas limpa localStorage)
export const logout = (): void => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_email');
};

