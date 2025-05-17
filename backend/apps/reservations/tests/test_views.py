from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from ..models import Reservation
from django.utils import timezone


class ReservationViewTest(TestCase):
    def setUp(self):
        # Use APIClient for DRF views
        self.client = APIClient()

        # Create some test data matching the current model
        self.reservation = Reservation.objects.create(
            name='Test User',
            email='test@example.com',
            phone='9876543210',
            date=timezone.now().date(),
            time=timezone.now().time(),
            message='Test reservation message'
        )

    def test_reservation_list_view(self):
        # Use the correct URL name from the router
        response = self.client.get(reverse('reservation-list'))
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.data) > 0)

    def test_reservation_create_view(self):
        # Use the correct URL name from the router
        reservation_data = {
            'name': 'New Guest',
            'email': 'newguest@example.com',
            'phone': '1122334455',
            'date': str(timezone.now().date()),
            'time': str(timezone.now().time()),
            'message': 'New reservation'
        }
        response = self.client.post(reverse('reservation-list'), reservation_data)
        self.assertEqual(response.status_code, 201)  # Created status for DRF
        self.assertTrue(Reservation.objects.filter(name='New Guest').exists())
