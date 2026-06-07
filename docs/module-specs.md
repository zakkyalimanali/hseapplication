# Module Functional Specs

This document describes the business logic, data structure, and workflow for each of the 18 modules in the HSE application.

---

## Staff

**Purpose:** Central registry of all employees within a tenant. Every HSE record links back to a staff member.

**Key fields:**
| Field | Description |
|---|---|
| `role` | `staff`, `supervisor`, `hse_officer`, `company_admin` — controls what the user can do |
| `position` | Job title (free text) |
| `staff_id_number` | Company employee ID |
| `passport_number` / `passport_expiry_date` | Passport tracking |
| `yearly_leave_days` | Total leave entitlement |
| `yearly_leave_taken` | Leave used |
| `yearly_leave_left` | Auto-calculated on save (`days - taken`) |

**Lifecycle:** Created by Company Admin. One-to-one with a Django User account (for login). Most other modules reference Staff via ForeignKey.

**Access:** Company Admin only (read and write).

---

## Attendance

**Purpose:** Daily attendance tracking. Supervisors mark each staff member's attendance status for a given date.

**Key fields:**
| Field | Description |
|---|---|
| `attendence_date` | Date of the attendance record |
| `staff_name` | FK to Staff |
| `attendence_status` | Free-text status (e.g. Present, Absent, Leave) |

**Workflow:**
1. Supervisor selects a date
2. Marks each staff member's status for that day
3. Records are stored individually (one row per staff per day)

**Related:** `DateList` viewset provides a list of all dates that have attendance records.

**Access:** All authenticated users can view. Supervisor+ can create/edit.

---

## Training

**Purpose:** Tracks training certifications for each staff member, including expiry dates.

**Key fields:**
| Field | Description |
|---|---|
| `staff_name` | FK to Staff |
| `training` | Training name / certification |
| `training_provider` | Organisation that delivered the training |
| `training_date` | Date training was completed |
| `training_expiry` | Expiry date of the certification |

**Workflow:**
1. HSE Officer creates a training record per staff member per course
2. Records with approaching `training_expiry` dates need action to renew

**Access:** All authenticated users can view. HSE Officer+ can create/edit.

---

## Safety Cards

**Purpose:** Near-miss and hazard observation reporting. Staff observe a hazard or unsafe condition and raise a safety card. Similar structure to an incident report but for potential hazards rather than actual events.

**Key fields:**
| Field | Description |
|---|---|
| `short_desc` | Brief description of the observation |
| `raised_by` | FK to Staff |
| `what_happened` | Detailed description |
| `why_happened` | Root cause assessment |
| `date_raised` | When the card was raised |
| `life_saving_rule` | Which life-saving rule applies |
| `location` | Where the hazard was observed |
| `status` | Current resolution status (free text) |
| `responsible_party` | Who is accountable for resolution |
| `target_date` | Target date for resolution |
| `follow_up` | Follow-up actions |
| `follow_up_remarks` | Remarks on follow-up progress |

**Sub-records:** `SafetyCardPhotos` — photos attached to a safety card (title, description, image file).

**Access:** All authenticated users can view. Supervisor+ can create/edit.

---

## Incident Reports

**Purpose:** Records of actual incidents that occurred. Captures what happened, why it happened, and the corrective actions taken.

**Key fields:**
| Field | Description |
|---|---|
| `short_desc` | Brief title of the incident |
| `raised_by` | FK to Staff (who reported it) |
| `what_happened` | Full description of the event |
| `why_happened` | Root cause |
| `incident_date` | When the incident occurred |
| `date_raised` | When it was reported |
| `location` | Where it occurred |
| `life_saving_rule` | Related life-saving rule |
| `findings` | Key findings from initial review |
| `status` | Current status (free text) |
| `responsible_party` | Accountable person/team |
| `target_date` | Target for resolution |
| `follow_up` / `follow_up_remarks` | Follow-up tracking |

**Sub-records:**
- `IncidentEventPhotos` — photos of the incident scene
- `IncidentPhotos` — photos linked to the investigation (see below)

**Workflow:**
1. Supervisor reports the incident (creates Incident record)
2. Supervisors/HSE Officers upload scene photos
3. HSE Officer initiates a formal investigation (see Incident Investigation)

**Access:** All authenticated users can view. Supervisor+ can create/edit.

---

## Incident Investigation

**Purpose:** Formal investigation of an incident. Assigned to an investigation team with documented findings and remedial actions.

**Key fields (IncidentInvestigation):**
| Field | Description |
|---|---|
| `investigator` | FK to Staff (lead investigator) |
| `date_of_incident` | Date the original incident occurred |
| `location_of_incident` | Location |
| `team_member_one/two/three/four` | FK to Staff (up to 4 team members) |
| `task_performed` | What was being done when the incident occurred |
| `what_happened` | Narrative of the incident |
| `summary_of_remedial_action` | Actions taken to address the incident |
| `summary_of_incident_investigation` | Overall investigation summary |

**Sub-records:**

`InvestigationTeamMember`:
| Field | Description |
|---|---|
| `staff` | FK to Staff |
| `role` | `Lead` or `Member` |

`IncidentFactors` (contributing factors):
| Field | Description |
|---|---|
| `factor` | Description of the contributing factor |
| `type_of_factor` | Category of factor |
| `action_taken` | Corrective action |
| `who_will_fix` | FK to Staff responsible |
| `when_will_fix` | Timeframe |
| `planned_completion_date` | Target date |

`IncidentPhotos`:
- Investigation-specific photos (separate from incident scene photos)

**Workflow:**
1. HSE Officer creates the investigation record linked to an incident
2. Adds team members with their roles
3. Documents contributing factors and assigns corrective actions to staff
4. Uploads supporting photos
5. Completes investigation summary

**Access:** All authenticated users can view. HSE Officer+ can create/edit.

---

## Permit to Work (PTW)

**Purpose:** Formal authorization system for high-risk work. Documents the work to be done, associated hazards, controls in place, and approvals via signatures.

**Key fields (PermitToWork):**
| Field | Description |
|---|---|
| `permit_number` | Unique permit identifier |
| `location_of_work` | Where the work will be performed |
| `nature_of_work` | Description of the work |
| `work_start` | Start date |
| `work_start_time` | Start time |
| `work_completed` | Completion date/time |

**Sub-records:**

`HazardsAndPrecautions`:
| Field | Description |
|---|---|
| `hazards` | Description of hazard |
| `precautions` | Precaution to control the hazard |

`PhysicalControls`:
| Field | Description |
|---|---|
| `control_mechanisms` | Physical control put in place |
| `control_how_will_it_help` | Explanation of how the control works |

`Signitures` (Signatures):
| Field | Description |
|---|---|
| `person_name` | FK to Staff |
| `person_signiture` | Signature image |
| `signiture_for` | Role being signed for (e.g. Issuer, Receiver) |
| `position_class` | Position/role of signatory |
| `date_time_signed` | Auto-set timestamp |

**Workflow:**
1. HSE Officer creates the PTW with work details
2. Lists all hazards and precautions
3. Documents physical controls
4. Supervisors and HSE Officers provide signatures to authorise
5. Work proceeds only after all required signatures are collected
6. Work completion is recorded

**Access:** All authenticated users can view. HSE Officer+ can create PTWs, hazards, and controls. Supervisor+ can add signatures.

---

## Job Safety Analysis (JSA)

**Purpose:** Pre-job risk assessment that breaks a task into steps and identifies hazards and controls for each step.

**Key fields (JobSafetyAnalysis):**
| Field | Description |
|---|---|
| `job_title` | Name of the job/task |
| `jsa_id` | Unique JSA identifier |
| `job_performer` | FK to Staff (who does the job) |
| `supervisor` | FK to Staff |
| `analysis_by` | FK to Staff (who conducted the JSA) |
| `reviewed_by` | FK to Staff |
| `company` | Company name |
| `location` | Work location |
| `department` | Department |
| `date_raised` | Date of JSA creation |

**Sub-records:**

`JobSafetyEquipment`: List of PPE and safety equipment required.

`JobSafetySteps`: Sequential steps of the job task.

`JobSafetyHazards`:
| Field | Description |
|---|---|
| `hazards` | Hazard associated with a step |
| `controls` | Control measure for the hazard |

**Workflow:**
1. HSE Officer creates a JSA for a specific job
2. Lists all required safety equipment
3. Breaks the job into sequential steps
4. Identifies hazards and controls for each step
5. Reviewer and supervisor sign off

**Access:** All authenticated users can view. HSE Officer+ can create/edit.

---

## Risk Register

**Purpose:** Project-level register of identified risks with likelihood/impact assessment and mitigation actions.

**Structure:** Two-level hierarchy — Project → Risk entries.

**RiskRegisterProject:**
| Field | Description |
|---|---|
| `project_name` | Name of the project |
| `raised_by` | FK to Staff |
| `reviewed_by` | FK to Staff |
| `date_raised` | Auto-set on creation |
| `date_reviewed` | Auto-updated on save |

**RiskRegister (individual risk entries):**
| Field | Description |
|---|---|
| `project_name` | FK to RiskRegisterProject |
| `risk_description` | Description of the risk |
| `likelihood_of_risk` | 1–5 numerical score |
| `impact_of_risk` | `low`, `medium`, `high`, `highest` |
| `severity` | Combined score (likelihood × impact) |
| `responsible_party` | Accountable person |
| `mitigating_action` | Action to reduce likelihood/impact |
| `contingency_action` | Action if the risk occurs |
| `progress_on_actions` | Current progress notes |
| `status` | Current status (free text, e.g. open/closed) |

**Workflow:**
1. HSE Officer creates a project to group related risks
2. Adds individual risk entries under the project
3. Each risk is scored for likelihood and impact
4. Mitigating and contingency actions are documented and tracked

**Access:** All authenticated users can view. HSE Officer+ can create/edit.

---

## Risk Management

**Purpose:** Standalone risk records with a more structured status lifecycle, separate from the project-based Risk Register.

**Key fields:**
| Field | Description |
|---|---|
| `title` | Risk title |
| `category` | `Physical`, `Chemical`, `Biological`, `Ergonomic`, `Psychosocial`, `Environmental`, `Other` |
| `hazard_description` | Description of the hazard |
| `likelihood` | 1=Rare, 2=Unlikely, 3=Possible, 4=Likely, 5=Almost Certain |
| `consequence` | 1=Insignificant, 2=Minor, 3=Moderate, 4=Major, 5=Catastrophic |
| `existing_controls` | Controls already in place |
| `additional_controls` | Recommended additional controls |
| `responsible_person` | Accountable person |
| `target_date` | Target completion date |
| `status` | `Open`, `In Progress`, `Closed` (default: Open) |

**Risk Mitigation (linked records):**
| Field | Description |
|---|---|
| `risk_title` | Mitigation title |
| `mitigation_action` | Specific action to take |
| `priority` | `Critical`, `High`, `Medium`, `Low` |
| `responsible_person` | Accountable person |
| `target_date` / `completion_date` | Timeline |
| `status` | `Open`, `In Progress`, `Completed`, `Verified` |

**Access:** All authenticated users can view. HSE Officer+ can create/edit.

---

## Site Visits

**Purpose:** Records of HSE inspection visits to a worksite. Documents hazards observed and who attended.

**Key fields (SiteVisit):**
| Field | Description |
|---|---|
| `inspector` | FK to Staff (who conducted the visit) |
| `inspection_date` | Date of the visit |
| `inspection_time` | Time of the visit |
| `location` | Site location |

**Sub-records:**

`SiteHazards`:
| Field | Description |
|---|---|
| `hazard` | Hazard observed |
| `status` | Resolution status |
| `notes` | Additional notes |

`StaffAdd` (attendees):
- Links Staff members to a site visit as attendees

**Workflow:**
1. HSE Officer creates a site visit record
2. Documents all hazards observed with status and notes
3. Records which staff attended the visit

**Access:** All authenticated users can view. HSE Officer+ can create site visits and hazards. Supervisor+ can add attendees.

---

## Toolbox Talks

**Purpose:** Records of pre-work safety briefings conducted by a supervisor or presenter.

**Key fields:**
| Field | Description |
|---|---|
| `toolbox_date` | Date of the toolbox talk |
| `topic` | Subject of the briefing |
| `presenter` | FK to Staff |
| `supervisor` | FK to Staff |
| `project` | Project name |
| `time` | Time of the briefing |
| `crew_number` | Number of crew in attendance |
| `attendees` | Attendee names (free text) |
| `address` | Location |
| `employer` | Employer name |
| `shift` | Shift reference |
| `textbox` | Additional content / discussion notes |

**Access:** All authenticated users can view. Supervisor+ can create/edit.

---

## Equipment

**Purpose:** Equipment register tracking items, quantities, condition, and storage.

**EquipmentAndItems:**
| Field | Description |
|---|---|
| `equipment_item` | Equipment name |
| `type_of_equipment_item` | Type/category |
| `category` | Equipment category |
| `quantity_in_item` | Total quantity |
| `dollar_value` | Value |
| `condition` | Current condition |
| `storage_location` | Where it is stored |
| `identification_code` | Equipment ID/barcode |
| `size` | Size specification |

**ItemsPerBox** (sub-records):
- Tracks the quantity of items per storage box/container

**Access:** All authenticated users can view. HSE Officer+ can create/edit.

---

## HSE Management Documents

**Purpose:** Company-wide HSE management documentation such as HSE plans, policy statements, and management commitments.

**Key fields:**
| Field | Description |
|---|---|
| `title` | Document title |
| `content` | Document content (text) |
| `management_commitment_document` | Uploaded file (PDF, etc.) |

**Access:** All authenticated users can view. Company Admin only can create/edit. These are authoritative company documents — only management can change them.

---

## HSE References

**Purpose:** Reference library for HSE standards, regulations, and guidance documents.

**Key fields:**
| Field | Description |
|---|---|
| `title` | Reference title |
| `content` | Description or notes |
| `hse_document` | Uploaded file |

**Access:** All authenticated users can view. Company Admin only can create/edit.

---

## Safe Work Practices

**Purpose:** Documented procedures for performing specific tasks safely.

**Key fields:**
| Field | Description |
|---|---|
| `title` | Practice title |
| `category` | Category of work |
| `content` | Full procedure description |
| `document` | Uploaded procedure document |

**Access:** All authenticated users can view. Company Admin only can create/edit.

---

## Workplace Rules

**Purpose:** Formal rules and policies governing workplace conduct and safety.

**Key fields:**
| Field | Description |
|---|---|
| `title` | Rule title |
| `category` | `General Safety`, `PPE`, `Fire Safety`, `Chemical Handling`, `Electrical Safety`, `Working at Heights`, `Confined Spaces`, `Manual Handling`, `Other` |
| `description` | Full rule description |
| `consequence` | Consequence for violation |
| `effective_date` | When the rule came into effect |
| `document` | Supporting document |

**Access:** All authenticated users can view. Company Admin only can create/edit.

---

## Emergency Plans

**Purpose:** Documented procedures for responding to emergency scenarios.

**Key fields:**
| Field | Description |
|---|---|
| `title` | Plan title |
| `plan_type` | `Fire`, `Medical`, `Chemical Spill`, `Natural Disaster`, `Evacuation`, `Other` |
| `location` | Applicable location |
| `responsible_person` | Plan owner |
| `description` | Overview of the plan |
| `procedures` | Step-by-step emergency procedures |
| `assembly_point` | Designated assembly location |
| `emergency_contacts` | Key emergency contact information |
| `last_reviewed` | Date of last review |
| `status` | `Draft`, `Active`, `Under Review`, `Archived` (default: Draft) |
| `document` | Uploaded plan document |

**Workflow:** Plans start as `Draft`, are reviewed and set to `Active`, can be put `Under Review` for updates, and `Archived` when superseded.

**Access:** All authenticated users can view. Company Admin only can create/edit.

---

## HSE Audits

**Purpose:** Records of formal HSE audits conducted internally or by external parties.

**Key fields:**
| Field | Description |
|---|---|
| `title` | Audit title |
| `audit_type` | `Internal`, `External`, `Regulatory`, `Surprise` |
| `audit_date` | Date of the audit |
| `auditor` | Name of auditor (free text) |
| `location` | Audited location |
| `findings` | Audit findings |
| `corrective_actions` | Required corrective actions |
| `status` | `Open`, `In Progress`, `Closed` (default: Open) |
| `document` | Uploaded audit report |

**Workflow:** Audit created as `Open`, moves to `In Progress` as corrective actions are addressed, closed when all actions are complete.

**Access:** All authenticated users can view. HSE Officer+ can create/edit.

---

## Reports

**Purpose:** Generated summary reports covering incidents, audits, training, risks, and other HSE metrics.

**Key fields:**
| Field | Description |
|---|---|
| `title` | Report title |
| `report_type` | `Incident`, `Audit`, `Training`, `Risk`, `Site Visit`, `Permit to Work`, `Custom` |
| `period_from` / `period_to` | Reporting period |
| `generated_by` | Who created the report |
| `notes` | Additional context |
| `document` | Uploaded report document |

**Access:** HSE Officer+ only (read and write). Staff and Supervisors cannot access this module.

---

## News & Blog

**Purpose:** Internal communication. News and blog posts authored by HSE Officers and above.

**News fields:**
| Field | Description |
|---|---|
| `person_name` | FK to Staff (author) |
| `headline` | Article headline |
| `textbrief` | Short summary |
| `textcontent` | Full article content |
| `news_date` | Auto-set on every save |

**Blog fields:** Same structure as News.

**Access:** All authenticated users can read. HSE Officer+ can create/edit.
