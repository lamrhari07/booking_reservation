from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from api.models import BlogModel
from api.blog.serializers import (
    BlogSerializer,
    ProfileModel
)



class BlogListView(generics.ListAPIView):
    """
        List Endpoint For All Blog.
    """
    queryset = BlogModel.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [AllowAny,]



class BlogView(generics.ListCreateAPIView):
    """
        Create/List Endpoint For Blog.
    """
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated,]
    lookup_field = 'user'

    def get_queryset(self):
        user = ProfileModel.objects.get(user__id=self.request.user.pk)
        return BlogModel.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        blog_serializer = serializer.create_blog(request)

        return Response(
            blog_serializer.data,
            status=status.HTTP_201_CREATED
        )

class BlogUpdateView(generics.RetrieveUpdateDestroyAPIView):
    """
        List Endpoint For All Blog.
    """
    serializer_class = BlogSerializer
    permission_classes = [AllowAny,]
    lookup_field = 'pk'

    def get_queryset(self):
        user = ProfileModel.objects.get(user__id=self.request.user.pk)
        return BlogModel.objects.filter(user=user)