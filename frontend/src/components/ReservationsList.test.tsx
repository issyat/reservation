import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ReservationsList from './ReservationsList';

// Mock the API service
jest.mock('../api/reservationService', () => ({
  getReservations: jest.fn(() => Promise.resolve([])),
  deleteReservation: jest.fn(),
}));

const theme = createTheme();

function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </BrowserRouter>
  );
}

describe('ReservationsList Component', () => {
  it('renders the page title', async () => {
    render(
      <TestWrapper>
        <ReservationsList />
      </TestWrapper>
    );
    await waitFor(() => {
      expect(screen.getByText(/all reservations/i)).toBeInTheDocument();
    });
  });

  it('shows empty state when no reservations', async () => {
    render(
      <TestWrapper>
        <ReservationsList />
      </TestWrapper>
    );
    await waitFor(() => {
      expect(screen.getByText(/no reservations found/i)).toBeInTheDocument();
    });
  });

  it('shows a reservation if present', async () => {
    // Update the mock to return a reservation
    const mockReservation = [{
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      date: '2024-12-31',
      time: '18:00',
      message: 'Birthday dinner',
    }];
    const api = require('../api/reservationService');
    api.getReservations.mockResolvedValueOnce(mockReservation);

    render(
      <TestWrapper>
        <ReservationsList />
      </TestWrapper>
    );
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
