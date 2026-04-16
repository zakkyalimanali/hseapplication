import { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Table, Form, Button } from 'react-bootstrap'
import AuthContext from '../../context/AuthContext'
import RiskManagementAPI from '../../API/RiskManagementAPI'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

// Risk rating = likelihood × consequence
const getRiskRating = (likelihood, consequence) => {
  const score = parseInt(likelihood || 0) * parseInt(consequence || 0)
  if (score >= 15) return { label: 'Critical', bg: '#FEE2E2', color: '#991B1B', score }
  if (score >= 8)  return { label: 'High',     bg: '#FED7AA', color: '#C2410C', score }
  if (score >= 4)  return { label: 'Medium',   bg: '#FEF3C7', color: '#92400E', score }
  if (score >= 1)  return { label: 'Low',      bg: '#D1FAE5', color: '#065F46', score }
  return { label: '—', bg: '#F3F4F6', color: '#9CA3AF', score: 0 }
}

const STATUS_COLORS = {
  'Open':        { bg: '#FEF3C7', color: '#92400E' },
  'In Progress': { bg: '#DBEAFE', color: '#1E40AF' },
  'Closed':      { bg: '#D1FAE5', color: '#065F46' },
}

const badge = (label, bg, color) => (
  <span style={{
    backgroundColor: bg, color,
    padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600',
  }}>{label}</span>
)

const LIKELIHOOD_LABELS = { '1': 'Rare', '2': 'Unlikely', '3': 'Possible', '4': 'Likely', '5': 'Almost Certain' }
const CONSEQUENCE_LABELS = { '1': 'Insignificant', '2': 'Minor', '3': 'Moderate', '4': 'Major', '5': 'Catastrophic' }

function Riskmanagementlist() {
  const { authTokens } = useContext(AuthContext)

  const [risks, setRisks] = useState([])
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [hazardDescription, setHazardDescription] = useState('')
  const [likelihood, setLikelihood] = useState('')
  const [consequence, setConsequence] = useState('')
  const [existingControls, setExistingControls] = useState('')
  const [additionalControls, setAdditionalControls] = useState('')
  const [responsiblePerson, setResponsiblePerson] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [status, setStatus] = useState('Open')

  useEffect(() => { fetchRisks() }, [])

  const fetchRisks = () => {
    RiskManagementAPI.get('/')
      .then(res => setRisks(res.data))
      .catch(console.log)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const item = {
      title, category, hazard_description: hazardDescription,
      likelihood, consequence, existing_controls: existingControls,
      additional_controls: additionalControls,
      responsible_person: responsiblePerson,
      target_date: targetDate || null, status,
    }
    RiskManagementAPI.post('/', item, {
      headers: { 'Authorization': `Bearer ${authTokens.access}` },
    }).then(() => {
      fetchRisks()
      setTitle(''); setCategory(''); setHazardDescription('')
      setLikelihood(''); setConsequence(''); setExistingControls('')
      setAdditionalControls(''); setResponsiblePerson('')
      setTargetDate(''); setStatus('Open')
    }).catch(console.log)
  }

  const onDelete = (id) => {
    RiskManagementAPI.delete(`/${id}/`, {
      headers: { 'Authorization': `Bearer ${authTokens.access}` },
    }).then(() => fetchRisks())
  }

  const liveRating = getRiskRating(likelihood, consequence)

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Risk Management</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Identify, assess and control workplace risks using a likelihood × consequence matrix.
        </p>
      </div>

      {/* Form card */}
      <div style={{
        backgroundColor: 'white', borderRadius: '12px',
        padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '32px',
      }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>Add New Risk</h5>

        <Form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Risk Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Slip hazard near loading bay"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Category</Form.Label>
                <Form.Select value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="">Select...</option>
                  {['Physical','Chemical','Biological','Ergonomic','Psychosocial','Environmental','Other'].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Status</Form.Label>
                <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Closed</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Hazard Description</Form.Label>
            <Form.Control
              as="textarea" rows={2}
              placeholder="Describe the hazard and who or what may be harmed..."
              value={hazardDescription}
              onChange={e => setHazardDescription(e.target.value)}
            />
          </Form.Group>

          {/* Risk Matrix */}
          <div style={{
            backgroundColor: '#F8FAFC', borderRadius: '10px',
            padding: '20px', marginBottom: '16px',
            border: '1px solid #E2E8F0',
          }}>
            <p style={{ fontWeight: '700', fontSize: '14px', color: NAVY, margin: '0 0 16px' }}>
              Risk Assessment Matrix
            </p>
            <div className="row align-items-end">
              <div className="col-md-4">
                <Form.Group className="mb-0">
                  <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Likelihood</Form.Label>
                  <Form.Select value={likelihood} onChange={e => setLikelihood(e.target.value)}>
                    <option value="">Select...</option>
                    <option value="1">1 — Rare</option>
                    <option value="2">2 — Unlikely</option>
                    <option value="3">3 — Possible</option>
                    <option value="4">4 — Likely</option>
                    <option value="5">5 — Almost Certain</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-0">
                  <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Consequence</Form.Label>
                  <Form.Select value={consequence} onChange={e => setConsequence(e.target.value)}>
                    <option value="">Select...</option>
                    <option value="1">1 — Insignificant</option>
                    <option value="2">2 — Minor</option>
                    <option value="3">3 — Moderate</option>
                    <option value="4">4 — Major</option>
                    <option value="5">5 — Catastrophic</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-4">
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '12px', color: '#888', margin: '0 0 6px' }}>Risk Rating</p>
                  <div style={{
                    backgroundColor: liveRating.bg, color: liveRating.color,
                    borderRadius: '8px', padding: '10px 16px',
                    fontWeight: '700', fontSize: '16px',
                  }}>
                    {liveRating.score > 0 ? `${liveRating.score} — ${liveRating.label}` : '—'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Existing Controls</Form.Label>
                <Form.Control
                  as="textarea" rows={3}
                  placeholder="What controls are already in place?"
                  value={existingControls}
                  onChange={e => setExistingControls(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Additional Controls Required</Form.Label>
                <Form.Control
                  as="textarea" rows={3}
                  placeholder="What further controls are needed?"
                  value={additionalControls}
                  onChange={e => setAdditionalControls(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Responsible Person</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Who is responsible for implementing controls?"
                  value={responsiblePerson}
                  onChange={e => setResponsiblePerson(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Target Date</Form.Label>
                <Form.Control
                  type="date"
                  value={targetDate}
                  onChange={e => setTargetDate(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <Button
            type="submit"
            className="w-100"
            style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
          >
            Save Risk
          </Button>
        </Form>
      </div>

      {/* Table */}
      <div style={{
        backgroundColor: 'white', borderRadius: '12px',
        padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '16px' }}>
          Risk Register ({risks.length})
        </h5>

        {risks.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '32px 0', margin: 0 }}>
            No risks recorded yet.
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>ID</th>
                <th style={{ color: NAVY }}>Title</th>
                <th style={{ color: NAVY }}>Category</th>
                <th style={{ color: NAVY }}>Likelihood</th>
                <th style={{ color: NAVY }}>Consequence</th>
                <th style={{ color: NAVY }}>Risk Rating</th>
                <th style={{ color: NAVY }}>Responsible</th>
                <th style={{ color: NAVY }}>Target Date</th>
                <th style={{ color: NAVY }}>Status</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {risks.map(r => {
                const rating = getRiskRating(r.likelihood, r.consequence)
                const sc = STATUS_COLORS[r.status] || { bg: '#f3f4f6', color: '#374151' }
                return (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td style={{ fontWeight: '600' }}>
                      <div>{r.title}</div>
                      {r.hazard_description && (
                        <div style={{ color: '#888', fontSize: '12px', marginTop: '2px' }}>
                          {r.hazard_description.length > 60
                            ? r.hazard_description.slice(0, 60) + '…'
                            : r.hazard_description}
                        </div>
                      )}
                    </td>
                    <td>
                      {r.category && (
                        <span style={{
                          backgroundColor: '#EEF2FF', color: NAVY,
                          padding: '2px 8px', borderRadius: '4px', fontSize: '12px',
                        }}>{r.category}</span>
                      )}
                    </td>
                    <td style={{ color: '#555' }}>{LIKELIHOOD_LABELS[r.likelihood] || '—'}</td>
                    <td style={{ color: '#555' }}>{CONSEQUENCE_LABELS[r.consequence] || '—'}</td>
                    <td>{rating.score > 0 && badge(`${rating.score} — ${rating.label}`, rating.bg, rating.color)}</td>
                    <td>{r.responsible_person}</td>
                    <td style={{ color: '#666' }}>{r.target_date || '—'}</td>
                    <td>{r.status && badge(r.status, sc.bg, sc.color)}</td>
                    <td>
                      <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(r.id)}>
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

export default Riskmanagementlist
