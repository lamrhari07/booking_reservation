from django.urls import path
from api.blog.views import (
    BlogListView,
    BlogView,
    BlogUpdateView
)

urlpatterns = [
    path('', BlogListView.as_view(), name='all_blog'),
    path('<user>/blog', BlogView.as_view(), name='user_blog'),
    path('<user>/blog/<int:pk>', BlogUpdateView.as_view(), name='update_blog'),
]