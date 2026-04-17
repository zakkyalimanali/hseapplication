import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrash, faPen, faPlus, faImage } from '@fortawesome/free-solid-svg-icons'
import IncidentInvestigationAPI from '../../API/IncidentInvestigationAPI'
import IncidentFactorsAPI from '../../API/IncidentFactorsAPI'
import IncidentPhotosAPI from '../../API/IncidentPhotosAPI'
import InvestigationTeamMemberAPI from '../../API/InvestigationTeamMemberAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import API_BASE from '../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function IncidentInvestigationEdit() {
  const { authTokens } = useContext(AuthContext)
  const params = useParams()
  const navigate = useNavigate()

  // Main form fields
  const [date_of_incident, setDateOfIncident] = useState('')
  const [location_of_incident, setLocationOfIncident] = useState('')
  const [task_performed, setTaskPerformed] = useState('')
  const [what_happened, setWhatHappened] = useState('')
  const [summary_of_remedial_action, setSummaryOfRemedialAction] = useState('')
  const [summary_of_incident_investigation, setSummaryOfIncidentInvestigation] = useState('')

  // Reference data
  const [staffs, setStaffs] = useState([])
  const [teamMembers, setTeamMembers] = useState([])
  const [incidentFactors, setIncidentFactors] = useState([])
  const [incidentPhotos, setIncidentPhotos] = useState([])

  // Team member add form
  const [newMemberStaff, setNewMemberStaff] = useState('')
  const [newMemberRole, setNewMemberRole] = useState('Member')

  // Incident factor add form
  const [newFactor, setNewFactor] = useState('')
  const [newFactorType, setNewFactorType] = useState('')
  const [newFactorAction, setNewFactorAction] = useState('')
  const [newFactorWho, setNewFactorWho] = useState('')
  const [newFactorWhen, setNewFactorWhen] = useState('')
  const [newFactorCompletion, setNewFactorCompletion] = useState('')

  // Photo add form
  const [newPhotoTitle, setNewPhotoTitle] = useState('')
  const [newPhotoDesc, setNewPhotoDesc] = useState('')
  const [newPhotoFile, setNewPhotoFile] = useState(null)

  const headers = { Authorization: `Bearer ${authTokens.access}` }

  useEffect(() => {
    axios.get(`${API_BASE}/hseapp/incidentinvestigation/${params.id}/`, { headers })
      .then(res => {
        const d = res.data
        setDateOfIncident(d.date_of_incident || '')
        setLocationOfIncident(d.location_of_incident || '')
        setTaskPerformed(d.task_performed || '')
        setWhatHappened(d.what_happened || '')
        setSummaryOfRemedialAction(d.summary_of_remedial_action || '')
        setSummaryOfIncidentInvestigation(d.summary_of_incident_investigation || '')
      }).catch(console.log)

    StaffAPI.get('/', { headers }).then(res => setStaffs(res.data)).catch(console.log)
    fetchTeamMembers()
    fetchFactors()
    fetchPhotos()
  }, [params.id])

  const fetchTeamMembers = () => {
    InvestigationTeamMemberAPI.get('/', { headers }).then(res => setTeamMembers(res.data)).catch(console.log)
  }

  const fetchFactors = () => {
    IncidentFactorsAPI.get('/', { headers }).then(res => setIncidentFactors(res.data)).catch(console.log)
  }

  const fetchPhotos = () => {
    IncidentPhotosAPI.get('/', { headers }).then(res => setIncidentPhotos(res.data)).catch(console.log)
  }

  const onUpdate = (e) => {
    e.preventDefault()
    const item = {
      date_of_incident: date_of_incident || null,
      location_of_incident,
      task_performed,
      what_happened,
      summary_of_remedial_action,
      summary_of_incident_investigation,
    }
    IncidentInvestigationAPI.patch(`/${params.id}/`, item, { headers })
      .then(() => navigate('/incidentinvestigationlist'))
      .catch(console.log)
  }

  const onAddTeamMember = (e) => {
    e.preventDefault()
    if (!newMemberStaff) return
    InvestigationTeamMemberAPI.post('/', {
      incidentinvestigation: Number(params.id),
      staff: Number(newMemberStaff),
      role: newMemberRole,
    }, { headers }).then(() => {
      setNewMemberStaff('')
      setNewMemberRole('Member')
      fetchTeamMembers()
    }).catch(console.log)
  }

  const onDeleteTeamMember = (id) => {
    InvestigationTeamMemberAPI.delete(`/${id}/`, { headers }).then(() => fetchTeamMembers()).catch(console.log)
  }

  const onAddFactor = (e) => {
    e.preventDefault()
    if (!newFactor) return
    const item = {
      incidentinvestigation: Number(params.id),
      factor: newFactor,
      type_of_factor: newFactorType,
      action_taken: newFactorAction,
      who_will_fix: newFactorWho || null,
      when_will_fix: newFactorWhen || null,
      planned_completion_date: newFactorCompletion || null,
    }
    IncidentFactorsAPI.post('/', item, { headers })
      .then(() => {
        setNewFactor(''); setNewFactorType(''); setNewFactorAction('')
        setNewFactorWho(''); setNewFactorWhen(''); setNewFactorCompletion('')
        fetchFactors()
      }).catch(console.log)
  }

  const onDeleteFactor = (id) => {
    IncidentFactorsAPI.delete(`/${id}/`, { headers }).then(() => fetchFactors()).catch(console.log)
  }

  const onAddPhoto = (e) => {
    e.preventDefault()
    if (!newPhotoFile) return
    const formData = new FormData()
    formData.append('incidentinvestigation', params.id)
    formData.append('title', newPhotoTitle)
    formData.append('description', newPhotoDesc)
    formData.append('incident_photo', newPhotoFile)
    IncidentPhotosAPI.post('/', formData, {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${authTokens.access}` },
    }).then(() => {
      setNewPhotoTitle(''); setNewPhotoDesc(''); setNewPhotoFile(null)
      const fi = document.getElementById('photo-file-input')
      if (fi) fi.value = ''
      fetchPhotos()
    }).catch(console.log)
  }

  const onDeletePhoto = (id) => {
    IncidentPhotosAPI.delete(`/${id}/`, { headers }).then(() => fetchPhotos()).catch(console.log)
  }

  const staffName = (id) => {
    const s = staffs.find(s => String(s.id) === String(id))
    return s ? `${s.name}${s.position ? ` (${s.position})` : ''}` : '—'
  }
  const visitTeamMembers = teamMembers.filter(m => m.incidentinvestigation === Number(params.id))
  const visitFactors = incidentFactors.filter(f => f.incidentinvestigation === Number(params.id))
  const visitPhotos = incidentPhotos.filter(p => p.incidentinvestigation === Number(params.id))

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }
  const SectionTitle = ({ children, count, countColor = '#2563EB', countBg = '#DBEAFE' }) => (
    <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>
      {children}
      {count !== undefined && (
        <span style={{ marginLeft: '10px', fontSize: '13px', fontWeight: '600', color: countColor, backgroundColor: countBg, padding: '2px 8px', borderRadius: '6px' }}>
          {count}
        </span>
      )}
    </h5>
  )

  const roleBadge = (role) => (
    <span style={{
      fontSize: '11px', fontWeight: '600', padding: '2px 8px', borderRadius: '4px',
      backgroundColor: role === 'Lead' ? '#FEF3C7' : '#EFF6FF',
      color: role === 'Lead' ? '#D97706' : '#2563EB',
    }}>
      {role}
    </span>
  )

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>

      {/* Back + Header */}
      <div style={{ marginBottom: '32px' }}>
        <Link to="/incidentinvestigationlist" style={{ color: '#888', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Investigations
        </Link>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Incident Investigation</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Update investigation details, contributing factors, and evidence photos.
        </p>
      </div>

      {/* Investigation Team Section */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
        <SectionTitle count={visitTeamMembers.length} countColor="#2563EB" countBg="#DBEAFE">
          Investigation Team
        </SectionTitle>

        <Form onSubmit={onAddTeamMember} style={{ marginBottom: '16px' }}>
          <div className="row align-items-end">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label style={L}>Staff Member</Form.Label>
                <Form.Select value={newMemberStaff} onChange={e => setNewMemberStaff(e.target.value)}>
                  <option value="">Select staff member...</option>
                  {staffs.map(s => (
                    <option key={s.id} value={s.id}>{s.name}{s.position ? ` (${s.position})` : ''}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group>
                <Form.Label style={L}>Role</Form.Label>
                <Form.Select value={newMemberRole} onChange={e => setNewMemberRole(e.target.value)}>
                  <option value="Lead">Lead</option>
                  <option value="Member">Member</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Button
                type="submit"
                disabled={!newMemberStaff}
                style={{ backgroundColor: NAVY, border: 'none', fontWeight: '600', padding: '8px 20px', width: '100%' }}
              >
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: '6px' }} />
                Add Member
              </Button>
            </div>
          </div>
        </Form>

        {visitTeamMembers.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '20px 0', margin: 0, fontSize: '14px' }}>
            No team members assigned yet.
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '13px', marginBottom: 0 }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Name</th>
                <th style={{ color: NAVY }}>Role</th>
                <th style={{ color: NAVY }}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {visitTeamMembers.map(m => (
                <tr key={m.id}>
                  <td style={{ fontWeight: '600' }}>{staffName(m.staff)}</td>
                  <td>{roleBadge(m.role)}</td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDeleteTeamMember(m.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {/* Main Investigation Form */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
        <SectionTitle>Investigation Details</SectionTitle>
        <Form onSubmit={onUpdate}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Location of Incident</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Where did the incident occur?"
                  value={location_of_incident}
                  onChange={e => setLocationOfIncident(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Date of Incident</Form.Label>
                <Form.Control
                  type="date"
                  value={date_of_incident}
                  onChange={e => setDateOfIncident(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Task Being Performed</Form.Label>
            <Form.Control
              as="textarea" rows={3}
              placeholder="Describe the task being performed..."
              value={task_performed}
              onChange={e => setTaskPerformed(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={L}>What Happened</Form.Label>
            <Form.Control
              as="textarea" rows={4}
              placeholder="Describe what happened..."
              value={what_happened}
              onChange={e => setWhatHappened(e.target.value)}
            />
          </Form.Group>

          <hr style={{ margin: '24px 0', borderColor: '#f0f0f0' }} />

          <h6 style={{ color: '#666', fontWeight: '600', marginBottom: '12px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Summaries</h6>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Summary of Remedial Action</Form.Label>
                <Form.Control
                  as="textarea" rows={4}
                  placeholder="Summary of actions taken to remedy the situation..."
                  value={summary_of_remedial_action}
                  onChange={e => setSummaryOfRemedialAction(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Summary of Incident Investigation</Form.Label>
                <Form.Control
                  as="textarea" rows={4}
                  placeholder="Overall summary of the investigation findings..."
                  value={summary_of_incident_investigation}
                  onChange={e => setSummaryOfIncidentInvestigation(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <Button
              type="submit"
              style={{ flex: 1, backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
            >
              Save Changes
            </Button>
            <Link to="/incidentinvestigationlist">
              <Button type="button" style={{ backgroundColor: 'transparent', border: `1.5px solid ${NAVY}`, color: NAVY, fontWeight: '600', padding: '10px 24px' }}>
                Cancel
              </Button>
            </Link>
          </div>
        </Form>
      </div>

      {/* Incident Factors Section */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
        <SectionTitle count={visitFactors.length} countColor="#D97706" countBg="#FEF3C7">
          Contributing Factors
        </SectionTitle>

        <Form onSubmit={onAddFactor} style={{ marginBottom: '20px' }}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Factor</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Describe the contributing factor..."
                  value={newFactor}
                  onChange={e => setNewFactor(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Type of Factor</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Human, Equipment, Environmental..."
                  value={newFactorType}
                  onChange={e => setNewFactorType(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>
          <Form.Group className="mb-3">
            <Form.Label style={L}>Action Taken</Form.Label>
            <Form.Control
              as="textarea" rows={2}
              placeholder="Describe the corrective action taken..."
              value={newFactorAction}
              onChange={e => setNewFactorAction(e.target.value)}
            />
          </Form.Group>
          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Who Will Fix It</Form.Label>
                <Form.Select value={newFactorWho} onChange={e => setNewFactorWho(e.target.value)}>
                  <option value="">Select staff member...</option>
                  {staffs.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.position})</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>When Will It Be Fixed</Form.Label>
                <Form.Control type="date" value={newFactorWhen} onChange={e => setNewFactorWhen(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Planned Completion Date</Form.Label>
                <Form.Control type="date" value={newFactorCompletion} onChange={e => setNewFactorCompletion(e.target.value)} />
              </Form.Group>
            </div>
          </div>
          <Button
            type="submit"
            style={{ backgroundColor: NAVY, border: 'none', fontWeight: '600', padding: '8px 20px' }}
          >
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '6px' }} />
            Add Factor
          </Button>
        </Form>

        {visitFactors.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '20px 0', margin: 0, fontSize: '14px' }}>
            No contributing factors recorded yet.
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '13px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Factor</th>
                <th style={{ color: NAVY }}>Type</th>
                <th style={{ color: NAVY }}>Action Taken</th>
                <th style={{ color: NAVY }}>Who</th>
                <th style={{ color: NAVY }}>Fix By</th>
                <th style={{ color: NAVY }}>Completion</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {visitFactors.map(f => (
                <tr key={f.id}>
                  <td style={{ fontWeight: '600' }}>{f.factor || '—'}</td>
                  <td style={{ color: '#666' }}>{f.type_of_factor || '—'}</td>
                  <td style={{ color: '#666', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.action_taken || '—'}</td>
                  <td style={{ color: '#666' }}>{staffName(f.who_will_fix)}</td>
                  <td style={{ color: '#666', whiteSpace: 'nowrap' }}>{f.when_will_fix || '—'}</td>
                  <td style={{ color: '#666', whiteSpace: 'nowrap' }}>{f.planned_completion_date || '—'}</td>
                  <td>
                    <Link to={`/incidentfactorsedit/${f.id}`} style={{ color: NAVY }}>
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDeleteFactor(f.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {/* Incident Photos Section */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <SectionTitle count={visitPhotos.length}>
          <FontAwesomeIcon icon={faImage} style={{ marginRight: '8px', color: '#9CA3AF' }} />
          Evidence Photos
        </SectionTitle>

        <Form onSubmit={onAddPhoto} style={{ marginBottom: '20px' }}>
          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Photo Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Damage at scene..."
                  value={newPhotoTitle}
                  onChange={e => setNewPhotoTitle(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Brief description..."
                  value={newPhotoDesc}
                  onChange={e => setNewPhotoDesc(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Photo File</Form.Label>
                <Form.Control
                  id="photo-file-input"
                  type="file"
                  accept="image/*"
                  onChange={e => setNewPhotoFile(e.target.files[0])}
                />
              </Form.Group>
            </div>
          </div>
          <Button
            type="submit"
            disabled={!newPhotoFile}
            style={{ backgroundColor: NAVY, border: 'none', fontWeight: '600', padding: '8px 20px' }}
          >
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '6px' }} />
            Upload Photo
          </Button>
        </Form>

        {visitPhotos.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '20px 0', margin: 0, fontSize: '14px' }}>
            No photos uploaded yet.
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '13px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Photo</th>
                <th style={{ color: NAVY }}>Title</th>
                <th style={{ color: NAVY }}>Description</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {visitPhotos.map(p => (
                <tr key={p.id}>
                  <td>
                    <a href={p.incident_photo} target="_blank" rel="noreferrer">
                      <img src={p.incident_photo} alt={p.title} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                    </a>
                  </td>
                  <td style={{ fontWeight: '600' }}>{p.title || '—'}</td>
                  <td style={{ color: '#666' }}>{p.description || '—'}</td>
                  <td>
                    <Link to={`/incidentphotosedit/${p.id}`} style={{ color: NAVY }}>
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDeletePhoto(p.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

    </div>
  )
}
