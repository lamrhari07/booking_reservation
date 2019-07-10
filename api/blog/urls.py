from django.urls import path
from api.blog.views import (
    BlogListView,
    BlogView,
    BlogUpdateView
)

urlpatterns = [
    path('blog/', BlogListView.as_view(), name='all_blog'),
    path('blog/create', BlogView.as_view(), name='user_blog'),
    path('blog/<int:pk>', BlogUpdateView.as_view(), name='update_blog'),
]