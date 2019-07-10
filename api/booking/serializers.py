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

    def validate_reservation(self, user):
        if Reservation.objects.filter(user=ProfileModel.objects.get(user_id=user)).exists():
            raise serializers.ValidationError(_('Your reservation is already in the process.'))
        return user

    def create_reservation(self, request):
        self.validate_reservation(request.user.pk)
        user_profile = ProfileModel.objects.get(user_id=request.user.pk)
        Reservation.objects.create(user=user_profile)
        return request