from django.test import TestCase
from django.core.exceptions import ValidationError
from django.utils import timezone
from ..models import Reservation


class ReservationModelTest(TestCase):
    def setUp(self):
        # Prepare test data matching the current model
        self.base_reservation = {
            'name': 'John Doe',
            'email': 'john@example.com',
            'phone': '1234567890',
            'date': timezone.now().date(),
            'time': timezone.now().time(),
            'message': 'Test reservation'
        }

    def test_create_valid_reservation(self):
        # Test creating a valid reservation
        reservation = Reservation.objects.create(**self.base_reservation)
        self.assertTrue(isinstance(reservation, Reservation))
        self.assertEqual(reservation.name, 'John Doe')

    def test_reservation_fields(self):
        # Test all fields are correctly saved
        reservation = Reservation.objects.create(**self.base_reservation)
        self.assertEqual(reservation.email, 'john@example.com')
        self.assertEqual(reservation.phone, '1234567890')
        self.assertIsNotNone(reservation.date)
        self.assertIsNotNone(reservation.time)

    def test_str_method(self):
        # Test the string representation of the model
        reservation = Reservation.objects.create(**self.base_reservation)
        self.assertEqual(str(reservation), 'John Doe')
