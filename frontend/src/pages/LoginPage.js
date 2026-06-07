import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

const FEATURES = [
  'Safety cards, incidents & investigations',
  'Permit to work & JSA management',
  'Staff training & attendance tracking',
  'Risk register & HSE audits',
]

export default function LoginPage() {
  const { loginUser, tenantName } = useContext(AuthContext)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#F5F4F0' }}>

      {/* ── Left panel ── */}
      <div style={{
        flex: '0 0 44%',
        backgroundColor: NAVY,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 56px',
        position: 'relative',
        overflow: 'hidden',
      }}
        className="login-left-panel"
      >
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '320px', height: '320px', borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.03)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '240px', height: '240px', borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.03)',
        }} />

        {/* Shield icon */}
        <div style={{
          backgroundColor: ORANGE,
          borderRadius: '14px',
          width: '56px', height: '56px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '32px',
          flexShrink: 0,
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>

        {/* Company name */}
        <h1 style={{ color: 'white', fontWeight: '800', fontSize: '28px', margin: '0 0 8px', lineHeight: '1.2' }}>
          {tenantName || 'HSE Platform'}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', margin: '0 0 48px', lineHeight: '1.5' }}>
          Your all-in-one health, safety &amp; environment management system.
        </p>

        {/* Feature list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {FEATURES.map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%',
                backgroundColor: 'rgba(225,80,71,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: ORANGE }} />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>

          {/* Mobile-only logo */}
          <div style={{ display: 'none', textAlign: 'center', marginBottom: '32px' }} className="login-mobile-logo">
            <div style={{
              backgroundColor: ORANGE, borderRadius: '10px',
              width: '44px', height: '44px',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '12px',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h2 style={{ color: NAVY, fontWeight: '800', fontSize: '20px', margin: 0 }}>{tenantName || 'HSE Platform'}</h2>
          </div>

          <h2 style={{ color: '#E53E3E', fontWeight: '800', fontSize: '26px', margin: '0 0 6px' }}>
            Welcome back
          </h2>
          <p style={{ color: '#888', fontSize: '14px', margin: '0 0 32px' }}>
            Sign in to your account to continue.
          </p>

          <form onSubmit={loginUser}>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: NAVY, marginBottom: '6px' }}>
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                autoComplete="username"
                style={{
                  width: '100%', padding: '11px 14px', borderRadius: '8px',
                  border: '1.5px solid #e5e7eb', fontSize: '14px',
                  outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => e.target.style.borderColor = NAVY}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: NAVY, marginBottom: '6px' }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                style={{
                  width: '100%', padding: '11px 14px', borderRadius: '8px',
                  border: '1.5px solid #e5e7eb', fontSize: '14px',
                  outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => e.target.style.borderColor = NAVY}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%', padding: '12px',
                backgroundColor: ORANGE, color: 'white',
                border: 'none', borderRadius: '8px',
                fontSize: '15px', fontWeight: '700',
                cursor: 'pointer', letterSpacing: '0.2px',
              }}
              onMouseEnter={e => e.target.style.backgroundColor = '#cc443b'}
              onMouseLeave={e => e.target.style.backgroundColor = ORANGE}
            >
              Sign In
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#888' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: ORANGE, fontWeight: '600', textDecoration: 'none' }}>
              Register
            </Link>
          </p>

        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .login-left-panel { display: none !important; }
          .login-mobile-logo { display: block !important; }
        }
      `}</style>

    </div>
  )
}
