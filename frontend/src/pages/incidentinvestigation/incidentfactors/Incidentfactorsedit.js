import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import IncidentFactorsAPI from '../../../API/IncidentFactorsAPI'
import StaffAPI from '../../../API/StaffAPI'
import AuthContext from '../../../context/AuthContext'
import axios from 'axios'
import API_BASE from '../../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function Incidentfactorsedit() {
  const { authTokens } = useContext(AuthContext)
  const params = useParams()
  const navigate = useNavigate()

  const [factor, setFactor] = useState('')
  const [type_of_factor, setTypeOfFactor] = useState('')
  const [action_taken, setActionTaken] = useState('')
  const [who_will_fix, setWhoWillFix] = useState('')
  const [when_will_fix, setWhenWillFix] = useState('')
  const [planned_completion_date, setPlannedCompletionDate] = useState('')
  const [incidentinvestigation, setIncidentInvestigation] = useState(null)
  const [staffs, setStaffs] = useState([])

  useEffect(() => {
    const h = { Authorization: `Bearer ${authTokens.access}` }

    axios.get(`${API_BASE}/hseapp/incidentfactors/${params.id}/`, { headers: h })
      .then(res => {
        const d = res.data
        setFactor(d.factor || '')
        setTypeOfFactor(d.type_of_factor || '')
        setActionTaken(d.action_taken || '')
        setWhoWillFix(d.who_will_fix || '')
        setWhenWillFix(d.when_will_fix || '')
        setPlannedCompletionDate(d.planned_completion_date || '')
        setIncidentInvestigation(d.incidentinvestigation)
      }).catch(console.log)

    StaffAPI.get('/', { headers: h }).then(res => setStaffs(res.data)).catch(console.log)
  }, [params.id])

  const onUpdate = (e) => {
    e.preventDefault()
    const item = {
      incidentinvestigation,
      factor,
      type_of_factor,
      action_taken,
      who_will_fix: who_will_fix || null,
      when_will_fix: when_will_fix || null,
      planned_completion_date: planned_completion_date || null,
    }
    IncidentFactorsAPI.patch(`/${params.id}/`, item, {
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
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Investigation
        </button>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Contributing Factor</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Update the contributing factor and corrective action details.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onUpdate}>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Factor</Form.Label>
            <Form.Control
              type="text"
              placeholder="Describe the contributing factor..."
              value={factor}
              onChange={e => setFactor(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Type of Factor</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Human, Equipment, Environmental..."
              value={type_of_factor}
              onChange={e => setTypeOfFactor(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Action Taken</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Describe the corrective action taken..."
              value={action_taken}
              onChange={e => setActionTaken(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Who Will Fix It</Form.Label>
            <Form.Select value={who_will_fix} onChange={e => setWhoWillFix(e.target.value)}>
              <option value="">Select staff member...</option>
              {staffs.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.position})</option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-4">
                <Form.Label style={L}>When Will It Be Fixed</Form.Label>
                <Form.Control
                  type="date"
                  value={when_will_fix}
                  onChange={e => setWhenWillFix(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-4">
                <Form.Label style={L}>Planned Completion Date</Form.Label>
                <Form.Control
                  type="date"
                  value={planned_completion_date}
                  onChange={e => setPlannedCompletionDate(e.target.value)}
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
