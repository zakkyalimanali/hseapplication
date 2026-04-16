import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import JobSafetyAnalysisAPI from '../../API/JobSafetyAnalysisAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function JobSafetyAnalysisAdd() {
  const { authTokens } = useContext(AuthContext)
  const navigate = useNavigate()

  const [staffs, setStaffs] = useState([])
  const [job_title, setJobTitle] = useState('')
  const [jsa_id, setJsaId] = useState('')
  const [job_performer, setJobPerformer] = useState('')
  const [supervisor, setSupervisor] = useState('')
  const [analysis_by, setAnalysisBy] = useState('')
  const [reviewed_by, setReviewedBy] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [department, setDepartment] = useState('')
  const [date_raised, setDateRaised] = useState('')

  useEffect(() => {
    StaffAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setStaffs(res.data)).catch(console.log)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    const item = {
      job_title,
      jsa_id,
      job_performer: job_performer || null,
      supervisor: supervisor || null,
      analysis_by: analysis_by || null,
      reviewed_by: reviewed_by || null,
      company,
      location,
      department,
      date_raised: date_raised || null,
    }
    JobSafetyAnalysisAPI.post('/', item, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => navigate('/jobsafetyanalysislist')).catch(console.log)
  }

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

  const StaffSelect = ({ label, value, onChange }) => (
    <Form.Group className="mb-3">
      <Form.Label style={L}>{label}</Form.Label>
      <Form.Select value={value} onChange={onChange}>
        <option value="">Select staff member...</option>
        {staffs.map(s => <option key={s.id} value={s.id}>{s.name} ({s.position})</option>)}
      </Form.Select>
    </Form.Group>
  )

  return (
    <div style={{ padding: '40px', maxWidth: '860px', margin: '0 auto' }}>

      <div style={{ marginBottom: '32px' }}>
        <Link to="/jobsafetyanalysislist" style={{ color: '#888', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to JSA List
        </Link>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>New Job Safety Analysis</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Create a new JSA record before adding job steps, equipment, and hazards.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onSubmit}>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Hot Work, Confined Space Entry..."
                  value={job_title}
                  onChange={e => setJobTitle(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={L}>JSA ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. JSA-2024-001"
                  value={jsa_id}
                  onChange={e => setJsaId(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Date Raised</Form.Label>
                <Form.Control
                  type="date"
                  value={date_raised}
                  onChange={e => setDateRaised(e.target.value || '')}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <StaffSelect label="Job Performer" value={job_performer} onChange={e => setJobPerformer(e.target.value)} />
            </div>
            <div className="col-md-6">
              <StaffSelect label="Supervisor" value={supervisor} onChange={e => setSupervisor(e.target.value)} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <StaffSelect label="Analysed By" value={analysis_by} onChange={e => setAnalysisBy(e.target.value)} />
            </div>
            <div className="col-md-6">
              <StaffSelect label="Reviewed By" value={reviewed_by} onChange={e => setReviewedBy(e.target.value)} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Company</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Company name"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Work location"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-4">
                <Form.Label style={L}>Department</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Department"
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              type="submit"
              disabled={!job_title}
              style={{ flex: 1, backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
            >
              Save JSA
            </Button>
            <Link to="/jobsafetyanalysislist">
              <Button type="button" style={{ backgroundColor: 'transparent', border: `1.5px solid ${NAVY}`, color: NAVY, fontWeight: '600', padding: '10px 24px' }}>
                Cancel
              </Button>
            </Link>
          </div>

        </Form>
      </div>
    </div>
  )
}
