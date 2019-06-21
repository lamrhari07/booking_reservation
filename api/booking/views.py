from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import login, logout
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView

from api.models import Reservation, ProfileModel
from api.booking.serializers import (
    ReservationSerializer
)
from api.utils import sensitive_post_parameters_m, jwt_encode, get_data_response

class ReservationView(generics.ListCreateAPIView):
    """
        Endpoint For User Registration.
    """
    serializer_class = ReservationSerializer
    queryset = Reservation.objects.all()

    def get_queryset(self):
        user_profile = ProfileModel.objects.get(user=self.request.user)
        return self.queryset.filter(user=user_profile)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.create_reservation(request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)