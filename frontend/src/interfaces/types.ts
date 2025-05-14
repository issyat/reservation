export interface Reservation {
  id?: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message: string;
}

export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message: string;
}