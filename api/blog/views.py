from rest_framework import status
from rest_framework import generics
from rest_framework import filters
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from api.models import BlogModel
from api.blog.serializers import (
    BlogSerializer,
    ProfileModel
)
from api.pagination import BlogPageNumberPagination


class BlogListView(generics.ListAPIView):
    """
        Public List Endpoint For All Blog.
    """
    queryset = BlogModel.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [AllowAny,]
    pagination_class = BlogPageNumberPagination
    filter_backends = (filters.SearchFilter, filters.OrderingFilter,)
    search_fields = ('title',)
    ordering_fields = ('created_at',)



class BlogView(generics.ListCreateAPIView):
    """
        Create/List Endpoint For Blog.
    """
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated,]
    pagination_class = BlogPageNumberPagination
    filter_backends = (filters.SearchFilter, filters.OrderingFilter,)
    search_fields = ('title',)
    ordering_fields = ('created_at',)


    def get_queryset(self):
        user = ProfileModel.objects.get(user__id=self.request.user.pk)
        return BlogModel.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.create_blog(request)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

class BlogUpdateView(generics.RetrieveUpdateDestroyAPIView):
    """
        Endpoint For Update Blog.
    """
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated,]
    lookup_field = 'pk'

    def get_queryset(self):
        user = ProfileModel.objects.get(user__id=self.request.user.pk)
        return BlogModel.objects.filter(user=user)