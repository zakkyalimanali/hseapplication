import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import SiteVisitAPI from '../../API/SiteVisitAPI'
import SiteHazardAPI from '../../API/SiteHazardAPI'
import AttendeesAPI from '../../API/AttendeesAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import API_BASE from '../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

const HAZARD_STATUS = {
  yes: { label: 'Resolved',    bg: '#D1FAE5', color: '#059669' },
  no:  { label: 'Unresolved',  bg: '#FEE2E2', color: '#DC2626' },
}

export default function SiteVisitEdit() {
  const { authTokens } = useContext(AuthContext)
  const params = useParams()
  const navigate = useNavigate()

  // Main visit form
  const [inspector, setInspector] = useState('')
  const [inspection_date, setInspectionDate] = useState('')
  const [inspection_time, setInspectionTime] = useState('')
  const [location, setLocation] = useState('')

  // Reference data
  const [staffs, setStaffs] = useState([])
  const [attendees, setAttendees] = useState([])
  const [hazards, setHazards] = useState([])

  // Attendee add form
  const [newAttendee, setNewAttendee] = useState('')

  // Hazard add form
  const [newHazard, setNewHazard] = useState('')
  const [newHazardStatus, setNewHazardStatus] = useState('')
  const [newHazardNotes, setNewHazardNotes] = useState('')

  const headers = { Authorization: `Bearer ${authTokens.access}` }

  useEffect(() => {
    axios.get(`${API_BASE}/hseapp/sitevisit/${params.id}/`, { headers })
      .then(res => {
        const d = res.data
        setInspector(d.inspector || '')
        setInspectionDate(d.inspection_date || '')
        setInspectionTime(d.inspection_time || '')
        setLocation(d.location || '')
      }).catch(console.log)

    StaffAPI.get('/', { headers }).then(res => setStaffs(res.data)).catch(console.log)
    fetchAttendees()
    fetchHazards()
  }, [params.id])

  const fetchAttendees = () => {
    AttendeesAPI.get('/', { headers }).then(res => setAttendees(res.data)).catch(console.log)
  }

  const fetchHazards = () => {
    SiteHazardAPI.get('/', { headers }).then(res => setHazards(res.data)).catch(console.log)
  }

  const onUpdate = (e) => {
    e.preventDefault()
    const item = {
      inspector: inspector || null,
      inspection_date: inspection_date || null,
      inspection_time: inspection_time || null,
      location,
    }
    SiteVisitAPI.patch(`/${params.id}/`, item, { headers })
      .then(() => navigate('/sitevisitlist'))
      .catch(console.log)
  }

  const onAddAttendee = (e) => {
    e.preventDefault()
    if (!newAttendee) return
    AttendeesAPI.post('/', { visit: Number(params.id), staff_name: newAttendee }, { headers })
      .then(() => { setNewAttendee(''); fetchAttendees() })
      .catch(console.log)
  }

  const onDeleteAttendee = (id) => {
    AttendeesAPI.delete(`/${id}/`, { headers })
      .then(() => fetchAttendees()).catch(console.log)
  }

  const onAddHazard = (e) => {
    e.preventDefault()
    if (!newHazard) return
    SiteHazardAPI.post('/', { visit: Number(params.id), hazard: newHazard, status: newHazardStatus, notes: newHazardNotes }, { headers })
      .then(() => { setNewHazard(''); setNewHazardStatus(''); setNewHazardNotes(''); fetchHazards() })
      .catch(console.log)
  }

  const onDeleteHazard = (id) => {
    SiteHazardAPI.delete(`/${id}/`, { headers })
      .then(() => fetchHazards()).catch(console.log)
  }

  const staffName = (id) => staffs.find(s => s.id === id)?.name || '—'

  const visitAttendees = attendees.filter(a => a.visit === Number(params.id))
  const visitHazards = hazards.filter(h => h.visit === Number(params.id))

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>

      {/* Back + Header */}
      <div style={{ marginBottom: '32px' }}>
        <Link to="/sitevisitlist" style={{ color: '#888', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Site Visits
        </Link>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Site Visit</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Update inspection details, attendees, and hazard findings.
        </p>
      </div>

      {/* Main Visit Form */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>Inspection Details</h5>
        <Form onSubmit={onUpdate}>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Inspector</Form.Label>
            <Form.Select value={inspector} onChange={e => setInspector(e.target.value)}>
              <option value="">Select inspector...</option>
              {staffs.map(s => (
                <option key={s.id} value={s.id}>{s.name} {s.position ? `(${s.position})` : ''}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Block A, Main Gate, Warehouse..."
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-4">
                <Form.Label style={L}>Inspection Date</Form.Label>
                <Form.Control
                  type="date"
                  value={inspection_date}
                  onChange={e => setInspectionDate(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-4">
                <Form.Label style={L}>Inspection Time</Form.Label>
                <Form.Control
                  type="time"
                  value={inspection_time}
                  onChange={e => setInspectionTime(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              type="submit"
              style={{ flex: 1, backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
            >
              Save Changes
            </Button>
            <Link to="/sitevisitlist">
              <Button type="button" style={{ backgroundColor: 'transparent', border: `1.5px solid ${NAVY}`, color: NAVY, fontWeight: '600', padding: '10px 24px' }}>
                Cancel
              </Button>
            </Link>
          </div>

        </Form>
      </div>

      {/* Attendees Section */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>
          Attendees
          <span style={{ marginLeft: '10px', fontSize: '13px', fontWeight: '600', color: '#2563EB', backgroundColor: '#DBEAFE', padding: '2px 8px', borderRadius: '6px' }}>
            {visitAttendees.length}
          </span>
        </h5>

        {/* Add Attendee Form */}
        <Form onSubmit={onAddAttendee} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
            <Form.Group style={{ flex: 1 }}>
              <Form.Label style={L}>Add Attendee</Form.Label>
              <Form.Select value={newAttendee} onChange={e => setNewAttendee(e.target.value)}>
                <option value="">Select staff member...</option>
                {staffs.map(s => (
                  <option key={s.id} value={s.id}>{s.name} {s.position ? `(${s.position})` : ''}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button
              type="submit"
              style={{ backgroundColor: NAVY, border: 'none', fontWeight: '600', padding: '10px 20px', whiteSpace: 'nowrap' }}
            >
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: '6px' }} />
              Add
            </Button>
          </div>
        </Form>

        {visitAttendees.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '20px 0', margin: 0, fontSize: '14px' }}>
            No attendees added yet.
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Staff Member</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {visitAttendees.map(a => (
                <tr key={a.id}>
                  <td style={{ fontWeight: '600' }}>{staffName(a.staff_name)}</td>
                  <td>
                    <Link to={`/attendeeedit/${a.id}`} style={{ color: NAVY }}>
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDeleteAttendee(a.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {/* Hazards Section */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>
          Hazard Findings
          <span style={{ marginLeft: '10px', fontSize: '13px', fontWeight: '600', color: '#D97706', backgroundColor: '#FEF3C7', padding: '2px 8px', borderRadius: '6px' }}>
            {visitHazards.length}
          </span>
        </h5>

        {/* Add Hazard Form */}
        <Form onSubmit={onAddHazard} style={{ marginBottom: '20px' }}>
          <Form.Group className="mb-3">
            <Form.Label style={L}>Hazard Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Describe the hazard observed..."
              value={newHazard}
              onChange={e => setNewHazard(e.target.value)}
            />
          </Form.Group>
          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Status</Form.Label>
                <Form.Select value={newHazardStatus} onChange={e => setNewHazardStatus(e.target.value)}>
                  <option value="">Select...</option>
                  <option value="yes">Resolved</option>
                  <option value="no">Unresolved</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-8">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Notes</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Additional notes..."
                  value={newHazardNotes}
                  onChange={e => setNewHazardNotes(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>
          <Button
            type="submit"
            style={{ backgroundColor: NAVY, border: 'none', fontWeight: '600', padding: '8px 20px' }}
          >
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '6px' }} />
            Add Hazard
          </Button>
        </Form>

        {visitHazards.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '20px 0', margin: 0, fontSize: '14px' }}>
            No hazards recorded for this visit.
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Hazard</th>
                <th style={{ color: NAVY }}>Status</th>
                <th style={{ color: NAVY }}>Notes</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {visitHazards.map(h => {
                const st = HAZARD_STATUS[h.status]
                return (
                  <tr key={h.id}>
                    <td style={{ fontWeight: '600' }}>{h.hazard || '—'}</td>
                    <td>
                      {st ? (
                        <span style={{
                          backgroundColor: st.bg, color: st.color,
                          padding: '2px 8px', borderRadius: '4px',
                          fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap',
                        }}>
                          {st.label}
                        </span>
                      ) : <span style={{ color: '#ccc' }}>—</span>}
                    </td>
                    <td style={{ color: '#666', fontSize: '13px' }}>{h.notes || '—'}</td>
                    <td>
                      <Link to={`/sitehazardedit/${h.id}`} style={{ color: NAVY }}>
                        <FontAwesomeIcon icon={faPen} />
                      </Link>
                    </td>
                    <td>
                      <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDeleteHazard(h.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        )}
      </div>

    </div>
  )
}
