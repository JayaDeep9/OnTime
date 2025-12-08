import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
};

export const trainAPI = {
  search: (data) => api.post('/trains/search', data),
  getHistory: () => api.get('/trains/history'),
};

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  saveRoute: (data) => api.post('/users/routes', data),
  getSavedRoutes: () => api.get('/users/routes'),
  deleteRoute: (id) => api.delete(`/users/routes/${id}`),
};

export const liveStationAPI = {
  getLiveStation: (stationCode) => api.get(`/liveStation/${stationCode}`),
};

export default api;