import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ReservationForm from './ReservationForm';
import { createReservation } from '../api/reservationService';

// Mock the API service
jest.mock('../api/reservationService');

describe('ReservationForm', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the form with all required fields', () => {
    render(
      <BrowserRouter>
        <ReservationForm />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const mockCreateReservation = createReservation as jest.Mock;
    mockCreateReservation.mockResolvedValueOnce({});

    render(
      <BrowserRouter>
        <ReservationForm />
      </BrowserRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-01-01' } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '12:00' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: /create reservation/i }));

    await waitFor(() => {
      expect(mockCreateReservation).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        date: '2024-01-01',
        time: '12:00',
        message: 'Test message'
      });
    });
  });

  it('shows error message when form submission fails', async () => {
    const mockCreateReservation = createReservation as jest.Mock;
    mockCreateReservation.mockRejectedValueOnce(new Error('Failed to save'));

    render(
      <BrowserRouter>
        <ReservationForm />
      </BrowserRouter>
    );

    // Fill out and submit the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-01-01' } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '12:00' } });
    
    fireEvent.submit(screen.getByRole('button', { name: /create reservation/i }));

    await waitFor(() => {
      expect(screen.getByText(/Failed to save reservation/i)).toBeInTheDocument();
    });
  });
});
