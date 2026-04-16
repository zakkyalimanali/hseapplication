import { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Table, Form, Button } from 'react-bootstrap'
import AuthContext from '../../context/AuthContext'
import WorkplaceRuleAPI from '../../API/WorkplaceRuleAPI'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'
const LIGHT_PINK = '#FDECEA'

const CATEGORY_COLORS = {
  'General Safety':    { bg: '#EEF2FF', color: '#4F46E5' },
  'PPE':               { bg: '#FEF3C7', color: '#D97706' },
  'Fire Safety':       { bg: '#FEE2E2', color: '#DC2626' },
  'Chemical Handling': { bg: '#F3E8FF', color: '#7C3AED' },
  'Electrical Safety': { bg: '#FEF9C3', color: '#CA8A04' },
  'Working at Heights':{ bg: '#DBEAFE', color: '#2563EB' },
  'Confined Spaces':   { bg: '#FCE7F3', color: '#DB2777' },
  'Manual Handling':   { bg: '#D1FAE5', color: '#059669' },
  'Other':             { bg: '#F3F4F6', color: '#6B7280' },
}

function Workplaceruleslist() {
  const { authTokens } = useContext(AuthContext)

  const [rules, setRules] = useState([])
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [consequence, setConsequence] = useState('')
  const [effectiveDate, setEffectiveDate] = useState('')
  const [document, setDocument] = useState(null)

  useEffect(() => { fetchRules() }, [])

  const fetchRules = () => {
    WorkplaceRuleAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setRules(res.data)).catch(console.log)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('category', category)
    formData.append('description', description)
    formData.append('consequence', consequence)
    if (effectiveDate) formData.append('effective_date', effectiveDate)
    if (document) formData.append('document', document)

    WorkplaceRuleAPI.post('/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authTokens.access}`,
      },
    }).then(() => {
      fetchRules()
      setTitle(''); setCategory(''); setDescription(''); setConsequence('')
      setEffectiveDate(''); setDocument(null)
      e.target.reset()
    }).catch(console.log)
  }

  const onDelete = (id) => {
    WorkplaceRuleAPI.delete(`/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => fetchRules())
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Workplace Rules</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Define and manage workplace safety rules and policies for your site.
        </p>
      </div>

      {/* Add Rule Form */}
      <div style={{
        backgroundColor: 'white', borderRadius: '12px',
        padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '32px',
      }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>Add Workplace Rule</h5>

        <Form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Rule Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Hard hat must be worn at all times"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Category</Form.Label>
                <Form.Select value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="">Select category...</option>
                  {Object.keys(CATEGORY_COLORS).map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Effective Date</Form.Label>
                <Form.Control type="date" value={effectiveDate} onChange={e => setEffectiveDate(e.target.value)} />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Rule Description</Form.Label>
            <Form.Control
              as="textarea" rows={3}
              placeholder="Describe the rule in detail..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-8">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>
                  Consequence of Non-Compliance
                </Form.Label>
                <Form.Control
                  as="textarea" rows={2}
                  placeholder="e.g. Verbal warning for first offence, written warning for repeat..."
                  value={consequence}
                  onChange={e => setConsequence(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>
                  Document <span style={{ color: '#aaa', fontWeight: '400' }}>(optional)</span>
                </Form.Label>
                <Form.Control type="file" onChange={e => setDocument(e.target.files[0])} />
              </Form.Group>
            </div>
          </div>

          <Button
            type="submit"
            className="w-100"
            style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
          >
            Add Rule
          </Button>
        </Form>
      </div>

      {/* Rules Table */}
      <div style={{
        backgroundColor: 'white', borderRadius: '12px',
        padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '16px' }}>
          Workplace Rules ({rules.length})
        </h5>

        {rules.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '32px 0', margin: 0 }}>
            No workplace rules added yet.
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Title</th>
                <th style={{ color: NAVY }}>Category</th>
                <th style={{ color: NAVY }}>Effective Date</th>
                <th style={{ color: NAVY }}>Consequence</th>
                <th style={{ color: NAVY }}>Document</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {rules.map(r => (
                <tr key={r.id}>
                  <td style={{ fontWeight: '600' }}>
                    {r.title}
                    {r.description && (
                      <div style={{ color: '#888', fontSize: '12px', marginTop: '2px', fontWeight: '400' }}>
                        {r.description.length > 80 ? r.description.slice(0, 80) + '…' : r.description}
                      </div>
                    )}
                  </td>
                  <td>
                    {r.category && (() => {
                      const style = CATEGORY_COLORS[r.category] || CATEGORY_COLORS['Other']
                      return (
                        <span style={{
                          backgroundColor: style.bg, color: style.color,
                          padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600',
                        }}>
                          {r.category}
                        </span>
                      )
                    })()}
                  </td>
                  <td style={{ color: '#666', fontSize: '13px' }}>{r.effective_date || '—'}</td>
                  <td style={{ color: '#666', fontSize: '13px', maxWidth: '220px' }}>
                    {r.consequence
                      ? (r.consequence.length > 70 ? r.consequence.slice(0, 70) + '…' : r.consequence)
                      : '—'}
                  </td>
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

export default Workplaceruleslist
