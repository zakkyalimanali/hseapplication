import { Link } from 'react-router-dom'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'
const OFF_WHITE = '#F5F4F0'
const LIGHT_PINK = '#FDECEA'

// ── Icons (inline SVG to avoid extra dependencies) ────────────────────────

const IconShield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const IconAlert = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)

const IconClipboard = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    <path d="M9 14l2 2 4-4"/>
  </svg>
)

const IconList = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
)

const IconGradCap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
)

const IconMap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
  </svg>
)

const IconBuilding = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h1m4 0h1M9 13h1m4 0h1M9 17h1m4 0h1"/>
  </svg>
)

const IconUsers = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

const IconDatabase = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
)

// ── Feature card data ─────────────────────────────────────────────────────
const features = [
  { icon: <IconAlert />, title: 'Incident Management', desc: 'Track and investigate workplace incidents with comprehensive reporting tools.' },
  { icon: <IconClipboard />, title: 'Permit to Work', desc: 'Digital permit system for high-risk activities with automated workflows.' },
  { icon: <IconShield />, title: 'Risk Register', desc: 'Identify, assess, and control workplace hazards with ease.' },
  { icon: <IconList />, title: 'Job Safety Analysis', desc: 'Break down tasks and identify potential hazards before work begins.' },
  { icon: <IconGradCap />, title: 'Training Records', desc: 'Maintain employee certifications and training compliance in one place.' },
  { icon: <IconMap />, title: 'Site Visit Reports', desc: 'Document site inspections and audits with mobile-friendly forms.' },
]

// ── How it works steps ────────────────────────────────────────────────────
const steps = [
  { num: 1, icon: <IconBuilding />, title: 'Your company gets a dedicated workspace', desc: "Set up your organization's HSE environment with custom settings and permissions." },
  { num: 2, icon: <IconUsers />, title: 'Your team logs in securely', desc: 'Invite team members and assign roles based on their responsibilities.' },
  { num: 3, icon: <IconDatabase />, title: 'Manage HSE data in one place', desc: 'Access all your safety records, reports, and analytics from a unified dashboard.' },
]

// ── Component ─────────────────────────────────────────────────────────────
export default function NewHome() {
  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", color: NAVY, overflowX: 'hidden' }}>

      {/* NAVBAR */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        backgroundColor: 'white',
        borderBottom: '1px solid #e8e8e8',
        padding: '0 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '60px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '18px', color: NAVY }}>
          <div style={{ backgroundColor: ORANGE, borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconShield />
          </div>
          HSE Platform
        </div>

        <div style={{ display: 'flex', gap: '32px', fontSize: '15px' }}>
          {['Features', 'About', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: NAVY, textDecoration: 'none', fontWeight: '500' }}
              onMouseEnter={e => e.target.style.color = ORANGE}
              onMouseLeave={e => e.target.style.color = NAVY}>
              {item}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/loginpage" style={{
            padding: '8px 20px', borderRadius: '6px',
            border: `1.5px solid ${NAVY}`, color: NAVY,
            textDecoration: 'none', fontWeight: '500', fontSize: '14px',
          }}>Login</Link>
          <Link to="/register" style={{
            padding: '8px 20px', borderRadius: '6px',
            backgroundColor: ORANGE, color: 'white',
            textDecoration: 'none', fontWeight: '500', fontSize: '14px',
          }}>Register</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        background: `linear-gradient(135deg, ${NAVY} 0%, #2d4a7a 100%)`,
        padding: '100px 48px',
        textAlign: 'center',
        color: 'white',
      }}>
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: '800', lineHeight: '1.15', margin: '0 auto 24px', maxWidth: '720px' }}>
          The smarter way to manage workplace safety
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.85, maxWidth: '560px', margin: '0 auto 40px', lineHeight: '1.6' }}>
          One platform to manage incidents, risk, permits, training, and compliance — built for teams that take safety seriously.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" style={{
            padding: '14px 32px', borderRadius: '8px',
            backgroundColor: ORANGE, color: 'white',
            textDecoration: 'none', fontWeight: '600', fontSize: '16px',
          }}>Get Started</Link>
          <a href="#features" style={{
            padding: '14px 32px', borderRadius: '8px',
            border: '1.5px solid rgba(255,255,255,0.6)', color: 'white',
            textDecoration: 'none', fontWeight: '600', fontSize: '16px',
          }}>Learn More</a>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ backgroundColor: OFF_WHITE, padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', margin: '0 0 12px' }}>Everything you need for HSE management</h2>
          <p style={{ fontSize: '17px', color: '#666', margin: 0 }}>
            Powerful features designed to <span style={{ color: ORANGE }}>streamline</span> safety operations and ensure compliance
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          {features.map(f => (
            <div key={f.title} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '32px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
            }}>
              <div style={{
                backgroundColor: LIGHT_PINK,
                borderRadius: '10px',
                width: '52px', height: '52px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', margin: '0 0 10px' }}>{f.title}</h3>
              <p style={{ fontSize: '15px', color: '#666', margin: 0, lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="about" style={{ backgroundColor: 'white', padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', margin: '0 0 12px' }}>How it works</h2>
          <p style={{ fontSize: '17px', color: '#666', margin: 0 }}>Get started in three simple steps</p>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          {/* Connecting line */}
          <div style={{
            position: 'absolute',
            top: '28px',
            left: 'calc(16.66% - 0px)',
            right: 'calc(16.66% - 0px)',
            height: '2px',
            backgroundColor: '#e0e0e0',
            zIndex: 0,
          }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', position: 'relative', zIndex: 1 }}>
            {steps.map(s => (
              <div key={s.num} style={{ textAlign: 'center' }}>
                {/* Number circle */}
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  backgroundColor: NAVY, color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', fontWeight: '700',
                  margin: '0 auto 20px',
                }}>{s.num}</div>

                {/* Icon box */}
                <div style={{
                  backgroundColor: LIGHT_PINK,
                  borderRadius: '12px',
                  width: '64px', height: '64px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  {s.icon}
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 10px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: '#777', margin: 0, lineHeight: '1.6' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" style={{ backgroundColor: NAVY, color: 'white', padding: '48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', marginBottom: '32px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '18px', marginBottom: '8px' }}>
                <div style={{ backgroundColor: ORANGE, borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconShield />
                </div>
                HSE Platform
              </div>
              <p style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>Making workplace safety management simple and effective</p>
            </div>
            <div style={{ display: 'flex', gap: '32px' }}>
              {['Privacy', 'Terms', 'Contact'].map(item => (
                <a key={item} href="#" style={{ color: 'white', opacity: 0.8, textDecoration: 'none', fontSize: '14px' }}
                  onMouseEnter={e => e.target.style.opacity = 1}
                  onMouseLeave={e => e.target.style.opacity = 0.8}>
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '24px', textAlign: 'center', opacity: 0.6, fontSize: '13px' }}>
            © 2026 HSE Platform. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  )
}
