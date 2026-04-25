import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import API_BASE from '../utils/apiBase'

const NAVY   = '#1B2B4B'
const ORANGE = '#E15047'
const RED    = '#DC2626'
const AMBER  = '#D97706'
const GREEN  = '#059669'

const sectionLabel = {
  margin: '0 0 12px',
  fontSize: '11px',
  fontWeight: '700',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#6B7280',
}

const card = {
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
}

const amberBtn = {
  backgroundColor: AMBER,
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  padding: '9px 18px',
  fontWeight: '600',
  fontSize: '13px',
  cursor: 'pointer',
}

const amberOutline = {
  backgroundColor: 'transparent',
  color: AMBER,
  border: `1.5px solid ${AMBER}`,
  borderRadius: '6px',
  padding: '9px 18px',
  fontWeight: '600',
  fontSize: '13px',
  cursor: 'pointer',
}

const QUICK_ACTIONS = [
  {
    label: 'Create New Incident',
    to: '/incident',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
  },
  {
    label: 'Assign Investigator',
    to: '/incidentinvestigationlist',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
      </svg>
    ),
  },
  {
    label: 'Submit Permit to Work',
    to: '/permittoworkadd',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
        <rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 14l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Approve Pending Permit',
    to: '/permittowork',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    label: 'Record Training Session',
    to: '/trainingadd',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    label: 'Create Site Visit Report',
    to: '/sitevisitadd',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
        <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
      </svg>
    ),
  },
  {
    label: 'Generate Safety Report',
    to: '/stats',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
  },
  {
    label: 'Review Risk Register',
    to: '/riskregisterprojectlist',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
]

const ACTIVITY_BADGE = {
  Incidents:       { bg: NAVY,     color: 'white' },
  Permits:         { bg: '#EFF6FF', color: '#2563EB' },
  Training:        { bg: '#FFFBEB', color: AMBER },
  'Risk Register': { bg: '#ECFDF5', color: GREEN },
  'Site Visits':   { bg: '#EEF2FF', color: '#4F46E5' },
}

function formatDate(str) {
  if (!str) return ''
  return new Date(str).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function MetricCard({ iconBg, iconEl, count, label, severity, breakdown, to, btnLabel, btnColor }) {
  return (
    <div style={{ ...card, padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div style={{
          backgroundColor: iconBg,
          width: '44px', height: '44px', borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {iconEl}
        </div>
        {severity === 'critical' && count > 0 && (
          <span style={{ backgroundColor: '#FEE2E2', color: RED, fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '4px', letterSpacing: '0.06em' }}>
            CRITICAL
          </span>
        )}
      </div>

      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: '32px', fontWeight: '800', color: NAVY, lineHeight: 1 }}>{count}</div>
        <div style={{ marginTop: '4px', fontSize: '11px', fontWeight: '700', color: '#6B7280', letterSpacing: '0.08em' }}>{label}</div>
      </div>

      {breakdown && (
        <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '12px', marginBottom: '16px', flex: 1 }}>
          {breakdown.map((b, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>
              <span>• {b.label}</span>
              <span style={{ fontWeight: '600', color: NAVY }}>{b.count}</span>
            </div>
          ))}
        </div>
      )}

      <Link to={to} style={{ textDecoration: 'none' }}>
        <button style={{
          backgroundColor: btnColor,
          color: 'white', border: 'none', borderRadius: '6px',
          padding: '9px 0', width: '100%', fontWeight: '600', fontSize: '13px', cursor: 'pointer',
        }}>
          {btnLabel}
        </button>
      </Link>
    </div>
  )
}

export default function Home() {
  const { user, tenantName, authTokens } = useContext(AuthContext)
  const [safetyCards, setSafetyCards] = useState([])
  const [permits, setPermits]         = useState([])
  const [trainings, setTrainings]     = useState([])
  const [siteVisits, setSiteVisits]   = useState([])
  const [risks, setRisks]             = useState([])
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    if (!authTokens) return
    const h = { Authorization: `Bearer ${authTokens.access}` }
    Promise.all([
      axios.get(`${API_BASE}/hseapp/safetycard/`,            { headers: h }),
      axios.get(`${API_BASE}/hseapp/permittowork/`,          { headers: h }),
      axios.get(`${API_BASE}/hseapp/training/`,              { headers: h }),
      axios.get(`${API_BASE}/hseapp/sitevisit/`,             { headers: h }),
      axios.get(`${API_BASE}/hseapp/riskregisterproject/`,   { headers: h }),
    ]).then(([c, p, t, v, r]) => {
      setSafetyCards(c.data)
      setPermits(p.data)
      setTrainings(t.data)
      setSiteVisits(v.data)
      setRisks(r.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const now = new Date()
  now.setHours(0, 0, 0, 0)

  const openIncidents    = safetyCards.filter(c => c.status === 'Ongoing')
  const pendingPermits   = permits.filter(p => !p.work_completed)
  const overdueTraining  = trainings.filter(t => t.expiry_date && new Date(t.expiry_date) < now)
  const expiringTraining = trainings.filter(t => {
    if (!t.expiry_date) return false
    const days = Math.ceil((new Date(t.expiry_date) - now) / 864e5)
    return days >= 0 && days <= 30
  })

  const userRole = user?.role
    ? user.role.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : 'Company Admin'

  const dateLabel = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  const recentActivity = [
    ...safetyCards.slice(0, 2).map(c => ({
      type: 'Incidents',
      title: c.short_desc || 'Safety card submitted',
      date: c.date_raised,
    })),
    ...permits.slice(0, 2).map(p => ({
      type: 'Permits',
      title: p.nature_of_work ? `Permit: ${p.nature_of_work}` : 'Permit to work submitted',
      date: null,
    })),
    ...siteVisits.slice(0, 2).map(v => ({
      type: 'Site Visits',
      title: v.location ? `Inspection at ${v.location}` : 'Site inspection recorded',
      date: v.inspection_date,
    })),
  ].slice(0, 6)

  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100%' }}>

      {/* ── Page Header ── */}
      {/* <div style={{ maxWidth: 'auto', margin: '0 auto', padding: '28px 40px 0' }}> */}
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ margin: '0 0 2px', fontSize: '12px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9CA3AF' }}>
          {tenantName ? `${tenantName} HSE System` : 'HSE System'}
        </p>
        <h1 style={{ margin: '0 0 4px', fontWeight: '800', color: NAVY }}>Dashboard Overview</h1>
        <p style={{ margin: '0 0 28px', fontSize: '13px', color: '#9CA3AF' }}>
          {user?.username} • {userRole} • {dateLabel}
        </p>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px 40px' }}>

        {loading && (
          <p style={{ color: '#9CA3AF', fontSize: '14px', textAlign: 'center', padding: '40px 0' }}>Loading dashboard…</p>
        )}

        {!loading && (
          <>
            {/* Critical Actions */}
            {openIncidents.length > 0 && (
              <section style={{ marginBottom: '32px' }}>
                <p style={{ ...sectionLabel, color: RED }}>CRITICAL ACTIONS</p>
                <div style={{
                  background: '#FEF2F2',
                  border: '1.5px solid #FECACA',
                  borderRadius: '12px',
                  padding: '20px 24px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                      <span style={{ color: RED, fontWeight: '700', fontSize: '15px' }}>
                        {openIncidents.length} incident{openIncidents.length !== 1 ? 's' : ''} pending investigation
                      </span>
                    </div>
                    <span style={{ backgroundColor: RED, color: 'white', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '4px', letterSpacing: '0.05em' }}>
                      OVERDUE
                    </span>
                  </div>
                  <p style={{ color: '#7F1D1D', fontSize: '13px', margin: '0 0 4px' }}>
                    Overdue — assign an investigator immediately.
                  </p>
                  <p style={{ color: '#9CA3AF', fontSize: '12px', margin: '0 0 16px' }}>
                    Last updated today
                  </p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Link to="/incidentinvestigationlist" style={{ textDecoration: 'none' }}>
                      <button style={{ backgroundColor: RED, color: 'white', border: 'none', borderRadius: '6px', padding: '9px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
                        Assign Investigator
                      </button>
                    </Link>
                    <Link to="/safetycardtable" style={{ textDecoration: 'none' }}>
                      <button style={{ backgroundColor: 'transparent', color: RED, border: `1.5px solid ${RED}`, borderRadius: '6px', padding: '9px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* Warnings & Upcoming */}
            {(pendingPermits.length > 0 || expiringTraining.length > 0) && (
              <section style={{ marginBottom: '32px' }}>
                <p style={sectionLabel}>WARNINGS & UPCOMING</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                  {pendingPermits.length > 0 && (
                    <div style={{ background: '#FFFBEB', border: '1.5px solid #FDE68A', borderRadius: '12px', padding: '20px 24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <span style={{ color: AMBER, fontWeight: '600', fontSize: '15px' }}>
                            {pendingPermits.length} active permit{pendingPermits.length !== 1 ? 's' : ''} requiring attention
                          </span>
                        </div>
                      </div>
                      <p style={{ color: '#78350F', fontSize: '13px', margin: '0 0 14px' }}>
                        Review and close active work permits.
                      </p>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <Link to="/permittowork" style={{ textDecoration: 'none' }}>
                          <button style={amberBtn}>Review Permits</button>
                        </Link>
                        <Link to="/permittoworkadd" style={{ textDecoration: 'none' }}>
                          <button style={amberOutline}>Add Permit</button>
                        </Link>
                      </div>
                    </div>
                  )}

                  {expiringTraining.length > 0 && (
                    <div style={{ background: '#FFFBEB', border: '1.5px solid #FDE68A', borderRadius: '12px', padding: '20px 24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                          </svg>
                          <span style={{ color: AMBER, fontWeight: '600', fontSize: '15px' }}>
                            {expiringTraining.length} staff training certification{expiringTraining.length !== 1 ? 's' : ''} due
                          </span>
                        </div>
                        <span style={{ color: '#6B7280', fontSize: '13px' }}>Within 30 days</span>
                      </div>
                      <p style={{ color: '#78350F', fontSize: '13px', margin: '0 0 14px' }}>
                        Certifications expiring within 30 days.
                      </p>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <Link to="/trainingadd" style={{ textDecoration: 'none' }}>
                          <button style={amberBtn}>Schedule Training</button>
                        </Link>
                        <Link to="/traininglist" style={{ textDecoration: 'none' }}>
                          <button style={amberOutline}>View List</button>
                        </Link>
                      </div>
                    </div>
                  )}

                </div>
              </section>
            )}

            {/* Critical Metrics */}
            <section style={{ marginBottom: '32px' }}>
              <p style={sectionLabel}>CRITICAL METRICS</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>

                <MetricCard
                  iconBg="#FEE2E2"
                  iconEl={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  }
                  count={openIncidents.length}
                  label="OPEN INCIDENTS"
                  severity="critical"
                  breakdown={[{ label: 'Under Investigation', count: openIncidents.length }]}
                  to="/safetycardtable"
                  btnLabel="View Incidents"
                  btnColor={ORANGE}
                />

                <MetricCard
                  iconBg="#FEF3C7"
                  iconEl={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                      <rect x="8" y="2" width="8" height="4" rx="1"/>
                    </svg>
                  }
                  count={pendingPermits.length}
                  label="PENDING PERMITS"
                  breakdown={[
                    { label: 'Awaiting Closure', count: pendingPermits.length },
                  ]}
                  to="/permittowork"
                  btnLabel="Approve Permits"
                  btnColor={AMBER}
                />

                <MetricCard
                  iconBg="#FEF3C7"
                  iconEl={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                  }
                  count={overdueTraining.length}
                  label="OVERDUE TRAINING"
                  breakdown={[
                    { label: 'Expired Certifications', count: overdueTraining.length },
                  ]}
                  to="/traininglist"
                  btnLabel="Schedule Sessions"
                  btnColor={AMBER}
                />

                <MetricCard
                  iconBg="#D1FAE5"
                  iconEl={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  }
                  count={risks.length}
                  label="RISK REGISTERS"
                  breakdown={[
                    { label: 'Active Projects', count: risks.length },
                  ]}
                  to="/riskregisterprojectlist"
                  btnLabel="Review Risks"
                  btnColor={GREEN}
                />

              </div>
            </section>

            {/* Quick Actions */}
            <section style={{ marginBottom: '32px' }}>
              <p style={sectionLabel}>QUICK ACTIONS</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                {QUICK_ACTIONS.map(a => (
                  <Link key={a.label} to={a.to} style={{ textDecoration: 'none' }}>
                    <div
                      style={{ ...card, padding: '20px 16px', textAlign: 'center', cursor: 'pointer', transition: 'box-shadow 0.2s, transform 0.2s' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.07)'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      <div style={{ color: '#6B7280', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                        {a.icon}
                      </div>
                      <p style={{ color: NAVY, fontWeight: '600', fontSize: '13px', margin: 0, lineHeight: '1.4' }}>
                        {a.label}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            {recentActivity.length > 0 && (
              <section>
                <p style={sectionLabel}>RECENT ACTIVITY</p>
                <div style={{ ...card, overflow: 'hidden' }}>
                  {recentActivity.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '16px 24px',
                        borderBottom: i < recentActivity.length - 1 ? '1px solid #F3F4F6' : 'none',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '14px',
                      }}
                    >
                      <span style={{
                        backgroundColor: ACTIVITY_BADGE[item.type]?.bg || NAVY,
                        color: ACTIVITY_BADGE[item.type]?.color || 'white',
                        fontSize: '11px', fontWeight: '700', padding: '3px 10px',
                        borderRadius: '4px', whiteSpace: 'nowrap', flexShrink: 0,
                      }}>
                        {item.type}
                      </span>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: '0 0 2px', color: NAVY, fontWeight: '600', fontSize: '14px' }}>
                          {item.title}
                        </p>
                        {item.date && (
                          <p style={{ margin: 0, color: '#9CA3AF', fontSize: '12px' }}>
                            {formatDate(item.date)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  <div style={{ padding: '14px 24px' }}>
                    <Link to="/safetycardtable" style={{ color: ORANGE, fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>
                      View All Activity →
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* Empty state */}
            {openIncidents.length === 0 && pendingPermits.length === 0 && overdueTraining.length === 0 && (
              <div style={{ ...card, padding: '48px', textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>✅</div>
                <h3 style={{ color: NAVY, fontWeight: '700', margin: '0 0 8px' }}>All clear</h3>
                <p style={{ color: '#9CA3AF', margin: 0, fontSize: '14px' }}>No critical actions or overdue items. Keep it up.</p>
              </div>
            )}

          </>
        )}

      </div>
    </div>
  )
}
