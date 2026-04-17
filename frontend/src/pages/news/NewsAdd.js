import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import NewsAPI from '../../API/NewsAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function NewsAdd() {
  const { authTokens, user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [person_name, setPersonName] = useState('')
  const [headline, setHeadline] = useState('')
  const [textbrief, setTextBrief] = useState('')
  const [textcontent, setTextContent] = useState('')
  const [staffs, setStaffs] = useState([])

  const headers = { Authorization: `Bearer ${authTokens.access}` }

  useEffect(() => {
    StaffAPI.get('/', { headers }).then(res => setStaffs(res.data)).catch(console.log)
  }, [])

  useEffect(() => {
    if (user?.staff_id) setPersonName(String(user.staff_id))
  }, [user])

  const onSubmit = (e) => {
    e.preventDefault()
    NewsAPI.post('/', {
      person_name: person_name || null,
      headline,
      textbrief,
      textcontent,
    }, { headers }).then(() => navigate('/newslist')).catch(console.log)
  }

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

  return (
    <div style={{ padding: '40px', maxWidth: '680px', margin: '0 auto' }}>

      <div style={{ marginBottom: '32px' }}>
        <Link to="/newslist" style={{ color: '#888', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to News
        </Link>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>New Article</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>Publish a news article for your team.</p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onSubmit}>

          <Form.Group className="mb-3">
            <Form.Label style={L}>
              Author
              {person_name && user?.staff_id && String(person_name) === String(user.staff_id) && (
                <span style={{ fontWeight: '400', color: '#10B981', fontSize: '12px', marginLeft: '8px' }}>✓ auto-filled</span>
              )}
            </Form.Label>
            <Form.Select value={person_name} onChange={e => setPersonName(e.target.value)}>
              <option value="">Select staff member...</option>
              {staffs.map(s => (
                <option key={s.id} value={s.id}>{s.name}{s.position ? ` (${s.position})` : ''}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Headline</Form.Label>
            <Form.Control
              type="text"
              placeholder="Article headline..."
              value={headline}
              onChange={e => setHeadline(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Brief</Form.Label>
            <Form.Control
              as="textarea" rows={2}
              placeholder="Short summary shown on the news list..."
              value={textbrief}
              onChange={e => setTextBrief(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={L}>Full Content</Form.Label>
            <Form.Control
              as="textarea" rows={6}
              placeholder="Full article content..."
              value={textcontent}
              onChange={e => setTextContent(e.target.value)}
            />
          </Form.Group>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              type="submit"
              style={{ flex: 1, backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
            >
              Publish Article
            </Button>
            <Link to="/newslist">
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
