from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers, exceptions

from api.auth.serializers import ProfileSerializer
from api.models import BlogModel, ProfileModel


class BlogSerializer(serializers.ModelSerializer):
    '''
        Serializer for Blog Model.
    '''
    user = ProfileSerializer(read_only=True)
    post_image = serializers.ImageField(required=False)
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
        
        data = self.get_initial()

        title = data.get('title')
        post = data.get('post')
        post_image = data.get('post_image')

        user_profile = ProfileModel.objects.get(user__id=validated_data.user.pk)
        blog = BlogModel(user=user_profile, title=title, post=post, post_image=post_image)
        blog.save()
        
        return validated_data