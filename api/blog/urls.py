from django.urls import path
from api.auth.views import LogoutView, UserRegistrationView, UserLoginViews, UserProfileView

urlpatterns = [
    path('registration/', UserRegistrationView.as_view(), name='user_registration'),
    path('login/', UserLoginViews.as_view(), name='user_login'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('logout/', LogoutView.as_view(), name='user_logout'),
]