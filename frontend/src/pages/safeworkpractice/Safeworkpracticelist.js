import { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Table, Form, Button } from 'react-bootstrap'
import AuthContext from '../../context/AuthContext'
import SafeWorkPracticeAPI from '../../API/SafeWorkPracticeAPI'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

function Safeworkpracticelist() {
  const { authTokens } = useContext(AuthContext)

  const [practices, setPractices] = useState([])
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [document, setDocument] = useState(null)

  useEffect(() => {
    fetchPractices()
  }, [])

  const fetchPractices = () => {
    SafeWorkPracticeAPI.get('/')
      .then(res => setPractices(res.data))
      .catch(console.log)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('category', category)
    formData.append('content', content)
    if (document) formData.append('document', document)

    SafeWorkPracticeAPI.post('/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authTokens.access}`,
      },
    })
      .then(() => {
        fetchPractices()
        setTitle('')
        setCategory('')
        setContent('')
        setDocument(null)
        e.target.reset()
      })
      .catch(console.log)
  }

  const onDelete = (id) => {
    SafeWorkPracticeAPI.delete(`/${id}/`, {
      headers: { 'Authorization': `Bearer ${authTokens.access}` },
    }).then(() => fetchPractices())
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Safe Work Practice</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Document procedures and guidelines for safely performing work tasks.
        </p>
      </div>

      {/* Form card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        marginBottom: '32px',
      }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>Add New Practice</h5>

        <Form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Working at Heights"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Physical Hazards"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>Content / Procedure</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Describe the safe work procedure..."
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: NAVY }}>
              Document <span style={{ color: '#aaa', fontWeight: '400' }}>(optional)</span>
            </Form.Label>
            <Form.Control
              type="file"
              onChange={e => setDocument(e.target.files[0])}
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
          >
            Save Practice
          </Button>
        </Form>
      </div>

      {/* Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '16px' }}>
          Practices ({practices.length})
        </h5>

        {practices.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '32px 0', margin: 0 }}>
            No safe work practices added yet.
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>ID</th>
                <th style={{ color: NAVY }}>Title</th>
                <th style={{ color: NAVY }}>Category</th>
                <th style={{ color: NAVY }}>Content</th>
                <th style={{ color: NAVY }}>Date Added</th>
                <th style={{ color: NAVY }}>Document</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {practices.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td style={{ fontWeight: '600' }}>{p.title}</td>
                  <td>
                    {p.category && (
                      <span style={{
                        backgroundColor: '#EEF2FF', color: NAVY,
                        padding: '2px 8px', borderRadius: '4px', fontSize: '12px',
                      }}>
                        {p.category}
                      </span>
                    )}
                  </td>
                  <td style={{ maxWidth: '300px', whiteSpace: 'pre-wrap', color: '#555' }}>
                    {p.content}
                  </td>
                  <td style={{ color: '#888' }}>{p.created_on}</td>
                  <td>
                    {p.document
                      ? <a href={p.document} download style={{ color: ORANGE, fontWeight: '600' }}>Download</a>
                      : <span style={{ color: '#ccc' }}>—</span>
                    }
                  </td>
                  <td>
                    <span
                      style={{ cursor: 'pointer', color: '#dc3545' }}
                      onClick={() => onDelete(p.id)}
                    >
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

export default Safeworkpracticelist
