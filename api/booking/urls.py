from django.urls import path
from api.booking.views import ReservationView, CreateReservationView

urlpatterns = [
    path('', ReservationView.as_view(), name='rbservation'),
    path('create/', CreateReservationView.as_view(), name='create_rbservation')
]