import axios from 'axios';
import type { Reservation, ReservationFormData } from '../interfaces/types';


const API_URL = 'http://localhost:8000/api';

export const getReservations = async (): Promise<Reservation[]> => {
  const response = await axios.get(`${API_URL}/reservations/`);
  return response.data;
};

export const getReservation = async (id: number): Promise<Reservation> => {
  const response = await axios.get(`${API_URL}/reservations/${id}/`);
  return response.data;
};

export const createReservation = async (reservationData: ReservationFormData): Promise<Reservation> => {
  const response = await axios.post(`${API_URL}/reservations/`, reservationData);
  return response.data;
};

export const updateReservation = async (id: number, reservationData: ReservationFormData): Promise<Reservation> => {
  const response = await axios.put(`${API_URL}/reservations/${id}/`, reservationData);
  return response.data;
};

export const deleteReservation = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/reservations/${id}/`);
};