import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ReservationForm from '../ReservationForm';
import * as reservationService from '../../api/reservationService';

// Mock the reservation service
jest.mock('../../api/reservationService');

const mockedReservationService = reservationService as jest.Mocked<typeof reservationService>;

// Mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: undefined }),
}));

const theme = createTheme();

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('ReservationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders create form correctly', () => {
    renderWithProviders(<ReservationForm />);
    
    expect(screen.getByText('New Reservation')).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create reservation/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    renderWithProviders(<ReservationForm />);
    
    const submitButton = screen.getByRole('button', { name: /create reservation/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Phone is required')).toBeInTheDocument();
      expect(screen.getByText('Date is required')).toBeInTheDocument();
      expect(screen.getByText('Time is required')).toBeInTheDocument();
    });
  });

  it('shows email validation error for invalid email', async () => {
    renderWithProviders(<ReservationForm />);
    
    const emailField = screen.getByLabelText(/email address/i);
    fireEvent.change(emailField, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByRole('button', { name: /create reservation/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email is invalid')).toBeInTheDocument();
    });
  });

  it('shows date validation error for past date', async () => {
    renderWithProviders(<ReservationForm />);
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateString = yesterday.toISOString().split('T')[0];
    
    const dateField = screen.getByLabelText(/date/i);
    fireEvent.change(dateField, { target: { value: dateString } });
    
    const submitButton = screen.getByRole('button', { name: /create reservation/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Date cannot be in the past')).toBeInTheDocument();
    });
  });

  it('creates reservation successfully with valid data', async () => {
    mockedReservationService.createReservation.mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      date: '2024-12-31',
      time: '18:00',
      message: 'Test message'
    });

    renderWithProviders(<ReservationForm />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-12-31' } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText(/special requests/i), { target: { value: 'Test message' } });
    
    const submitButton = screen.getByRole('button', { name: /create reservation/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedReservationService.createReservation).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        date: '2024-12-31',
        time: '18:00',
        message: 'Test message'
      });
    });

    await waitFor(() => {
      expect(screen.getByText('Reservation created successfully!')).toBeInTheDocument();
    });

    // Check navigation after success
    setTimeout(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/reservations');
    }, 1600);
  });

  it('handles creation error', async () => {
    mockedReservationService.createReservation.mockRejectedValue(new Error('API Error'));

    renderWithProviders(<ReservationForm />);
    
    // Fill out the form with valid data
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-12-31' } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '18:00' } });
    
    const submitButton = screen.getByRole('button', { name: /create reservation/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to create reservation')).toBeInTheDocument();
    });
  });

  it('clears field error when user starts typing', async () => {
    renderWithProviders(<ReservationForm />);
    
    // Trigger validation error
    const submitButton = screen.getByRole('button', { name: /create reservation/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    // Start typing in name field
    const nameField = screen.getByLabelText(/full name/i);
    fireEvent.change(nameField, { target: { value: 'J' } });

    await waitFor(() => {
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    });
  });

  it('navigates back when cancel button is clicked', () => {
    renderWithProviders(<ReservationForm />);
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockNavigate).toHaveBeenCalledWith('/reservations');
  });

  it('navigates back when back arrow is clicked', () => {
    renderWithProviders(<ReservationForm />);
    
    const backButton = screen.getByRole('button', { name: '' }); // ArrowBack icon button
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('/reservations');
  });
});
