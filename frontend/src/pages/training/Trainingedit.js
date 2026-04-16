import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import TrainingAPI from '../../API/TrainingAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import API_BASE from '../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

function expiryStatus(expiryDate) {
  if (!expiryDate) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiry = new Date(expiryDate)
  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
  if (diffDays < 0)   return { label: 'Expired',       bg: '#FEE2E2', color: '#DC2626' }
  if (diffDays <= 30) return { label: 'Expiring Soon',  bg: '#FEF3C7', color: '#D97706' }
  return               { label: 'Valid',               bg: '#D1FAE5', color: '#059669' }
}

export default function Trainingedit() {
  const { authTokens } = useContext(AuthContext)
  const params = useParams()
  const navigate = useNavigate()

  const [staff_name, setStaffName] = useState('')
  const [training, setTraining] = useState('')
  const [training_provider, setTrainingProvider] = useState('')
  const [training_date, setTrainingDate] = useState('')
  const [training_expiry, setTrainingExpiry] = useState('')
  const [staffs, setStaffs] = useState([])

  useEffect(() => {
    const headers = { Authorization: `Bearer ${authTokens.access}` }

    axios.get(`${API_BASE}/hseapp/training/${params.id}/`, { headers })
      .then(res => {
        const d = res.data
        setStaffName(d.staff_name || '')
        setTraining(d.training || '')
        setTrainingProvider(d.training_provider || '')
        setTrainingDate(d.training_date || '')
        setTrainingExpiry(d.training_expiry || '')
      }).catch(console.log)

    StaffAPI.get('/', { headers })
      .then(res => setStaffs(res.data)).catch(console.log)
  }, [params.id])

  const onUpdate = (e) => {
    e.preventDefault()
    const item = {
      staff_name: staff_name || null,
      training,
      training_provider,
      training_date: training_date || null,
      training_expiry: training_expiry || null,
    }
    TrainingAPI.patch(`/${params.id}/`, item, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => navigate('/traininglist')).catch(console.log)
  }

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }
  const status = expiryStatus(training_expiry)

  return (
    <div style={{ padding: '40px', maxWidth: '680px', margin: '0 auto' }}>

      {/* Back + Header */}
      <div style={{ marginBottom: '32px' }}>
        <Link to="/traininglist" style={{ color: '#888', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Training Records
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Training Record</h2>
          {status && (
            <span style={{
              backgroundColor: status.bg, color: status.color,
              padding: '3px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: '700',
            }}>
              {status.label}
            </span>
          )}
        </div>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Update this staff training certification.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onUpdate}>

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
              Save Changes
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
