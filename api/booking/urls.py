from django.urls import path
from api.booking.views import ReservationView, CreateReservationView

urlpatterns = [
    path('<int:pk>', ReservationView.as_view(), name='detail_rbservation'),
    path('create/', CreateReservationView.as_view(), name='create_rbservation')
]