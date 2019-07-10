from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers

from api.models import ProfileModel, Reservation


class ReservationSerializer(serializers.ModelSerializer):
    '''
        Serializer for Reservation.
    '''
    reserved_end_date = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Reservation
        fields =(
            'pk',
            'first_name',
            'last_name',
            'email',
            'observation',
            'reserved_start_date',
            'reserved_end_date',
            'status',
            'updated_datetime',
            'exp'
        )

    def validate_reservation(self, email):
        print(Reservation.objects.filter(reserved_start_date__week_day=5))
        if Reservation.objects.filter(email=email).exists():
            raise serializers.ValidationError(_('You are already reserved.'))
        return email

    def create_reservation(self, request):

        data = self.get_initial()

        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        observation = data.get('observation')
        reserved_start_date = data.get('reserved_start_date')

        self.validate_reservation(email)

        Reservation.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            observation=observation,
            reserved_start_date=reserved_start_date
        )
        return request