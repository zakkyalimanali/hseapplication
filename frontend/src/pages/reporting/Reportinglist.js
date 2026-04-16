import { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Table, Form, Button } from 'react-bootstrap'
import AuthContext from '../../context/AuthContext'
import ReportAPI from '../../API/ReportAPI'
import API_BASE from '../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'
const LIGHT_PINK = '#FDECEA'

// Stat modules to fetch counts from
const STAT_MODULES = [
  { label: 'Incidents',             endpoint: '/hseapp/incident/',                icon: '⚠️' },
  { label: 'Incident Investigations',endpoint: '/hseapp/incidentinvestigation/',   icon: '🔍' },
  { label: 'Permit to Work',        endpoint: '/hseapp/permittowork/',             icon: '📋' },
  { label: 'Job Safety Analysis',   endpoint: '/hseapp/jobsafetyanalysis/',        icon: '🛡️' },
  { label: 'Training Records',      endpoint: '/hseapp/training/',                 icon: '🎓' },
  { label: 'Toolbox Talks',         endpoint: '/hseapp/toolboxtalk/',              icon: '🗣️' },
  { label: 'Site Visits',           endpoint: '/hseapp/sitevisit/',                icon: '📍' },
  { label: 'Risk Register',         endpoint: '/hseapp/riskregisterproject/',      icon: '📊' },
  { label: 'HSE Audits',            endpoint: '/hseapp/hseaudit/',                 icon: '✅' },
  { label: 'Emergency Plans',       endpoint: '/hseapp/emergencyplan/',            icon: '🚨' },
  { label: 'Risk Management',       endpoint: '/hseapp/riskmanagement/',           icon: '⚖️' },
  { label: 'Safe Work Practices',   endpoint: '/hseapp/safeworkpractice/',         icon: '📗' },
]

function Reportinglist() {
  const { authTokens } = useContext(AuthContext)

  const [stats, setStats] = useState({})
  const [reports, setReports] = useState([])
  const [title, setTitle] = useState('')
  const [reportType, setReportType] = useState('')
  const [periodFrom, setPeriodFrom] = useState('')
  const [periodTo, setPeriodTo] = useState('')
  const [generatedBy, setGeneratedBy] = useState('')
  const [notes, setNotes] = useState('')
  const [document, setDocument] = useState(null)

  useEffect(() => {
    fetchStats()
    fetchReports()
  }, [])

  const fetchStats = async () => {
    const headers = { Authorization: `Bearer ${authTokens.access}` }
    const results = {}
    await Promise.all(
      STAT_MODULES.map(async (m) => {
        try {
          const res = await fetch(`${API_BASE}${m.endpoint}`, { headers })
          const data = await res.json()
          results[m.label] = Array.isArray(data) ? data.length : (data.count ?? '—')
        } catch {
          results[m.label] = '—'
        }
      })
    )
    setStats(results)
  }

  const fetchReports = () => {
    ReportAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setReports(res.data)).catch(console.log)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('report_type', reportType)
    if (periodFrom) formData.append('period_from', periodFrom)
    if (periodTo) formData.append('period_to', periodTo)
    formData.append('generated_by', generatedBy)
    formData.append('notes', notes)
    if (document) formData.append('document', document)

    ReportAPI.post('/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authTokens.access}`,
      },
    }).then(() => {
      fetchReports()
      setTitle(''); setReportType(''); setPeriodFrom(''); setPeriodTo('')
      setGeneratedBy(''); setNotes(''); setDocument(null)
      e.target.reset()
    }).catch(console.log)
  }

  const onDelete = (id) => {
    ReportAPI.delete(`/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => fetchReports())
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Reporting</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Overview of HSE activity across all modules and saved report documents.
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ marginBottom: '40px' }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '16px' }}>Activity Summary</h5>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '16px',
        }}>
          {STAT_MODULES.map(m => (
            <div key={m.label} style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '20px 16px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{m.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: NAVY }}>
                {stats[m.label] !== undefined ? stats[m.label] : '…'}
              </div>
              <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Save report form */}
      <div style={{
        backgroundColor: 'white', borderRadius: '12px',
        padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '32px',
      }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>Save a Report</h5>

        <Form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Report Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Q2 2026 HSE Summary Report"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Report Type</Form.Label>
                <Form.Select value={reportType} onChange={e => setReportType(e.target.value)}>
                  <option value="">Select type...</option>
                  <option>Incident</option>
                  <option>Audit</option>
                  <option>Training</option>
                  <option>Risk</option>
                  <option>Site Visit</option>
                  <option>Permit to Work</option>
                  <option>Custom</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Generated By</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your name"
                  value={generatedBy}
                  onChange={e => setGeneratedBy(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Period From</Form.Label>
                <Form.Control type="date" value={periodFrom} onChange={e => setPeriodFrom(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Period To</Form.Label>
                <Form.Control type="date" value={periodTo} onChange={e => setPeriodTo(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>
                  Report Document <span style={{ color: '#aaa', fontWeight: '400' }}>(optional)</span>
                </Form.Label>
                <Form.Control type="file" onChange={e => setDocument(e.target.files[0])} />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Notes</Form.Label>
            <Form.Control
              as="textarea" rows={2}
              placeholder="Any notes or summary about this report..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
          >
            Save Report
          </Button>
        </Form>
      </div>

      {/* Saved reports table */}
      <div style={{
        backgroundColor: 'white', borderRadius: '12px',
        padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '16px' }}>
          Saved Reports ({reports.length})
        </h5>

        {reports.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '32px 0', margin: 0 }}>
            No reports saved yet.
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Title</th>
                <th style={{ color: NAVY }}>Type</th>
                <th style={{ color: NAVY }}>Period</th>
                <th style={{ color: NAVY }}>Generated By</th>
                <th style={{ color: NAVY }}>Date Saved</th>
                <th style={{ color: NAVY }}>Document</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(r => (
                <tr key={r.id}>
                  <td style={{ fontWeight: '600' }}>
                    {r.title}
                    {r.notes && (
                      <div style={{ color: '#888', fontSize: '12px', marginTop: '2px' }}>
                        {r.notes.length > 60 ? r.notes.slice(0, 60) + '…' : r.notes}
                      </div>
                    )}
                  </td>
                  <td>
                    {r.report_type && (
                      <span style={{
                        backgroundColor: LIGHT_PINK, color: ORANGE,
                        padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600',
                      }}>
                        {r.report_type}
                      </span>
                    )}
                  </td>
                  <td style={{ color: '#666', fontSize: '13px' }}>
                    {r.period_from && r.period_to
                      ? `${r.period_from} → ${r.period_to}`
                      : r.period_from || r.period_to || '—'}
                  </td>
                  <td>{r.generated_by}</td>
                  <td style={{ color: '#888' }}>{r.created_on}</td>
                  <td>
                    {r.document
                      ? <a href={r.document} download style={{ color: ORANGE, fontWeight: '600' }}>Download</a>
                      : <span style={{ color: '#ccc' }}>—</span>
                    }
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(r.id)}>
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

export default Reportinglist
