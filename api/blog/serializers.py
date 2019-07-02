from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers, exceptions

from api.auth.serializers import ProfileSerializer
from api.models import BlogModel, ProfileModel


class BlogSerializer(serializers.ModelSerializer):
    '''
        Serializer for Blog Model.
    '''
    user = ProfileSerializer(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    class Meta:
        model = BlogModel
        fields =(
            'id',
            'user',
            'title',
            'post',
            'post_image',
            'created_at',
            'updated_at'
        )

    def create_blog(self, validated_data):
        user_profile = ProfileModel.objects.get(user_id=validated_data.user.pk)
        BlogModel.objects.create(user=user_profile)
        return validated_data