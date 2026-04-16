import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import PermitToWorkAPI from '../../API/PermitToWorkAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function PermitToWorkList() {
  const { authTokens } = useContext(AuthContext)
  const [permits, setPermits] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchPermits()
  }, [])

  const fetchPermits = () => {
    PermitToWorkAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setPermits(res.data)).catch(console.log)
  }

  const onDelete = (id) => {
    PermitToWorkAPI.delete(`/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => fetchPermits()).catch(console.log)
  }

  const filtered = permits.filter(p => {
    const q = search.toLowerCase()
    return (
      (p.permit_number || '').toLowerCase().includes(q) ||
      (p.location_of_work || '').toLowerCase().includes(q) ||
      (p.nature_of_work || '').toLowerCase().includes(q)
    )
  })

  const activeCount = permits.filter(p => !p.work_completed).length

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Permit to Work</h2>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
            Manage work permits, hazards, controls, and authorisation signatures.
          </p>
        </div>
        <Link to="/permittoworkadd">
          <Button style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px 20px' }}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
            Add Permit to Work
          </Button>
        </Link>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px', marginBottom: '32px',
      }}>
        {[
          { label: 'Total Permits', value: permits.length, color: NAVY },
          { label: 'Active / Open', value: activeCount, color: '#D97706' },
          { label: 'Completed', value: permits.length - activeCount, color: '#059669' },
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
          <h5 style={{ color: NAVY, fontWeight: '700', margin: 0 }}>All Permits ({filtered.length})</h5>
          <input
            type="text"
            placeholder="Search permit number, location, nature..."
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
            {permits.length === 0 ? 'No permits added yet.' : 'No results match your search.'}
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '13px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Permit Number</th>
                <th style={{ color: NAVY }}>Location of Work</th>
                <th style={{ color: NAVY }}>Nature of Work</th>
                <th style={{ color: NAVY }}>Work Start</th>
                <th style={{ color: NAVY }}>Work Completed</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: '600' }}>{p.permit_number || '—'}</td>
                  <td style={{ color: '#666' }}>{p.location_of_work || '—'}</td>
                  <td style={{ color: '#666', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.nature_of_work || '—'}</td>
                  <td style={{ color: '#666', whiteSpace: 'nowrap' }}>{p.work_start || '—'}</td>
                  <td style={{ color: '#666', whiteSpace: 'nowrap' }}>{p.work_completed || '—'}</td>
                  <td>
                    <Link to={`/permittoworkedit/${p.id}`} style={{ color: NAVY }}>
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(p.id)}>
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
