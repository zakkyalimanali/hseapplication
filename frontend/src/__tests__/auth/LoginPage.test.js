import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import LoginPage from '../../pages/LoginPage'

const mockLoginUser = jest.fn()

function renderLogin(tenantName = 'Ali Company') {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={{ loginUser: mockLoginUser, tenantName }}>
        <LoginPage />
      </AuthContext.Provider>
    </MemoryRouter>
  )
}

describe('LoginPage', () => {

  beforeEach(() => mockLoginUser.mockClear())

  test('renders username and password fields', () => {
    renderLogin()
    expect(screen.getByPlaceholderText(/enter your username/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument()
  })

  test('renders sign in button', () => {
    renderLogin()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  test('renders tenant name in left panel', () => {
    renderLogin('Ali Company')
    // Name appears in both the left-panel h1 and the mobile compact header
    expect(screen.getAllByText('Ali Company').length).toBeGreaterThanOrEqual(1)
  })

  test('falls back to HSE Platform when no tenant name', () => {
    renderLogin(null)
    expect(screen.getAllByText('HSE Platform').length).toBeGreaterThanOrEqual(1)
  })

  test('renders register link', () => {
    renderLogin()
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument()
  })

  test('calls loginUser on form submit', () => {
    renderLogin()
    fireEvent.submit(screen.getByRole('button', { name: /sign in/i }).closest('form'))
    expect(mockLoginUser).toHaveBeenCalledTimes(1)
  })

  test('username input accepts typed text', () => {
    renderLogin()
    const input = screen.getByPlaceholderText(/enter your username/i)
    fireEvent.change(input, { target: { value: 'zakky' } })
    expect(input.value).toBe('zakky')
  })

  test('password input is type password', () => {
    renderLogin()
    const input = screen.getByPlaceholderText(/enter your password/i)
    expect(input.type).toBe('password')
  })

})
