import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography, Button, Grid } from '@mui/material';

const Layout: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* AppBar (NavBar) */}
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Reservation System
          </Typography>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
            </Grid>
            <Grid>
              <Button color="inherit" component={Link} to="/reservations">
                All Reservations
              </Button>
            </Grid>
            <Grid>
              <Button color="inherit" component={Link} to="/reservations/new">
                New Reservation
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>

    </Box>
  );
};

export default Layout;
