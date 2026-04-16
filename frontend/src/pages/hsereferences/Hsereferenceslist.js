import { useState, useContext, useEffect } from 'react'
import { Form, Button, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faDownload, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import HSEReferenceAPI from '../../API/HSEReferenceAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function Hsereferenceslist() {
  const { authTokens } = useContext(AuthContext)
  const [hsereferences, setHSEReferences] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [hse_document, setHSEDocument] = useState(null)
  const [search, setSearch] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchHSEReference()
  }, [])

  const fetchHSEReference = () => {
    HSEReferenceAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setHSEReferences(res.data)).catch(console.log)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!title) return
    setSaving(true)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    if (hse_document) formData.append('hse_document', hse_document)

    HSEReferenceAPI.post('/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authTokens.access}`,
      },
    }).then(() => {
      setTitle('')
      setContent('')
      setHSEDocument(null)
      // reset file input
      const fileInput = document.getElementById('hse-file-input')
      if (fileInput) fileInput.value = ''
      fetchHSEReference()
    }).catch(console.log)
      .finally(() => setSaving(false))
  }

  const onDelete = (id) => {
    HSEReferenceAPI.delete(`/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => fetchHSEReference()).catch(console.log)
  }

  const filtered = hsereferences.filter(r => {
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
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>HSE References</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Upload and manage HSE reference documents and files.
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
          <div style={{ fontSize: '28px', fontWeight: '800', color: NAVY }}>{hsereferences.length}</div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>Total Documents</div>
        </div>
      </div>

      {/* Add Form */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px', color: ORANGE }} />
          Add New Reference
        </h5>
        <Form onSubmit={onSubmit}>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. OSHA Guidelines, Chemical Safety SOP..."
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Brief description of this reference document..."
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={L}>Document File</Form.Label>
            <Form.Control
              id="hse-file-input"
              type="file"
              onChange={e => setHSEDocument(e.target.files[0])}
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
            {saving ? 'Saving...' : 'Save Reference'}
          </Button>

        </Form>
      </div>

      {/* References Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h5 style={{ color: NAVY, fontWeight: '700', margin: 0 }}>
            All References ({filtered.length})
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
            {hsereferences.length === 0 ? 'No reference documents uploaded yet.' : 'No results match your search.'}
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
              {filtered.map(r => (
                <tr key={r.id}>
                  <td style={{ fontWeight: '600' }}>
                    <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '8px', color: '#9CA3AF' }} />
                    {r.title || '—'}
                  </td>
                  <td style={{ color: '#666', fontSize: '13px' }}>{r.content || '—'}</td>
                  <td>
                    {r.hse_document ? (
                      <a
                        href={r.hse_document}
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
