import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { hasMinRole, ROLES } from '../utils/roleUtils'

const BG        = '#0D1B2E'
const BG_HOVER  = 'rgba(255,255,255,0.06)'
const BG_ACTIVE = '#E15047'
const TEXT      = 'rgba(255,255,255,0.65)'
const TEXT_ACT  = '#ffffff'
const LABEL     = 'rgba(255,255,255,0.3)'

const W = 224

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '9px 14px',
        borderRadius: '8px',
        marginBottom: '2px',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: isActive ? '600' : '400',
        color: isActive ? TEXT_ACT : TEXT,
        backgroundColor: isActive ? BG_ACTIVE : 'transparent',
        transition: 'background-color 0.15s',
      })}
      onMouseEnter={e => {
        if (!e.currentTarget.classList.contains('active'))
          e.currentTarget.style.backgroundColor = BG_HOVER
      }}
      onMouseLeave={e => {
        if (!e.currentTarget.classList.contains('active'))
          e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      <span style={{ flexShrink: 0, opacity: 0.85 }}>{icon}</span>
      <span>{label}</span>
    </NavLink>
  )
}

function SectionLabel({ children }) {
  return (
    <p style={{
      margin: '20px 0 6px 14px',
      fontSize: '10px',
      fontWeight: '700',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: LABEL,
    }}>
      {children}
    </p>
  )
}

// SVG icons
const icons = {
  home: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  incident: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  permit: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1"/>
      <path d="M9 14l2 2 4-4"/>
    </svg>
  ),
  training: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  staff: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  attendance: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  risk: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  sitevisit: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
      <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
    </svg>
  ),
  stats: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  equipment: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
    </svg>
  ),
  settings: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
}

export default function AppSidebar({ isOpen, onClose }) {
  const { tenantName, userRole } = useContext(AuthContext)

  const isCompanyAdmin = hasMinRole(userRole, ROLES.COMPANY_ADMIN)
  const isHSEOfficer   = hasMinRole(userRole, ROLES.HSE_OFFICER)
  const isSupervisor   = hasMinRole(userRole, ROLES.SUPERVISOR)

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <div
        className={`app-sidebar${isOpen ? ' open' : ''}`}
        style={{
          width: `${W}px`,
          flexShrink: 0,
          backgroundColor: BG,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >

      {/* Brand */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            backgroundColor: '#E15047',
            borderRadius: '8px',
            width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <span style={{ color: 'white', fontWeight: '700', fontSize: '14px', lineHeight: '1.2' }}>
            {tenantName || 'HSE Platform'}
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '12px 10px', flex: 1 }} onClick={onClose}>

        <NavItem to="/stafflog" icon={icons.home} label="Home" />

        <SectionLabel>Favorites</SectionLabel>
        <NavItem to="/incidentlist"             icon={icons.incident}   label="Incidents" />
        <NavItem to="/safetycardtable"          icon={icons.incident}   label="Safety Cards" />
        <NavItem to="/permittowork"             icon={icons.permit}     label="Permits" />
        <NavItem to="/traininglist"             icon={icons.training}   label="Training" />
        <NavItem to="/sitevisitlist"            icon={icons.sitevisit}  label="Site Visits" />

        <SectionLabel>HSE</SectionLabel>
        <NavItem to="/incidentinvestigationlist" icon={icons.incident}  label="Investigations" />
        <NavItem to="/riskregisterprojectlist"   icon={icons.risk}      label="Risk Register" />
        <NavItem to="/jobsafetyanalysis"         icon={icons.permit}    label="Job Safety" />
        <NavItem to="/stats"                     icon={icons.stats}     label="Statistics" />

        {isCompanyAdmin && (
          <>
            <SectionLabel>Staff</SectionLabel>
            <NavItem to="/stafflist"      icon={icons.staff}      label="Staff List" />
            <NavItem to="/attendencelist" icon={icons.attendance} label="Attendance" />
          </>
        )}

        {isHSEOfficer && (
          <>
            <SectionLabel>Equipment</SectionLabel>
            <NavItem to="/equipment"       icon={icons.equipment} label="Equipment & Items" />
            <NavItem to="/equipmenttotals" icon={icons.stats}     label="Equipment Totals" />
          </>
        )}

        <SectionLabel>More</SectionLabel>
        <NavItem to="/about" icon={icons.settings} label="Settings" />

      </nav>
    </div>
    </>
  )
}
