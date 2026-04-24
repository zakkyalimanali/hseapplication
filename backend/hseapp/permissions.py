from rest_framework.permissions import BasePermission, SAFE_METHODS

ROLE_HIERARCHY = {
    'staff': 0,
    'supervisor': 1,
    'hse_officer': 2,
    'company_admin': 3,
}


def get_user_role(user):
    if user.is_superuser:
        return 'company_admin'
    try:
        return user.staff_profile.role
    except Exception:
        return 'staff'


def has_min_role(user, min_role):
    if not user or not user.is_authenticated:
        return False
    role = get_user_role(user)
    return ROLE_HIERARCHY.get(role, 0) >= ROLE_HIERARCHY.get(min_role, 0)


class IsCompanyAdmin(BasePermission):
    """Only company admins (and Django superusers) can access."""
    def has_permission(self, request, view):
        return has_min_role(request.user, 'company_admin')


class IsHSEOfficerOrAbove(BasePermission):
    """HSE Officers, Company Admins only."""
    def has_permission(self, request, view):
        return has_min_role(request.user, 'hse_officer')


class IsSupervisorOrAbove(BasePermission):
    """Supervisors, HSE Officers, Company Admins."""
    def has_permission(self, request, view):
        return has_min_role(request.user, 'supervisor')


class ReadOnlyOrHSEOfficer(BasePermission):
    """All authenticated users can read. HSE Officer+ can write."""
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        if request.method in SAFE_METHODS:
            return True
        return has_min_role(request.user, 'hse_officer')


class ReadOnlyOrSupervisor(BasePermission):
    """All authenticated users can read. Supervisor+ can write."""
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        if request.method in SAFE_METHODS:
            return True
        return has_min_role(request.user, 'supervisor')


class ReadOnlyOrCompanyAdmin(BasePermission):
    """All authenticated users can read. Company Admin only can write."""
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        if request.method in SAFE_METHODS:
            return True
        return has_min_role(request.user, 'company_admin')


class HSEOfficerOrAboveOnly(BasePermission):
    """HSE Officer+ required for both read and write (e.g. Reports)."""
    def has_permission(self, request, view):
        return has_min_role(request.user, 'hse_officer')
