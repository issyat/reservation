import axios from 'axios';
import { getReservations, getReservation, createReservation, updateReservation, deleteReservation } from './reservationService';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('reservationService', () => {
  const mockReservation = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    date: '2024-01-01',
    time: '12:00',
    message: 'Test message'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getReservations', () => {
    it('fetches all reservations successfully', async () => {
      const mockReservations = [mockReservation];
      mockedAxios.get.mockResolvedValueOnce({ data: mockReservations });

      const result = await getReservations();

      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:8000/api/reservations/');
      expect(result).toEqual(mockReservations);
    });

    it('handles errors when fetching reservations', async () => {
      const error = new Error('Network error');
      mockedAxios.get.mockRejectedValueOnce(error);

      await expect(getReservations()).rejects.toThrow('Network error');
    });
  });

  describe('getReservation', () => {
    it('fetches a single reservation successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockReservation });

      const result = await getReservation(1);

      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:8000/api/reservations/1/');
      expect(result).toEqual(mockReservation);
    });
  });

  describe('createReservation', () => {
    it('creates a new reservation successfully', async () => {
      const newReservation = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        date: '2024-01-01',
        time: '12:00',
        message: 'Test message'
      };

      mockedAxios.post.mockResolvedValueOnce({ data: mockReservation });

      const result = await createReservation(newReservation);

      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:8000/api/reservations/', newReservation);
      expect(result).toEqual(mockReservation);
    });
  });

  describe('updateReservation', () => {
    it('updates an existing reservation successfully', async () => {
      const updatedReservation = {
        name: 'John Updated',
        email: 'john@example.com',
        phone: '1234567890',
        date: '2024-01-01',
        time: '12:00',
        message: 'Updated message'
      };

      mockedAxios.put.mockResolvedValueOnce({ data: { ...mockReservation, ...updatedReservation } });

      const result = await updateReservation(1, updatedReservation);

      expect(mockedAxios.put).toHaveBeenCalledWith('http://localhost:8000/api/reservations/1/', updatedReservation);
      expect(result).toEqual({ ...mockReservation, ...updatedReservation });
    });
  });

  describe('deleteReservation', () => {
    it('deletes a reservation successfully', async () => {
      mockedAxios.delete.mockResolvedValueOnce({ data: {} });

      await deleteReservation(1);

      expect(mockedAxios.delete).toHaveBeenCalledWith('http://localhost:8000/api/reservations/1/');
    });

    it('handles errors when deleting a reservation', async () => {
      const error = new Error('Network error');
      mockedAxios.delete.mockRejectedValueOnce(error);

      await expect(deleteReservation(1)).rejects.toThrow('Network error');
    });
  });
});
