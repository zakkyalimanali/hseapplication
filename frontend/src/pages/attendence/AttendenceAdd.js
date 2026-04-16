import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import AttendenceAPI from '../../API/AttendenceAPI'
import AuthContext from '../../context/AuthContext'
import API_BASE from '../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function AttendenceAdd() {
  const { authTokens } = useContext(AuthContext)
  const navigate = useNavigate()

  const [staff_name, setStaffName] = useState('')
  const [attendence_date, setAttendenceDate] = useState('')
  const [attendence_status, setAttendenceStatus] = useState('')
  const [staffs, setStaffs] = useState([])

  useEffect(() => {
    axios.get(`${API_BASE}/hseapp/staff/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setStaffs(res.data)).catch(console.log)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    AttendenceAPI.post('/', { staff_name, attendence_date, attendence_status }, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => navigate('/attendencelist')).catch(console.log)
  }

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

  return (
    <div style={{ padding: '40px', maxWidth: '680px', margin: '0 auto' }}>

      <div style={{ marginBottom: '32px' }}>
        <Link to="/attendencelist" style={{ color: '#888', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Attendance
        </Link>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Add Attendance</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Record a new attendance entry for a staff member.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onSubmit}>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Staff</Form.Label>
            <Form.Select value={staff_name} onChange={e => setStaffName(e.target.value)}>
              <option value="">Select staff...</option>
              {staffs.map(s => (
                <option key={s.id} value={s.id}>{s.name}{s.position ? ` — ${s.position}` : ''}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Attendance Date</Form.Label>
            <Form.Control type="date" value={attendence_date} onChange={e => setAttendenceDate(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={L}>Attendance Status</Form.Label>
            <Form.Select value={attendence_status} onChange={e => setAttendenceStatus(e.target.value)}>
              <option value="">Select status...</option>
              <option value="Present">Present</option>
              <option value="MC">MC</option>
              <option value="Absent">Absent</option>
            </Form.Select>
          </Form.Group>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              type="submit"
              disabled={!staff_name || !attendence_date || !attendence_status}
              style={{ flex: 1, backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
            >
              Save Attendance
            </Button>
            <Link to="/attendencelist">
              <Button type="button" style={{ backgroundColor: 'transparent', border: `1.5px solid ${NAVY}`, color: NAVY, fontWeight: '600', padding: '10px 24px' }}>
                Cancel
              </Button>
            </Link>
          </div>

        </Form>
      </div>
    </div>
  )
}
