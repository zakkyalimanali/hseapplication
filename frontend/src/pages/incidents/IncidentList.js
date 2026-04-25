import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import IncidentAPI from '../../API/IncidentAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'

const NAVY   = '#1B2B4B'
const ORANGE = '#E15047'
const GREEN  = '#059669'
const AMBER  = '#D97706'
const BLUE   = '#2563EB'

const STATUS_STYLES = {
  'Resolved':                  { bg: '#D1FAE5', color: GREEN },
  'No Further Action Required':{ bg: '#DBEAFE', color: BLUE  },
  'Ongoing':                   { bg: '#FEF3C7', color: AMBER },
}

export default function IncidentList() {
  const { authTokens } = useContext(AuthContext)
  const [incidents, setIncidents] = useState([])
  const [staffs,    setStaffs]    = useState([])
  const [search,    setSearch]    = useState('')

  const headers = { Authorization: `Bearer ${authTokens.access}` }

  useEffect(() => {
    fetchIncidents()
    StaffAPI.get('/', { headers }).then(res => setStaffs(res.data)).catch(console.log)
  }, [])

  const fetchIncidents = () => {
    IncidentAPI.get('/', { headers }).then(res => setIncidents(res.data)).catch(console.log)
  }

  const onDelete = (id) => {
    IncidentAPI.delete(`/${id}/`, { headers })
      .then(() => fetchIncidents()).catch(console.log)
  }

  const staffName = (id) => staffs.find(s => s.id === id)?.name || '—'

  const filtered = incidents.filter(c => {
    const q = search.toLowerCase()
    return (
      (c.short_desc   || '').toLowerCase().includes(q) ||
      (c.location     || '').toLowerCase().includes(q) ||
      (c.findings     || '').toLowerCase().includes(q) ||
      staffName(c.raised_by).toLowerCase().includes(q)
    )
  })

  const fmt = (str) => str
    ? new Date(str).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—'

  return (
    <div style={{ padding: '40px', maxWidth: '1300px', margin: '0 auto' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Incidents</h2>
          <p style={{ color: '#9CA3AF', margin: 0, fontSize: '14px' }}>
            Formal incident records requiring investigation and follow-up.
          </p>
        </div>
        <Link to="/incidentadd" style={{ textDecoration: 'none' }}>
          <button style={{
            backgroundColor: ORANGE, color: 'white', border: 'none',
            borderRadius: '8px', padding: '10px 20px',
            fontWeight: '600', fontSize: '14px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Incident
          </button>
        </Link>
      </div>

      {/* ── Summary cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Incidents',    value: incidents.length,                                                       color: NAVY  },
          { label: 'Ongoing',            value: incidents.filter(c => c.status === 'Ongoing').length,                   color: AMBER },
          { label: 'Resolved',           value: incidents.filter(c => c.status === 'Resolved').length,                  color: GREEN },
          { label: 'No Action Required', value: incidents.filter(c => c.status === 'No Further Action Required').length, color: BLUE  },
        ].map(item => (
          <div key={item.label} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: '800', color: item.color }}>{item.value}</div>
            <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* ── Table card ── */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h5 style={{ color: NAVY, fontWeight: '700', margin: 0 }}>
            All Incidents ({filtered.length})
          </h5>
          <input
            type="text"
            placeholder="Search incidents..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '8px 14px', border: '1.5px solid #E5E7EB',
              borderRadius: '8px', fontSize: '14px', outline: 'none',
              width: '240px', color: '#374151',
            }}
          />
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#9CA3AF' }}>
            <p style={{ margin: 0 }}>{search ? 'No incidents match your search.' : 'No incidents recorded yet.'}</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F3F4F6' }}>
                  {['Description', 'Raised By', 'Location', 'Incident Date', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '700', fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6B7280', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => {
                  const ss = STATUS_STYLES[c.status] || { bg: '#F3F4F6', color: '#6B7280' }
                  return (
                    <tr key={c.id} style={{ borderBottom: '1px solid #F9FAFB', backgroundColor: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                      <td style={{ padding: '14px 12px', fontWeight: '600', color: NAVY, maxWidth: '260px' }}>
                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {c.short_desc || '—'}
                        </div>
                        {c.what_happened && (
                          <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {c.what_happened}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '14px 12px', color: '#374151' }}>{staffName(c.raised_by)}</td>
                      <td style={{ padding: '14px 12px', color: '#374151' }}>{c.location || '—'}</td>
                      <td style={{ padding: '14px 12px', color: '#374151', whiteSpace: 'nowrap' }}>{fmt(c.incident_date)}</td>
                      <td style={{ padding: '14px 12px' }}>
                        <span style={{ backgroundColor: ss.bg, color: ss.color, fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                          {c.status || '—'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 12px' }}>
                        <button
                          onClick={() => onDelete(c.id)}
                          style={{ background: 'none', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: '4px', padding: '4px 10px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  )
}
