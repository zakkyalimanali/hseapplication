# API Reference

All endpoints require a JWT Bearer token in the `Authorization` header unless marked as **public**.

```
Authorization: Bearer <access_token>
```

---

## Authentication

### Obtain Token
`POST /api/token/`

**Public — no token required.**

Request:
```json
{
  "username": "ali.rahman",
  "password": "your_password"
}
```

Response:
```json
{
  "access": "<jwt_access_token>",
  "refresh": "<jwt_refresh_token>"
}
```

The access token payload includes custom claims:
| Claim | Description |
|---|---|
| `user_id` | Django user ID |
| `username` | Username |
| `tenant_schema` | Current tenant's schema name |
| `staff_id` | Linked Staff profile ID (null if none) |
| `role` | User role: `staff`, `supervisor`, `hse_officer`, or `company_admin` |

---

### Refresh Token
`POST /api/token/refresh/`

**Public — no token required.**

Request:
```json
{
  "refresh": "<jwt_refresh_token>"
}
```

Response:
```json
{
  "access": "<new_access_token>"
}
```

---

### Register User
`POST /api/register/`

Request:
```json
{
  "username": "new.user",
  "password": "secure_password"
}
```

---

### Get Tenant Info
`GET /api/tenant/info/`

Returns the name and schema name of the current tenant (based on the request domain).

Response:
```json
{
  "name": "Ali Company",
  "schema_name": "alicompany"
}
```

---

## Tenant Management (Public Schema)

These endpoints are on the **public schema** and do not require a tenant subdomain. They are accessible at the root domain.

### Create Tenant
`POST /api/tenants/create/`

**Public — no token required.**

Request:
```json
{
  "name": "My Company",
  "subdomain": "mycompany",
  "admin_username": "admin",
  "admin_password": "securepass123"
}
```

Constraints:
- `subdomain`: lowercase letters, numbers, hyphens only. Reserved words (`public`, `admin`, `www`, `api`) are rejected.
- `admin_password`: minimum 8 characters.

Response:
```json
{
  "name": "My Company",
  "app_url": "mycompany.localhost:3000",
  "admin_url": "mycompany.localhost:8000/admin/",
  "subdomain": "mycompany"
}
```

---

### List Tenants
`GET /api/tenants/list/`

**Public — no token required.**

Returns a list of all registered tenants.

---

## Staff

### Endpoints
| Method | URL | Description |
|---|---|---|
| GET | `/api/staff/` | List all staff |
| POST | `/api/staff/` | Create staff profile |
| GET | `/api/staff/{id}/` | Get staff by ID |
| PUT | `/api/staff/{id}/` | Update staff |
| PATCH | `/api/staff/{id}/` | Partial update staff |
| DELETE | `/api/staff/{id}/` | Delete staff |

**Permission:** Company Admin only (read and write).

Fields: `id`, `user`, `name`, `position`, `role`, `date_of_birth`, `date_joined`, `passport_expiry`, `annual_leave`, `sick_leave`, `emergency_leave`

---

## Incidents

### Incident Reports
| Method | URL | Description |
|---|---|---|
| GET | `/api/incident/` | List incidents |
| POST | `/api/incident/` | Create incident |
| GET | `/api/incident/{id}/` | Get incident |
| PUT | `/api/incident/{id}/` | Update incident |
| DELETE | `/api/incident/{id}/` | Delete incident |

**Permission:** All authenticated users can read. Supervisor+ can write.

### Add Incident (alternate create endpoint)
| Method | URL | Description |
|---|---|---|
| GET | `/api/addincident/` | List (add view) |
| POST | `/api/addincident/` | Create incident (add view) |

### Incident Table View
| Method | URL | Description |
|---|---|---|
| GET | `/api/incidenttable/` | List incidents (table view) |

### Single Incident View
| Method | URL | Description |
|---|---|---|
| GET | `/api/oneincident/{id}/` | Get a single incident |

### Incident Photos
| Method | URL | Description |
|---|---|---|
| GET | `/api/incidentphotos/` | List incident photos |
| POST | `/api/incidentphotos/` | Upload incident photo |
| DELETE | `/api/incidentphotos/{id}/` | Delete photo |

**Permission:** All authenticated users can read. HSE Officer+ can write.

### Incident Event Photos
| Method | URL | Description |
|---|---|---|
| GET | `/api/incidenteventphotos/` | List event photos |
| POST | `/api/incidenteventphotos/` | Upload event photo |
| DELETE | `/api/incidenteventphotos/{id}/` | Delete photo |

**Permission:** All authenticated users can read. Supervisor+ can write.

---

## Incident Investigation

| Method | URL | Description |
|---|---|---|
| GET | `/api/incidentinvestigation/` | List investigations |
| POST | `/api/incidentinvestigation/` | Create investigation |
| GET | `/api/incidentinvestigation/{id}/` | Get investigation |
| PUT | `/api/incidentinvestigation/{id}/` | Update investigation |
| DELETE | `/api/incidentinvestigation/{id}/` | Delete investigation |

| Method | URL | Description |
|---|---|---|
| GET/POST | `/api/investigationteammember/` | Team members |
| GET/POST | `/api/incidentfactors/` | Contributing factors |

**Permission:** All authenticated users can read. HSE Officer+ can write.

---

## Attendance

| Method | URL | Description |
|---|---|---|
| GET | `/api/attendence/` | List attendance records |
| POST | `/api/attendence/` | Mark attendance |
| GET | `/api/attendence/{id}/` | Get record |
| PUT | `/api/attendence/{id}/` | Update record |
| DELETE | `/api/attendence/{id}/` | Delete record |

| Method | URL | Description |
|---|---|---|
| GET | `/api/datelist/` | List attendance dates |

**Permission:** All authenticated users can read. Supervisor+ can write.

---

## Training

| Method | URL | Description |
|---|---|---|
| GET | `/api/training/` | List training records |
| POST | `/api/training/` | Create training record |
| GET | `/api/training/{id}/` | Get record |
| PUT | `/api/training/{id}/` | Update record |
| DELETE | `/api/training/{id}/` | Delete record |

**Permission:** All authenticated users can read. HSE Officer+ can write.

---

## Safety Cards

| Method | URL | Description |
|---|---|---|
| GET/POST | `/api/safetycard/` | List / create safety cards |
| GET/PUT/DELETE | `/api/safetycard/{id}/` | Get / update / delete |
| GET/POST | `/api/safetycardphotos/` | Safety card photos |

**Permission:** All authenticated users can read. Supervisor+ can write.

---

## Site Visits

| Method | URL | Description |
|---|---|---|
| GET/POST | `/api/sitevisit/` | List / create site visits |
| GET/PUT/DELETE | `/api/sitevisit/{id}/` | Get / update / delete |
| GET/POST | `/api/sitehazard/` | Site hazards |
| GET/POST | `/api/staffadd/` | Add attendees to site visit |

**Permission:** All authenticated users can read. HSE Officer+ can write.

---

## Toolbox Talks

| Method | URL | Description |
|---|---|---|
| GET/POST | `/api/toolboxtalk/` | List / create toolbox talks |
| GET/PUT/DELETE | `/api/toolboxtalk/{id}/` | Get / update / delete |

**Permission:** All authenticated users can read. Supervisor+ can write.

---

## Permit to Work (PTW)

| Method | URL | Description |
|---|---|---|
| GET/POST | `/api/permittowork/` | List / create PTWs |
| GET/PUT/DELETE | `/api/permittowork/{id}/` | Get / update / delete |
| GET/POST | `/api/hazardsandprecautions/` | Hazards and precautions |
| GET/POST | `/api/physicalcontrols/` | Physical controls |
| GET/POST | `/api/signitures/` | PTW signatures |

**Permission:** All authenticated users can read. HSE Officer+ can write.
Signatures (`/api/signitures/`): Supervisor+ can write.

---

## Job Safety Analysis (JSA)

| Method | URL | Description |
|---|---|---|
| GET/POST | `/api/jobsafetyanalysis/` | List / create JSAs |
| GET/PUT/DELETE | `/api/jobsafetyanalysis/{id}/` | Get / update / delete |
| GET/POST | `/api/jobsafetyequipment/` | JSA equipment |
| GET/POST | `/api/jobsafetysteps/` | JSA steps |
| GET/POST | `/api/jobsafetyhazards/` | JSA hazards |

**Permission:** All authenticated users can read. HSE Officer+ can write.

---

## Risk Management

| Method | URL | Description |
|---|---|---|
| GET/POST | `/api/riskregister/` | List / create risk registers |
| GET/PUT/DELETE | `/api/riskregister/{id}/` | Get / update / delete |
| GET/POST | `/api/riskregisterproject/` | Risk register projects |
| GET/POST | `/api/riskmitigation/` | Risk mitigations |
| GET/POST | `/api/riskmanagement/` | Risk management records |

**Permission:** All authenticated users can read. HSE Officer+ can write.

---

## Equipment

| Method | URL | Description |
|---|---|---|
| GET/POST | `/api/equipmentanditems/` | List / create equipment |
| GET/PUT/DELETE | `/api/equipmentanditems/{id}/` | Get / update / delete |
| GET/POST | `/api/itemsperbox/` | Items per equipment box |

**Permission:** All authenticated users can read. HSE Officer+ can write.

---

## HSE Documentation

### HSE Management
| Method | URL | Description |
|---|---|---|
| GET/POST | `/api/hsemanagement/` | List / create HSE management docs |
| GET/PUT/DELETE | `/api/hsemanagement/{id}/` | Get / update / delete |

### HSE References
| Method | URL | Description |
|---|---|---|
| GET/POST | `/api/hsereferences/` | List / create reference docs |

### Safe Work Practices
| Method | URL | Description |
|---|---|---|
| GET/POST | `/api/safeworkpractice/` | List / create safe work practices |

### Workplace Rules
| Method | URL | Description |
|---|---|---|
| GET/POST | `/api/workplacerules/` | List / create workplace rules |

### Emergency Plans
| Method | URL | Description |
|---|---|---|
| GET/POST | `/api/emergencyplan/` | List / create emergency plans |

### HSE Audits
| Method | URL | Description |
|---|---|---|
| GET/POST | `/api/hseaudit/` | List / create HSE audits |

**Permission for all HSE Documentation:** All authenticated users can read. Company Admin only can write.
**Exception — HSE Audits:** All authenticated users can read. HSE Officer+ can write.

---

## Reports

| Method | URL | Description |
|---|---|---|
| GET | `/api/reports/` | List reports |
| POST | `/api/reports/` | Create report |

**Permission:** HSE Officer+ required for both read and write. Staff and Supervisors cannot access this endpoint.

---

## News & Blog

| Method | URL | Description |
|---|---|---|
| GET/POST | `/api/news/` | List / create news articles |
| GET/PUT/DELETE | `/api/news/{id}/` | Get / update / delete |
| GET/POST | `/api/blog/` | List / create blog posts |
| GET/PUT/DELETE | `/api/blog/{id}/` | Get / update / delete |

**Permission:** All authenticated users can read. HSE Officer+ can write.

---

## Error Responses

| Status | Meaning |
|---|---|
| `400` | Bad request — validation error in request body |
| `401` | Unauthorized — missing or invalid token |
| `403` | Forbidden — token valid but role insufficient |
| `404` | Not found — resource does not exist |
| `500` | Server error |

401 example:
```json
{
  "detail": "Authentication credentials were not provided."
}
```

403 example:
```json
{
  "detail": "You do not have permission to perform this action."
}
```
