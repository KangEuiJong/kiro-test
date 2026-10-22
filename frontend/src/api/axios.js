import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - 토큰 자동 첨부
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 - 401 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRoute =
      error.config?.url?.includes('/auth/login') ||
      error.config?.url?.includes('/auth/register');

    if (error.response?.status === 401 && !isAuthRoute) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
