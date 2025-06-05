import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ReservationForm from './ReservationForm';

// Mock the API service
jest.mock('../api/reservationService', () => ({
  createReservation: jest.fn(),
  getReservation: jest.fn(),
  updateReservation: jest.fn(),
}));

const theme = createTheme();

function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </BrowserRouter>
  );
}

describe('ReservationForm Component', () => {
  it('renders form fields', () => {
    render(
      <TestWrapper>
        <ReservationForm />
      </TestWrapper>
    );
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
  });

  it('has submit button', () => {
    render(
      <TestWrapper>
        <ReservationForm />
      </TestWrapper>
    );
    expect(screen.getByRole('button', { name: /create reservation/i })).toBeInTheDocument();
  });

  it('shows correct title for new reservation', () => {
    render(
      <TestWrapper>
        <ReservationForm />
      </TestWrapper>
    );
    expect(screen.getByText(/new reservation/i)).toBeInTheDocument();
  });
});
