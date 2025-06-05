import axios from 'axios';
import type { Reservation, ReservationFormData } from '../interfaces/types';

// Use environment variable or fallback to localhost
function getApiUrl() {
  // For tests, use process.env
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
    return process.env.VITE_API_URL || 'http://localhost:8000/api';
  }
  
  // For Vite builds, use globalThis to avoid Jest parsing issues
  const viteEnv = (globalThis as any)?.import?.meta?.env;
  if (viteEnv?.VITE_API_URL) {
    return viteEnv.VITE_API_URL;
  }
  
  return 'http://localhost:8000/api';
}

const API_URL = getApiUrl();

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data || error.message);
    if (error.response?.status === 404) {
      throw new Error('Reservation not found');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      throw new Error('Cannot connect to server. Please make sure the backend is running.');
    }
    throw error;
  }
);

export const getReservations = async (): Promise<Reservation[]> => {
  const response = await api.get('/reservations/');
  return response.data;
};

export const getReservation = async (id: number): Promise<Reservation> => {
  const response = await api.get(`/reservations/${id}/`);
  return response.data;
};

export const createReservation = async (reservationData: ReservationFormData): Promise<Reservation> => {
  const response = await api.post('/reservations/', reservationData);
  return response.data;
};

export const updateReservation = async (id: number, reservationData: ReservationFormData): Promise<Reservation> => {
  const response = await api.put(`/reservations/${id}/`, reservationData);
  return response.data;
};

export const deleteReservation = async (id: number): Promise<void> => {
  await api.delete(`/reservations/${id}/`);
};