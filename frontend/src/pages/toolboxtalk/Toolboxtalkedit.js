import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import ToolBoxTalkAPI from '../../API/ToolBoxTalkAPI'
import axios from 'axios'
import API_BASE from '../../utils/apiBase'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function ToolBoxTalkEdit() {
  const { authTokens } = useContext(AuthContext)
  const params = useParams()
  const navigate = useNavigate()

  const [toolbox_date, setToolBoxDate] = useState('')
  const [topic, setTopic] = useState('')
  const [project, setProject] = useState('')
  const [presenter, setPresenter] = useState('')
  const [supervisor, setSupervisor] = useState('')
  const [time, setTime] = useState('')
  const [crew_number, setCrewNumber] = useState('')
  const [attendees, setAttendees] = useState('')
  const [address, setAddress] = useState('')
  const [employer, setEmployer] = useState('')
  const [shift, setShift] = useState('')
  const [textbox, setTextbox] = useState('')
  const [staffs, setStaffs] = useState([])

  useEffect(() => {
    const headers = { Authorization: `Bearer ${authTokens.access}` }
    axios.get(`${API_BASE}/hseapp/toolboxtalk/${params.id}/`, { headers })
      .then(res => {
        const d = res.data
        setToolBoxDate(d.toolbox_date || '')
        setTopic(d.topic || '')
        setProject(d.project || '')
        setPresenter(d.presenter || '')
        setSupervisor(d.supervisor || '')
        setTime(d.time || '')
        setCrewNumber(d.crew_number ?? '')
        setAttendees(d.attendees ?? '')
        setAddress(d.address || '')
        setEmployer(d.employer || '')
        setShift(d.shift || '')
        setTextbox(d.textbox || '')
      }).catch(console.log)

    axios.get(`${API_BASE}/hseapp/staff/`, { headers })
      .then(res => setStaffs(res.data)).catch(console.log)
  }, [params.id])

  const onUpdate = (e) => {
    e.preventDefault()
    const item = {
      toolbox_date: toolbox_date || null,
      topic,
      project,
      presenter: presenter || null,
      supervisor: supervisor || null,
      time: time || null,
      crew_number: crew_number || null,
      attendees: attendees || null,
      address,
      employer,
      shift,
      textbox,
    }
    ToolBoxTalkAPI.patch(`/${params.id}/`, item, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => navigate('/toolboxtalklist')).catch(console.log)
  }

  const labelStyle = { fontWeight: '600', fontSize: '14px', color: NAVY }

  return (
    <div style={{ padding: '40px', maxWidth: '860px', margin: '0 auto' }}>

      {/* Back link + Header */}
      <div style={{ marginBottom: '32px' }}>
        <Link to="/toolboxtalklist" style={{ color: '#888', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Toolbox Talks
        </Link>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Toolbox Talk</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Update the details of this toolbox talk session.
        </p>
      </div>

      <div style={{
        backgroundColor: 'white', borderRadius: '12px',
        padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        <Form onSubmit={onUpdate}>

          {/* Row 1: Date, Time, Shift */}
          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={toolbox_date}
                  onChange={e => setToolBoxDate(e.target.value || null)}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Time</Form.Label>
                <Form.Control
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Shift</Form.Label>
                <Form.Select value={shift} onChange={e => setShift(e.target.value)}>
                  <option value="">Select shift...</option>
                  <option>Day</option>
                  <option>Night</option>
                  <option>Morning</option>
                  <option>Afternoon</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          {/* Row 2: Topic, Project */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Topic</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Working at Heights Safety"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Project / Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Block A Construction Site"
                  value={project}
                  onChange={e => setProject(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          {/* Row 3: Presenter, Supervisor */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Presenter</Form.Label>
                <Form.Select value={presenter} onChange={e => setPresenter(e.target.value)}>
                  <option value="">Select presenter...</option>
                  {staffs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Supervisor</Form.Label>
                <Form.Select value={supervisor} onChange={e => setSupervisor(e.target.value)}>
                  <option value="">Select supervisor...</option>
                  {staffs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          {/* Row 4: Crew, Attendees, Employer */}
          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Crew Present</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="0"
                  value={crew_number}
                  onChange={e => setCrewNumber(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Attendees</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="0"
                  value={attendees}
                  onChange={e => setAttendees(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Employer / Company</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. ABC Contractors"
                  value={employer}
                  onChange={e => setEmployer(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          {/* Address */}
          <Form.Group className="mb-3">
            <Form.Label style={labelStyle}>Address / Site Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full site address"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </Form.Group>

          {/* Notes / discussion */}
          <Form.Group className="mb-4">
            <Form.Label style={labelStyle}>Discussion / Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Key points discussed, hazards identified, actions agreed..."
              value={textbox}
              onChange={e => setTextbox(e.target.value)}
            />
          </Form.Group>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              type="submit"
              style={{ flex: 1, backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
            >
              Save Changes
            </Button>
            <Link to="/toolboxtalklist">
              <Button
                type="button"
                style={{ backgroundColor: 'transparent', border: `1.5px solid ${NAVY}`, color: NAVY, fontWeight: '600', padding: '10px 24px' }}
              >
                Cancel
              </Button>
            </Link>
          </div>

        </Form>
      </div>
    </div>
  )
}
