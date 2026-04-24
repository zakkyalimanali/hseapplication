import { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import AuthContext from '../context/AuthContext'
import { hasMinRole, ROLES } from '../utils/roleUtils'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'


export default function Navtop() {
  const { user, userRole, logoutUser, tenantName } = useContext(AuthContext)

  const isSupervisor = hasMinRole(userRole, ROLES.SUPERVISOR)
  const isHSEOfficer = hasMinRole(userRole, ROLES.HSE_OFFICER)
  const isCompanyAdmin = hasMinRole(userRole, ROLES.COMPANY_ADMIN)

  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{ backgroundColor: NAVY, padding: '0 32px', minHeight: '60px' }}
    >
      {/* Brand */}
      <Navbar.Brand style={{ padding: 0, marginRight: '32px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div style={{
            backgroundColor: ORANGE, borderRadius: '7px',
            width: '30px', height: '30px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <span style={{ color: 'white', fontWeight: '700', fontSize: '16px' }}>
            {tenantName || 'HSE Platform'}
          </span>
        </Link>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="app-navbar" style={{ borderColor: 'rgba(255,255,255,0.3)' }} />

      <Navbar.Collapse id="app-navbar">
        <Nav className="me-auto" style={{ gap: '4px' }}>

          {/* HSE Dropdown */}
          <NavDropdown
            title={<span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: '500' }}>HSE</span>}
            id="hse-dropdown"
          >
            <NavDropdown.Item as={NavLink} to="toolboxtalklist">Toolbox Talk</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="incidenttable">Safety Card</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="traininglist">Training</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="sitevisitlist">Site Visit</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="hsereferenceslist">HSE References</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="hsemanagement">HSE Management</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={NavLink} to="incidentinvestigationlist">Incident Investigation</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="riskregisterprojectlist">Risk Register</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="permittowork">Permit to Work</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="jobsafetyanalysis">Job Safety Analysis</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={NavLink} to="stats">Statistics</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="safeworkpracticelist">Safe Work Practice</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="hseauditlist">HSE Audit</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="emergencyplanlist">Emergency Plan</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="riskmanagementlist">Risk Management</NavDropdown.Item>
            {isHSEOfficer && <NavDropdown.Item as={NavLink} to="reportinglist">Reporting</NavDropdown.Item>}
            <NavDropdown.Item as={NavLink} to="workplaceruleslist">Workplace Rules</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="riskmitigationlist">Risk Mitigation</NavDropdown.Item>
          </NavDropdown>

          {/* Staff Dropdown */}
          <NavDropdown
            title={<span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: '500' }}>Staff</span>}
            id="staff-dropdown"
          >
            {isCompanyAdmin && <NavDropdown.Item as={NavLink} to="stafflist">Staff List</NavDropdown.Item>}
            <NavDropdown.Item as={NavLink} to="attendencelist">Attendance</NavDropdown.Item>
            {isSupervisor && <NavDropdown.Item as={NavLink} to="attendenceadd">Record Attendance</NavDropdown.Item>}
          </NavDropdown>

          {/* Equipment Dropdown — HSE Officer+ */}
          {isHSEOfficer && (
            <NavDropdown
              title={<span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: '500' }}>Equipment</span>}
              id="equipment-dropdown"
            >
              <NavDropdown.Item as={NavLink} to="equipment">Equipment & Items</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="equipmenttotals">Equipment Totals</NavDropdown.Item>
            </NavDropdown>
          )}

          {/* More Dropdown */}
          <NavDropdown
            title={<span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: '500' }}>More</span>}
            id="more-dropdown"
          >
            <NavDropdown.Item as={NavLink} to="chartspage">Charts</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="newslist">News</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="bloglist">Blog</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="about">About</NavDropdown.Item>
          </NavDropdown>

        </Nav>

        {/* Right side — user info + role badge + logout */}
        <Nav style={{ alignItems: 'center', gap: '12px' }}>
          {user && (
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
              {user.username}
              {userRole && (
                <span style={{
                  marginLeft: '6px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: '4px',
                  padding: '1px 6px',
                  fontSize: '11px',
                  textTransform: 'capitalize',
                }}>
                  {userRole.replace('_', ' ')}
                </span>
              )}
            </span>
          )}
          {user ? (
            <button
              onClick={logoutUser}
              style={{
                backgroundColor: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.4)',
                color: 'rgba(255,255,255,0.85)',
                borderRadius: '6px',
                padding: '6px 16px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/loginpage"
              style={{
                backgroundColor: ORANGE,
                border: 'none',
                color: 'white',
                borderRadius: '6px',
                padding: '6px 16px',
                fontSize: '13px',
                fontWeight: '500',
                textDecoration: 'none',
              }}
            >
              Login
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
