import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { hasMinRole, ROLES } from '../utils/roleUtils'

const NAVY  = '#1B2B4B'
const ORANGE = '#E15047'

// ── Command palette data ────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  { label: 'Create New Incident',          to: '/incident',                  icon: '+' },
  { label: 'Assign Investigator to Case',  to: '/incidentinvestigationlist', icon: '👤' },
  { label: 'Submit Permit to Work',        to: '/permittoworkadd',           icon: '📋' },
  { label: 'Approve Pending Permit',       to: '/permittowork',              icon: '✅' },
  { label: 'Record Training Session',      to: '/trainingadd',               icon: '🎓' },
  { label: 'Create Site Visit Report',     to: '/sitevisitadd',              icon: '👁️' },
  { label: 'Generate Monthly Safety Report', to: '/stats',                   icon: '📊' },
]

function buildModules({ isCompanyAdmin, isHSEOfficer, isSupervisor }) {
  const core = [
    { label: 'Incident Investigation', to: '/incidentinvestigationlist' },
    { label: 'Permit to Work',         to: '/permittowork' },
    { label: 'Training Records',       to: '/traininglist' },
    { label: 'Risk Register',          to: '/riskregisterprojectlist' },
    { label: 'Site Visits',            to: '/sitevisitlist' },
    { label: 'Statistics & Reports',   to: '/stats' },
  ]

  const hse = [
    { label: 'Toolbox Talk',      to: '/toolboxtalklist' },
    { label: 'Safety Card',       to: '/safetycardtable' },
    { label: 'HSE References',    to: '/hsereferenceslist' },
    { label: 'HSE Management',    to: '/hsemanagement' },
    { label: 'Job Safety Analysis', to: '/jobsafetyanalysis' },
    { label: 'Safe Work Practice', to: '/safeworkpracticelist' },
    { label: 'HSE Audit',         to: '/hseauditlist' },
    { label: 'Emergency Plan',    to: '/emergencyplanlist' },
    { label: 'Risk Management',   to: '/riskmanagementlist' },
    ...(isHSEOfficer ? [{ label: 'HSE Reporting', to: '/reportinglist' }] : []),
    { label: 'Workplace Rules',   to: '/workplaceruleslist' },
    { label: 'Risk Mitigation',   to: '/riskmitigationlist' },
  ]

  const staff = [
    ...(isCompanyAdmin ? [{ label: 'Staff List', to: '/stafflist' }] : []),
    { label: 'Attendance Records', to: '/attendencelist' },
    ...(isSupervisor ? [{ label: 'Record Attendance', to: '/attendenceadd' }] : []),
  ]

  const equipment = isHSEOfficer ? [
    { label: 'Equipment & Items', to: '/equipment' },
    { label: 'Equipment Totals',  to: '/equipmenttotals' },
  ] : []

  return { core, hse, staff, equipment }
}

// ── CommandPalette ──────────────────────────────────────────────────────────

function CommandPalette({ onClose }) {
  const navigate = useNavigate()
  const { userRole } = useContext(AuthContext)
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)

  const isCompanyAdmin = hasMinRole(userRole, ROLES.COMPANY_ADMIN)
  const isHSEOfficer   = hasMinRole(userRole, ROLES.HSE_OFFICER)
  const isSupervisor   = hasMinRole(userRole, ROLES.SUPERVISOR)

  const { core, hse, staff, equipment } = buildModules({ isCompanyAdmin, isHSEOfficer, isSupervisor })

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const go = (to) => { navigate(to); onClose() }

  const sections = [
    { label: 'QUICK ACTIONS',  items: QUICK_ACTIONS, hasIcon: true },
    { label: 'CORE MODULES',   items: core,           hasIcon: false },
    { label: 'HSE MODULES',    items: hse,            hasIcon: false },
    { label: 'STAFF MODULES',  items: staff,          hasIcon: false },
    ...(equipment.length ? [{ label: 'EQUIPMENT', items: equipment, hasIcon: false }] : []),
  ]

  const filtered = sections.map(s => ({
    ...s,
    items: s.items.filter(i => i.label.toLowerCase().includes(query.toLowerCase())),
  })).filter(s => s.items.length > 0)

  // In default view (no query) collapse non-quick-actions to first 6 per section
  const visibleSections = query
    ? filtered
    : (showAll
        ? filtered
        : filtered.map((s, i) => i === 0 ? s : { ...s, items: s.items.slice(0, 6) }))

  const totalHidden = query || showAll ? 0 : filtered.slice(1).reduce((acc, s) => acc + Math.max(0, s.items.length - 6), 0)

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '80px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '580px', maxWidth: '90vw',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          maxHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '14px 18px',
          borderBottom: '1px solid #F3F4F6',
          flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search modules, actions, or data..."
            style={{
              flex: 1, border: 'none', outline: 'none',
              fontSize: '15px', color: NAVY,
              backgroundColor: 'transparent',
            }}
          />
          <span style={{
            fontSize: '11px', fontWeight: '600', color: '#9CA3AF',
            border: '1px solid #E5E7EB', borderRadius: '4px', padding: '2px 8px',
          }}>
            ESC
          </span>
        </div>

        {/* Results */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {visibleSections.length === 0 && (
            <p style={{ padding: '32px', textAlign: 'center', color: '#9CA3AF', fontSize: '14px', margin: 0 }}>
              No results for "{query}"
            </p>
          )}

          {visibleSections.map(section => (
            <div key={section.label}>
              <p style={{
                margin: 0, padding: '12px 18px 6px',
                fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#9CA3AF',
                backgroundColor: '#FAFAFA',
                borderBottom: '1px solid #F3F4F6',
              }}>
                {section.label}
              </p>
              {section.items.map(item => (
                <button
                  key={item.to + item.label}
                  onClick={() => go(item.to)}
                  style={{
                    width: '100%', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '11px 18px',
                    border: 'none', background: 'none', cursor: 'pointer',
                    fontSize: '14px', color: NAVY,
                    borderBottom: '1px solid #F9FAFB',
                    transition: 'background-color 0.1s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {section.hasIcon ? (
                    <span style={{
                      width: '28px', height: '28px', borderRadius: '6px',
                      backgroundColor: '#F3F4F6',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', flexShrink: 0,
                    }}>
                      {item.icon}
                    </span>
                  ) : (
                    <span style={{
                      width: '28px', height: '28px', borderRadius: '6px',
                      border: '1.5px solid #E5E7EB',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                      </svg>
                    </span>
                  )}
                  {item.label}
                </button>
              ))}
            </div>
          ))}

          {totalHidden > 0 && (
            <button
              onClick={() => setShowAll(true)}
              style={{
                width: '100%', padding: '14px', border: 'none',
                background: 'none', cursor: 'pointer',
                color: ORANGE, fontSize: '13px', fontWeight: '600',
                borderTop: '1px solid #F3F4F6',
              }}
            >
              Show all {totalHidden} more modules ▼
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── AppTopBar ───────────────────────────────────────────────────────────────

export default function AppTopBar({ onMenuToggle }) {
  const { user, userRole, logoutUser } = useContext(AuthContext)
  const [paletteOpen, setPaletteOpen] = useState(false)

  // Keyboard shortcut: Cmd/Ctrl+K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setPaletteOpen(p => !p)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const roleLabel = userRole
    ? userRole.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : ''

  return (
    <>
      <div style={{
        height: '60px',
        backgroundColor: 'white',
        borderBottom: '1px solid #E5E7EB',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '12px',
        flexShrink: 0,
      }}>

        {/* Hamburger — visible on mobile only */}
        <button className="hamburger-btn" onClick={onMenuToggle} aria-label="Toggle menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        {/* Search bar */}
        <button
          onClick={() => setPaletteOpen(true)}
          style={{
            flex: 1, maxWidth: '420px',
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '8px 14px',
            backgroundColor: '#F9FAFB',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span style={{ flex: 1, fontSize: '14px', color: '#9CA3AF' }}>Search...</span>
          <span className="cmd-k-badge" style={{
            fontSize: '11px', color: '#9CA3AF', fontWeight: '500',
            border: '1px solid #E5E7EB', borderRadius: '4px', padding: '1px 6px',
            backgroundColor: 'white',
          }}>
            ⌘K
          </span>
        </button>

        {/* Right: bell + user */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>

          {/* Notification bell */}
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#6B7280', position: 'relative' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span style={{
              position: 'absolute', top: '2px', right: '2px',
              width: '8px', height: '8px', borderRadius: '50%',
              backgroundColor: ORANGE, border: '1.5px solid white',
            }}/>
          </button>

          {/* User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              backgroundColor: '#1B2B4B',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '13px', fontWeight: '700', flexShrink: 0,
            }}>
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="topbar-user-label">
              <div style={{ fontSize: '13px', fontWeight: '600', color: NAVY }}>{user?.username}</div>
              <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{roleLabel}</div>
            </div>
            <button
              onClick={logoutUser}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #E5E7EB',
                color: '#6B7280',
                borderRadius: '6px',
                padding: '5px 12px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                marginLeft: '4px',
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} />}
    </>
  )
}
