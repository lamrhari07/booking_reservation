from django.views.decorators.debug import sensitive_post_parameters
from django.utils.decorators import method_decorator



sensitive_post_parameters_m = method_decorator(
    sensitive_post_parameters('password', 'password_2',)
)

def get_data_response(serializer, token, status):
    data = {
        'token': token,
        'message': 'Successful registration: HTTP {}'.format(status)
    }
    return serializer(data).data

def jwt_encode(user):
    try:
        from rest_framework_jwt.settings import api_settings
    except ImportError:
        raise ImportError("djangorestframework_jwt needs to be installed")

    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

    payload = jwt_payload_handler(user)
    return jwt_encode_handler(payload)