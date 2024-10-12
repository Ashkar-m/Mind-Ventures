from rest_framework.permissions import BasePermission

class CanCreateCoursePermission(BasePermission):
    """
    Custom permission to check if the user has the 'can_create_course' permission.
    """

    def has_permission(self, request, view):
        # Check if the user is authenticated and has the 'can_create_course' permission
        return request.user.is_authenticated and request.user.has_perm('courses.can_create_course')


class CanEditCoursePermission(BasePermission):
    """
    Custom permission to check if the user has the 'can_edit_course' permission.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.has_perm('courses.can_edit_course')


class IsMentorOrAdmin(BasePermission):
    """
    Custom permission to allow only mentors or admins to access the view.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.role == 'admin' or request.user.role == 'mentor'
        )
