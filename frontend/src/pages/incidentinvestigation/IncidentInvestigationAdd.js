import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import IncidentInvestigationAPI from '../../API/IncidentInvestigationAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function IncidentInvestigationAdd() {
  const { authTokens } = useContext(AuthContext)
  const navigate = useNavigate()

  const [investigator, setInvestigator] = useState('')
  const [date_of_incident, setDateOfIncident] = useState('')
  const [location_of_incident, setLocationOfIncident] = useState('')
  const [task_performed, setTaskPerformed] = useState('')
  const [what_happened, setWhatHappened] = useState('')
  const [team_member_one, setTeamMemberOne] = useState('')
  const [team_member_two, setTeamMemberTwo] = useState('')
  const [team_member_three, setTeamMemberThree] = useState('')
  const [team_member_four, setTeamMemberFour] = useState('')
  const [staffs, setStaffs] = useState([])

  useEffect(() => {
    StaffAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setStaffs(res.data)).catch(console.log)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    const item = {
      investigator: investigator || null,
      date_of_incident: date_of_incident || null,
      location_of_incident,
      task_performed,
      what_happened,
      team_member_one: team_member_one || null,
      team_member_two: team_member_two || null,
      team_member_three: team_member_three || null,
      team_member_four: team_member_four || null,
    }
    IncidentInvestigationAPI.post('/', item, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => navigate('/incidentinvestigationlist')).catch(console.log)
  }

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

  const StaffSelect = ({ label, value, onChange }) => (
    <Form.Group className="mb-3">
      <Form.Label style={L}>{label}</Form.Label>
      <Form.Select value={value} onChange={onChange}>
        <option value="">Select staff member...</option>
        {staffs.map(s => (
          <option key={s.id} value={s.id}>{s.name} ({s.position})</option>
        ))}
      </Form.Select>
    </Form.Group>
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

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onSubmit}>
          <div className="row">

            {/* Left column — team */}
            <div className="col-md-5">
              <h6 style={{ color: NAVY, fontWeight: '700', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #f0f0f0' }}>
                Investigation Team
              </h6>
              <StaffSelect label="Investigator (Lead)" value={investigator} onChange={e => setInvestigator(e.target.value)} />
              <StaffSelect label="Team Member 1" value={team_member_one} onChange={e => setTeamMemberOne(e.target.value)} />
              <StaffSelect label="Team Member 2" value={team_member_two} onChange={e => setTeamMemberTwo(e.target.value)} />
              <StaffSelect label="Team Member 3" value={team_member_three} onChange={e => setTeamMemberThree(e.target.value)} />
              <StaffSelect label="Team Member 4" value={team_member_four} onChange={e => setTeamMemberFour(e.target.value)} />
            </div>

            {/* Right column — incident details */}
            <div className="col-md-7">
              <h6 style={{ color: NAVY, fontWeight: '700', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #f0f0f0' }}>
                Incident Details
              </h6>

              <Form.Group className="mb-3">
                <Form.Label style={L}>Location of Incident</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Where did the incident occur?"
                  value={location_of_incident}
                  onChange={e => setLocationOfIncident(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={L}>Date of Incident</Form.Label>
                <Form.Control
                  type="date"
                  value={date_of_incident}
                  onChange={e => setDateOfIncident(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={L}>Task Being Performed</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Describe the task being performed at the time..."
                  value={task_performed}
                  onChange={e => setTaskPerformed(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={L}>What Happened</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Describe what happened during the incident..."
                  value={what_happened}
                  onChange={e => setWhatHappened(e.target.value)}
                />
              </Form.Group>
            </div>

          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
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
    </div>
  )
}
