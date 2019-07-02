from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from api.models import Reservation, ProfileModel
from api.booking.serializers import (
    ReservationSerializer
)

class ReservationView(generics.ListCreateAPIView):
    """
        Create/List Endpoint For Reservation.
    """
    serializer_class = ReservationSerializer
    queryset = Reservation.objects.all()
    permission_classes = [AllowAny,]

    def get_object(self):
        user_profile = ProfileModel.objects.get(user=self.request.user)
        return self.queryset.get(user=user_profile)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        reservation = serializer.create_reservation(request)
        return Response(reservation.data, status=status.HTTP_201_CREATED)