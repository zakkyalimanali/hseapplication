import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import RiskRegisterAPI from '../../../API/RiskRegisterAPI'
import StaffAPI from '../../../API/StaffAPI'
import AuthContext from '../../../context/AuthContext'

const NAVY = '#1B2B4B'

const SEVERITY_STYLES = {
  Critical: { bg: '#FEE2E2', color: '#DC2626' },
  High:     { bg: '#FEE2E2', color: '#DC2626' },
  Medium:   { bg: '#FEF3C7', color: '#D97706' },
  Low:      { bg: '#D1FAE5', color: '#059669' },
}

function severityBadge(val) {
  if (!val) return null
  const key = Object.keys(SEVERITY_STYLES).find(k => val.toLowerCase() === k.toLowerCase())
  return key ? SEVERITY_STYLES[key] : null
}

export default function RiskRegisterList() {
  const { authTokens } = useContext(AuthContext)
  const [risks, setRisks] = useState([])
  const [staffs, setStaffs] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchRisks()
    fetchStaff()
  }, [])

  const fetchRisks = () => {
    RiskRegisterAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setRisks(res.data)).catch(console.log)
  }

  const fetchStaff = () => {
    StaffAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setStaffs(res.data)).catch(console.log)
  }

  const onDelete = (id) => {
    RiskRegisterAPI.delete(`/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => fetchRisks()).catch(console.log)
  }

  const staffName = (id) => staffs.find(s => s.id === id)?.name || '—'

  const filtered = risks.filter(r => {
    const q = search.toLowerCase()
    return (
      (r.risk_description || '').toLowerCase().includes(q) ||
      (r.severity || '').toLowerCase().includes(q) ||
      (r.responsible_party || '').toLowerCase().includes(q) ||
      (r.status || '').toLowerCase().includes(q)
    )
  })

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>All Risk Entries</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          View all risk entries across all projects.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px', marginBottom: '32px',
      }}>
        {[
          { label: 'Total Risks', value: risks.length, color: NAVY },
          { label: 'Critical / High', value: risks.filter(r => ['critical','high'].includes((r.severity||'').toLowerCase())).length, color: '#DC2626' },
          { label: 'Medium', value: risks.filter(r => (r.severity||'').toLowerCase() === 'medium').length, color: '#D97706' },
          { label: 'Low', value: risks.filter(r => (r.severity||'').toLowerCase() === 'low').length, color: '#059669' },
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
          <h5 style={{ color: NAVY, fontWeight: '700', margin: 0 }}>All Risks ({filtered.length})</h5>
          <input
            type="text"
            placeholder="Search risk, severity, status..."
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
            {risks.length === 0 ? 'No risk entries found.' : 'No results match your search.'}
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '13px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Risk Description</th>
                <th style={{ color: NAVY }}>Likelihood</th>
                <th style={{ color: NAVY }}>Impact</th>
                <th style={{ color: NAVY }}>Severity</th>
                <th style={{ color: NAVY }}>Responsible</th>
                <th style={{ color: NAVY }}>Status</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => {
                const badge = severityBadge(r.severity)
                return (
                  <tr key={r.id}>
                    <td style={{ fontWeight: '600', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.risk_description || '—'}
                    </td>
                    <td style={{ color: '#666' }}>{r.likelihood_of_risk || '—'}</td>
                    <td style={{ color: '#666' }}>{r.impact_of_risk || '—'}</td>
                    <td>
                      {badge ? (
                        <span style={{ backgroundColor: badge.bg, color: badge.color, padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                          {r.severity}
                        </span>
                      ) : <span style={{ color: '#666' }}>{r.severity || '—'}</span>}
                    </td>
                    <td style={{ color: '#666' }}>{r.responsible_party || '—'}</td>
                    <td style={{ color: '#666' }}>{r.status || '—'}</td>
                    <td>
                      <Link to={`/riskregisteredit/${r.id}`} style={{ color: NAVY }}>
                        <FontAwesomeIcon icon={faPen} />
                      </Link>
                    </td>
                    <td>
                      <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(r.id)}>
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
