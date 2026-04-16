import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import RiskRegisterAPI from '../../../API/RiskRegisterAPI'
import StaffAPI from '../../../API/StaffAPI'
import AuthContext from '../../../context/AuthContext'
import axios from 'axios'
import API_BASE from '../../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function RiskRegisterEdit() {
  const { authTokens } = useContext(AuthContext)
  const params = useParams()
  const navigate = useNavigate()

  const [project_name, setProjectName] = useState(null)
  const [raised_by, setRaisedBy] = useState('')
  const [reviewed_by, setReviewedBy] = useState('')
  const [risk_description, setRiskDescription] = useState('')
  const [likelihood_of_risk, setLikelihoodOfRisk] = useState('')
  const [impact_of_risk, setImpactOfRisk] = useState('')
  const [severity, setSeverity] = useState('')
  const [responsible_party, setResponsibleParty] = useState('')
  const [mitigating_action, setMitigatingAction] = useState('')
  const [contingency_action, setContingencyAction] = useState('')
  const [progress_on_actions, setProgressOnActions] = useState('')
  const [status, setStatus] = useState('')
  const [staffs, setStaffs] = useState([])

  useEffect(() => {
    const h = { Authorization: `Bearer ${authTokens.access}` }

    axios.get(`${API_BASE}/hseapp/riskregister/${params.id}/`, { headers: h })
      .then(res => {
        const d = res.data
        setProjectName(d.project_name)
        setRaisedBy(d.raised_by || '')
        setReviewedBy(d.reviewed_by || '')
        setRiskDescription(d.risk_description || '')
        setLikelihoodOfRisk(d.likelihood_of_risk || '')
        setImpactOfRisk(d.impact_of_risk || '')
        setSeverity(d.severity || '')
        setResponsibleParty(d.responsible_party || '')
        setMitigatingAction(d.mitigating_action || '')
        setContingencyAction(d.contingency_action || '')
        setProgressOnActions(d.progress_on_actions || '')
        setStatus(d.status || '')
      }).catch(console.log)

    StaffAPI.get('/', { headers: h }).then(res => setStaffs(res.data)).catch(console.log)
  }, [params.id])

  const onUpdate = (e) => {
    e.preventDefault()
    const item = {
      project_name,
      raised_by: raised_by || null,
      reviewed_by: reviewed_by || null,
      risk_description,
      likelihood_of_risk,
      impact_of_risk,
      severity,
      responsible_party,
      mitigating_action,
      contingency_action,
      progress_on_actions,
      status,
    }
    RiskRegisterAPI.patch(`/${params.id}/`, item, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => navigate(-1)).catch(console.log)
  }

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

  return (
    <div style={{ padding: '40px', maxWidth: '860px', margin: '0 auto' }}>

      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', padding: 0, color: '#888', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Project
        </button>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Risk Entry</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Update risk details, severity, and corrective actions.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onUpdate}>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Risk Description</Form.Label>
            <Form.Control
              as="textarea" rows={3}
              placeholder="Describe the risk..."
              value={risk_description}
              onChange={e => setRiskDescription(e.target.value)}
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Likelihood</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. High, Medium, Low"
                  value={likelihood_of_risk}
                  onChange={e => setLikelihoodOfRisk(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Impact</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. High, Medium, Low"
                  value={impact_of_risk}
                  onChange={e => setImpactOfRisk(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Severity</Form.Label>
                <Form.Select value={severity} onChange={e => setSeverity(e.target.value)}>
                  <option value="">Select...</option>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Open, Closed"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Responsible Party</Form.Label>
            <Form.Control
              type="text"
              placeholder="Who is responsible for this risk?"
              value={responsible_party}
              onChange={e => setResponsibleParty(e.target.value)}
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Raised By</Form.Label>
                <Form.Select value={raised_by} onChange={e => setRaisedBy(e.target.value)}>
                  <option value="">Select...</option>
                  {staffs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Reviewed By</Form.Label>
                <Form.Select value={reviewed_by} onChange={e => setReviewedBy(e.target.value)}>
                  <option value="">Select...</option>
                  {staffs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Mitigating Action</Form.Label>
            <Form.Control
              type="text"
              placeholder="Action taken to reduce the risk..."
              value={mitigating_action}
              onChange={e => setMitigatingAction(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Contingency Action</Form.Label>
            <Form.Control
              type="text"
              placeholder="Fallback action if the risk materialises..."
              value={contingency_action}
              onChange={e => setContingencyAction(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={L}>Progress on Actions</Form.Label>
            <Form.Control
              type="text"
              placeholder="Current progress on corrective actions..."
              value={progress_on_actions}
              onChange={e => setProgressOnActions(e.target.value)}
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
