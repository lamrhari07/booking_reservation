from django.contrib.auth.models import User
from django.db import models, transaction
from django.db.models.signals import post_save
from django.utils import timezone
from django.utils.translation import ugettext as _
from django.dispatch import receiver


class ProfileManager(models.Manager):

    @transaction.atomic
    def create_user_profile(self, user, extra, profile=False):
        password = user.pop('password')
        user = User(**user)
        user.set_password(password)
        user.save()

        if profile:
            self.create(user=user, **extra)
        return user


class ProfileModel(models.Model):
    '''
        User Profile model
    '''
    GENDER = [
        (1, _('')),
        (2, _('Male')),
        (3, _('Female'))
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        default='',
        related_name='user_instance'
    )
    avatar = models.ImageField(_('Avatar'), upload_to='avatar/', default='avatar/no-avatar.png',
                               blank=True, null=True)
    birth_date = models.DateField(_('Birth Date'), blank=True, null=True)
    gender = models.CharField(_('Gender'), max_length=10, choices=GENDER, default=1)
    phone = models.IntegerField(_('Phone'), default=0)
    address = models.OneToOneField('AddressModel', on_delete=models.CASCADE, default='',
                                   related_name='user_address', null=True)

    objects = ProfileManager()

    class Meta:
        db_table = 'user_profile'
        ordering = ('pk',)

    def __str__(self):
        return self.user.username


class AddressModel(models.Model):

    address_1 = models.CharField(_('Address 1'), max_length=128, default='', blank=True, null=True)
    address_2 = models.CharField(_('Address 2'), max_length=128, default='', blank=True, null=True)
    zip_code = models.CharField(_('Zip Code'), max_length=5, default='', blank=True, null=True)
    state = models.CharField(_('State'), max_length=64, default='', blank=True, null=True)
    city = models.CharField(_('City'), max_length=64, default='', blank=True, null=True)
    country = models.CharField(_('Country'), max_length=64, default='', blank=True, null=True)
    latitude = models.FloatField('Latitude', default=0.0, blank=True, null=True)
    longitude = models.FloatField('Longitude', default=0.0, blank=True, null=True)

    def __str__(self):
        return self.address_1


class Reservation(models.Model):
    STATUS = (
        (0, _("Requested")),
        (1, _("Accepted")),
        (2, _("Denied"))
    )

    user = models.ForeignKey(
        ProfileModel,
        on_delete=models.CASCADE,
        default='',
        related_name='booker'
    )
    observation = models.TextField(_('Observation'), max_length=2500, default='')
    reserved_start_date = models.DateTimeField(default=timezone.now)
    reserved_end_date = models.DateTimeField(default=timezone.now() + timezone.timedelta(days=15), null=True)
    status = models.SmallIntegerField(choices=STATUS, default=0)
    updated_datetime = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.user.username


@receiver(post_save, sender=ProfileModel)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        print(instance)
        address = AddressModel.objects.create()
        user = User.objects.get(username=instance)
        ProfileModel.objects.filter(user=user).update(address=address)