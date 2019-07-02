from django.contrib.auth import authenticate
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers, exceptions
from django.conf import settings

from api.models import ProfileModel, User, AddressModel




class JWTSerializer(serializers.Serializer):
    '''
        Serializer for JWT authentication.
    '''
    token = serializers.CharField()
    message = serializers.CharField()


class UserSerializer(serializers.ModelSerializer):
    '''
        Serializer for User Model.
    '''
    username = serializers.CharField(required=False)
    date_joined = serializers.DateTimeField(read_only=True)
    class Meta:
        model = User
        fields =(
            'pk',
            'username',
            'first_name',
            'last_name',
            'email',
            'date_joined'
        )

class AddressSerializer(serializers.ModelSerializer):
    '''
        Serializer for Address Model.
    '''
    latitude = serializers.FloatField(read_only=True)
    longitude = serializers.FloatField(read_only=True)
    class Meta:
        model = AddressModel
        fields = (
            'address_1',
            'address_2',
            'zip_code',
            'state',
            'city',
            'country',
            'latitude',
            'longitude',
        )

class ProfileSerializer(serializers.ModelSerializer):
    '''
        Serializer for User Model.
    '''
    avatar = serializers.ImageField(required=False)
    user = UserSerializer()
    address = AddressSerializer()
    class Meta:
        model = ProfileModel
        fields =(
            'avatar',
            'user',
            'gender',
            'birth_date',
            'address'
        )
        depth=2

    def update(self, instance, validated_data):

        user = validated_data.pop('user')

        instance.user.username = user.get('username', instance.user.username)
        instance.user.email = user.get('email', instance.user.email)
        instance.user.first_name = user.get('first_name', instance.user.first_name)
        instance.user.last_name = user.get('last_name', instance.user.last_name)
        instance.user.save()

        address = validated_data.pop('address')

        instance.address.address_1 = address.get('address_1', instance.address.address_1)
        instance.address.address_2 = address.get('address_2', instance.address.address_2)
        instance.address.zip_code = address.get('zip_code', instance.address.zip_code)
        instance.address.state = address.get('state', instance.address.state)
        instance.address.city = address.get('city', instance.address.city)
        instance.address.country = address.get('country', instance.address.country)
        instance.address.save()

        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.birth_date = validated_data.get('birth_date', instance.birth_date)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.phone = validated_data.get('phone', instance.phone)

        instance.save()

        return instance


class UserRegistrationSerializer(serializers.Serializer):
    '''
        Serializer for User Registration.
    '''
    username = serializers.CharField(required=False, label='Username', help_text=_('Required and is not changeable.'))
    birth_date = serializers.DateField(required=True, label='Birth day')
    email = serializers.EmailField(required=True, label='Email Address')
    password = serializers.CharField(write_only=True, required=True, label='Password', style={'input_type': 'password'})
    password_2 = serializers.CharField(write_only=True, required=True, label='Confirm Password', style={'input_type': 'password'})


    def validate_username(self, username):
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError(_('Username already exists.'))
        return username

    def validate_birth_date(self, birth_date):
        from datetime import date
        today = date.today()
        year = int(birth_date.strftime('%Y'))
        month = int(birth_date.strftime('%m'))
        day = int(birth_date.strftime('%d'))
        age = today.year - year - ((today.month, today.day) < (month, day))
        if age < 18:
            raise serializers.ValidationError(_('You are under the age of 18.'))
        return birth_date

    def validate_email(self, email):
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                _('A user is already registered with this e-mail address.')
            )
        return email

    def validate_password(self, password):
        if len(password) < getattr(settings, 'PASSWORD_MIN_LENGTH', 8):
            raise serializers.ValidationError(
                _( 'Password should be atleast %s characters long.' % getattr(settings, 'PASSWORD_MIN_LENGTH', 8))
            )
        return password

    def validate_password_2(self, password_2):
        data = self.get_initial()
        password = data.get('password')
        if password != password_2:
            raise serializers.ValidationError(_('Passwords does not match.'))
        return password_2

    def get_user_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', None),
            'email': self.validated_data.get('email', None),
            'password': self.validated_data.get('password', None)
        }

    def get_extra_cleaned_data(self):
        return {
            'birth_date': self.validated_data.get('birth_date', None),
        }

    def save(self, request):
        cleaned_data = self.get_user_cleaned_data()
        extra_data = self.get_extra_cleaned_data()
        user = ProfileModel.objects.create_user_profile(
            user=cleaned_data,
            extra=extra_data,
            profile=True
        )
        return user


class LoginSerializer(serializers.Serializer):
    '''
        Serializer for User Login.
    '''
    username = serializers.CharField(required=True, label='Username')
    password = serializers.CharField(write_only=True, required=True, label='Password', style={'input_type': 'password'})

    user = None

    def _validate_username(self, username, password):
        if username and password:
            user = authenticate(username=username, password=password)
            print(user)
            if not user:
                msg = _(
                    'The Username or Password are not valid.'
                )
                raise exceptions.ValidationError(msg)
        return user

    def validate(self, data):
        username = data.get('username', None)
        password = data.get('password', None)

        if username and password:
            user = self._validate_username(username, password)
        else:
            msg = _('Must include "username" and "password".')
            raise exceptions.ValidationError(msg)

        data['user'] = user
        return data