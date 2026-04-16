import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import IncidentPhotosAPI from '../../../API/IncidentPhotosAPI'
import AuthContext from '../../../context/AuthContext'
import axios from 'axios'
import API_BASE from '../../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function IncidentPhotosEdit() {
  const { authTokens } = useContext(AuthContext)
  const params = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [incident_photo, setIncidentPhoto] = useState(null)
  const [existingPhoto, setExistingPhoto] = useState(null)
  const [incidentinvestigation, setIncidentInvestigation] = useState(null)

  useEffect(() => {
    axios.get(`${API_BASE}/hseapp/incidentphotos/${params.id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => {
      const d = res.data
      setTitle(d.title || '')
      setDescription(d.description || '')
      setExistingPhoto(d.incident_photo || null)
      setIncidentInvestigation(d.incidentinvestigation)
    }).catch(console.log)
  }, [params.id])

  const onUpdate = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('incidentinvestigation', incidentinvestigation)
    formData.append('title', title)
    formData.append('description', description)
    if (incident_photo) formData.append('incident_photo', incident_photo)

    IncidentPhotosAPI.patch(`/${params.id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authTokens.access}`,
      },
    }).then(() => navigate(-1)).catch(console.log)
  }

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

  return (
    <div style={{ padding: '40px', maxWidth: '680px', margin: '0 auto' }}>

      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', padding: 0, color: '#888', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Investigation
        </button>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Evidence Photo</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Update the photo title, description, or replace the image.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>

        {existingPhoto && (
          <div style={{ marginBottom: '20px' }}>
            <p style={{ ...L, marginBottom: '8px' }}>Current Photo</p>
            <a href={existingPhoto} target="_blank" rel="noreferrer">
              <img
                src={existingPhoto}
                alt={title}
                style={{ width: '100%', maxHeight: '240px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
            </a>
          </div>
        )}

        <Form onSubmit={onUpdate}>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Damage at scene, PPE condition..."
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Describe what is shown in this photo..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={L}>Replace Photo</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={e => setIncidentPhoto(e.target.files[0])}
            />
            <Form.Text style={{ color: '#888', fontSize: '12px' }}>
              Leave empty to keep the existing photo.
            </Form.Text>
          </Form.Group>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              type="submit"
              style={{ flex: 1, backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
            >
              Save Changes
            </Button>
            <Button
              type="button"
              onClick={() => navigate(-1)}
              style={{ backgroundColor: 'transparent', border: `1.5px solid ${NAVY}`, color: NAVY, fontWeight: '600', padding: '10px 24px' }}
            >
              Cancel
            </Button>
          </div>

        </Form>
      </div>
    </div>
  )
}
