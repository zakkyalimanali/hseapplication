import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import IncidentInvestigationAPI from '../../API/IncidentInvestigationAPI'
import InvestigationTeamMemberAPI from '../../API/InvestigationTeamMemberAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function IncidentInvestigationAdd() {
  const { authTokens, user } = useContext(AuthContext)
  const navigate = useNavigate()

  // Main investigation fields
  const [date_of_incident, setDateOfIncident] = useState('')
  const [location_of_incident, setLocationOfIncident] = useState('')
  const [task_performed, setTaskPerformed] = useState('')
  const [what_happened, setWhatHappened] = useState('')
  const [summary_of_remedial_action, setSummaryOfRemedialAction] = useState('')
  const [summary_of_incident_investigation, setSummaryOfIncidentInvestigation] = useState('')

  // Reference data
  const [staffs, setStaffs] = useState([])

  // Pending team members (before investigation is saved)
  const [pendingMembers, setPendingMembers] = useState([])
  const [newMemberStaff, setNewMemberStaff] = useState('')
  const [newMemberRole, setNewMemberRole] = useState('Member')

  const headers = { Authorization: `Bearer ${authTokens.access}` }

  useEffect(() => {
    StaffAPI.get('/', { headers }).then(res => setStaffs(res.data)).catch(console.log)
  }, [])

  // Auto-add the logged-in user as Lead investigator
  useEffect(() => {
    if (user?.staff_id && staffs.length > 0) {
      const alreadyAdded = pendingMembers.some(m => String(m.staff) === String(user.staff_id))
      if (!alreadyAdded) {
        setPendingMembers([{ staff: String(user.staff_id), role: 'Lead', _autoFilled: true }])
      }
    }
  }, [user, staffs])

  const staffName = (id) => {
    const s = staffs.find(s => String(s.id) === String(id))
    return s ? `${s.name}${s.position ? ` (${s.position})` : ''}` : '—'
  }

  const onAddMember = (e) => {
    e.preventDefault()
    if (!newMemberStaff) return
    // Prevent duplicate
    if (pendingMembers.some(m => String(m.staff) === String(newMemberStaff))) return
    setPendingMembers(prev => [...prev, { staff: newMemberStaff, role: newMemberRole }])
    setNewMemberStaff('')
    setNewMemberRole('Member')
  }

  const onRemoveMember = (staffId) => {
    setPendingMembers(prev => prev.filter(m => String(m.staff) !== String(staffId)))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      // 1. Create the investigation
      const res = await IncidentInvestigationAPI.post('/', {
        date_of_incident: date_of_incident || null,
        location_of_incident,
        task_performed,
        what_happened,
        summary_of_remedial_action,
        summary_of_incident_investigation,
      }, { headers })

      const investigationId = res.data.id

      // 2. POST each pending team member
      await Promise.all(pendingMembers.map(m =>
        InvestigationTeamMemberAPI.post('/', {
          incidentinvestigation: investigationId,
          staff: m.staff,
          role: m.role,
        }, { headers })
      ))

      navigate('/incidentinvestigationlist')
    } catch (err) {
      console.log(err)
    }
  }

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

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
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>New Incident Investigation</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Record a formal incident investigation with team members and findings.
        </p>
      </div>

      <Form onSubmit={onSubmit}>

        {/* Investigation Team Card */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
          <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>
            Investigation Team
            <span style={{ marginLeft: '10px', fontSize: '13px', fontWeight: '600', color: '#2563EB', backgroundColor: '#DBEAFE', padding: '2px 8px', borderRadius: '6px' }}>
              {pendingMembers.length}
            </span>
          </h5>

          {/* Add member row */}
          <div className="row align-items-end" style={{ marginBottom: '16px' }}>
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
                onClick={onAddMember}
                disabled={!newMemberStaff}
                style={{ backgroundColor: NAVY, border: 'none', fontWeight: '600', padding: '8px 20px', width: '100%' }}
              >
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: '6px' }} />
                Add Member
              </Button>
            </div>
          </div>

          {pendingMembers.length === 0 ? (
            <p style={{ color: '#aaa', fontSize: '14px', textAlign: 'center', padding: '16px 0', margin: 0 }}>
              No team members added yet.
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
                {pendingMembers.map((m, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: '600' }}>
                      {staffName(m.staff)}
                      {m._autoFilled && (
                        <span style={{ fontWeight: '400', color: '#10B981', fontSize: '12px', marginLeft: '8px' }}>✓ auto-filled</span>
                      )}
                    </td>
                    <td>{roleBadge(m.role)}</td>
                    <td>
                      <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onRemoveMember(m.staff)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>

        {/* Incident Details Card */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
          <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>Incident Details</h5>

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
              placeholder="Describe the task being performed at the time..."
              value={task_performed}
              onChange={e => setTaskPerformed(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={L}>What Happened</Form.Label>
            <Form.Control
              as="textarea" rows={4}
              placeholder="Describe what happened during the incident..."
              value={what_happened}
              onChange={e => setWhatHappened(e.target.value)}
            />
          </Form.Group>

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
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            type="submit"
            style={{ flex: 1, backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
          >
            Save Investigation
          </Button>
          <Link to="/incidentinvestigationlist">
            <Button type="button" style={{ backgroundColor: 'transparent', border: `1.5px solid ${NAVY}`, color: NAVY, fontWeight: '600', padding: '10px 24px' }}>
              Cancel
            </Button>
          </Link>
        </div>

      </Form>
    </div>
  )
}
