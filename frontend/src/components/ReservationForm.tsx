import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createReservation, getReservation, updateReservation } from '../api/reservationService';
import type { ReservationFormData } from '../interfaces/types';
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Alert, 
  Snackbar, 
  Grid,
  Container,
  IconButton,
  Card,
  CardContent,
  Fade,
  CircularProgress
} from '@mui/material';
import { ArrowBack, Save, Edit, Add } from '@mui/icons-material';

const ReservationForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<ReservationFormData>>({});

  const validateForm = (): boolean => {
    const errors: Partial<ReservationFormData> = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    if (!formData.date) errors.date = 'Date is required';
    else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) errors.date = 'Date cannot be in the past';
    }
    if (!formData.time) errors.time = 'Time is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (isEditMode) {
      const fetchReservation = async () => {
        try {
          setIsLoading(true);
          const data = await getReservation(parseInt(id!));
          setFormData(data);
          setIsLoading(false);
        } catch (err) {
          setError('Failed to fetch reservation');
          setIsLoading(false);
        }
      };
      fetchReservation();
    }
  }, [id, isEditMode]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific field error when user starts typing
    if (formErrors[name as keyof ReservationFormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      if (isEditMode) {
        await updateReservation(parseInt(id!), formData);
        setSuccessMessage('Reservation updated successfully!');
      } else {
        await createReservation(formData);
        setSuccessMessage('Reservation created successfully!');
      }
      
      // Navigate after showing success message
      setTimeout(() => {
        navigate('/reservations');
      }, 1500);
    } catch (err) {
      setError(isEditMode ? 'Failed to update reservation' : 'Failed to create reservation');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in timeout={800}>
        <Box>
          {/* Header */}
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              onClick={() => navigate('/reservations')}
              sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                  transform: 'scale(1.05)',
                }
              }}
            >
              <ArrowBack />
            </IconButton>
            <Typography 
              variant="h4" 
              sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold'
              }}
            >
              {isEditMode ? 'Edit Reservation' : 'New Reservation'}
            </Typography>
            {isEditMode ? <Edit sx={{ color: '#667eea' }} /> : <Add sx={{ color: '#667eea' }} />}
          </Box>

          {/* Form Card */}
          <Card 
            sx={{ 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.15)',
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!formErrors.name}
                      helperText={formErrors.name}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#667eea',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#667eea',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#667eea',
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!formErrors.email}
                      helperText={formErrors.email}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#667eea',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#667eea',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#667eea',
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      error={!!formErrors.phone}
                      helperText={formErrors.phone}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#667eea',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#667eea',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#667eea',
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                        fullWidth
                        label="Date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        error={!!formErrors.date}
                        helperText={formErrors.date}
                        InputLabelProps={{ shrink: true }}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: '#667eea',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#667eea',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#667eea',
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        label="Time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        error={!!formErrors.time}
                        helperText={formErrors.time}
                        InputLabelProps={{ shrink: true }}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: '#667eea',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#667eea',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#667eea',
                          },
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Special Requests or Message (Optional)"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      variant="outlined"
                      placeholder="Any special requests or additional information..."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#667eea',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#667eea',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#667eea',
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                      <Button 
                        variant="outlined" 
                        onClick={() => navigate('/reservations')}
                        disabled={isLoading}
                        sx={{
                          borderColor: '#667eea',
                          color: '#667eea',
                          '&:hover': {
                            borderColor: '#764ba2',
                            color: '#764ba2',
                            backgroundColor: 'rgba(102, 126, 234, 0.04)',
                          },
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        disabled={isLoading}
                        startIcon={
                          isLoading ? <CircularProgress size={20} color="inherit" /> : <Save />
                        }
                        sx={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                          },
                          '&:disabled': {
                            background: 'rgba(102, 126, 234, 0.3)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {isEditMode ? 'Update Reservation' : 'Create Reservation'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Fade>

      {/* Error Snackbar */}
      <Snackbar 
        open={!!error} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={6000}
      >
        <Alert 
          severity="error" 
          onClose={() => setError(null)}
          sx={{ minWidth: '300px' }}
        >
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar 
        open={!!successMessage} 
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={6000}
      >
        <Alert 
          severity="success" 
          onClose={() => setSuccessMessage(null)}
          sx={{ minWidth: '300px' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ReservationForm;