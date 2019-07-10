from django.contrib import admin
from api.models import Reservation, ProfileModel, BlogModel

# Register your models here.

admin.site.register(BlogModel)
admin.site.register(ProfileModel)