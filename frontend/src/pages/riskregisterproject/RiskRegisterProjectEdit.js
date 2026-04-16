import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import RiskRegisterProjectAPI from '../../API/RiskRegisterProjectAPI'
import RiskRegisterAPI from '../../API/RiskRegisterAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import API_BASE from '../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

const SEVERITY_STYLES = {
  Critical: { bg: '#FEE2E2', color: '#DC2626' },
  High:     { bg: '#FEE2E2', color: '#DC2626' },
  Medium:   { bg: '#FEF3C7', color: '#D97706' },
  Low:      { bg: '#D1FAE5', color: '#059669' },
}

function severityBadge(val) {
  if (!val) return null
  const key = Object.keys(SEVERITY_STYLES).find(k => val.toLowerCase() === k.toLowerCase())
  if (!key) return null
  return SEVERITY_STYLES[key]
}

export default function RiskRegisterProjectEdit() {
  const { authTokens } = useContext(AuthContext)
  const params = useParams()
  const navigate = useNavigate()

  // Project form
  const [project_name, setProjectName] = useState('')
  const [raised_by, setRaisedBy] = useState('')
  const [reviewed_by, setReviewedBy] = useState('')

  // Reference data
  const [staffs, setStaffs] = useState([])
  const [risks, setRisks] = useState([])

  // Add risk form
  const [newRaisedBy, setNewRaisedBy] = useState('')
  const [newReviewedBy, setNewReviewedBy] = useState('')
  const [newRiskDesc, setNewRiskDesc] = useState('')
  const [newLikelihood, setNewLikelihood] = useState('')
  const [newImpact, setNewImpact] = useState('')
  const [newSeverity, setNewSeverity] = useState('')
  const [newResponsible, setNewResponsible] = useState('')
  const [newMitigating, setNewMitigating] = useState('')
  const [newContingency, setNewContingency] = useState('')
  const [newProgress, setNewProgress] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [search, setSearch] = useState('')

  const headers = { Authorization: `Bearer ${authTokens.access}` }

  useEffect(() => {
    axios.get(`${API_BASE}/hseapp/riskregisterproject/${params.id}/`, { headers })
      .then(res => {
        const d = res.data
        setProjectName(d.project_name || '')
        setRaisedBy(d.raised_by || '')
        setReviewedBy(d.reviewed_by || '')
      }).catch(console.log)

    StaffAPI.get('/', { headers }).then(res => setStaffs(res.data)).catch(console.log)
    fetchRisks()
  }, [params.id])

  const fetchRisks = () => {
    RiskRegisterAPI.get('/', { headers }).then(res => setRisks(res.data)).catch(console.log)
  }

  const onUpdate = (e) => {
    e.preventDefault()
    const item = {
      project_name,
      raised_by: raised_by || null,
      reviewed_by: reviewed_by || null,
    }
    RiskRegisterProjectAPI.patch(`/${params.id}/`, item, { headers })
      .then(() => navigate('/riskregisterprojectlist'))
      .catch(console.log)
  }

  const onAddRisk = (e) => {
    e.preventDefault()
    if (!newRiskDesc) return
    const item = {
      project_name: Number(params.id),
      raised_by: newRaisedBy || null,
      reviewed_by: newReviewedBy || null,
      risk_description: newRiskDesc,
      likelihood_of_risk: newLikelihood,
      impact_of_risk: newImpact,
      severity: newSeverity,
      responsible_party: newResponsible,
      mitigating_action: newMitigating,
      contingency_action: newContingency,
      progress_on_actions: newProgress,
      status: newStatus,
    }
    RiskRegisterAPI.post('/', item, { headers })
      .then(() => {
        setNewRaisedBy(''); setNewReviewedBy(''); setNewRiskDesc('')
        setNewLikelihood(''); setNewImpact(''); setNewSeverity('')
        setNewResponsible(''); setNewMitigating(''); setNewContingency('')
        setNewProgress(''); setNewStatus('')
        fetchRisks()
      }).catch(console.log)
  }

  const onDeleteRisk = (id) => {
    RiskRegisterAPI.delete(`/${id}/`, { headers }).then(() => fetchRisks()).catch(console.log)
  }

  const staffName = (id) => staffs.find(s => s.id === id)?.name || '—'

  const projectRisks = risks.filter(r => r.project_name === Number(params.id))
  const filtered = projectRisks.filter(r => {
    const q = search.toLowerCase()
    return (
      (r.risk_description || '').toLowerCase().includes(q) ||
      (r.severity || '').toLowerCase().includes(q) ||
      (r.responsible_party || '').toLowerCase().includes(q) ||
      (r.status || '').toLowerCase().includes(q)
    )
  })

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto' }}>

      {/* Back + Header */}
      <div style={{ marginBottom: '32px' }}>
        <Link to="/riskregisterprojectlist" style={{ color: '#888', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Risk Register
        </Link>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Project</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Update project details and manage risk entries.
        </p>
      </div>

      {/* Project Form */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>Project Details</h5>
        <Form onSubmit={onUpdate}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Project name..."
                  value={project_name}
                  onChange={e => setProjectName(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Raised By</Form.Label>
                <Form.Select value={raised_by} onChange={e => setRaisedBy(e.target.value)}>
                  <option value="">Select...</option>
                  {staffs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Reviewed By</Form.Label>
                <Form.Select value={reviewed_by} onChange={e => setReviewedBy(e.target.value)}>
                  <option value="">Select...</option>
                  {staffs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </Form.Select>
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
            <Link to="/riskregisterprojectlist">
              <Button type="button" style={{ backgroundColor: 'transparent', border: `1.5px solid ${NAVY}`, color: NAVY, fontWeight: '600', padding: '10px 24px' }}>
                Cancel
              </Button>
            </Link>
          </div>
        </Form>
      </div>

      {/* Add Risk Form */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>
          Add Risk Entry
        </h5>
        <Form onSubmit={onAddRisk}>
          <div className="row">
            <div className="col-md-12">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Risk Description</Form.Label>
                <Form.Control
                  as="textarea" rows={2}
                  placeholder="Describe the risk..."
                  value={newRiskDesc}
                  onChange={e => setNewRiskDesc(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Likelihood</Form.Label>
                <Form.Control type="text" placeholder="e.g. High, Medium, Low" value={newLikelihood} onChange={e => setNewLikelihood(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Impact</Form.Label>
                <Form.Control type="text" placeholder="e.g. High, Medium, Low" value={newImpact} onChange={e => setNewImpact(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Severity</Form.Label>
                <Form.Select value={newSeverity} onChange={e => setNewSeverity(e.target.value)}>
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
                <Form.Control type="text" placeholder="e.g. Open, Closed" value={newStatus} onChange={e => setNewStatus(e.target.value)} />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Responsible Party</Form.Label>
                <Form.Control type="text" placeholder="Who is responsible?" value={newResponsible} onChange={e => setNewResponsible(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Raised By</Form.Label>
                <Form.Select value={newRaisedBy} onChange={e => setNewRaisedBy(e.target.value)}>
                  <option value="">Select...</option>
                  {staffs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Reviewed By</Form.Label>
                <Form.Select value={newReviewedBy} onChange={e => setNewReviewedBy(e.target.value)}>
                  <option value="">Select...</option>
                  {staffs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Mitigating Action</Form.Label>
                <Form.Control type="text" placeholder="Action to reduce risk..." value={newMitigating} onChange={e => setNewMitigating(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Contingency Action</Form.Label>
                <Form.Control type="text" placeholder="Fallback action..." value={newContingency} onChange={e => setNewContingency(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Progress on Actions</Form.Label>
                <Form.Control type="text" placeholder="Current progress..." value={newProgress} onChange={e => setNewProgress(e.target.value)} />
              </Form.Group>
            </div>
          </div>
          <Button
            type="submit"
            disabled={!newRiskDesc}
            style={{ backgroundColor: NAVY, border: 'none', fontWeight: '600', padding: '8px 20px' }}
          >
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '6px' }} />
            Add Risk
          </Button>
        </Form>
      </div>

      {/* Risks Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h5 style={{ color: NAVY, fontWeight: '700', margin: 0 }}>
            Risk Entries
            <span style={{ marginLeft: '10px', fontSize: '13px', fontWeight: '600', color: '#D97706', backgroundColor: '#FEF3C7', padding: '2px 8px', borderRadius: '6px' }}>
              {projectRisks.length}
            </span>
          </h5>
          <input
            type="text"
            placeholder="Search risks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              border: '1.5px solid #e5e7eb', borderRadius: '8px',
              padding: '7px 14px', fontSize: '13px', width: '240px', outline: 'none',
            }}
          />
        </div>

        {filtered.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '30px 0', margin: 0, fontSize: '14px' }}>
            {projectRisks.length === 0 ? 'No risks added to this project yet.' : 'No results match your search.'}
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '13px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Risk Description</th>
                <th style={{ color: NAVY }}>Likelihood</th>
                <th style={{ color: NAVY }}>Impact</th>
                <th style={{ color: NAVY }}>Severity</th>
                <th style={{ color: NAVY }}>Responsible</th>
                <th style={{ color: NAVY }}>Status</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => {
                const badge = severityBadge(r.severity)
                return (
                  <tr key={r.id}>
                    <td style={{ fontWeight: '600', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.risk_description || '—'}
                    </td>
                    <td style={{ color: '#666' }}>{r.likelihood_of_risk || '—'}</td>
                    <td style={{ color: '#666' }}>{r.impact_of_risk || '—'}</td>
                    <td>
                      {badge ? (
                        <span style={{ backgroundColor: badge.bg, color: badge.color, padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                          {r.severity}
                        </span>
                      ) : <span style={{ color: '#666' }}>{r.severity || '—'}</span>}
                    </td>
                    <td style={{ color: '#666' }}>{r.responsible_party || '—'}</td>
                    <td style={{ color: '#666' }}>{r.status || '—'}</td>
                    <td>
                      <Link to={`/riskregisteredit/${r.id}`} style={{ color: NAVY }}>
                        <FontAwesomeIcon icon={faPen} />
                      </Link>
                    </td>
                    <td>
                      <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDeleteRisk(r.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        )}
      </div>

    </div>
  )
}
