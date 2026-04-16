import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import SafetyCardAPI from '../../API/SafetyCardAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

const STATUS_STYLES = {
  'Resolved':                  { bg: '#D1FAE5', color: '#059669' },
  'No Further Action Required':{ bg: '#DBEAFE', color: '#2563EB' },
  'Ongoing':                   { bg: '#FEF3C7', color: '#D97706' },
}

export default function IncidentTable() {
  const { authTokens } = useContext(AuthContext)
  const [safetycards, setSafetyCards] = useState([])
  const [staffs, setStaffs] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchSafetyCards()
    fetchStaff()
  }, [])

  const fetchSafetyCards = () => {
    SafetyCardAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setSafetyCards(res.data)).catch(console.log)
  }

  const fetchStaff = () => {
    StaffAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setStaffs(res.data)).catch(console.log)
  }

  const onDelete = (id) => {
    SafetyCardAPI.delete(`/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => fetchSafetyCards()).catch(console.log)
  }

  const staffName = (id) => staffs.find(s => s.id === id)?.name || '—'

  const filtered = safetycards.filter(c => {
    const q = search.toLowerCase()
    return (
      (c.short_desc || '').toLowerCase().includes(q) ||
      (c.what_happened || '').toLowerCase().includes(q) ||
      (c.location || '').toLowerCase().includes(q) ||
      staffName(c.raised_by).toLowerCase().includes(q)
    )
  })

  return (
    <div style={{ padding: '40px', maxWidth: '1300px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Safety Cards</h2>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
            Record and track safety observations, near misses, and unsafe acts.
          </p>
        </div>
        <Link to="/addincident">
          <Button style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px 20px' }}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
            Add Safety Card
          </Button>
        </Link>
      </div>

      {/* Summary cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px', marginBottom: '32px',
      }}>
        {[
          { label: 'Total Cards',            value: safetycards.length,                                              color: NAVY },
          { label: 'Ongoing',                value: safetycards.filter(c => c.status === 'Ongoing').length,          color: '#D97706' },
          { label: 'Resolved',               value: safetycards.filter(c => c.status === 'Resolved').length,         color: '#059669' },
          { label: 'No Action Required',     value: safetycards.filter(c => c.status === 'No Further Action Required').length, color: '#2563EB' },
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

      {/* Table card */}
      <div style={{
        backgroundColor: 'white', borderRadius: '12px',
        padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h5 style={{ color: NAVY, fontWeight: '700', margin: 0 }}>
            All Cards ({filtered.length})
          </h5>
          <input
            type="text"
            placeholder="Search description, what happened, location, raised by..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              border: '1.5px solid #e5e7eb', borderRadius: '8px',
              padding: '7px 14px', fontSize: '13px', width: '320px', outline: 'none',
            }}
          />
        </div>

        {filtered.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '40px 0', margin: 0 }}>
            {safetycards.length === 0 ? 'No safety cards recorded yet.' : 'No results match your search.'}
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Date</th>
                <th style={{ color: NAVY }}>Description</th>
                <th style={{ color: NAVY }}>Raised By</th>
                <th style={{ color: NAVY }}>What Happened</th>
                <th style={{ color: NAVY }}>Location</th>
                <th style={{ color: NAVY }}>Status</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => {
                const statusStyle = STATUS_STYLES[c.status] || {}
                return (
                  <tr key={c.id}>
                    <td style={{ color: '#666', fontSize: '13px', whiteSpace: 'nowrap' }}>
                      {c.date_raised || '—'}
                    </td>
                    <td style={{ fontWeight: '600', maxWidth: '200px' }}>
                      {c.short_desc || '—'}
                    </td>
                    <td style={{ color: '#555' }}>{staffName(c.raised_by)}</td>
                    <td style={{ color: '#666', fontSize: '13px', maxWidth: '180px' }}>
                      {c.what_happened || '—'}
                    </td>
                    <td style={{ color: '#666', fontSize: '13px' }}>{c.location || '—'}</td>
                    <td>
                      {c.status ? (
                        <span style={{
                          backgroundColor: statusStyle.bg || '#f3f4f6',
                          color: statusStyle.color || '#6b7280',
                          padding: '2px 8px', borderRadius: '4px',
                          fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap',
                        }}>
                          {c.status}
                        </span>
                      ) : <span style={{ color: '#ccc' }}>—</span>}
                    </td>
                    <td>
                      <Link to={`/editincident/${c.id}`} style={{ color: NAVY }}>
                        <FontAwesomeIcon icon={faPen} />
                      </Link>
                    </td>
                    <td>
                      <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(c.id)}>
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
