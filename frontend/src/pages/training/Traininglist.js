import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import TrainingAPI from '../../API/TrainingAPI'
import axios from 'axios'
import API_BASE from '../../utils/apiBase'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

// Returns expiry badge style based on days until expiry
function expiryStatus(expiryDate) {
  if (!expiryDate) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiry = new Date(expiryDate)
  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))

  if (diffDays < 0)   return { label: 'Expired',       bg: '#FEE2E2', color: '#DC2626' }
  if (diffDays <= 30) return { label: 'Expiring Soon',  bg: '#FEF3C7', color: '#D97706' }
  return               { label: 'Valid',               bg: '#D1FAE5', color: '#059669' }
}

export default function Traininglist() {
  const { authTokens } = useContext(AuthContext)
  const [trainings, setTrainings] = useState([])
  const [staffs, setStaffs] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchTraining()
    fetchStaff()
  }, [])

  const fetchTraining = () => {
    TrainingAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setTrainings(res.data)).catch(console.log)
  }

  const fetchStaff = () => {
    axios.get(`${API_BASE}/hseapp/staff/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setStaffs(res.data)).catch(console.log)
  }

  const onDelete = (id) => {
    TrainingAPI.delete(`/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => fetchTraining()).catch(console.log)
  }

  const staffName = (id) => staffs.find(s => s.id === id)?.name || '—'
  const staffPosition = (id) => staffs.find(s => s.id === id)?.position || '—'

  const filtered = trainings.filter(t => {
    const q = search.toLowerCase()
    return (
      (t.training || '').toLowerCase().includes(q) ||
      (t.training_provider || '').toLowerCase().includes(q) ||
      staffName(t.staff_name).toLowerCase().includes(q)
    )
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expired = trainings.filter(t => t.training_expiry && new Date(t.training_expiry) < today)
  const expiringSoon = trainings.filter(t => {
    if (!t.training_expiry) return false
    const diff = Math.ceil((new Date(t.training_expiry) - today) / (1000 * 60 * 60 * 24))
    return diff >= 0 && diff <= 30
  })
  const valid = trainings.filter(t => {
    if (!t.training_expiry) return false
    return Math.ceil((new Date(t.training_expiry) - today) / (1000 * 60 * 60 * 24)) > 30
  })

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Training Records</h2>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
            Track staff training certifications and expiry dates.
          </p>
        </div>
        <Link to="/trainingadd">
          <Button style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px 20px' }}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
            Add Training Record
          </Button>
        </Link>
      </div>

      {/* Summary cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px', marginBottom: '32px',
      }}>
        {[
          { label: 'Total Records',   value: trainings.length,       color: NAVY },
          { label: 'Valid',           value: valid.length,            color: '#059669' },
          { label: 'Expiring Soon',   value: expiringSoon.length,     color: '#D97706' },
          { label: 'Expired',         value: expired.length,          color: '#DC2626' },
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
            All Records ({filtered.length})
          </h5>
          <input
            type="text"
            placeholder="Search training, provider, staff name..."
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
            {trainings.length === 0 ? 'No training records added yet.' : 'No results match your search.'}
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Staff Member</th>
                <th style={{ color: NAVY }}>Position</th>
                <th style={{ color: NAVY }}>Training</th>
                <th style={{ color: NAVY }}>Provider</th>
                <th style={{ color: NAVY }}>Date</th>
                <th style={{ color: NAVY }}>Expiry</th>
                <th style={{ color: NAVY }}>Status</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => {
                const status = expiryStatus(t.training_expiry)
                return (
                  <tr key={t.id}>
                    <td style={{ fontWeight: '600' }}>{staffName(t.staff_name)}</td>
                    <td style={{ color: '#666', fontSize: '13px' }}>{staffPosition(t.staff_name)}</td>
                    <td>{t.training || '—'}</td>
                    <td style={{ color: '#666', fontSize: '13px' }}>{t.training_provider || '—'}</td>
                    <td style={{ color: '#666', fontSize: '13px', whiteSpace: 'nowrap' }}>
                      {t.training_date || '—'}
                    </td>
                    <td style={{ color: '#666', fontSize: '13px', whiteSpace: 'nowrap' }}>
                      {t.training_expiry || '—'}
                    </td>
                    <td>
                      {status ? (
                        <span style={{
                          backgroundColor: status.bg, color: status.color,
                          padding: '2px 8px', borderRadius: '4px',
                          fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap',
                        }}>
                          {status.label}
                        </span>
                      ) : <span style={{ color: '#ccc' }}>—</span>}
                    </td>
                    <td>
                      <Link to={`/trainingedit/${t.id}`} style={{ color: NAVY }}>
                        <FontAwesomeIcon icon={faPen} />
                      </Link>
                    </td>
                    <td>
                      <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(t.id)}>
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
