import { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Table, Form, Button } from 'react-bootstrap'
import AuthContext from '../../context/AuthContext'
import EmergencyPlanAPI from '../../API/EmergencyPlanAPI'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

const STATUS_COLORS = {
  'Draft':        { bg: '#F3F4F6', color: '#374151' },
  'Active':       { bg: '#D1FAE5', color: '#065F46' },
  'Under Review': { bg: '#FEF3C7', color: '#92400E' },
  'Archived':     { bg: '#E5E7EB', color: '#6B7280' },
}

const TYPE_COLORS = {
  'Fire':             { bg: '#FEE2E2', color: '#991B1B' },
  'Medical':          { bg: '#DBEAFE', color: '#1E40AF' },
  'Chemical Spill':   { bg: '#FEF3C7', color: '#92400E' },
  'Natural Disaster': { bg: '#EDE9FE', color: '#5B21B6' },
  'Evacuation':       { bg: '#D1FAE5', color: '#065F46' },
  'Other':            { bg: '#F3F4F6', color: '#374151' },
}

function Emergencyplanlist() {
  const { authTokens } = useContext(AuthContext)

  const [plans, setPlans] = useState([])
  const [title, setTitle] = useState('')
  const [planType, setPlanType] = useState('')
  const [location, setLocation] = useState('')
  const [responsiblePerson, setResponsiblePerson] = useState('')
  const [description, setDescription] = useState('')
  const [procedures, setProcedures] = useState('')
  const [assemblyPoint, setAssemblyPoint] = useState('')
  const [emergencyContacts, setEmergencyContacts] = useState('')
  const [lastReviewed, setLastReviewed] = useState('')
  const [status, setStatus] = useState('Draft')
  const [document, setDocument] = useState(null)

  useEffect(() => { fetchPlans() }, [])

  const fetchPlans = () => {
    EmergencyPlanAPI.get('/')
      .then(res => setPlans(res.data))
      .catch(console.log)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('plan_type', planType)
    formData.append('location', location)
    formData.append('responsible_person', responsiblePerson)
    formData.append('description', description)
    formData.append('procedures', procedures)
    formData.append('assembly_point', assemblyPoint)
    formData.append('emergency_contacts', emergencyContacts)
    if (lastReviewed) formData.append('last_reviewed', lastReviewed)
    formData.append('status', status)
    if (document) formData.append('document', document)

    EmergencyPlanAPI.post('/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authTokens.access}`,
      },
    }).then(() => {
      fetchPlans()
      setTitle(''); setPlanType(''); setLocation(''); setResponsiblePerson('')
      setDescription(''); setProcedures(''); setAssemblyPoint('')
      setEmergencyContacts(''); setLastReviewed(''); setStatus('Draft')
      setDocument(null)
      e.target.reset()
    }).catch(console.log)
  }

  const onDelete = (id) => {
    EmergencyPlanAPI.delete(`/${id}/`, {
      headers: { 'Authorization': `Bearer ${authTokens.access}` },
    }).then(() => fetchPlans())
  }

  const colorBadge = (value, colorMap) => {
    const s = colorMap[value] || { bg: '#f3f4f6', color: '#374151' }
    return (
      <span style={{
        backgroundColor: s.bg, color: s.color,
        padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600',
      }}>
        {value}
      </span>
    )
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Emergency Plans</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Document and manage emergency response plans for your workplace.
        </p>
      </div>

      {/* Form card */}
      <div style={{
        backgroundColor: 'white', borderRadius: '12px',
        padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '32px',
      }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>Add New Plan</h5>

        <Form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Plan Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Fire Emergency Response Plan"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Plan Type</Form.Label>
                <Form.Select value={planType} onChange={e => setPlanType(e.target.value)}>
                  <option value="">Select type...</option>
                  <option>Fire</option>
                  <option>Medical</option>
                  <option>Chemical Spill</option>
                  <option>Natural Disaster</option>
                  <option>Evacuation</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Status</Form.Label>
                <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
                  <option>Draft</option>
                  <option>Active</option>
                  <option>Under Review</option>
                  <option>Archived</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Location / Area</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Main Building"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Responsible Person</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={responsiblePerson}
                  onChange={e => setResponsiblePerson(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Last Reviewed</Form.Label>
                <Form.Control
                  type="date"
                  value={lastReviewed}
                  onChange={e => setLastReviewed(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Description</Form.Label>
            <Form.Control
              as="textarea" rows={2}
              placeholder="Brief description of this emergency plan..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Emergency Procedures</Form.Label>
            <Form.Control
              as="textarea" rows={4}
              placeholder="Step-by-step procedures to follow during the emergency..."
              value={procedures}
              onChange={e => setProcedures(e.target.value)}
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Assembly Point</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Car park near main gate"
                  value={assemblyPoint}
                  onChange={e => setAssemblyPoint(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Emergency Contacts</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Fire: 000, Safety Officer: +61 400 000 000"
                  value={emergencyContacts}
                  onChange={e => setEmergencyContacts(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>
              Plan Document <span style={{ color: '#aaa', fontWeight: '400' }}>(optional)</span>
            </Form.Label>
            <Form.Control type="file" onChange={e => setDocument(e.target.files[0])} />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
          >
            Save Plan
          </Button>
        </Form>
      </div>

      {/* Table */}
      <div style={{
        backgroundColor: 'white', borderRadius: '12px',
        padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '16px' }}>
          Plans ({plans.length})
        </h5>

        {plans.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '32px 0', margin: 0 }}>
            No emergency plans added yet.
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>ID</th>
                <th style={{ color: NAVY }}>Title</th>
                <th style={{ color: NAVY }}>Type</th>
                <th style={{ color: NAVY }}>Location</th>
                <th style={{ color: NAVY }}>Responsible</th>
                <th style={{ color: NAVY }}>Assembly Point</th>
                <th style={{ color: NAVY }}>Last Reviewed</th>
                <th style={{ color: NAVY }}>Status</th>
                <th style={{ color: NAVY }}>Document</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {plans.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td style={{ fontWeight: '600' }}>{p.title}</td>
                  <td>{p.plan_type && colorBadge(p.plan_type, TYPE_COLORS)}</td>
                  <td style={{ color: '#666' }}>{p.location}</td>
                  <td>{p.responsible_person}</td>
                  <td style={{ color: '#666' }}>{p.assembly_point}</td>
                  <td style={{ color: '#666' }}>{p.last_reviewed || '—'}</td>
                  <td>{p.status && colorBadge(p.status, STATUS_COLORS)}</td>
                  <td>
                    {p.document
                      ? <a href={p.document} download style={{ color: ORANGE, fontWeight: '600' }}>Download</a>
                      : <span style={{ color: '#ccc' }}>—</span>
                    }
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(p.id)}>
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

export default Emergencyplanlist
