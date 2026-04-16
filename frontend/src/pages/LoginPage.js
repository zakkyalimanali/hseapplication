import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

const LoginPage = () => {
  const { loginUser, tenantName } = useContext(AuthContext)

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5F4F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '420px',
      }}>

        {/* Logo + company name */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            backgroundColor: ORANGE,
            borderRadius: '10px',
            width: '44px', height: '44px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h2 style={{ color: NAVY, fontWeight: '800', fontSize: '22px', margin: '0 0 6px' }}>
            {tenantName || 'HSE Platform'}
          </h2>
          <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>
            Sign in to your workplace
          </p>
        </div>

        {/* Form */}
        <form onSubmit={loginUser}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: NAVY, marginBottom: '6px' }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '7px',
                border: '1.5px solid #ddd',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = NAVY}
              onBlur={e => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: NAVY, marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '7px',
                border: '1.5px solid #ddd',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = NAVY}
              onBlur={e => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '11px',
              backgroundColor: ORANGE,
              color: 'white',
              border: 'none',
              borderRadius: '7px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Sign In
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#888' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: ORANGE, fontWeight: '600', textDecoration: 'none' }}>
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}

export default LoginPage
