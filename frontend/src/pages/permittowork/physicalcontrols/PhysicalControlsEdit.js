import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import PhysicalControlsAPI from '../../../API/PhysicalControlsAPI'
import AuthContext from '../../../context/AuthContext'
import API_BASE from '../../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function PhysicalControlsEdit() {
  const { authTokens } = useContext(AuthContext)
  const params = useParams()
  const navigate = useNavigate()

  const [permit_to_work, setPermitToWork] = useState(null)
  const [control_mechanisms, setControlMechanisms] = useState('')
  const [control_how_will_it_help, setControlHowWillItHelp] = useState('')

  useEffect(() => {
    const h = { Authorization: `Bearer ${authTokens.access}` }
    axios.get(`${API_BASE}/hseapp/physicalcontrols/${params.id}/`, { headers: h })
      .then(res => {
        setPermitToWork(res.data.permit_to_work)
        setControlMechanisms(res.data.control_mechanisms || '')
        setControlHowWillItHelp(res.data.control_how_will_it_help || '')
      }).catch(console.log)
  }, [params.id])

  const onUpdate = (e) => {
    e.preventDefault()
    PhysicalControlsAPI.patch(`/${params.id}/`, {
      control_mechanisms,
      control_how_will_it_help,
      permit_to_work,
    }, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
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
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Physical Control</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Update control mechanism and how it works.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onUpdate}>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Control Mechanisms</Form.Label>
            <Form.Control
              type="text"
              placeholder="Describe the control mechanism..."
              value={control_mechanisms}
              onChange={e => setControlMechanisms(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={L}>How Controls Work</Form.Label>
            <Form.Control
              type="text"
              placeholder="How will this control help?"
              value={control_how_will_it_help}
              onChange={e => setControlHowWillItHelp(e.target.value)}
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
