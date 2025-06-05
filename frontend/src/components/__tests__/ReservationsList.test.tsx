import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ReservationsList from '../ReservationsList';
import * as reservationService from '../../api/reservationService';

// Mock the reservation service
jest.mock('../../api/reservationService');

const mockedReservationService = reservationService as jest.Mocked<typeof reservationService>;

// Mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
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

const mockReservations = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    date: '2024-12-31',
    time: '18:00',
    message: 'Birthday dinner'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '0987654321',
    date: '2024-12-30',
    time: '19:30',
    message: 'Anniversary celebration'
  }
];

describe('ReservationsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    mockedReservationService.getReservations.mockImplementation(() => new Promise(() => {}));
    
    renderWithProviders(<ReservationsList />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders reservations list successfully', async () => {
    mockedReservationService.getReservations.mockResolvedValue(mockReservations);
    
    renderWithProviders(<ReservationsList />);
    
    await waitFor(() => {
      expect(screen.getByText('Reservations Management')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });
  });

  it('renders empty state when no reservations', async () => {
    mockedReservationService.getReservations.mockResolvedValue([]);
    
    renderWithProviders(<ReservationsList />);
    
    await waitFor(() => {
      expect(screen.getByText('No reservations found')).toBeInTheDocument();
      expect(screen.getByText('Get started by creating your first reservation')).toBeInTheDocument();
    });
  });

  it('handles API error', async () => {
    mockedReservationService.getReservations.mockRejectedValue(new Error('API Error'));
    
    renderWithProviders(<ReservationsList />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load reservations')).toBeInTheDocument();
    });
  });

  it('navigates to create form when "New Reservation" button is clicked', async () => {
    mockedReservationService.getReservations.mockResolvedValue(mockReservations);
    
    renderWithProviders(<ReservationsList />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const newReservationButton = screen.getByRole('button', { name: /new reservation/i });
    fireEvent.click(newReservationButton);

    expect(mockNavigate).toHaveBeenCalledWith('/reservations/new');
  });

  it('navigates to edit form when edit button is clicked', async () => {
    mockedReservationService.getReservations.mockResolvedValue(mockReservations);
    
    renderWithProviders(<ReservationsList />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const editButtons = screen.getAllByRole('button', { name: '' }); // Edit icon buttons
    const editButton = editButtons.find(button => 
      button.getAttribute('aria-label')?.includes('edit') || 
      button.querySelector('[data-testid="EditIcon"]')
    );
    
    if (editButton) {
      fireEvent.click(editButton);
      expect(mockNavigate).toHaveBeenCalledWith('/reservations/edit/1');
    }
  });

  it('deletes reservation successfully', async () => {
    mockedReservationService.getReservations.mockResolvedValue(mockReservations);
    mockedReservationService.deleteReservation.mockResolvedValue();
    
    // Mock window.confirm
    window.confirm = jest.fn(() => true);
    
    renderWithProviders(<ReservationsList />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: '' }); // Delete icon buttons
    const deleteButton = deleteButtons.find(button => 
      button.getAttribute('aria-label')?.includes('delete') || 
      button.querySelector('[data-testid="DeleteIcon"]')
    );
    
    if (deleteButton) {
      fireEvent.click(deleteButton);
      
      expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this reservation?');
      
      await waitFor(() => {
        expect(mockedReservationService.deleteReservation).toHaveBeenCalledWith(1);
      });
    }
  });

  it('does not delete reservation when user cancels', async () => {
    mockedReservationService.getReservations.mockResolvedValue(mockReservations);
    
    // Mock window.confirm to return false
    window.confirm = jest.fn(() => false);
    
    renderWithProviders(<ReservationsList />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: '' }); // Delete icon buttons
    const deleteButton = deleteButtons.find(button => 
      button.getAttribute('aria-label')?.includes('delete') || 
      button.querySelector('[data-testid="DeleteIcon"]')
    );
    
    if (deleteButton) {
      fireEvent.click(deleteButton);
      
      expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this reservation?');
      expect(mockedReservationService.deleteReservation).not.toHaveBeenCalled();
    }
  });

  it('handles delete error', async () => {
    mockedReservationService.getReservations.mockResolvedValue(mockReservations);
    mockedReservationService.deleteReservation.mockRejectedValue(new Error('Delete failed'));
    
    // Mock window.confirm
    window.confirm = jest.fn(() => true);
    
    renderWithProviders(<ReservationsList />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: '' }); // Delete icon buttons
    const deleteButton = deleteButtons.find(button => 
      button.getAttribute('aria-label')?.includes('delete') || 
      button.querySelector('[data-testid="DeleteIcon"]')
    );
    
    if (deleteButton) {
      fireEvent.click(deleteButton);
      
      await waitFor(() => {
        expect(screen.getByText('Failed to delete reservation')).toBeInTheDocument();
      });
    }
  });

  it('displays reservation details correctly', async () => {
    mockedReservationService.getReservations.mockResolvedValue(mockReservations);
    
    renderWithProviders(<ReservationsList />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('1234567890')).toBeInTheDocument();
      expect(screen.getByText('Dec 31, 2024')).toBeInTheDocument();
      expect(screen.getByText('6:00 PM')).toBeInTheDocument();
      expect(screen.getByText('Birthday dinner')).toBeInTheDocument();
    });
  });
});
