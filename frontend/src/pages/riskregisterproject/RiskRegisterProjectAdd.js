import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import RiskRegisterProjectAPI from '../../API/RiskRegisterProjectAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function RiskRegisterProjectAdd() {
  const { authTokens } = useContext(AuthContext)
  const navigate = useNavigate()

  const [project_name, setProjectName] = useState('')
  const [raised_by, setRaisedBy] = useState('')
  const [staffs, setStaffs] = useState([])

  useEffect(() => {
    StaffAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setStaffs(res.data)).catch(console.log)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    const item = { project_name, raised_by: raised_by || null }
    RiskRegisterProjectAPI.post('/', item, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => navigate('/riskregisterprojectlist')).catch(console.log)
  }

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

  return (
    <div style={{ padding: '40px', maxWidth: '680px', margin: '0 auto' }}>

      <div style={{ marginBottom: '32px' }}>
        <Link to="/riskregisterprojectlist" style={{ color: '#888', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Risk Register
        </Link>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>New Project</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Create a new project to begin adding risk entries.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onSubmit}>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Site A Expansion, Pipeline Project 2024..."
              value={project_name}
              onChange={e => setProjectName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={L}>Raised By</Form.Label>
            <Form.Select value={raised_by} onChange={e => setRaisedBy(e.target.value)}>
              <option value="">Select staff member...</option>
              {staffs.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.position})</option>
              ))}
            </Form.Select>
          </Form.Group>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              type="submit"
              disabled={!project_name}
              style={{ flex: 1, backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
            >
              Save Project
            </Button>
            <Link to="/riskregisterprojectlist">
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
