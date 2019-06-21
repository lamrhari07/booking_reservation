from django.urls import path
from api.booking.views import ReservationView

urlpatterns = [
    path('', ReservationView.as_view(), name='observation')
]