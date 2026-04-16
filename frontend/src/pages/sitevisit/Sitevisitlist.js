import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import SiteVisitAPI from '../../API/SiteVisitAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function Sitevisitlist() {
  const { authTokens } = useContext(AuthContext)
  const [siteVisits, setSiteVisits] = useState([])
  const [staffs, setStaffs] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchSiteVisits()
    fetchStaff()
  }, [])

  const fetchSiteVisits = () => {
    SiteVisitAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setSiteVisits(res.data)).catch(console.log)
  }

  const fetchStaff = () => {
    StaffAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setStaffs(res.data)).catch(console.log)
  }

  const onDelete = (id) => {
    SiteVisitAPI.delete(`/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => fetchSiteVisits()).catch(console.log)
  }

  const staffName = (id) => staffs.find(s => s.id === id)?.name || '—'

  const today = new Date()
  const thisMonth = siteVisits.filter(v => {
    if (!v.inspection_date) return false
    const d = new Date(v.inspection_date)
    return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth()
  })

  const filtered = siteVisits.filter(v => {
    const q = search.toLowerCase()
    return (
      staffName(v.inspector).toLowerCase().includes(q) ||
      (v.location || '').toLowerCase().includes(q) ||
      (v.inspection_date || '').includes(q)
    )
  })

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Site Visit Inspections</h2>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
            Track site inspection records, hazards, and attendees.
          </p>
        </div>
        <Link to="/sitevisitadd">
          <Button style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px 20px' }}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
            Add Site Visit
          </Button>
        </Link>
      </div>

      {/* Summary cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px', marginBottom: '32px',
      }}>
        {[
          { label: 'Total Visits',  value: siteVisits.length, color: NAVY },
          { label: 'This Month',    value: thisMonth.length,  color: '#2563EB' },
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
            placeholder="Search inspector, location..."
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
            {siteVisits.length === 0 ? 'No site visits recorded yet.' : 'No results match your search.'}
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Inspector</th>
                <th style={{ color: NAVY }}>Location</th>
                <th style={{ color: NAVY }}>Date</th>
                <th style={{ color: NAVY }}>Time</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id}>
                  <td style={{ fontWeight: '600' }}>{staffName(v.inspector)}</td>
                  <td>{v.location || '—'}</td>
                  <td style={{ color: '#666', fontSize: '13px', whiteSpace: 'nowrap' }}>{v.inspection_date || '—'}</td>
                  <td style={{ color: '#666', fontSize: '13px', whiteSpace: 'nowrap' }}>{v.inspection_time || '—'}</td>
                  <td>
                    <Link to={`/sitevisitedit/${v.id}`} style={{ color: NAVY }}>
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(v.id)}>
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
