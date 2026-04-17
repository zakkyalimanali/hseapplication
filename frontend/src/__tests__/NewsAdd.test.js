import React from 'react'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithAuth, mockUser } from '../test-utils/mockAuthContext'
import NewsAdd from '../pages/news/NewsAdd'

jest.mock('../API/NewsAPI', () => ({ post: jest.fn() }))
jest.mock('../API/StaffAPI', () => ({ get: jest.fn() }))

const NewsAPI = require('../API/NewsAPI')
const StaffAPI = require('../API/StaffAPI')

const MOCK_STAFFS = [
  { id: 42, name: 'Test User',  position: 'HSE Officer' },
  { id: 43, name: 'Other Staff', position: 'Engineer' },
]

beforeEach(() => {
  StaffAPI.get.mockResolvedValue({ data: MOCK_STAFFS })
  NewsAPI.post.mockResolvedValue({ data: { id: 1 } })
})

afterEach(() => jest.clearAllMocks())

describe('NewsAdd', () => {

  test('renders all form fields', async () => {
    renderWithAuth(<NewsAdd />)
    await waitFor(() => screen.getByPlaceholderText(/article headline/i))
    expect(screen.getByPlaceholderText(/article headline/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/short summary/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/full article content/i)).toBeInTheDocument()
  })

  test('author is auto-filled from user.staff_id', async () => {
    renderWithAuth(<NewsAdd />)
    await waitFor(() => screen.getByText(/auto-filled/i))
    expect(screen.getByText(/✓ auto-filled/i)).toBeInTheDocument()
  })

  test('author select shows all staff options', async () => {
    renderWithAuth(<NewsAdd />)
    await waitFor(() => screen.getByText('Test User (HSE Officer)'))
    expect(screen.getByText('Other Staff (Engineer)')).toBeInTheDocument()
  })

  test('renders Publish Article button', async () => {
    renderWithAuth(<NewsAdd />)
    expect(screen.getByRole('button', { name: /publish article/i })).toBeInTheDocument()
  })

  test('renders Cancel link back to news list', async () => {
    renderWithAuth(<NewsAdd />)
    expect(screen.getByRole('link', { name: /cancel/i })).toBeInTheDocument()
  })

  test('submits with correct data', async () => {
    renderWithAuth(<NewsAdd />)
    await waitFor(() => screen.getByPlaceholderText(/article headline/i))

    fireEvent.change(screen.getByPlaceholderText(/article headline/i),
      { target: { value: 'Safety Alert: PPE Mandatory' } })
    fireEvent.change(screen.getByPlaceholderText(/short summary/i),
      { target: { value: 'All workers must wear full PPE on site.' } })
    fireEvent.change(screen.getByPlaceholderText(/full article content/i),
      { target: { value: 'Effective immediately, PPE is mandatory...' } })

    fireEvent.submit(screen.getByRole('button', { name: /publish article/i }).closest('form'))

    await waitFor(() => {
      expect(NewsAPI.post).toHaveBeenCalledWith(
        '/',
        expect.objectContaining({
          headline: 'Safety Alert: PPE Mandatory',
          person_name: String(mockUser.staff_id),
        }),
        expect.any(Object),
      )
    })
  })

  test('auto-fill badge disappears when a different author is selected', async () => {
    renderWithAuth(<NewsAdd />)
    await waitFor(() => screen.getByText(/auto-filled/i))

    // Change author to someone else
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '43' } })

    await waitFor(() => {
      expect(screen.queryByText(/auto-filled/i)).not.toBeInTheDocument()
    })
  })

})
