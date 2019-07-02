from django.contrib.auth import authenticate
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers, exceptions
from django.conf import settings

from api.auth.serializers import ProfileSerializer
from api.models import BlogModel


class BlogSerializer(serializers.ModelSerializer):
    '''
        Serializer for User Model.
    '''
    user = ProfileSerializer()
    class Meta:
        model = BlogModel
        fields =(
            'id',
            'user'
        )