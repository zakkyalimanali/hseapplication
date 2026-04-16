import { useState, useContext, useEffect } from 'react'
import { Form, Button, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faDownload, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import HSEManagementAPI from '../../API/HSEManagementAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function Hsemanagement() {
  const { authTokens } = useContext(AuthContext)
  const [hsemanagements, setHSEManagements] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [management_commitment_document, setManagementCommitmentDocument] = useState(null)
  const [search, setSearch] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchHSEManagement()
  }, [])

  const fetchHSEManagement = () => {
    HSEManagementAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setHSEManagements(res.data)).catch(console.log)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!title) return
    setSaving(true)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    if (management_commitment_document) formData.append('management_commitment_document', management_commitment_document)

    HSEManagementAPI.post('/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authTokens.access}`,
      },
    }).then(() => {
      setTitle('')
      setContent('')
      setManagementCommitmentDocument(null)
      const fileInput = document.getElementById('mgmt-file-input')
      if (fileInput) fileInput.value = ''
      fetchHSEManagement()
    }).catch(console.log)
      .finally(() => setSaving(false))
  }

  const onDelete = (id) => {
    HSEManagementAPI.delete(`/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => fetchHSEManagement()).catch(console.log)
  }

  const filtered = hsemanagements.filter(r => {
    const q = search.toLowerCase()
    return (
      (r.title || '').toLowerCase().includes(q) ||
      (r.content || '').toLowerCase().includes(q)
    )
  })

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>HSE Management</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Upload and manage management commitment documents and HSE policies.
        </p>
      </div>

      {/* Summary card */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px', marginBottom: '32px',
      }}>
        <div style={{
          backgroundColor: 'white', borderRadius: '10px', padding: '20px 16px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.07)', textAlign: 'center',
        }}>
          <div style={{ fontSize: '28px', fontWeight: '800', color: NAVY }}>{hsemanagements.length}</div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>Total Documents</div>
        </div>
      </div>

      {/* Add Form */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px', color: ORANGE }} />
          Add New Document
        </h5>
        <Form onSubmit={onSubmit}>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Management Commitment Statement, HSE Policy 2024..."
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Brief description of this document..."
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={L}>Management Commitment Document</Form.Label>
            <Form.Control
              id="mgmt-file-input"
              type="file"
              onChange={e => setManagementCommitmentDocument(e.target.files[0])}
            />
            <Form.Text style={{ color: '#888', fontSize: '12px' }}>
              PDF, Word, Excel or image files accepted.
            </Form.Text>
          </Form.Group>

          <Button
            type="submit"
            disabled={saving || !title}
            style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px 32px' }}
          >
            {saving ? 'Saving...' : 'Save Document'}
          </Button>

        </Form>
      </div>

      {/* Documents Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h5 style={{ color: NAVY, fontWeight: '700', margin: 0 }}>
            All Documents ({filtered.length})
          </h5>
          <input
            type="text"
            placeholder="Search title, description..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              border: '1.5px solid #e5e7eb', borderRadius: '8px',
              padding: '7px 14px', fontSize: '13px', width: '260px', outline: 'none',
            }}
          />
        </div>

        {filtered.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '40px 0', margin: 0 }}>
            {hsemanagements.length === 0 ? 'No documents uploaded yet.' : 'No results match your search.'}
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Title</th>
                <th style={{ color: NAVY }}>Description</th>
                <th style={{ color: NAVY }}>Document</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id}>
                  <td style={{ fontWeight: '600' }}>
                    <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '8px', color: '#9CA3AF' }} />
                    {m.title || '—'}
                  </td>
                  <td style={{ color: '#666', fontSize: '13px' }}>{m.content || '—'}</td>
                  <td>
                    {m.management_commitment_document ? (
                      <a
                        href={m.management_commitment_document}
                        download
                        style={{ color: NAVY, fontWeight: '600', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                      >
                        <FontAwesomeIcon icon={faDownload} />
                        Download
                      </a>
                    ) : (
                      <span style={{ color: '#ccc', fontSize: '13px' }}>No file</span>
                    )}
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
