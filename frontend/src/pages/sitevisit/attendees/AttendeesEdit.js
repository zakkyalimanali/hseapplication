import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import AttendeesAPI from '../../../API/AttendeesAPI'
import StaffAPI from '../../../API/StaffAPI'
import AuthContext from '../../../context/AuthContext'
import axios from 'axios'
import API_BASE from '../../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function AttendeesEdit() {
  const { authTokens } = useContext(AuthContext)
  const params = useParams()
  const navigate = useNavigate()

  const [staff_name, setStaffName] = useState('')
  const [visitId, setVisitId] = useState(null)
  const [staffs, setStaffs] = useState([])

  useEffect(() => {
    const headers = { Authorization: `Bearer ${authTokens.access}` }

    axios.get(`${API_BASE}/hseapp/staffadd/${params.id}/`, { headers })
      .then(res => {
        setStaffName(res.data.staff_name || '')
        setVisitId(res.data.visit)
      }).catch(console.log)

    StaffAPI.get('/', { headers }).then(res => setStaffs(res.data)).catch(console.log)
  }, [params.id])

  const onUpdate = (e) => {
    e.preventDefault()
    const item = { visit: visitId, staff_name }
    AttendeesAPI.patch(`/${params.id}/`, item, {
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
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Attendee</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Update the attendee for this site visit.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onUpdate}>

          <Form.Group className="mb-4">
            <Form.Label style={L}>Staff Member</Form.Label>
            <Form.Select value={staff_name} onChange={e => setStaffName(e.target.value)}>
              <option value="">Select staff member...</option>
              {staffs.map(s => (
                <option key={s.id} value={s.id}>{s.name} {s.position ? `(${s.position})` : ''}</option>
              ))}
            </Form.Select>
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
