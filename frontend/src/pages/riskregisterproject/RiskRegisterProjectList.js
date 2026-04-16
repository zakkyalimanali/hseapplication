import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import RiskRegisterProjectAPI from '../../API/RiskRegisterProjectAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function RiskRegisterProjectList() {
  const { authTokens } = useContext(AuthContext)
  const [projects, setProjects] = useState([])
  const [staffs, setStaffs] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchProjects()
    fetchStaff()
  }, [])

  const fetchProjects = () => {
    RiskRegisterProjectAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setProjects(res.data)).catch(console.log)
  }

  const fetchStaff = () => {
    StaffAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setStaffs(res.data)).catch(console.log)
  }

  const onDelete = (id) => {
    RiskRegisterProjectAPI.delete(`/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => fetchProjects()).catch(console.log)
  }

  const staffName = (id) => staffs.find(s => s.id === id)?.name || '—'

  const filtered = projects.filter(p => {
    const q = search.toLowerCase()
    return (
      (p.project_name || '').toLowerCase().includes(q) ||
      staffName(p.raised_by).toLowerCase().includes(q) ||
      staffName(p.reviewed_by).toLowerCase().includes(q)
    )
  })

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Risk Register</h2>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
            Manage project-level risk registers and individual risk entries.
          </p>
        </div>
        <Link to="/riskregisterprojectadd">
          <Button style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px 20px' }}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
            Add Project
          </Button>
        </Link>
      </div>

      {/* Summary card */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px', marginBottom: '32px',
      }}>
        <div style={{
          backgroundColor: 'white', borderRadius: '10px', padding: '20px 16px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.07)', textAlign: 'center',
        }}>
          <div style={{ fontSize: '28px', fontWeight: '800', color: NAVY }}>{projects.length}</div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>Total Projects</div>
        </div>
      </div>

      {/* Table card */}
      <div style={{
        backgroundColor: 'white', borderRadius: '12px',
        padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h5 style={{ color: NAVY, fontWeight: '700', margin: 0 }}>All Projects ({filtered.length})</h5>
          <input
            type="text"
            placeholder="Search project, raised by..."
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
            {projects.length === 0 ? 'No projects added yet.' : 'No results match your search.'}
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Project Name</th>
                <th style={{ color: NAVY }}>Raised By</th>
                <th style={{ color: NAVY }}>Reviewed By</th>
                <th style={{ color: NAVY }}>Date Raised</th>
                <th style={{ color: NAVY }}>Date Reviewed</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: '600' }}>{p.project_name || '—'}</td>
                  <td style={{ color: '#666', fontSize: '13px' }}>{staffName(p.raised_by)}</td>
                  <td style={{ color: '#666', fontSize: '13px' }}>{staffName(p.reviewed_by)}</td>
                  <td style={{ color: '#666', fontSize: '13px', whiteSpace: 'nowrap' }}>{p.date_raised || '—'}</td>
                  <td style={{ color: '#666', fontSize: '13px', whiteSpace: 'nowrap' }}>{p.date_reviewed || '—'}</td>
                  <td>
                    <Link to={`/riskregisterprojectedit/${p.id}`} style={{ color: NAVY }}>
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
