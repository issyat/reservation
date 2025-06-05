import React from 'react';
import { 
  Typography, 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  Container,
  Avatar,
  Stack,
  Chip,
  Paper
} from '@mui/material';
import { 
  Add, 
  ViewList, 
  Schedule, 
  CheckCircle,
  Star
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ 
        textAlign: 'center', 
        py: { xs: 6, md: 10 },
        position: 'relative'
      }}>
        {/* Floating decorative elements */}
        <Box sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          opacity: 0.1,
          animation: 'float 6s ease-in-out infinite',
        }} />
        <Box sx={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
          opacity: 0.1,
          animation: 'float 4s ease-in-out infinite reverse',
        }} />

        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom 
          className="gradient-text fade-in-up"
          sx={{ 
            fontWeight: 800,
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
            mb: 3,
            letterSpacing: '-0.02em'
          }}
        >
          Welcome to ReserveNow
        </Typography>
        
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          color="text.secondary" 
          className="slide-in-right"
          sx={{ 
            mb: 6,
            fontWeight: 400,
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.4
          }}
        >
          Manage your reservations with style and efficiency
        </Typography>

        {/* Statistics */}
        <Stack direction="row" spacing={4} justifyContent="center" sx={{ mb: 6 }}>
          <Paper elevation={0} sx={{ 
            px: 3, 
            py: 2, 
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(102, 126, 234, 0.1)'
          }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              Fast
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quick booking
            </Typography>
          </Paper>
          <Paper elevation={0} sx={{ 
            px: 3, 
            py: 2, 
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(102, 126, 234, 0.1)'
          }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              Secure
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Safe & reliable
            </Typography>
          </Paper>
          <Paper elevation={0} sx={{ 
            px: 3, 
            py: 2, 
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(102, 126, 234, 0.1)'
          }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              Easy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Simple to use
            </Typography>
          </Paper>
        </Stack>
      </Box>

      {/* Action Cards */}
      <Grid container spacing={4} justifyContent="center" sx={{ mb: 8 }}>
        <Grid item xs={12} sm={6} md={5}>
          <Card 
            className="glass-card fade-in-up" 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: 4, textAlign: 'center' }}>
              <Avatar sx={{ 
                width: 80, 
                height: 80, 
                mx: 'auto', 
                mb: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
              }}>
                <Add sx={{ fontSize: 40 }} />
              </Avatar>
              
              <Typography variant="h4" component="h3" gutterBottom fontWeight="bold">
                Create Reservation
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                Book a new reservation with our intuitive and user-friendly form. 
                Quick, easy, and hassle-free booking experience.
              </Typography>
              
              <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 4 }}>
                <Chip 
                  label="Quick Setup" 
                  size="small" 
                  sx={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: 500
                  }} 
                />
                <Chip 
                  label="Smart Forms" 
                  size="small" 
                  variant="outlined" 
                  sx={{ borderColor: '#667eea', color: '#667eea' }}
                />
              </Stack>
              
              <Button
                variant="contained"
                component={RouterLink}
                to="/reservations/new"
                size="large"
                startIcon={<Add />}
                fullWidth
                className="modern-button"
                sx={{ 
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
                }}
              >
                New Reservation
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Card 
            className="glass-card fade-in-up" 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: 4, textAlign: 'center' }}>
              <Avatar sx={{ 
                width: 80, 
                height: 80, 
                mx: 'auto', 
                mb: 3,
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                boxShadow: '0 8px 25px rgba(118, 75, 162, 0.3)'
              }}>
                <ViewList sx={{ fontSize: 40 }} />
              </Avatar>
              
              <Typography variant="h4" component="h3" gutterBottom fontWeight="bold">
                View Reservations
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                Browse, search, and manage all your existing reservations in one 
                convenient location with powerful filtering options.
              </Typography>
              
              <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 4 }}>
                <Chip 
                  label="Smart Search" 
                  size="small" 
                  sx={{ 
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    color: 'white',
                    fontWeight: 500
                  }} 
                />
                <Chip 
                  label="Easy Manage" 
                  size="small" 
                  variant="outlined" 
                  sx={{ borderColor: '#764ba2', color: '#764ba2' }}
                />
              </Stack>
              
              <Button
                variant="outlined"
                component={RouterLink}
                to="/reservations"
                size="large"
                startIcon={<ViewList />}
                fullWidth
                className="modern-button"
                sx={{ 
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  }
                }}
              >
                All Reservations
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Features Section */}
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          gutterBottom 
          className="gradient-text"
          sx={{ fontWeight: 700, mb: 6 }}
        >
          Why Choose ReserveNow?
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ 
                width: 60, 
                height: 60, 
                mx: 'auto', 
                mb: 2,
                backgroundColor: '#10b981',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}>
                <Schedule />
              </Avatar>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Real-time Updates
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get instant notifications and updates on your reservation status
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ 
                width: 60, 
                height: 60, 
                mx: 'auto', 
                mb: 2,
                backgroundColor: '#3b82f6',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}>
                <CheckCircle />
              </Avatar>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Easy Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Effortlessly create, edit, and cancel reservations with our intuitive interface
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ 
                width: 60, 
                height: 60, 
                mx: 'auto', 
                mb: 2,
                backgroundColor: '#f59e0b',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
              }}>
                <Star />
              </Avatar>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Premium Experience
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enjoy a modern, responsive design that works perfectly on all devices
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
