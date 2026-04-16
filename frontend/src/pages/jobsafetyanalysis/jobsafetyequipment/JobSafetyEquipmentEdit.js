import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import JobSafetyEquipmentAPI from '../../../API/JobSafetyEquipmentAPI'
import AuthContext from '../../../context/AuthContext'
import API_BASE from '../../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function JobSafetyEquipmentEdit() {
  const { authTokens } = useContext(AuthContext)
  const params = useParams()
  const navigate = useNavigate()

  const [job_safety_analysis, setJobSafetyAnalysis] = useState(null)
  const [safety_equipment, setSafetyEquipment] = useState('')

  useEffect(() => {
    const h = { Authorization: `Bearer ${authTokens.access}` }
    axios.get(`${API_BASE}/hseapp/jobsafetyequipment/${params.id}/`, { headers: h })
      .then(res => {
        setJobSafetyAnalysis(res.data.job_safety_analysis)
        setSafetyEquipment(res.data.safety_equipment || '')
      }).catch(console.log)
  }, [params.id])

  const onUpdate = (e) => {
    e.preventDefault()
    JobSafetyEquipmentAPI.patch(`/${params.id}/`, {
      safety_equipment,
      job_safety_analysis,
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
          <FontAwesomeIcon icon={faArrowLeft} /> Back to JSA
        </button>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Safety Equipment</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Update the safety equipment entry.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onUpdate}>

          <Form.Group className="mb-4">
            <Form.Label style={L}>Safety Equipment</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Hard hat, Safety harness, Gloves..."
              value={safety_equipment}
              onChange={e => setSafetyEquipment(e.target.value)}
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
