# Roles & Permissions

The HSE application uses a four-level role hierarchy. Each user has exactly one role, which controls what they can read and write across all modules.

---

## Role Hierarchy

```
company_admin   (level 3) — highest
hse_officer     (level 2)
supervisor      (level 1)
staff           (level 0) — lowest
```

A user with a higher-level role inherits all permissions of roles below it.

---

## Role Definitions

| Role | Who it's for |
|---|---|
| **staff** | General workers. View-only across almost all modules. |
| **supervisor** | Team leads and foremen. Can log incidents, mark attendance, conduct toolbox talks. |
| **hse_officer** | Safety professionals. Can manage training, investigations, JSAs, permits, risk records, audits. |
| **company_admin** | Management. Full access including staff profiles and company-wide policies. |

---

## Where Roles Come From

Roles are stored on the `Staff` model (`hseapp/models.py`):

```python
ROLE_CHOICES = [
    ('staff', 'Staff'),
    ('supervisor', 'Supervisor'),
    ('hse_officer', 'HSE Officer'),
    ('company_admin', 'Company Admin'),
]
```

The permission system resolves a user's role like this:
1. If `user.is_superuser` → treated as `company_admin`
2. Else if the user has a linked `Staff` profile → use `staff_profile.role`
3. Else → defaults to `staff`

---

## Permission Classes

Defined in `backend/hseapp/permissions.py`:

| Permission Class | Read | Write |
|---|---|---|
| `IsCompanyAdmin` | Company Admin | Company Admin |
| `ReadOnlyOrCompanyAdmin` | Any authenticated user | Company Admin |
| `ReadOnlyOrHSEOfficer` | Any authenticated user | HSE Officer+ |
| `ReadOnlyOrSupervisor` | Any authenticated user | Supervisor+ |
| `HSEOfficerOrAboveOnly` | HSE Officer+ | HSE Officer+ |

Read = GET, HEAD, OPTIONS requests.
Write = POST, PUT, PATCH, DELETE requests.

---

## Module Permissions Matrix

| Module | API Endpoint | Who Can Read | Who Can Write |
|---|---|---|---|
| **Staff** | `/api/staff/` | Company Admin | Company Admin |
| **Incidents** | `/api/incident/` | All authenticated | Supervisor+ |
| **Incident Photos** | `/api/incidentphotos/` | All authenticated | HSE Officer+ |
| **Incident Event Photos** | `/api/incidenteventphotos/` | All authenticated | Supervisor+ |
| **Incident Investigation** | `/api/incidentinvestigation/` | All authenticated | HSE Officer+ |
| **Investigation Team Members** | `/api/investigationteammember/` | All authenticated | HSE Officer+ |
| **Incident Factors** | `/api/incidentfactors/` | All authenticated | HSE Officer+ |
| **Attendance** | `/api/attendence/` | All authenticated | Supervisor+ |
| **Attendance Dates** | `/api/datelist/` | All authenticated | Supervisor+ |
| **Training** | `/api/training/` | All authenticated | HSE Officer+ |
| **Safety Cards** | `/api/safetycard/` | All authenticated | Supervisor+ |
| **Safety Card Photos** | `/api/safetycardphotos/` | All authenticated | Supervisor+ |
| **Site Visits** | `/api/sitevisit/` | All authenticated | HSE Officer+ |
| **Site Hazards** | `/api/sitehazard/` | All authenticated | HSE Officer+ |
| **Site Visit Attendees** | `/api/staffadd/` | All authenticated | Supervisor+ |
| **Toolbox Talks** | `/api/toolboxtalk/` | All authenticated | Supervisor+ |
| **Permit to Work** | `/api/permittowork/` | All authenticated | HSE Officer+ |
| **PTW Hazards** | `/api/hazardsandprecautions/` | All authenticated | HSE Officer+ |
| **PTW Physical Controls** | `/api/physicalcontrols/` | All authenticated | HSE Officer+ |
| **PTW Signatures** | `/api/signitures/` | All authenticated | Supervisor+ |
| **Job Safety Analysis** | `/api/jobsafetyanalysis/` | All authenticated | HSE Officer+ |
| **JSA Equipment** | `/api/jobsafetyequipment/` | All authenticated | HSE Officer+ |
| **JSA Steps** | `/api/jobsafetysteps/` | All authenticated | HSE Officer+ |
| **JSA Hazards** | `/api/jobsafetyhazards/` | All authenticated | HSE Officer+ |
| **Risk Register** | `/api/riskregister/` | All authenticated | HSE Officer+ |
| **Risk Register Projects** | `/api/riskregisterproject/` | All authenticated | HSE Officer+ |
| **Risk Mitigation** | `/api/riskmitigation/` | All authenticated | HSE Officer+ |
| **Risk Management** | `/api/riskmanagement/` | All authenticated | HSE Officer+ |
| **Equipment** | `/api/equipmentanditems/` | All authenticated | HSE Officer+ |
| **Equipment Items** | `/api/itemsperbox/` | All authenticated | HSE Officer+ |
| **HSE Management Docs** | `/api/hsemanagement/` | All authenticated | Company Admin |
| **HSE References** | `/api/hsereferences/` | All authenticated | Company Admin |
| **Safe Work Practices** | `/api/safeworkpractice/` | All authenticated | Company Admin |
| **Workplace Rules** | `/api/workplacerules/` | All authenticated | Company Admin |
| **Emergency Plans** | `/api/emergencyplan/` | All authenticated | Company Admin |
| **HSE Audits** | `/api/hseaudit/` | All authenticated | HSE Officer+ |
| **News** | `/api/news/` | All authenticated | HSE Officer+ |
| **Blog** | `/api/blog/` | All authenticated | HSE Officer+ |
| **Reports** | `/api/reports/` | HSE Officer+ | HSE Officer+ |

---

## What Each Role Can Do (Summary)

### Staff (level 0)
- View all records across all modules
- Cannot create, edit, or delete anything

### Supervisor (level 1)
Everything Staff can do, plus write access to:
- Incidents (log and update incident reports)
- Attendance (mark daily attendance)
- Safety Cards (create and update hazard observations)
- Toolbox Talks (record toolbox talk sessions)
- PTW Signatures (sign permits to work)
- Site Visit Attendees (add staff to site visit records)
- Incident Event Photos (upload event photos)
- Safety Card Photos (upload photos)

### HSE Officer (level 2)
Everything Supervisor can do, plus write access to:
- Training (manage training records and expiry)
- Incident Investigations (investigations, team members, contributing factors)
- Site Visits (create and manage site visit reports and hazards)
- Permit to Work (create PTWs, manage hazards and controls)
- Job Safety Analysis (create JSAs with steps, hazards, and equipment)
- Risk Register (manage risk registers and mitigations)
- Risk Management (manage risk management records)
- Equipment (manage equipment register)
- HSE Audits (conduct and record audits)
- News & Blog (publish articles)
- Incident Photos (upload and manage)
- Reports (access and create reports)

### Company Admin (level 3)
Everything HSE Officer can do, plus write access to:
- Staff (create and manage all staff profiles)
- HSE Management Documents (company-wide HSE documentation)
- HSE References (reference library)
- Safe Work Practices (company procedures)
- Workplace Rules
- Emergency Plans

---

## Role in JWT Token

When a user logs in, their role is included in the JWT access token:

```json
{
  "user_id": 1,
  "username": "ali.rahman",
  "tenant_schema": "alicompany",
  "staff_id": 1,
  "role": "company_admin"
}
```

The frontend uses the `role` claim to conditionally show or hide UI elements (e.g. edit buttons, admin sections) without making an extra API call. The backend independently enforces the same permissions on every request — the token role claim is never trusted for authorization on the backend.

---

## Important Notes

### No row-level permissions
Permissions are enforced at the viewset level (can a user access this endpoint at all?), not at the row level. A Supervisor who can write incidents can write *any* incident in the tenant — there is no restriction to "their own" incidents.

### Unauthenticated users
Any request without a valid JWT token gets a `401 Unauthorized` response. There is no public read access within a tenant.

### Superuser accounts
Django superusers (`is_superuser=True`) bypass the role check and are treated as `company_admin` by the permission system. This is the Django admin account, not a regular staff user.
