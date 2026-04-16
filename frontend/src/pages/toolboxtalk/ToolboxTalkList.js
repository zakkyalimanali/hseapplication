import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import ToolBoxTalkAPI from '../../API/ToolBoxTalkAPI'
import axios from 'axios'
import API_BASE from '../../utils/apiBase'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function ToolBoxTalkList() {
  const { authTokens } = useContext(AuthContext)
  const [toolBoxTalks, setToolBoxTalks] = useState([])
  const [staffs, setStaffs] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchToolBoxTalk()
    staffData()
  }, [])

  const fetchToolBoxTalk = () => {
    ToolBoxTalkAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setToolBoxTalks(res.data)).catch(console.log)
  }

  const staffData = () => {
    axios.get(`${API_BASE}/hseapp/staff/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setStaffs(res.data)).catch(console.log)
  }

  const onDelete = (id) => {
    ToolBoxTalkAPI.delete(`/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => fetchToolBoxTalk()).catch(console.log)
  }

  const staffName = (id) => staffs.find(s => s.id === id)?.name || '—'

  const filtered = toolBoxTalks.filter(t => {
    const q = search.toLowerCase()
    return (
      (t.topic || '').toLowerCase().includes(q) ||
      (t.project || '').toLowerCase().includes(q) ||
      staffName(t.presenter).toLowerCase().includes(q)
    )
  })

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Toolbox Talks</h2>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
            Record and manage daily toolbox talk sessions with your crew.
          </p>
        </div>
        <Link to="/toolboxtalkadd">
          <Button style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px 20px' }}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
            Add Toolbox Talk
          </Button>
        </Link>
      </div>

      {/* Summary cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px', marginBottom: '32px',
      }}>
        {[
          { label: 'Total Sessions',  value: toolBoxTalks.length, color: NAVY },
          { label: 'This Month',
            value: toolBoxTalks.filter(t => {
              if (!t.toolbox_date) return false
              const d = new Date(t.toolbox_date)
              const now = new Date()
              return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
            }).length,
            color: ORANGE },
          { label: 'Unique Topics',
            value: new Set(toolBoxTalks.map(t => t.topic).filter(Boolean)).size,
            color: '#2563EB' },
          { label: 'Total Crew',
            value: toolBoxTalks.reduce((sum, t) => sum + (t.crew_number || 0), 0),
            color: '#059669' },
        ].map(card => (
          <div key={card.label} style={{
            backgroundColor: 'white', borderRadius: '10px', padding: '20px 16px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.07)', textAlign: 'center',
          }}>
            <div style={{ fontSize: '28px', fontWeight: '800', color: card.color }}>
              {card.value}
            </div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div style={{
        backgroundColor: 'white', borderRadius: '12px',
        padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        {/* Table header with search */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h5 style={{ color: NAVY, fontWeight: '700', margin: 0 }}>
            All Sessions ({filtered.length})
          </h5>
          <input
            type="text"
            placeholder="Search topic, project, presenter..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              border: '1.5px solid #e5e7eb', borderRadius: '8px',
              padding: '7px 14px', fontSize: '13px', width: '260px', outline: 'none',
            }}
          />
        </div>

        {filtered.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '40px 0', margin: 0 }}>
            {toolBoxTalks.length === 0 ? 'No toolbox talks recorded yet.' : 'No results match your search.'}
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Date</th>
                <th style={{ color: NAVY }}>Topic</th>
                <th style={{ color: NAVY }}>Project</th>
                <th style={{ color: NAVY }}>Presenter</th>
                <th style={{ color: NAVY }}>Supervisor</th>
                <th style={{ color: NAVY }}>Crew</th>
                <th style={{ color: NAVY }}>Time</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td style={{ color: '#666', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {t.toolbox_date || '—'}
                  </td>
                  <td style={{ fontWeight: '600' }}>
                    {t.topic || '—'}
                    {t.textbox && (
                      <div style={{ color: '#888', fontSize: '12px', marginTop: '2px', fontWeight: '400' }}>
                        {t.textbox.length > 60 ? t.textbox.slice(0, 60) + '…' : t.textbox}
                      </div>
                    )}
                  </td>
                  <td style={{ color: '#555' }}>{t.project || '—'}</td>
                  <td>{staffName(t.presenter)}</td>
                  <td style={{ color: '#666' }}>{staffName(t.supervisor)}</td>
                  <td style={{ textAlign: 'center' }}>
                    {t.crew_number != null ? (
                      <span style={{
                        backgroundColor: '#EEF2FF', color: '#4F46E5',
                        padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600',
                      }}>
                        {t.crew_number}
                      </span>
                    ) : '—'}
                  </td>
                  <td style={{ color: '#666', fontSize: '13px' }}>{t.time || '—'}</td>
                  <td>
                    <Link to={`/toolboxtalkedit/${t.id}`} style={{ color: NAVY }}>
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(t.id)}>
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
