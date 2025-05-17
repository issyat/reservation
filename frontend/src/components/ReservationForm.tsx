import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createReservation, getReservation, updateReservation } from '../api/reservationService';
import type { ReservationFormData } from '../interfaces/types';
import { TextField, Button, Typography, Box, Alert, Snackbar } from '@mui/material';

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEditMode) {
        await updateReservation(parseInt(id!), formData);
      } else {
        await createReservation(formData);
      }
      navigate('/reservations');
    } catch (err) {
      setError('Failed to save reservation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {isEditMode ? 'Edit Reservation' : 'New Reservation'}
      </Typography>

      {error && (
        <Snackbar open onClose={() => setError(null)}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          fullWidth
          label="Time"
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          fullWidth
          label="Message (optional)"
          name="message"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
          margin="normal"
        />

        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isEditMode ? 'Update' : 'Create'} Reservation
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReservationForm;