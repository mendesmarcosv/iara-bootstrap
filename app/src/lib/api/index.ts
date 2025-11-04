// Axios Instance com Interceptors
import axios from 'axios';

// Instância principal do Axios
const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Request - Adiciona token se existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Response - Trata erros globalmente
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_email');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

