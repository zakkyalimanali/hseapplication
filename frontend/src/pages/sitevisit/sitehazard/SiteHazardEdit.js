import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import SiteHazardAPI from '../../../API/SiteHazardAPI'
import AuthContext from '../../../context/AuthContext'
import axios from 'axios'
import API_BASE from '../../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function SiteHazardEdit() {
  const { authTokens } = useContext(AuthContext)
  const params = useParams()
  const navigate = useNavigate()

  const [hazard, setHazard] = useState('')
  const [status, setStatus] = useState('')
  const [notes, setNotes] = useState('')
  const [visitId, setVisitId] = useState(null)

  useEffect(() => {
    axios.get(`${API_BASE}/hseapp/sitehazard/${params.id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => {
      const d = res.data
      setHazard(d.hazard || '')
      setStatus(d.status || '')
      setNotes(d.notes || '')
      setVisitId(d.visit)
    }).catch(console.log)
  }, [params.id])

  const onUpdate = (e) => {
    e.preventDefault()
    const item = { visit: visitId, hazard, status, notes }
    SiteHazardAPI.patch(`/${params.id}/`, item, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => navigate(-1)).catch(console.log)
  }

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

  return (
    <div style={{ padding: '40px', maxWidth: '680px', margin: '0 auto' }}>

      {/* Back + Header */}
      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', padding: 0, color: '#888', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Site Visit
        </button>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Hazard Finding</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Update the hazard description and resolution status.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onUpdate}>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Hazard Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Describe the hazard observed..."
              value={hazard}
              onChange={e => setHazard(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Status</Form.Label>
            <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="">Select status...</option>
              <option value="yes">Resolved</option>
              <option value="no">Unresolved</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={L}>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Additional notes or follow-up actions..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </Form.Group>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              type="submit"
              style={{ flex: 1, backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
            >
              Save Changes
            </Button>
            <Button
              type="button"
              onClick={() => navigate(-1)}
              style={{ backgroundColor: 'transparent', border: `1.5px solid ${NAVY}`, color: NAVY, fontWeight: '600', padding: '10px 24px' }}
            >
              Cancel
            </Button>
          </div>

        </Form>
      </div>
    </div>
  )
}
