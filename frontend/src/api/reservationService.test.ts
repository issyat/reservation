import axios from 'axios';

// Mock axios before importing the service
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockAxiosInstance = {
  post: jest.fn(),
  get: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() }
  }
};

mockedAxios.create.mockReturnValue(mockAxiosInstance as any);
process.env.VITE_API_URL = 'http://localhost:8000/api';

// Now import the service (after the mock is set up)
const { createReservation, getReservations } = require('./reservationService');

describe('reservationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('createReservation makes correct API call', async () => {
    const mockReservation = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      date: '2024-12-31',
      time: '18:00',
      message: 'Test message',
    };
    
    const expectedResponse = { id: 1, ...mockReservation };
    mockAxiosInstance.post.mockResolvedValueOnce({ data: expectedResponse });
    
    const result = await createReservation(mockReservation);
    expect(result).toEqual(expectedResponse);
  });

  it('getReservations makes correct API call', async () => {
    const mockReservations = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        date: '2024-12-31',
        time: '18:00',
      },
    ];
    
    mockAxiosInstance.get.mockResolvedValueOnce({ data: mockReservations });
    
    const result = await getReservations();
    expect(result).toEqual(mockReservations);
  });
});
