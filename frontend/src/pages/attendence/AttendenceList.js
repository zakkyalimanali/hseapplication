import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import AttendenceAPI from '../../API/AttendenceAPI'
import AuthContext from '../../context/AuthContext'
import API_BASE from '../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function AttendenceList() {
  const { authTokens } = useContext(AuthContext)
  const [attendences, setAttendences] = useState([])
  const [staffs, setStaffs] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchAttendence()
    fetchStaff()
  }, [])

  const fetchAttendence = () => {
    AttendenceAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setAttendences(res.data)).catch(console.log)
  }

  const fetchStaff = () => {
    axios.get(`${API_BASE}/hseapp/staff/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setStaffs(res.data)).catch(console.log)
  }

  const onDelete = (id) => {
    AttendenceAPI.delete(`/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => fetchAttendence()).catch(console.log)
  }

  const getStaffName = (id) => staffs.find(s => s.id === Number(id))?.name || '—'

  const filtered = attendences.filter(a => {
    const q = search.toLowerCase()
    const name = getStaffName(a.staff_name).toLowerCase()
    return (
      name.includes(q) ||
      (a.attendence_date || '').toLowerCase().includes(q) ||
      (a.attendence_status || '').toLowerCase().includes(q)
    )
  })

  const presentCount = attendences.filter(a => a.attendence_status === 'Present').length
  const mcCount = attendences.filter(a => a.attendence_status === 'MC').length
  const absentCount = attendences.filter(a => a.attendence_status === 'Absent').length

  const statusBadge = (status) => {
    const styles = {
      Present: { backgroundColor: '#DCFCE7', color: '#166534' },
      MC:      { backgroundColor: '#FEF9C3', color: '#854D0E' },
      Absent:  { backgroundColor: '#FEE2E2', color: '#991B1B' },
    }
    const s = styles[status] || { backgroundColor: '#F3F4F6', color: '#374151' }
    return (
      <span style={{ ...s, padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
        {status || '—'}
      </span>
    )
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto' }}>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Attendance</h2>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
            Track daily staff attendance records.
          </p>
        </div>
        <Link to="/attendenceadd">
          <Button style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px 20px' }}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
            Add Attendance
          </Button>
        </Link>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '16px', marginBottom: '32px',
      }}>
        {[
          { label: 'Total Records', value: attendences.length, color: NAVY },
          { label: 'Present',       value: presentCount,        color: '#166534' },
          { label: 'MC',            value: mcCount,             color: '#854D0E' },
          { label: 'Absent',        value: absentCount,         color: '#991B1B' },
        ].map(card => (
          <div key={card.label} style={{
            backgroundColor: 'white', borderRadius: '10px', padding: '20px 16px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.07)', textAlign: 'center',
          }}>
            <div style={{ fontSize: '28px', fontWeight: '800', color: card.color }}>{card.value}</div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{card.label}</div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h5 style={{ color: NAVY, fontWeight: '700', margin: 0 }}>All Records ({filtered.length})</h5>
          <input
            type="text"
            placeholder="Search staff, date, status..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              border: '1.5px solid #e5e7eb', borderRadius: '8px',
              padding: '7px 14px', fontSize: '13px', width: '280px', outline: 'none',
            }}
          />
        </div>

        {filtered.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '40px 0', margin: 0 }}>
            {attendences.length === 0 ? 'No attendance records yet.' : 'No results match your search.'}
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '13px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Staff</th>
                <th style={{ color: NAVY }}>Date</th>
                <th style={{ color: NAVY }}>Status</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td style={{ fontWeight: '600' }}>{getStaffName(a.staff_name)}</td>
                  <td style={{ color: '#666' }}>{a.attendence_date || '—'}</td>
                  <td>{statusBadge(a.attendence_status)}</td>
                  <td>
                    <Link to={`/attendenceedit/${a.id}`} style={{ color: NAVY }}>
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(a.id)}>
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
