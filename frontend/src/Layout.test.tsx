import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from './components/Layout';

const theme = createTheme();

function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </BrowserRouter>
  );
}

describe('Layout Component', () => {
  it('renders without crashing', () => {
    render(
      <TestWrapper>
        <Layout />
      </TestWrapper>
    );
  });

  it('displays the app title', () => {
    render(
      <TestWrapper>
        <Layout />
      </TestWrapper>
    );
    expect(screen.getByText('ReserveNow')).toBeInTheDocument();
  });
});
