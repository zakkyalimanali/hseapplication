import { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Table, Form, Button } from 'react-bootstrap'
import AuthContext from '../../context/AuthContext'
import RiskMitigationAPI from '../../API/RiskMitigationAPI'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

const PRIORITY_STYLES = {
  Critical: { bg: '#FEE2E2', color: '#DC2626' },
  High:     { bg: '#FEF3C7', color: '#D97706' },
  Medium:   { bg: '#FEF9C3', color: '#CA8A04' },
  Low:      { bg: '#D1FAE5', color: '#059669' },
}

const STATUS_STYLES = {
  'Open':       { bg: '#FEE2E2', color: '#DC2626' },
  'In Progress':{ bg: '#DBEAFE', color: '#2563EB' },
  'Completed':  { bg: '#D1FAE5', color: '#059669' },
  'Verified':   { bg: '#EDE9FE', color: '#7C3AED' },
}

function Riskmitigationlist() {
  const { authTokens } = useContext(AuthContext)

  const [mitigations, setMitigations] = useState([])
  const [riskTitle, setRiskTitle] = useState('')
  const [mitigationAction, setMitigationAction] = useState('')
  const [priority, setPriority] = useState('')
  const [responsiblePerson, setResponsiblePerson] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [completionDate, setCompletionDate] = useState('')
  const [status, setStatus] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => { fetchMitigations() }, [])

  const fetchMitigations = () => {
    RiskMitigationAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setMitigations(res.data)).catch(console.log)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const payload = {
      risk_title: riskTitle,
      mitigation_action: mitigationAction,
      priority,
      responsible_person: responsiblePerson,
      target_date: targetDate || null,
      completion_date: completionDate || null,
      status,
      notes,
    }

    RiskMitigationAPI.post('/', payload, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => {
      fetchMitigations()
      setRiskTitle(''); setMitigationAction(''); setPriority(''); setResponsiblePerson('')
      setTargetDate(''); setCompletionDate(''); setStatus(''); setNotes('')
      e.target.reset()
    }).catch(console.log)
  }

  const onDelete = (id) => {
    RiskMitigationAPI.delete(`/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => fetchMitigations())
  }

  const priorityStyle = PRIORITY_STYLES[priority] || {}

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Risk Mitigation</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Track mitigation actions for identified risks and monitor their progress to completion.
        </p>
      </div>

      {/* Summary cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px', marginBottom: '32px',
      }}>
        {Object.entries(STATUS_STYLES).map(([s, style]) => (
          <div key={s} style={{
            backgroundColor: 'white', borderRadius: '10px', padding: '20px 16px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.07)', textAlign: 'center',
          }}>
            <div style={{ fontSize: '28px', fontWeight: '800', color: style.color }}>
              {mitigations.filter(m => m.status === s).length}
            </div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{s}</div>
          </div>
        ))}
        <div style={{
          backgroundColor: NAVY, borderRadius: '10px', padding: '20px 16px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.07)', textAlign: 'center',
        }}>
          <div style={{ fontSize: '28px', fontWeight: '800', color: 'white' }}>
            {mitigations.length}
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>Total</div>
        </div>
      </div>

      {/* Add Mitigation Form */}
      <div style={{
        backgroundColor: 'white', borderRadius: '12px',
        padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '32px',
      }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>Add Mitigation Action</h5>

        <Form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Risk Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Unguarded machinery on production floor"
                  value={riskTitle}
                  onChange={e => setRiskTitle(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Priority</Form.Label>
                <Form.Select value={priority} onChange={e => setPriority(e.target.value)}>
                  <option value="">Select priority...</option>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Status</Form.Label>
                <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="">Select status...</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Verified</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          {/* Live priority indicator */}
          {priority && (
            <div style={{
              backgroundColor: priorityStyle.bg, border: `1px solid ${priorityStyle.color}33`,
              borderRadius: '8px', padding: '10px 16px', marginBottom: '16px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{ color: priorityStyle.color, fontWeight: '700', fontSize: '13px' }}>
                {priority} Priority
              </span>
              <span style={{ color: '#888', fontSize: '13px' }}>
                {priority === 'Critical' && '— Immediate action required'}
                {priority === 'High' && '— Address within 24–48 hours'}
                {priority === 'Medium' && '— Address within this week'}
                {priority === 'Low' && '— Address when possible'}
              </span>
            </div>
          )}

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Mitigation Action</Form.Label>
            <Form.Control
              as="textarea" rows={3}
              placeholder="Describe the action to be taken to mitigate or eliminate this risk..."
              value={mitigationAction}
              onChange={e => setMitigationAction(e.target.value)}
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Responsible Person</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name of person responsible"
                  value={responsiblePerson}
                  onChange={e => setResponsiblePerson(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Target Date</Form.Label>
                <Form.Control type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>
                  Completion Date <span style={{ color: '#aaa', fontWeight: '400' }}>(if done)</span>
                </Form.Label>
                <Form.Control type="date" value={completionDate} onChange={e => setCompletionDate(e.target.value)} />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Notes</Form.Label>
            <Form.Control
              as="textarea" rows={2}
              placeholder="Any additional notes or progress updates..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
          >
            Add Mitigation Action
          </Button>
        </Form>
      </div>

      {/* Mitigations Table */}
      <div style={{
        backgroundColor: 'white', borderRadius: '12px',
        padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '16px' }}>
          Mitigation Actions ({mitigations.length})
        </h5>

        {mitigations.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '32px 0', margin: 0 }}>
            No mitigation actions recorded yet.
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Risk Title</th>
                <th style={{ color: NAVY }}>Priority</th>
                <th style={{ color: NAVY }}>Status</th>
                <th style={{ color: NAVY }}>Responsible</th>
                <th style={{ color: NAVY }}>Target Date</th>
                <th style={{ color: NAVY }}>Completed</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {mitigations.map(m => (
                <tr key={m.id}>
                  <td style={{ fontWeight: '600' }}>
                    {m.risk_title}
                    {m.mitigation_action && (
                      <div style={{ color: '#888', fontSize: '12px', marginTop: '2px', fontWeight: '400' }}>
                        {m.mitigation_action.length > 70
                          ? m.mitigation_action.slice(0, 70) + '…'
                          : m.mitigation_action}
                      </div>
                    )}
                  </td>
                  <td>
                    {m.priority && (() => {
                      const s = PRIORITY_STYLES[m.priority] || {}
                      return (
                        <span style={{
                          backgroundColor: s.bg, color: s.color,
                          padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600',
                        }}>
                          {m.priority}
                        </span>
                      )
                    })()}
                  </td>
                  <td>
                    {m.status && (() => {
                      const s = STATUS_STYLES[m.status] || {}
                      return (
                        <span style={{
                          backgroundColor: s.bg, color: s.color,
                          padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600',
                        }}>
                          {m.status}
                        </span>
                      )
                    })()}
                  </td>
                  <td style={{ color: '#666' }}>{m.responsible_person || '—'}</td>
                  <td style={{ color: '#666', fontSize: '13px' }}>{m.target_date || '—'}</td>
                  <td style={{ color: '#666', fontSize: '13px' }}>
                    {m.completion_date
                      ? <span style={{ color: '#059669', fontWeight: '600' }}>{m.completion_date}</span>
                      : <span style={{ color: '#ccc' }}>—</span>}
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(m.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  )
}

export default Riskmitigationlist
