import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import SignituresAPI from '../../../API/SignituresAPI'
import StaffAPI from '../../../API/StaffAPI'
import AuthContext from '../../../context/AuthContext'
import API_BASE from '../../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function SignituresEdit() {
  const { authTokens } = useContext(AuthContext)
  const params = useParams()
  const navigate = useNavigate()

  const [permit_to_work, setPermitToWork] = useState(null)
  const [person_name, setPersonName] = useState('')
  const [signiture_for, setSignitureFor] = useState('')
  const [position_class, setPositionClass] = useState('')
  const [existingImage, setExistingImage] = useState(null)
  const [newFile, setNewFile] = useState(null)
  const [staffs, setStaffs] = useState([])

  useEffect(() => {
    const h = { Authorization: `Bearer ${authTokens.access}` }
    axios.get(`${API_BASE}/hseapp/signitures/${params.id}/`, { headers: h })
      .then(res => {
        setPermitToWork(res.data.permit_to_work)
        setPersonName(res.data.person_name || '')
        setSignitureFor(res.data.signiture_for || '')
        setPositionClass(res.data.position_class || '')
        setExistingImage(res.data.person_signiture || null)
      }).catch(console.log)

    StaffAPI.get('/', { headers: h })
      .then(res => setStaffs(res.data)).catch(console.log)
  }, [params.id])

  const onUpdate = (e) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('person_name', person_name)
    fd.append('signiture_for', signiture_for)
    fd.append('position_class', position_class)
    fd.append('permit_to_work', permit_to_work)
    if (newFile) {
      fd.append('person_signiture', newFile)
    }
    SignituresAPI.patch(`/${params.id}/`, fd, {
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
        'Content-Type': 'multipart/form-data',
      },
    }).then(() => navigate(-1)).catch(console.log)
  }

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

  return (
    <div style={{ padding: '40px', maxWidth: '680px', margin: '0 auto' }}>

      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', padding: 0, color: '#888', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Permit
        </button>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Signature</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Update signature details or replace the signature image.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>

        {existingImage && (
          <div style={{ marginBottom: '20px' }}>
            <p style={{ ...L, marginBottom: '8px' }}>Current Signature</p>
            <img
              src={existingImage}
              alt="Current signature"
              style={{ width: '160px', height: '100px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e5e7eb' }}
            />
          </div>
        )}

        <Form onSubmit={onUpdate}>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Person</Form.Label>
            <Form.Select value={person_name} onChange={e => setPersonName(e.target.value)}>
              <option value="">Select...</option>
              {staffs.map(s => <option key={s.id} value={s.id}>{s.name} ({s.position})</option>)}
            </Form.Select>
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Signature For</Form.Label>
                <Form.Select value={signiture_for} onChange={e => setSignitureFor(e.target.value)}>
                  <option value="">Select...</option>
                  <option value="Details Of Work">Details Of Work</option>
                  <option value="Acceptance">Acceptance</option>
                  <option value="Completion">Completion</option>
                  <option value="Final Sign Off">Final Sign Off</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Position Class</Form.Label>
                <Form.Select value={position_class} onChange={e => setPositionClass(e.target.value)}>
                  <option value="">Select...</option>
                  <option value="Compenent Person">Competent Person</option>
                  <option value="Worker">Worker</option>
                  <option value="Authorizer">Authorizer</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-4">
            <Form.Label style={L}>Replace Signature Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={e => setNewFile(e.target.files[0] || null)}
            />
            <Form.Text style={{ color: '#999', fontSize: '12px' }}>
              Leave empty to keep the existing signature image.
            </Form.Text>
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
