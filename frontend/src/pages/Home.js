import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'
const LIGHT_PINK = '#FDECEA'
const OFF_WHITE = '#F5F4F0'

const quickLinks = [
  {
    title: 'Safety Cards',
    desc: 'View submitted safety cards, track who raised them and their resolution status.',
    to: '/incidenttable',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
  {
    title: 'Site Visit',
    desc: 'Review site inspections — where they were conducted, by whom and when.',
    to: '/sitevisitlist',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
        <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
      </svg>
    ),
  },
  {
    title: 'Incident Investigation',
    desc: 'Track incident investigations, findings and corrective actions taken.',
    to: '/incidentinvestigationlist',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    title: 'Permit to Work',
    desc: 'Manage digital permits for high-risk activities and track their approval status.',
    to: '/permittowork',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
        <path d="M9 14l2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: 'Training Records',
    desc: 'Monitor staff certifications and training compliance across your team.',
    to: '/traininglist',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    title: 'Risk Register',
    desc: 'Identify and assess workplace hazards and track mitigation actions.',
    to: '/riskregisterprojectlist',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
]

export default function Home() {
  const { user, tenantName } = useContext(AuthContext)

  return (
    <div style={{ backgroundColor: OFF_WHITE, minHeight: '100vh' }}>

      {/* Welcome banner */}
      <div style={{
        background: `linear-gradient(135deg, ${NAVY} 0%, #2d4a7a 100%)`,
        padding: '48px',
        color: 'white',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ margin: '0 0 6px', fontSize: '14px', opacity: 0.7, fontWeight: '500', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {tenantName || 'Workplace'}
          </p>
          <h1 style={{ margin: '0 0 8px', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '800' }}>
            Welcome back{user?.username ? `, ${user.username}` : ''}
          </h1>
          <p style={{ margin: 0, opacity: 0.7, fontSize: '15px' }}>
            Here's your HSE dashboard. Select a module to get started.
          </p>
        </div>
      </div>

      {/* Quick access cards */}
      <div style={{ padding: '48px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ color: NAVY, fontWeight: '700', fontSize: '20px', marginBottom: '24px' }}>
          Quick Access
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {quickLinks.map(card => (
            <Link
              key={card.title}
              to={card.to}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '28px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                transition: 'box-shadow 0.2s, transform 0.2s',
                cursor: 'pointer',
                height: '100%',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.07)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  backgroundColor: LIGHT_PINK,
                  borderRadius: '10px',
                  width: '52px', height: '52px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px',
                }}>
                  {card.icon}
                </div>
                <h3 style={{ color: NAVY, fontSize: '16px', fontWeight: '700', margin: '0 0 8px' }}>
                  {card.title}
                </h3>
                <p style={{ color: '#777', fontSize: '14px', margin: '0 0 16px', lineHeight: '1.6' }}>
                  {card.desc}
                </p>
                <span style={{ color: ORANGE, fontSize: '13px', fontWeight: '600' }}>
                  Open →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
