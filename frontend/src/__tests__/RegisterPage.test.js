import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'

// Mock fetch globally
global.fetch = jest.fn()

function renderRegister() {
  return render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  )
}

describe('RegisterPage', () => {

  beforeEach(() => {
    fetch.mockClear()
  })

  test('renders all form fields', () => {
    renderRegister()
    expect(screen.getByPlaceholderText(/enter your full name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/min\. 8 characters/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/repeat password/i)).toBeInTheDocument()
  })

  test('renders Create Account button', () => {
    renderRegister()
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  test('renders login link', () => {
    renderRegister()
    expect(screen.getByRole('link', { name: /log in/i })).toBeInTheDocument()
  })

  test('shows success message on 201 response', async () => {
    fetch.mockResolvedValueOnce({
      status: 201,
      json: async () => ({ detail: 'Account created. You can now log in.' }),
    })
    renderRegister()

    fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByPlaceholderText(/enter username/i), { target: { value: 'testuser' } })
    fireEvent.change(screen.getByPlaceholderText(/min\. 8 characters/i), { target: { value: 'password123' } })
    fireEvent.change(screen.getByPlaceholderText(/repeat password/i), { target: { value: 'password123' } })
    fireEvent.submit(screen.getByRole('button', { name: /create account/i }).closest('form'))

    await waitFor(() => {
      expect(screen.getByText(/account created/i)).toBeInTheDocument()
    })
  })

  test('shows field error on 400 response', async () => {
    fetch.mockResolvedValueOnce({
      status: 400,
      json: async () => ({ username: 'Username already taken.' }),
    })
    renderRegister()

    fireEvent.change(screen.getByPlaceholderText(/enter username/i), { target: { value: 'taken' } })
    fireEvent.submit(screen.getByRole('button', { name: /create account/i }).closest('form'))

    await waitFor(() => {
      expect(screen.getByText(/username already taken/i)).toBeInTheDocument()
    })
  })

  test('shows generic error on network failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'))
    renderRegister()

    fireEvent.submit(screen.getByRole('button', { name: /create account/i }).closest('form'))

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })

})
