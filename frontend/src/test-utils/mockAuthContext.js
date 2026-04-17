/**
 * Shared mock for AuthContext used across all frontend tests.
 * Import { mockUser, mockTokens, renderWithAuth } in your test files.
 */
import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export const mockTokens = {
  access: 'mock.access.token',
  refresh: 'mock.refresh.token',
}

export const mockUser = {
  username: 'testuser',
  staff_id: 42,
}

export const mockAuthValue = {
  authTokens: mockTokens,
  user: mockUser,
  loginUser: jest.fn(),
  logoutUser: jest.fn(),
  tenantName: 'Test Company',
}

/**
 * Renders a component wrapped in AuthContext + MemoryRouter.
 * Pass `authOverrides` to override specific context values for a test.
 */
export function renderWithAuth(ui, { authOverrides = {}, route = '/' } = {}) {
  const value = { ...mockAuthValue, ...authOverrides }
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthContext.Provider value={value}>
        {ui}
      </AuthContext.Provider>
    </MemoryRouter>
  )
}
