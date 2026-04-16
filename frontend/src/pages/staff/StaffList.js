import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

const CARD_COLOUR = {
  Yellow: { bg: '#FEF9C3', color: '#A16207' },
  Red:    { bg: '#FEE2E2', color: '#DC2626' },
  Green:  { bg: '#D1FAE5', color: '#059669' },
}

export default function StaffList() {
  const { authTokens } = useContext(AuthContext)
  const [staffs, setStaffs] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchStaff()
  }, [])

  const fetchStaff = () => {
    StaffAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setStaffs(res.data)).catch(console.log)
  }

  const onDelete = (id) => {
    StaffAPI.delete(`/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => fetchStaff()).catch(console.log)
  }

  const filtered = staffs.filter(s => {
    const q = search.toLowerCase()
    return (
      (s.name || '').toLowerCase().includes(q) ||
      (s.position || '').toLowerCase().includes(q) ||
      (s.staff_id_number || '').toLowerCase().includes(q) ||
      (s.nationality || '').toLowerCase().includes(q) ||
      (s.department || '').toLowerCase().includes(q)
    )
  })

  return (
    <div style={{ padding: '40px', maxWidth: '1300px', margin: '0 auto' }}>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Staff</h2>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
            Manage staff profiles, smart card status, and leave entitlements.
          </p>
        </div>
        <Link to="/addstaff">
          <Button style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px 20px' }}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
            Add Staff
          </Button>
        </Link>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px', marginBottom: '32px',
      }}>
        {[
          { label: 'Total Staff',  value: staffs.length,                                            color: NAVY },
          { label: 'Male',         value: staffs.filter(s => s.gender === 'Male').length,            color: '#2563EB' },
          { label: 'Female',       value: staffs.filter(s => s.gender === 'Female').length,          color: '#DB2777' },
          { label: 'Green Card',   value: staffs.filter(s => s.smart_card_colour === 'Green').length, color: '#059669' },
          { label: 'Yellow Card',  value: staffs.filter(s => s.smart_card_colour === 'Yellow').length, color: '#D97706' },
          { label: 'Red Card',     value: staffs.filter(s => s.smart_card_colour === 'Red').length,   color: '#DC2626' },
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
          <h5 style={{ color: NAVY, fontWeight: '700', margin: 0 }}>All Staff ({filtered.length})</h5>
          <input
            type="text"
            placeholder="Search name, position, staff ID..."
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
            {staffs.length === 0 ? 'No staff added yet.' : 'No results match your search.'}
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '13px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Name</th>
                <th style={{ color: NAVY }}>Position</th>
                <th style={{ color: NAVY }}>Staff ID</th>
                <th style={{ color: NAVY }}>Gender</th>
                <th style={{ color: NAVY }}>Nationality</th>
                <th style={{ color: NAVY }}>Smart Card</th>
                <th style={{ color: NAVY }}>Leave Left</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => {
                const cardStyle = CARD_COLOUR[s.smart_card_colour]
                return (
                  <tr key={s.id}>
                    <td style={{ fontWeight: '600' }}>{s.name || '—'}</td>
                    <td style={{ color: '#666' }}>{s.position || '—'}</td>
                    <td style={{ color: '#666' }}>{s.staff_id_number || '—'}</td>
                    <td style={{ color: '#666' }}>{s.gender || '—'}</td>
                    <td style={{ color: '#666' }}>{s.nationality || '—'}</td>
                    <td>
                      {cardStyle ? (
                        <span style={{ backgroundColor: cardStyle.bg, color: cardStyle.color, padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                          {s.smart_card_colour}
                        </span>
                      ) : <span style={{ color: '#ccc' }}>—</span>}
                    </td>
                    <td style={{ color: '#666', textAlign: 'center' }}>{s.yearly_leave_left ?? '—'}</td>
                    <td>
                      <Link to={`/editstaff/${s.id}`} style={{ color: NAVY }}>
                        <FontAwesomeIcon icon={faPen} />
                      </Link>
                    </td>
                    <td>
                      <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(s.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  )
}
