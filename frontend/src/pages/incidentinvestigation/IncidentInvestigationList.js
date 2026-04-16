import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import IncidentInvestigationAPI from '../../API/IncidentInvestigationAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function IncidentInvestigationList() {
  const { authTokens } = useContext(AuthContext)
  const [investigations, setInvestigations] = useState([])
  const [staffs, setStaffs] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchInvestigations()
    fetchStaff()
  }, [])

  const fetchInvestigations = () => {
    IncidentInvestigationAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setInvestigations(res.data)).catch(console.log)
  }

  const fetchStaff = () => {
    StaffAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setStaffs(res.data)).catch(console.log)
  }

  const onDelete = (id) => {
    IncidentInvestigationAPI.delete(`/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => fetchInvestigations()).catch(console.log)
  }

  const staffName = (id) => staffs.find(s => s.id === id)?.name || '—'

  const today = new Date()
  const thisMonth = investigations.filter(i => {
    if (!i.date_of_incident) return false
    const d = new Date(i.date_of_incident)
    return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth()
  })

  const filtered = investigations.filter(i => {
    const q = search.toLowerCase()
    return (
      (i.what_happened || '').toLowerCase().includes(q) ||
      (i.task_performed || '').toLowerCase().includes(q) ||
      (i.location_of_incident || '').toLowerCase().includes(q) ||
      staffName(i.investigator).toLowerCase().includes(q)
    )
  })

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Incident Investigations</h2>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
            Record and manage formal incident investigation reports.
          </p>
        </div>
        <Link to="/incidentinvestigationadd">
          <Button style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px 20px' }}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
            Add Investigation
          </Button>
        </Link>
      </div>

      {/* Summary cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px', marginBottom: '32px',
      }}>
        {[
          { label: 'Total Investigations', value: investigations.length, color: NAVY },
          { label: 'This Month',           value: thisMonth.length,      color: '#2563EB' },
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
            placeholder="Search investigator, location, incident..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              border: '1.5px solid #e5e7eb', borderRadius: '8px',
              padding: '7px 14px', fontSize: '13px', width: '300px', outline: 'none',
            }}
          />
        </div>

        {filtered.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '40px 0', margin: 0 }}>
            {investigations.length === 0 ? 'No investigations recorded yet.' : 'No results match your search.'}
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Investigator</th>
                <th style={{ color: NAVY }}>What Happened</th>
                <th style={{ color: NAVY }}>Task Performed</th>
                <th style={{ color: NAVY }}>Location</th>
                <th style={{ color: NAVY }}>Date</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(i => (
                <tr key={i.id}>
                  <td style={{ fontWeight: '600' }}>{staffName(i.investigator)}</td>
                  <td style={{ maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {i.what_happened || '—'}
                  </td>
                  <td style={{ color: '#666', fontSize: '13px', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {i.task_performed || '—'}
                  </td>
                  <td style={{ color: '#666', fontSize: '13px' }}>{i.location_of_incident || '—'}</td>
                  <td style={{ color: '#666', fontSize: '13px', whiteSpace: 'nowrap' }}>{i.date_of_incident || '—'}</td>
                  <td>
                    <Link to={`/incidentinvestigationedit/${i.id}`} style={{ color: NAVY }}>
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(i.id)}>
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
