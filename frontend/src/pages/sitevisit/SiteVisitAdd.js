import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import SiteVisitAPI from '../../API/SiteVisitAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function SiteVisitAdd() {
  const { authTokens } = useContext(AuthContext)
  const navigate = useNavigate()

  const [inspector, setInspector] = useState('')
  const [inspection_date, setInspectionDate] = useState('')
  const [inspection_time, setInspectionTime] = useState('')
  const [location, setLocation] = useState('')
  const [staffs, setStaffs] = useState([])

  useEffect(() => {
    StaffAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setStaffs(res.data)).catch(console.log)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    const item = { inspector: inspector || null, inspection_date: inspection_date || null, inspection_time: inspection_time || null, location }
    SiteVisitAPI.post('/', item, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => navigate('/sitevisitlist')).catch(console.log)
  }

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

  return (
    <div style={{ padding: '40px', maxWidth: '680px', margin: '0 auto' }}>

      {/* Back + Header */}
      <div style={{ marginBottom: '32px' }}>
        <Link to="/sitevisitlist" style={{ color: '#888', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Site Visits
        </Link>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>New Site Visit</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Record a new site inspection visit.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onSubmit}>

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
              Save Site Visit
            </Button>
            <Link to="/sitevisitlist">
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
