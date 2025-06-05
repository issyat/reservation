import { render } from '@testing-library/react';
import App from './App';

// Mock the API service to prevent network calls
jest.mock('./api/reservationService', () => ({
  getReservations: jest.fn(() => Promise.resolve([])),
  createReservation: jest.fn(),
  updateReservation: jest.fn(),
  deleteReservation: jest.fn(),
  getReservation: jest.fn(),
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('is defined', () => {
    expect(App).toBeDefined();
  });
});
