from rest_framework import viewsets
from .models import Reservation
from .serializers import ReservationSerializer

class ReservationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows reservations to be viewed or edited.
    Provides list, create, retrieve, update and destroy actions.
    """
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer