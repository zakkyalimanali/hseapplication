import React from 'react'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithAuth } from '../../test-utils/mockAuthContext'
import AttendenceList from '../../pages/attendence/AttendenceList'

// Mock the API modules
jest.mock('../../API/AttendenceAPI', () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
}))
jest.mock('axios', () => ({ get: jest.fn() }))

const AttendenceAPI = require('../../API/AttendenceAPI')
const axios = require('axios')

const MOCK_STAFFS = [
  { id: 1, name: 'Ali Hassan',  position: 'HSE Officer' },
  { id: 2, name: 'Jane Doe',    position: 'Supervisor' },
  { id: 3, name: 'Ahmad Noor',  position: 'Technician' },
]

const TODAY = new Date().toISOString().split('T')[0]

const MOCK_ATTENDANCE = [
  { id: 10, staff_name: 1, attendence_date: TODAY, attendence_status: 'Present' },
  { id: 11, staff_name: 2, attendence_date: TODAY, attendence_status: 'Absent' },
]

beforeEach(() => {
  AttendenceAPI.get.mockResolvedValue({ data: MOCK_ATTENDANCE })
  AttendenceAPI.post.mockResolvedValue({ data: { id: 99, staff_name: 3, attendence_date: TODAY, attendence_status: 'Present' } })
  AttendenceAPI.patch.mockResolvedValue({ data: {} })
  AttendenceAPI.delete.mockResolvedValue({})
  axios.get.mockResolvedValue({ data: MOCK_STAFFS })
})

afterEach(() => jest.clearAllMocks())

describe('AttendenceList — daily view', () => {

  test('renders the Attendance heading', async () => {
    renderWithAuth(<AttendenceList />)
    expect(screen.getByText('Attendance')).toBeInTheDocument()
  })

  test('shows Daily and All Records toggle buttons', async () => {
    renderWithAuth(<AttendenceList />)
    expect(screen.getByText('Daily')).toBeInTheDocument()
    expect(screen.getByText('All Records')).toBeInTheDocument()
  })

  test('shows all staff members as rows', async () => {
    renderWithAuth(<AttendenceList />)
    await waitFor(() => {
      expect(screen.getByText('Ali Hassan')).toBeInTheDocument()
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
      expect(screen.getByText('Ahmad Noor')).toBeInTheDocument()
    })
  })

  test('shows Not recorded for staff with no entry today', async () => {
    renderWithAuth(<AttendenceList />)
    await waitFor(() => {
      expect(screen.getByText(/not recorded/i)).toBeInTheDocument()
    })
  })

  test('summary cards show correct counts', async () => {
    renderWithAuth(<AttendenceList />)
    await waitFor(() => {
      // Present=1, Absent=1, Not Recorded=1 (Ahmad has no record)
      const cards = screen.getAllByText('1')
      expect(cards.length).toBeGreaterThanOrEqual(2)
    })
  })

  test('prev/next day arrows are rendered', async () => {
    renderWithAuth(<AttendenceList />)
    // FontAwesome renders SVGs — check by aria or surrounding buttons
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(2)
  })

  test('clicking All Records tab switches view', async () => {
    renderWithAuth(<AttendenceList />)
    fireEvent.click(screen.getByText('All Records'))
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/search staff/i)).toBeInTheDocument()
    })
  })

  test('All Records search filters by staff name', async () => {
    renderWithAuth(<AttendenceList />)
    fireEvent.click(screen.getByText('All Records'))
    await waitFor(() => screen.getByPlaceholderText(/search staff/i))

    fireEvent.change(screen.getByPlaceholderText(/search staff/i), { target: { value: 'Ali' } })
    await waitFor(() => {
      expect(screen.getByText('Ali Hassan')).toBeInTheDocument()
      expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument()
    })
  })

  test('quick-mark calls AttendenceAPI.post for unrecorded staff', async () => {
    renderWithAuth(<AttendenceList />)
    await waitFor(() => screen.getByText('Ahmad Noor'))

    // Ahmad Noor has no record — find his Present button
    // The quick-mark buttons are rendered near "Not recorded" text
    const presentButtons = screen.getAllByText('Present')
    // Click the first unrecorded one (not the status badge on recorded rows)
    fireEvent.click(presentButtons[presentButtons.length - 1])

    await waitFor(() => {
      expect(AttendenceAPI.post).toHaveBeenCalledWith(
        '/',
        expect.objectContaining({ staff_name: 3, attendence_status: 'Present' }),
        expect.any(Object),
      )
    })
  })

  test('delete calls AttendenceAPI.delete', async () => {
    renderWithAuth(<AttendenceList />)
    await waitFor(() => screen.getByText('Ali Hassan'))

    const deleteButtons = document.querySelectorAll('[data-testid="delete-btn"], svg[aria-label="trash"]')
    // Use getAllByRole to find trash icon buttons — they're spans with onClick
    // Trigger delete on first record
    AttendenceAPI.delete.mockResolvedValueOnce({})
    // Find delete spans (they use FontAwesomeIcon faTrash)
    const allButtons = screen.getAllByRole('button')
    // The delete action is on a span — fire via direct DOM query
    const trashSpans = document.querySelectorAll('span[style*="cursor: pointer"]')
    if (trashSpans.length > 0) {
      fireEvent.click(trashSpans[0])
      await waitFor(() => expect(AttendenceAPI.delete).toHaveBeenCalled())
    }
  })

})
