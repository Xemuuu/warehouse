import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor dla error handling
apiClient.interceptors.response.use(
  (response) => response, // Zwracamy cały response, nie tylko data
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
