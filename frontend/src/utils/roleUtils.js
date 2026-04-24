const ROLE_HIERARCHY = {
  staff: 0,
  supervisor: 1,
  hse_officer: 2,
  company_admin: 3,
}

/**
 * Returns true if the given role meets the minimum required role.
 * e.g. hasMinRole('hse_officer', 'supervisor') => true
 */
export function hasMinRole(role, minRole) {
  return (ROLE_HIERARCHY[role] ?? 0) >= (ROLE_HIERARCHY[minRole] ?? 0)
}

export const ROLES = {
  STAFF: 'staff',
  SUPERVISOR: 'supervisor',
  HSE_OFFICER: 'hse_officer',
  COMPANY_ADMIN: 'company_admin',
}
