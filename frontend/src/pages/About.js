import zakkyImage from '../images/ZakkyAliPhoto.JPG'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

const modules = [
  { label: 'Incident Management',    desc: 'Log, investigate, and track workplace incidents and near-misses with full reporting.' },
  { label: 'Permit to Work',         desc: 'Issue and manage digital work permits for high-risk activities with hazard controls and signatures.' },
  { label: 'Job Safety Analysis',    desc: 'Break down tasks step-by-step to identify hazards and define safety controls before work begins.' },
  { label: 'Risk Register',          desc: 'Identify, assess, and mitigate workplace risks with a structured risk management workflow.' },
  { label: 'Staff Management',       desc: 'Maintain staff profiles including ID cards, passport details, leave records, and contact info.' },
  { label: 'Equipment & Inventory',  desc: 'Track equipment items, quantities, conditions, and storage locations across the worksite.' },
  { label: 'Attendance Tracking',    desc: 'Record daily staff attendance with Present, MC, and Absent status logging.' },
  { label: 'Training Records',       desc: 'Manage employee training courses, certifications, and compliance requirements.' },
  { label: 'Toolbox Talks',          desc: 'Document pre-work safety briefings and ensure all crew members are informed.' },
  { label: 'Site Visit Reports',     desc: 'Record site inspections, findings, and corrective actions with photo evidence.' },
  { label: 'HSE Audit',              desc: 'Conduct structured HSE audits and track audit findings and close-outs.' },
  { label: 'Safe Work Practices',    desc: 'Maintain a library of approved safe work procedures for reference on the job.' },
]

const stack = [
  { name: 'React',              role: 'Frontend framework' },
  { name: 'Django REST Framework', role: 'Backend API' },
  { name: 'PostgreSQL',         role: 'Database' },
  { name: 'JWT Auth',           role: 'Authentication' },
  { name: 'Bootstrap 5',        role: 'UI components' },
  { name: 'Axios',              role: 'HTTP client' },
]

export default function About() {
  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 8px' }}>About This Application</h2>
        <p style={{ color: '#555', fontSize: '15px', lineHeight: '1.7', maxWidth: '720px', margin: 0 }}>
          The HSE Platform is a full-stack web application designed to centralise and streamline Health, Safety,
          and Environment management for construction and industrial worksites. It replaces paper-based processes
          with a secure, digital system that keeps all safety records accessible in one place.
        </p>
      </div>

      {/* Modules */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '32px' }}>
        <h4 style={{ color: NAVY, fontWeight: '700', marginBottom: '24px' }}>Application Modules</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {modules.map(m => (
            <div key={m.label} style={{
              border: '1.5px solid #e5e7eb', borderRadius: '10px',
              padding: '16px 18px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: ORANGE, flexShrink: 0 }} />
                <span style={{ fontWeight: '700', fontSize: '14px', color: NAVY }}>{m.label}</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: '1.5', paddingLeft: '20px' }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '32px' }}>
        <h4 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>Technology Stack</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {stack.map(t => (
            <div key={t.name} style={{
              backgroundColor: '#F8F9FA', borderRadius: '8px',
              padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: '2px',
            }}>
              <span style={{ fontWeight: '700', fontSize: '14px', color: NAVY }}>{t.name}</span>
              <span style={{ fontSize: '12px', color: '#888' }}>{t.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Developer */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <h4 style={{ color: NAVY, fontWeight: '700', marginBottom: '24px' }}>Developer</h4>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <img
            src={zakkyImage}
            alt="Zakky Ali"
            style={{ width: '140px', height: '140px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
          />
          <div style={{ flex: 1, minWidth: '240px' }}>
            <h5 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px', fontSize: '20px' }}>Zakky Ali</h5>
            <p style={{ color: ORANGE, fontWeight: '600', fontSize: '14px', margin: '0 0 12px' }}>Full-Stack Developer</p>
            <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.7', margin: '0 0 16px' }}>
              Built the HSE Platform from the ground up — designing the database models, REST API, and React frontend.
              The goal was to create a practical, user-friendly tool that HSE officers and site supervisors can actually
              rely on day-to-day, without the clutter of generic enterprise software.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="https://github.com/zakkyalimanali"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  backgroundColor: NAVY, color: 'white',
                  padding: '7px 16px', borderRadius: '6px',
                  fontSize: '13px', fontWeight: '600', textDecoration: 'none',
                }}
              >
                GitHub
              </a>
              <a
                href="mailto:zakkyalimanali@gmail.com"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  backgroundColor: 'transparent', color: NAVY,
                  border: `1.5px solid ${NAVY}`,
                  padding: '7px 16px', borderRadius: '6px',
                  fontSize: '13px', fontWeight: '600', textDecoration: 'none',
                }}
              >
                zakkyalimanali@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
