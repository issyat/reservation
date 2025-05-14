import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';

// Mock the Outlet component from react-router-dom
const MockOutlet = () => <div data-testid="mock-outlet">Outlet Content</div>;
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <MockOutlet />
}));

describe('Layout', () => {
  const renderLayout = () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  };

  it('renders the header with application title', () => {
    renderLayout();
    expect(screen.getByText('Reservation System')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderLayout();
    
    // Check if all navigation buttons are present
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /all reservations/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /new reservation/i })).toBeInTheDocument();
  });

  it('renders navigation buttons with correct links', () => {
    renderLayout();
    
    // Check if buttons have correct href attributes
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /all reservations/i })).toHaveAttribute('href', '/reservations');
    expect(screen.getByRole('link', { name: /new reservation/i })).toHaveAttribute('href', '/reservations/new');
  });

  it('renders the Outlet component for main content', () => {
    renderLayout();
    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
  });  it('renders with the correct structure', () => {
    renderLayout();
    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument(); // AppBar
    expect(screen.getByText('Reservation System')).toBeInTheDocument();
  });
});
