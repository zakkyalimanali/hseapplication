import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import NewsAPI from '../../API/NewsAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import API_BASE from '../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function NewsEdit() {
  const { authTokens } = useContext(AuthContext)
  const navigate = useNavigate()
  const params = useParams()

  const [person_name, setPersonName] = useState('')
  const [headline, setHeadline] = useState('')
  const [textbrief, setTextBrief] = useState('')
  const [textcontent, setTextContent] = useState('')
  const [staffs, setStaffs] = useState([])

  const headers = { Authorization: `Bearer ${authTokens.access}` }

  useEffect(() => {
    axios.get(`${API_BASE}/hseapp/news/${params.id}/`, { headers })
      .then(res => {
        const d = res.data
        setPersonName(d.person_name || '')
        setHeadline(d.headline || '')
        setTextBrief(d.textbrief || '')
        setTextContent(d.textcontent || '')
      }).catch(console.log)

    StaffAPI.get('/', { headers }).then(res => setStaffs(res.data)).catch(console.log)
  }, [params.id])

  const onSubmit = (e) => {
    e.preventDefault()
    NewsAPI.patch(`/${params.id}/`, {
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
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Article</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>Update the article content and details.</p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onSubmit}>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Author</Form.Label>
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
              Save Changes
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
