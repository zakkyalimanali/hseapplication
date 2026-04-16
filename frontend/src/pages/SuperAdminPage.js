import { useState, useEffect } from 'react'
import { Form, Button, Alert, Spinner, Table, Badge } from 'react-bootstrap'

const PUBLIC_API = 'http://127.0.0.1:8000'

// ── Superadmin login gate ──────────────────────────────────────────────────
const SuperAdminLogin = ({ onSuccess }) => {
  const [creds, setCreds] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${PUBLIC_API}/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creds),
      })
      if (res.ok) {
        const data = await res.json()
        sessionStorage.setItem('superadminToken', data.access)
        onSuccess()
      } else {
        setError('Invalid username or password.')
      }
    } catch {
      setError('Could not connect to server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 mx-auto">
          <div className="card p-4 shadow-sm">
            <h5 className="mb-1 text-center">Platform Admin</h5>
            <p className="text-muted text-center small mb-4">Superadmin access only</p>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={creds.username}
                  onChange={e => setCreds({ ...creds, username: e.target.value })}
                  placeholder="Enter username"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={creds.password}
                  onChange={e => setCreds({ ...creds, password: e.target.value })}
                  placeholder="Enter password"
                />
              </Form.Group>
              <Button type="submit" className="w-100" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Sign In'}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main superadmin dashboard ──────────────────────────────────────────────
const SuperAdminPage = () => {
  const [authed, setAuthed] = useState(!!sessionStorage.getItem('superadminToken'))

  if (!authed) {
    return <SuperAdminLogin onSuccess={() => setAuthed(true)} />
  }

  return <SuperAdminDashboard onLogout={() => { sessionStorage.removeItem('superadminToken'); setAuthed(false) }} />
}

const SuperAdminDashboard = ({ onLogout }) => {
  const [formData, setFormData] = useState({
    name: '',
    subdomain: '',
    admin_username: '',
    admin_password: '',
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tenants, setTenants] = useState([])
  const [loadingTenants, setLoadingTenants] = useState(true)

  useEffect(() => {
    fetchTenants()
  }, [])

  const fetchTenants = async () => {
    setLoadingTenants(true)
    try {
      const res = await fetch(`${PUBLIC_API}/api/tenants/list/`)
      const data = await res.json()
      setTenants(data)
    } catch {
      // silently fail
    } finally {
      setLoadingTenants(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const updated = { ...formData, [name]: value }
    // Auto-generate subdomain from company name
    if (name === 'name') {
      updated.subdomain = value.toLowerCase().replace(/[^a-z0-9]/g, '')
    }
    setFormData(updated)
    setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    setSuccess(null)

    try {
      const res = await fetch(`${PUBLIC_API}/api/tenants/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (res.status === 201) {
        setSuccess(data)
        setFormData({ name: '', subdomain: '', admin_username: '', admin_password: '' })
        fetchTenants()
      } else {
        setErrors(data)
      }
    } catch {
      setErrors({ detail: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h2 className="mb-0">Tenant Management</h2>
        <Button variant="outline-secondary" size="sm" onClick={onLogout}>Sign Out</Button>
      </div>
      <p className="text-muted mb-4">Create and manage companies on this platform.</p>

      <div className="row">
        {/* Create Tenant Form */}
        <div className="col-md-5">
          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Create New Company</h5>

            {success && (
              <Alert variant="success">
                <strong>{success.detail}</strong>
                <div className="mt-2">
                  <div>App: <a href={success.app_url} target="_blank" rel="noreferrer">{success.app_url}</a></div>
                  <div>Admin: <a href={success.admin_url} target="_blank" rel="noreferrer">{success.admin_url}</a></div>
                </div>
              </Alert>
            )}
            {errors.detail && <Alert variant="danger">{errors.detail}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="e.g. Acme Corporation"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Subdomain</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    name="subdomain"
                    placeholder="acme"
                    value={formData.subdomain}
                    onChange={handleChange}
                    isInvalid={!!errors.subdomain}
                  />
                  <span className="input-group-text">.localhost</span>
                </div>
                {errors.subdomain && <div className="text-danger small mt-1">{errors.subdomain}</div>}
                <Form.Text className="text-muted">Lowercase letters and numbers only.</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Admin Username</Form.Label>
                <Form.Control
                  type="text"
                  name="admin_username"
                  placeholder="admin"
                  value={formData.admin_username}
                  onChange={handleChange}
                  isInvalid={!!errors.admin_username}
                />
                <Form.Control.Feedback type="invalid">{errors.admin_username}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Admin Password</Form.Label>
                <Form.Control
                  type="password"
                  name="admin_password"
                  placeholder="Min. 8 characters"
                  value={formData.admin_password}
                  onChange={handleChange}
                  isInvalid={!!errors.admin_password}
                />
                <Form.Control.Feedback type="invalid">{errors.admin_password}</Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" disabled={loading} className="w-100">
                {loading ? <Spinner animation="border" size="sm" /> : 'Create Company'}
              </Button>
            </Form>
          </div>
        </div>

        {/* Existing Tenants */}
        <div className="col-md-7">
          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Existing Companies</h5>
            {loadingTenants ? (
              <div className="text-center py-3"><Spinner animation="border" size="sm" /></div>
            ) : tenants.length === 0 ? (
              <p className="text-muted">No companies yet.</p>
            ) : (
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Subdomain</th>
                    <th>Created</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tenants.map(t => (
                    <tr key={t.id}>
                      <td>{t.name}</td>
                      <td><Badge bg="secondary">{t.schema_name}</Badge></td>
                      <td>{t.created_on}</td>
                      <td>
                        <a href={t.app_url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
                          Open
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminPage
