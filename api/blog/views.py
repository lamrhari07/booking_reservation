from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import login, logout
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from api.models import ProfileModel
from api.auth.serializers import (
    UserRegistrationSerializer,
    LoginSerializer,
    JWTSerializer,
    ProfileSerializer
)
from api.utils import sensitive_post_parameters_m, jwt_encode, get_data_response

User = get_user_model()

class BlogView(generics.ListCreateAPIView):
    """
        Endpoint For User Registration.
    """
    serializer_class = ProfileSerializer
    queryset = ProfileModel.objects.all()

