import React, { useState } from 'react'
import { Form, Button, Alert, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import API_BASE from '../utils/apiBase'

const RegisterPage = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // Clear field error on change
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    setSuccess('')

    try {
      const response = await fetch(`${API_BASE}/api/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.status === 201) {
        setSuccess('Account created! Redirecting to login...')
        setTimeout(() => navigate('/loginpage'), 2000)
      } else {
        setErrors(data)
      }
    } catch (err) {
      setErrors({ detail: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h3 className="mb-4">Create Account</h3>

          {success && <Alert variant="success">{success}</Alert>}
          {errors.detail && <Alert variant="danger">{errors.detail}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email <span className="text-muted">(optional)</span></Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="password2"
                placeholder="Repeat password"
                value={formData.password2}
                onChange={handleChange}
                isInvalid={!!errors.password2}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password2}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" disabled={loading} className="w-100">
              {loading ? <Spinner animation="border" size="sm" /> : 'Create Account'}
            </Button>
          </Form>

          <p className="mt-3 text-center">
            Already have an account? <Link to="/loginpage">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
