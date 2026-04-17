import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faPen, faTrash, faPlus, faListUl, faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import AttendenceAPI from '../../API/AttendenceAPI'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import API_BASE from '../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

const STATUS_STYLES = {
  Present: { bg: '#DCFCE7', color: '#166534' },
  MC:      { bg: '#FEF9C3', color: '#854D0E' },
  Absent:  { bg: '#FEE2E2', color: '#991B1B' },
}

const toISO = (date) => date.toISOString().split('T')[0]

const formatDisplay = (isoDate) => {
  const d = new Date(isoDate + 'T00:00:00')
  const today = toISO(new Date())
  const yesterday = toISO(new Date(Date.now() - 86400000))
  if (isoDate === today) return 'Today'
  if (isoDate === yesterday) return 'Yesterday'
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export default function AttendenceList() {
  const { authTokens } = useContext(AuthContext)
  const [attendences, setAttendences] = useState([])
  const [staffs, setStaffs] = useState([])
  const [selectedDate, setSelectedDate] = useState(toISO(new Date()))
  const [view, setView] = useState('daily')   // 'daily' | 'all'
  const [saving, setSaving] = useState({})    // staffId -> true while POST in-flight
  const [search, setSearch] = useState('')

  const headers = { Authorization: `Bearer ${authTokens.access}` }

  useEffect(() => {
    AttendenceAPI.get('/', { headers }).then(res => setAttendences(res.data)).catch(console.log)
    axios.get(`${API_BASE}/hseapp/staff/`, { headers }).then(res => setStaffs(res.data)).catch(console.log)
  }, [])

  const stepDate = (days) => {
    const d = new Date(selectedDate + 'T00:00:00')
    d.setDate(d.getDate() + days)
    setSelectedDate(toISO(d))
  }

  const getStaffName = (id) => staffs.find(s => s.id === Number(id))?.name || '—'
  const getStaffPosition = (id) => staffs.find(s => s.id === Number(id))?.position || ''

  // Records for the selected date
  const dayRecords = attendences.filter(a => a.attendence_date === selectedDate)
  const recordByStaff = Object.fromEntries(dayRecords.map(r => [r.staff_name, r]))

  // Summary counts for selected date
  const presentCount   = dayRecords.filter(a => a.attendence_status === 'Present').length
  const mcCount        = dayRecords.filter(a => a.attendence_status === 'MC').length
  const absentCount    = dayRecords.filter(a => a.attendence_status === 'Absent').length
  const notRecorded    = staffs.length - dayRecords.length

  // Quick-mark: POST a new record immediately
  const quickMark = (staffId, status) => {
    setSaving(prev => ({ ...prev, [staffId]: true }))
    AttendenceAPI.post('/', {
      staff_name: staffId,
      attendence_date: selectedDate,
      attendence_status: status,
    }, { headers }).then(res => {
      setAttendences(prev => [...prev, res.data])
      setSaving(prev => ({ ...prev, [staffId]: false }))
    }).catch(() => setSaving(prev => ({ ...prev, [staffId]: false })))
  }

  // Quick-update: PATCH existing record status
  const quickUpdate = (record, status) => {
    setSaving(prev => ({ ...prev, [record.staff_name]: true }))
    AttendenceAPI.patch(`/${record.id}/`, { attendence_status: status }, { headers })
      .then(res => {
        setAttendences(prev => prev.map(a => a.id === record.id ? { ...a, attendence_status: status } : a))
        setSaving(prev => ({ ...prev, [record.staff_name]: false }))
      }).catch(() => setSaving(prev => ({ ...prev, [record.staff_name]: false })))
  }

  const onDelete = (id) => {
    AttendenceAPI.delete(`/${id}/`, { headers }).then(() =>
      setAttendences(prev => prev.filter(a => a.id !== id))
    ).catch(console.log)
  }

  const StatusBadge = ({ status }) => {
    const s = STATUS_STYLES[status] || { bg: '#F3F4F6', color: '#374151' }
    return (
      <span style={{ backgroundColor: s.bg, color: s.color, padding: '3px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
        {status}
      </span>
    )
  }

  // All records view — filtered by search
  const allFiltered = attendences.filter(a => {
    const q = search.toLowerCase()
    return (
      getStaffName(a.staff_name).toLowerCase().includes(q) ||
      (a.attendence_date || '').includes(q) ||
      (a.attendence_status || '').toLowerCase().includes(q)
    )
  })

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Attendance</h2>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>Track daily staff attendance.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* View toggle */}
          <div style={{ display: 'flex', backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '3px' }}>
            {[['daily', faCalendarDay, 'Daily'], ['all', faListUl, 'All Records']].map(([v, icon, label]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  background: view === v ? 'white' : 'transparent',
                  border: 'none', borderRadius: '6px', padding: '6px 14px', fontWeight: '600',
                  fontSize: '13px', color: view === v ? NAVY : '#888', cursor: 'pointer',
                  boxShadow: view === v ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}
              >
                <FontAwesomeIcon icon={icon} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── DAILY VIEW ── */}
      {view === 'daily' && (
        <>
          {/* Date navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <button onClick={() => stepDate(-1)} style={{ background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', color: NAVY }}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'white', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '7px 14px' }}>
              <span style={{ fontWeight: '700', color: NAVY, fontSize: '15px' }}>{formatDisplay(selectedDate)}</span>
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#888', cursor: 'pointer', background: 'transparent' }}
              />
            </div>

            <button onClick={() => stepDate(1)} style={{ background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', color: NAVY }}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>

            {selectedDate !== toISO(new Date()) && (
              <button onClick={() => setSelectedDate(toISO(new Date()))} style={{ background: 'transparent', border: 'none', color: ORANGE, fontWeight: '600', fontSize: '13px', cursor: 'pointer', padding: '8px 4px' }}>
                Go to today
              </button>
            )}
          </div>

          {/* Summary bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {[
              { label: 'Present',      value: presentCount, bg: '#DCFCE7', color: '#166534' },
              { label: 'MC',           value: mcCount,      bg: '#FEF9C3', color: '#854D0E' },
              { label: 'Absent',       value: absentCount,  bg: '#FEE2E2', color: '#991B1B' },
              { label: 'Not Recorded', value: notRecorded,  bg: '#F3F4F6', color: '#6B7280' },
            ].map(c => (
              <div key={c.label} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)', textAlign: 'center' }}>
                <div style={{ fontSize: '26px', fontWeight: '800', color: c.color }}>{c.value}</div>
                <div style={{ fontSize: '11px', color: '#888', marginTop: '3px', fontWeight: '600' }}>{c.label}</div>
              </div>
            ))}
          </div>

          {/* Staff rows */}
          {staffs.length === 0 ? (
            <p style={{ color: '#aaa', textAlign: 'center', padding: '40px 0' }}>No staff records found.</p>
          ) : (
            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              {staffs.map((staff, i) => {
                const record = recordByStaff[staff.id]
                const isSaving = saving[staff.id]
                const isLast = i === staffs.length - 1

                return (
                  <div
                    key={staff.id}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '14px 20px', flexWrap: 'wrap', gap: '12px',
                      borderBottom: isLast ? 'none' : '1px solid #f3f4f6',
                      backgroundColor: record ? 'white' : '#fafafa',
                    }}
                  >
                    {/* Staff info */}
                    <div style={{ minWidth: '160px' }}>
                      <div style={{ fontWeight: '600', color: NAVY, fontSize: '14px' }}>{staff.name}</div>
                      {staff.position && <div style={{ fontSize: '12px', color: '#888' }}>{staff.position}</div>}
                    </div>

                    {/* Status / quick-mark */}
                    {record ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        {/* Status toggle buttons */}
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {['Present', 'MC', 'Absent'].map(s => {
                            const active = record.attendence_status === s
                            const st = STATUS_STYLES[s]
                            return (
                              <button
                                key={s}
                                disabled={isSaving}
                                onClick={() => !active && quickUpdate(record, s)}
                                style={{
                                  padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: '600',
                                  cursor: active ? 'default' : 'pointer',
                                  border: active ? 'none' : '1.5px solid #e5e7eb',
                                  backgroundColor: active ? st.bg : 'transparent',
                                  color: active ? st.color : '#aaa',
                                  opacity: isSaving ? 0.5 : 1,
                                }}
                              >
                                {s}
                              </button>
                            )
                          })}
                        </div>
                        {/* Edit / Delete */}
                        <Link to={`/attendenceedit/${record.id}`} style={{ color: NAVY, fontSize: '13px' }}>
                          <FontAwesomeIcon icon={faPen} />
                        </Link>
                        <span style={{ cursor: 'pointer', color: '#dc3545', fontSize: '13px' }} onClick={() => onDelete(record.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '12px', color: '#bbb', fontStyle: 'italic' }}>Not recorded</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {['Present', 'MC', 'Absent'].map(s => {
                            const st = STATUS_STYLES[s]
                            return (
                              <button
                                key={s}
                                disabled={isSaving}
                                onClick={() => quickMark(staff.id, s)}
                                style={{
                                  padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: '600',
                                  cursor: 'pointer', border: `1.5px solid ${st.bg}`,
                                  backgroundColor: 'transparent', color: st.color,
                                  opacity: isSaving ? 0.5 : 1,
                                }}
                              >
                                {s}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}

      {/* ── ALL RECORDS VIEW ── */}
      {view === 'all' && (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <h5 style={{ color: NAVY, fontWeight: '700', margin: 0 }}>All Records ({allFiltered.length})</h5>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Search staff, date, status..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '7px 14px', fontSize: '13px', width: '260px', outline: 'none' }}
              />
              <Link to="/attendenceadd">
                <button style={{ backgroundColor: ORANGE, color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', fontWeight: '600', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FontAwesomeIcon icon={faPlus} /> Add
                </button>
              </Link>
            </div>
          </div>

          {allFiltered.length === 0 ? (
            <p style={{ color: '#aaa', textAlign: 'center', padding: '40px 0', margin: 0 }}>
              {attendences.length === 0 ? 'No attendance records yet.' : 'No results match your search.'}
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    {['Staff', 'Date', 'Status', 'Edit', 'Delete'].map(h => (
                      <th key={h} style={{ color: NAVY, padding: '10px 12px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allFiltered.sort((a, b) => b.attendence_date?.localeCompare(a.attendence_date)).map(a => (
                    <tr key={a.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '10px 12px', fontWeight: '600', color: NAVY }}>{getStaffName(a.staff_name)}</td>
                      <td style={{ padding: '10px 12px', color: '#666' }}>{a.attendence_date || '—'}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <StatusBadge status={a.attendence_status} />
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <Link to={`/attendenceedit/${a.id}`} style={{ color: NAVY }}>
                          <FontAwesomeIcon icon={faPen} />
                        </Link>
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(a.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )

}
