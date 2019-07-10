from rest_framework import permissions

class AccessPermission(permissions.BasePermission):
    message = 'You ar not allowed not allowed.'

    def has_permission(self, request, view):
        pass
