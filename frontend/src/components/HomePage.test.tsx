import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomePage from './HomePage';

const theme = createTheme();

function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </BrowserRouter>
  );
}

describe('HomePage Component', () => {
  it('renders the welcome title', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );
    expect(screen.getByText('Welcome to ReserveNow')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );
    expect(screen.getByText(/manage your reservations/i)).toBeInTheDocument();
  });

  it('shows the New Reservation button', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );
    const newReservationElements = screen.getAllByText(/new reservation/i);
    expect(
      newReservationElements.some(
        el => el.tagName === 'BUTTON' || el.tagName === 'A'
      )
    ).toBe(true);
  });

  it('shows the View Reservations button', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );
    expect(screen.getByText(/view reservations/i)).toBeInTheDocument();
  });
});
