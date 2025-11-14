import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - dodawanie tokenu do każdego requesta
apiClient.interceptors.request.use(
  (config) => {
    // Pobierz token z localStorage (Zustand persist)
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const { state } = JSON.parse(authStorage);
      if (state?.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor dla error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Obsługa 401 Unauthorized - automatyczne wylogowanie
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }

    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
