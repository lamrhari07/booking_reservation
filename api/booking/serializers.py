from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers, exceptions
from django.conf import settings

from api.models import ProfileModel, Reservation


class ProfileSerializer(serializers.ModelSerializer):
    '''
        Serializer for User Model.
    '''
    class Meta:
        model = ProfileModel
        fields =(
            'avatar',
            'user',
            'gender',
            'birth_date',
            'address'
        )
        depth = 2

class ReservationSerializer(serializers.ModelSerializer):
    '''
        Serializer for User Model.
    '''
    user = ProfileSerializer(read_only=True)
    class Meta:
        model = Reservation
        fields =(
            'pk',
            'user',
            'observation',
            'reserved_start_date',
            'reserved_end_date',
            'status',
            'updated_datetime'
        )

    def validate_reservation(self, user):
        if Reservation.objects.filter(user_id=user).exists():
            raise serializers.ValidationError(_('Your reservation is already in the process.'))
        return user

    def create_reservation(self, request):
        self.validate_reservation(request.user.pk)
        user_profile = ProfileModel.objects.get(user_id=request.user.pk)
        reservation = Reservation.objects.create(user=user_profile)
        return reservation