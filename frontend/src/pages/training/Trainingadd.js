import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import TrainingAPI from '../../API/TrainingAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function Trainingadd() {
  const { authTokens } = useContext(AuthContext)
  const navigate = useNavigate()

  const [staff_name, setStaffName] = useState('')
  const [training, setTraining] = useState('')
  const [training_provider, setTrainingProvider] = useState('')
  const [training_date, setTrainingDate] = useState('')
  const [training_expiry, setTrainingExpiry] = useState('')
  const [staffs, setStaffs] = useState([])

  useEffect(() => {
    StaffAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setStaffs(res.data)).catch(console.log)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    const item = {
      staff_name: staff_name || null,
      training,
      training_provider,
      training_date: training_date || null,
      training_expiry: training_expiry || null,
    }
    TrainingAPI.post('/', item, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => navigate('/traininglist')).catch(console.log)
  }

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

  return (
    <div style={{ padding: '40px', maxWidth: '680px', margin: '0 auto' }}>

      {/* Back + Header */}
      <div style={{ marginBottom: '32px' }}>
        <Link to="/traininglist" style={{ color: '#888', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Training Records
        </Link>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>New Training Record</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Record a staff member's training certification.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onSubmit}>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Staff Member</Form.Label>
            <Form.Select value={staff_name} onChange={e => setStaffName(e.target.value)}>
              <option value="">Select staff member...</option>
              {staffs.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.position})</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Training / Certification</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Working at Heights, First Aid, HAZMAT..."
              value={training}
              onChange={e => setTraining(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Training Provider</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Red Cross, NIOSH, Internal..."
              value={training_provider}
              onChange={e => setTrainingProvider(e.target.value)}
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-4">
                <Form.Label style={L}>Training Date</Form.Label>
                <Form.Control
                  type="date"
                  value={training_date}
                  onChange={e => setTrainingDate(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-4">
                <Form.Label style={L}>Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  value={training_expiry}
                  onChange={e => setTrainingExpiry(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              type="submit"
              style={{ flex: 1, backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
            >
              Save Training Record
            </Button>
            <Link to="/traininglist">
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
