import { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Table, Form, Button, Badge } from 'react-bootstrap'
import AuthContext from '../../context/AuthContext'
import HseAuditAPI from '../../API/HseAuditAPI'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

const STATUS_COLORS = {
  'Open':        { bg: '#FEF3C7', color: '#92400E' },
  'In Progress': { bg: '#DBEAFE', color: '#1E40AF' },
  'Closed':      { bg: '#D1FAE5', color: '#065F46' },
}

function Hseaditlist() {
  const { authTokens } = useContext(AuthContext)

  const [audits, setAudits] = useState([])
  const [title, setTitle] = useState('')
  const [auditType, setAuditType] = useState('')
  const [auditDate, setAuditDate] = useState('')
  const [auditor, setAuditor] = useState('')
  const [location, setLocation] = useState('')
  const [findings, setFindings] = useState('')
  const [correctiveActions, setCorrectiveActions] = useState('')
  const [status, setStatus] = useState('Open')
  const [document, setDocument] = useState(null)

  useEffect(() => { fetchAudits() }, [])

  const fetchAudits = () => {
    HseAuditAPI.get('/')
      .then(res => setAudits(res.data))
      .catch(console.log)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('audit_type', auditType)
    formData.append('audit_date', auditDate)
    formData.append('auditor', auditor)
    formData.append('location', location)
    formData.append('findings', findings)
    formData.append('corrective_actions', correctiveActions)
    formData.append('status', status)
    if (document) formData.append('document', document)

    HseAuditAPI.post('/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authTokens.access}`,
      },
    }).then(() => {
      fetchAudits()
      setTitle(''); setAuditType(''); setAuditDate(''); setAuditor('')
      setLocation(''); setFindings(''); setCorrectiveActions(''); setStatus('Open')
      setDocument(null)
      e.target.reset()
    }).catch(console.log)
  }

  const onDelete = (id) => {
    HseAuditAPI.delete(`/${id}/`, {
      headers: { 'Authorization': `Bearer ${authTokens.access}` },
    }).then(() => fetchAudits())
  }

  const statusBadge = (s) => {
    const style = STATUS_COLORS[s] || { bg: '#f3f4f6', color: '#374151' }
    return (
      <span style={{
        backgroundColor: style.bg, color: style.color,
        padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600',
      }}>
        {s}
      </span>
    )
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>HSE Audit</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Record and track health, safety and environment audits across your workplace.
        </p>
      </div>

      {/* Form card */}
      <div style={{
        backgroundColor: 'white', borderRadius: '12px',
        padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '32px',
      }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>Add New Audit</h5>

        <Form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Audit Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Q2 Site Safety Audit"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Audit Type</Form.Label>
                <Form.Select value={auditType} onChange={e => setAuditType(e.target.value)}>
                  <option value="">Select type...</option>
                  <option>Internal</option>
                  <option>External</option>
                  <option>Regulatory</option>
                  <option>Surprise</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Audit Date</Form.Label>
                <Form.Control
                  type="date"
                  value={auditDate}
                  onChange={e => setAuditDate(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Auditor</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name of auditor"
                  value={auditor}
                  onChange={e => setAuditor(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Location / Area</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Warehouse Block A"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-2">
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
            <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Findings / Observations</Form.Label>
            <Form.Control
              as="textarea" rows={3}
              placeholder="Describe what was found during the audit..."
              value={findings}
              onChange={e => setFindings(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Corrective Actions</Form.Label>
            <Form.Control
              as="textarea" rows={3}
              placeholder="List the corrective actions to be taken..."
              value={correctiveActions}
              onChange={e => setCorrectiveActions(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>
              Audit Report <span style={{ color: '#aaa', fontWeight: '400' }}>(optional)</span>
            </Form.Label>
            <Form.Control type="file" onChange={e => setDocument(e.target.files[0])} />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
          >
            Save Audit
          </Button>
        </Form>
      </div>

      {/* Table */}
      <div style={{
        backgroundColor: 'white', borderRadius: '12px',
        padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '16px' }}>
          Audit Records ({audits.length})
        </h5>

        {audits.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '32px 0', margin: 0 }}>
            No audits recorded yet.
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>ID</th>
                <th style={{ color: NAVY }}>Title</th>
                <th style={{ color: NAVY }}>Type</th>
                <th style={{ color: NAVY }}>Date</th>
                <th style={{ color: NAVY }}>Auditor</th>
                <th style={{ color: NAVY }}>Location</th>
                <th style={{ color: NAVY }}>Status</th>
                <th style={{ color: NAVY }}>Report</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {audits.map(a => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td style={{ fontWeight: '600' }}>{a.title}</td>
                  <td>
                    {a.audit_type && (
                      <span style={{
                        backgroundColor: '#EEF2FF', color: NAVY,
                        padding: '2px 8px', borderRadius: '4px', fontSize: '12px',
                      }}>
                        {a.audit_type}
                      </span>
                    )}
                  </td>
                  <td style={{ color: '#666' }}>{a.audit_date}</td>
                  <td>{a.auditor}</td>
                  <td style={{ color: '#666' }}>{a.location}</td>
                  <td>{statusBadge(a.status)}</td>
                  <td>
                    {a.document
                      ? <a href={a.document} download style={{ color: ORANGE, fontWeight: '600' }}>Download</a>
                      : <span style={{ color: '#ccc' }}>—</span>
                    }
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(a.id)}>
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

export default Hseaditlist
