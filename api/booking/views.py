from rest_framework import status
from rest_framework import generics
from rest_framework import filters
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from api.models import Reservation
from api.booking.serializers import (
    ReservationSerializer
)


class ListReservationView(generics.ListCreateAPIView):
    """
        Create Endpoint For Reservation.
    """
    serializer_class = ReservationSerializer
    queryset = Reservation.objects.all()
    permission_classes = [IsAuthenticated,]


class CreateReservationView(generics.CreateAPIView):
    """
        Create Endpoint For Reservation.
    """
    serializer_class = ReservationSerializer
    permission_classes = [AllowAny,]

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        reservation = serializer.create_reservation(request)
        return Response(reservation.data, status=status.HTTP_201_CREATED)


class ReservationView(generics.RetrieveUpdateDestroyAPIView):
    """
        Update/List/Delete Endpoint For Reservation.
    """
    serializer_class = ReservationSerializer
    queryset = Reservation.objects.all()
    permission_classes = [IsAuthenticated,]
    lookup_field = 'pk'

    filter_backends = (filters.SearchFilter,)
    search_fields = ('first_name', 'status')
