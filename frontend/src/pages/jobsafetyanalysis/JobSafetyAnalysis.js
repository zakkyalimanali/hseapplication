import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import JobSafetyAnalysisAPI from '../../API/JobSafetyAnalysisAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'
import { useContext as useCtx } from 'react'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function JobSafetyAnalysis() {
  const { authTokens } = useContext(AuthContext)
  const [jsas, setJsas] = useState([])
  const [staffs, setStaffs] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchJsas()
    fetchStaff()
  }, [])

  const fetchJsas = () => {
    JobSafetyAnalysisAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setJsas(res.data)).catch(console.log)
  }

  const fetchStaff = () => {
    StaffAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setStaffs(res.data)).catch(console.log)
  }

  const onDelete = (id) => {
    JobSafetyAnalysisAPI.delete(`/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => fetchJsas()).catch(console.log)
  }

  const staffName = (id) => {
    const s = staffs.find(s => s.id === id)
    return s ? `${s.name} (${s.position})` : '—'
  }

  const filtered = jsas.filter(j => {
    const q = search.toLowerCase()
    return (
      (j.job_title || '').toLowerCase().includes(q) ||
      (j.jsa_id || '').toLowerCase().includes(q) ||
      (j.company || '').toLowerCase().includes(q) ||
      (j.location || '').toLowerCase().includes(q) ||
      (j.department || '').toLowerCase().includes(q)
    )
  })

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Job Safety Analysis</h2>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
            Manage JSA records, job steps, safety equipment, and hazard controls.
          </p>
        </div>
        <Link to="/jobsafetyanalysisadd">
          <Button style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px 20px' }}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
            Add JSA
          </Button>
        </Link>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px', marginBottom: '32px',
      }}>
        <div style={{
          backgroundColor: 'white', borderRadius: '10px', padding: '20px 16px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.07)', textAlign: 'center',
        }}>
          <div style={{ fontSize: '28px', fontWeight: '800', color: NAVY }}>{jsas.length}</div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>Total JSA Records</div>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h5 style={{ color: NAVY, fontWeight: '700', margin: 0 }}>All JSA Records ({filtered.length})</h5>
          <input
            type="text"
            placeholder="Search job title, JSA ID, location..."
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
            {jsas.length === 0 ? 'No JSA records added yet.' : 'No results match your search.'}
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '13px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Job Title</th>
                <th style={{ color: NAVY }}>JSA ID</th>
                <th style={{ color: NAVY }}>Job Performer</th>
                <th style={{ color: NAVY }}>Supervisor</th>
                <th style={{ color: NAVY }}>Date Raised</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(j => (
                <tr key={j.id}>
                  <td style={{ fontWeight: '600', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j.job_title || '—'}</td>
                  <td style={{ color: '#666' }}>{j.jsa_id || '—'}</td>
                  <td style={{ color: '#666', fontSize: '12px' }}>{staffName(j.job_performer)}</td>
                  <td style={{ color: '#666', fontSize: '12px' }}>{staffName(j.supervisor)}</td>
                  <td style={{ color: '#666', whiteSpace: 'nowrap' }}>{j.date_raised || '—'}</td>
                  <td>
                    <Link to={`/jobsafetyanalysisedit/${j.id}`} style={{ color: NAVY }}>
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(j.id)}>
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
