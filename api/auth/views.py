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

class UserView(generics.ListCreateAPIView):
    """
        Endpoint For User Registration.
    """
    serializer_class = ProfileSerializer
    queryset = ProfileModel.objects.all()


class UserRegistrationView(generics.CreateAPIView):
    """
        Endpoint For User Registration.
    """
    serializer_class = UserRegistrationSerializer
    JWT_serializer_class = JWTSerializer
    permission_classes = (AllowAny, )

    @sensitive_post_parameters_m
    def dispatch(self, *args, **kwargs):
        return super(UserRegistrationView, self).dispatch(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save(request)
        token = jwt_encode(user)
        try:
            login(request, user)
        except (AttributeError, ObjectDoesNotExist):
            pass
        return Response(
            get_data_response(
                self.JWT_serializer_class, token, status.HTTP_200_OK),
            status=status.HTTP_201_CREATED
        )

class UserLoginViews(generics.GenericAPIView):
    '''
        Endpoint For User Login.
    '''
    serializer_class = LoginSerializer
    JWT_serializer_class = JWTSerializer
    permission_classes = (AllowAny,)

    @sensitive_post_parameters_m
    def dispatch(self, *args, **kwargs):
        return super(UserLoginViews, self).dispatch(*args, **kwargs)

    def process_login(self):
        login(self.request, self.user)

    def login(self):
        self.user = self.serializer.validated_data['user']
        self.token = jwt_encode(self.user)
        login(self.request, self.user)

    def get_response(self):
        return Response(
            get_data_response(
                self.JWT_serializer_class, self.token, status.HTTP_200_OK),
            status=status.HTTP_201_CREATED
        )
    def post(self, request, *args, **kwargs):
        self.serializer = self.serializer_class(data=request.data, context={'request': request})
        self.serializer.is_valid(raise_exception=True)
        self.login()
        return self.get_response()

class UserProfileView(generics.RetrieveUpdateAPIView):
    """
        Reads and updates UserProfileModel fields
        Accepts GET, PUT, PATCH methods.
        Default accepted fields: avatar, username, first_name, last_name, gender, age, phone, and others...
        Read-only fields: id, email
        Returns UserModel fields.
    """
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        try:
            user = User.objects.get(pk=self.request.user.pk)
            obj = ProfileModel.objects.get(user=user)
            return obj
        except ProfileModel.DoesNotExist:
            return None

class LogoutView(APIView):
    '''
        Endpoint For User Logout.
    '''
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
            return self.logout(request)

    def logout(self, request):
        from rest_framework_jwt.settings import api_settings as jwt_settings
        try:
            logout(request)
        except (AttributeError, ObjectDoesNotExist):
            pass

        response = Response({"detail": "Successfully logged out."},
                            status=status.HTTP_200_OK)

        if jwt_settings.JWT_AUTH_COOKIE:
                response.delete_cookie(jwt_settings.JWT_AUTH_COOKIE)
        return response
