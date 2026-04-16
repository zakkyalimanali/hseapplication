import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import PermitToWorkAPI from '../../API/PermitToWorkAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function PermitToWorkAdd() {
  const { authTokens } = useContext(AuthContext)
  const navigate = useNavigate()

  const [permit_number, setPermitNumber] = useState('')
  const [location_of_work, setLocationOfWork] = useState('')
  const [nature_of_work, setNatureOfWork] = useState('')
  const [work_start, setWorkStart] = useState('')
  const [work_start_time, setWorkStartTime] = useState('')
  const [work_completed, setWorkCompleted] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const item = {
      permit_number,
      location_of_work,
      nature_of_work,
      work_start: work_start || null,
      work_start_time,
      work_completed: work_completed || null,
    }
    PermitToWorkAPI.post('/', item, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => navigate('/permittoworklist')).catch(console.log)
  }

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

  return (
    <div style={{ padding: '40px', maxWidth: '680px', margin: '0 auto' }}>

      <div style={{ marginBottom: '32px' }}>
        <Link to="/permittoworklist" style={{ color: '#888', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Permit to Work
        </Link>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>New Permit to Work</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Create a new work permit before adding hazards, controls, and signatures.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onSubmit}>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Permit Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. PTW-2024-001"
              value={permit_number}
              onChange={e => setPermitNumber(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Location of Work</Form.Label>
            <Form.Control
              type="text"
              placeholder="Where will the work be carried out?"
              value={location_of_work}
              onChange={e => setLocationOfWork(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Nature of Work</Form.Label>
            <Form.Control
              as="textarea" rows={2}
              placeholder="Describe the nature of the work..."
              value={nature_of_work}
              onChange={e => setNatureOfWork(e.target.value)}
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Work Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={work_start}
                  onChange={e => setWorkStart(e.target.value || null)}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Work Start Time</Form.Label>
                <Form.Control
                  type="time"
                  value={work_start_time}
                  onChange={e => setWorkStartTime(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-4">
            <Form.Label style={L}>Work Completed Date</Form.Label>
            <Form.Control
              type="date"
              value={work_completed}
              onChange={e => setWorkCompleted(e.target.value || null)}
            />
          </Form.Group>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              type="submit"
              disabled={!permit_number}
              style={{ flex: 1, backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
            >
              Save Permit
            </Button>
            <Link to="/permittoworklist">
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
