import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Form, Button, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import PermitToWorkAPI from '../../API/PermitToWorkAPI'
import HazardsAndPrecautionsAPI from '../../API/HazardsAndPrecautionsAPI'
import PhysicalControlsAPI from '../../API/PhysicalControlsAPI'
import SignituresAPI from '../../API/SignituresAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'
import API_BASE from '../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

const SectionCard = ({ title, children }) => (
  <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
    <h5 style={{ color: NAVY, fontWeight: '700', margin: '0 0 20px' }}>{title}</h5>
    {children}
  </div>
)

export default function PermitToWorkEdit() {
  const { authTokens } = useContext(AuthContext)
  const params = useParams()
  const navigate = useNavigate()
  const h = { Authorization: `Bearer ${authTokens.access}` }

  // Permit details
  const [permit_number, setPermitNumber] = useState('')
  const [location_of_work, setLocationOfWork] = useState('')
  const [nature_of_work, setNatureOfWork] = useState('')
  const [work_start, setWorkStart] = useState('')
  const [work_start_time, setWorkStartTime] = useState('')
  const [work_completed, setWorkCompleted] = useState('')

  // Sub-items
  const [hazards, setHazards] = useState([])
  const [physicalControls, setPhysicalControls] = useState([])
  const [signitures, setSignitures] = useState([])
  const [staffs, setStaffs] = useState([])

  // Hazard form
  const [haz_hazards, setHazHazards] = useState('')
  const [haz_precautions, setHazPrecautions] = useState('')
  const [hazSaving, setHazSaving] = useState(false)

  // Physical controls form
  const [pc_mechanisms, setPcMechanisms] = useState('')
  const [pc_how, setPcHow] = useState('')
  const [pcSaving, setPcSaving] = useState(false)

  // Signatures form
  const [sig_person, setSigPerson] = useState('')
  const [sig_file, setSigFile] = useState(null)
  const [sig_for, setSigFor] = useState('')
  const [sig_position, setSigPosition] = useState('')
  const [sigSaving, setSigSaving] = useState(false)

  useEffect(() => {
    fetchPermit()
    fetchHazards()
    fetchPhysicalControls()
    fetchSignitures()
    fetchStaff()
  }, [params.id])

  const fetchPermit = () => {
    axios.get(`${API_BASE}/hseapp/permittowork/${params.id}/`, { headers: h })
      .then(res => {
        const d = res.data
        setPermitNumber(d.permit_number || '')
        setLocationOfWork(d.location_of_work || '')
        setNatureOfWork(d.nature_of_work || '')
        setWorkStart(d.work_start || '')
        setWorkStartTime(d.work_start_time || '')
        setWorkCompleted(d.work_completed || '')
      }).catch(console.log)
  }

  const fetchHazards = () => {
    HazardsAndPrecautionsAPI.get('/', { headers: h })
      .then(res => setHazards(res.data)).catch(console.log)
  }

  const fetchPhysicalControls = () => {
    PhysicalControlsAPI.get('/', { headers: h })
      .then(res => setPhysicalControls(res.data)).catch(console.log)
  }

  const fetchSignitures = () => {
    SignituresAPI.get('/', { headers: h })
      .then(res => setSignitures(res.data)).catch(console.log)
  }

  const fetchStaff = () => {
    StaffAPI.get('/', { headers: h })
      .then(res => setStaffs(res.data)).catch(console.log)
  }

  const onUpdatePermit = (e) => {
    e.preventDefault()
    const item = {
      permit_number,
      location_of_work,
      nature_of_work,
      work_start: work_start || null,
      work_start_time,
      work_completed: work_completed || null,
    }
    PermitToWorkAPI.patch(`/${params.id}/`, item, { headers: h })
      .then(() => navigate(-1)).catch(console.log)
  }

  const onAddHazard = (e) => {
    e.preventDefault()
    if (!haz_hazards) return
    setHazSaving(true)
    HazardsAndPrecautionsAPI.post('/', {
      hazards: haz_hazards,
      precautions: haz_precautions,
      permit_to_work: Number(params.id),
    }, { headers: h }).then(() => {
      setHazHazards('')
      setHazPrecautions('')
      fetchHazards()
    }).catch(console.log).finally(() => setHazSaving(false))
  }

  const onDeleteHazard = (id) => {
    HazardsAndPrecautionsAPI.delete(`/${id}/`, { headers: h })
      .then(() => fetchHazards()).catch(console.log)
  }

  const onAddPhysical = (e) => {
    e.preventDefault()
    if (!pc_mechanisms) return
    setPcSaving(true)
    PhysicalControlsAPI.post('/', {
      control_mechanisms: pc_mechanisms,
      control_how_will_it_help: pc_how,
      permit_to_work: Number(params.id),
    }, { headers: h }).then(() => {
      setPcMechanisms('')
      setPcHow('')
      fetchPhysicalControls()
    }).catch(console.log).finally(() => setPcSaving(false))
  }

  const onDeletePhysical = (id) => {
    PhysicalControlsAPI.delete(`/${id}/`, { headers: h })
      .then(() => fetchPhysicalControls()).catch(console.log)
  }

  const onAddSigniture = (e) => {
    e.preventDefault()
    if (!sig_person || !sig_file || !sig_for || !sig_position) return
    setSigSaving(true)
    const fd = new FormData()
    fd.append('person_name', sig_person)
    fd.append('person_signiture', sig_file)
    fd.append('signiture_for', sig_for)
    fd.append('position_class', sig_position)
    fd.append('permit_to_work', Number(params.id))
    SignituresAPI.post('/', fd, {
      headers: { ...h, 'Content-Type': 'multipart/form-data' },
    }).then(() => {
      setSigPerson('')
      setSigFile(null)
      setSigFor('')
      setSigPosition('')
      document.getElementById('sig-file-input').value = ''
      fetchSignitures()
    }).catch(console.log).finally(() => setSigSaving(false))
  }

  const onDeleteSigniture = (id) => {
    SignituresAPI.delete(`/${id}/`, { headers: h })
      .then(() => fetchSignitures()).catch(console.log)
  }

  const staffName = (id) => {
    const s = staffs.find(s => s.id === id)
    return s ? `${s.name} (${s.position})` : '—'
  }

  const permitHazards = hazards.filter(h => h.permit_to_work === Number(params.id))
  const permitControls = physicalControls.filter(p => p.permit_to_work === Number(params.id))

  const sigTables = [
    { label: 'Details of Work (Worker)', filter: s => s.signiture_for === 'Details Of Work' && s.position_class === 'Worker' },
    { label: 'Details of Work (Competent Person)', filter: s => s.signiture_for === 'Details Of Work' && s.position_class === 'Compenent Person' },
    { label: 'Acceptance', filter: s => s.signiture_for === 'Acceptance' && s.position_class === 'Compenent Person' },
    { label: 'Completion of Work', filter: s => s.signiture_for === 'Completion' && s.position_class === 'Compenent Person' },
    { label: 'Final Sign Off', filter: s => s.signiture_for === 'Final Sign Off' && s.position_class === 'Authorizer' },
  ]

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }
  const addL = { fontWeight: '600', fontSize: '13px', color: NAVY }

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto' }}>

      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', padding: 0, color: '#888', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Permit to Work
        </button>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Permit to Work</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Update permit details, hazards, physical controls, and authorisation signatures.
        </p>
      </div>

      {/* Permit Details */}
      <SectionCard title="Permit Details">
        <Form onSubmit={onUpdatePermit}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Permit Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. PTW-2024-001"
                  value={permit_number}
                  onChange={e => setPermitNumber(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Location of Work</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Location of work"
                  value={location_of_work}
                  onChange={e => setLocationOfWork(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Nature of Work</Form.Label>
            <Form.Control
              as="textarea" rows={2}
              placeholder="Describe the nature of work..."
              value={nature_of_work}
              onChange={e => setNatureOfWork(e.target.value)}
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Work Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={work_start}
                  onChange={e => setWorkStart(e.target.value || '')}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Work Start Time</Form.Label>
                <Form.Control
                  type="time"
                  value={work_start_time}
                  onChange={e => setWorkStartTime(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-4">
                <Form.Label style={L}>Work Completed Date</Form.Label>
                <Form.Control
                  type="date"
                  value={work_completed}
                  onChange={e => setWorkCompleted(e.target.value || '')}
                />
              </Form.Group>
            </div>
          </div>

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
      </SectionCard>

      {/* Hazards & Precautions */}
      <SectionCard title={`Hazards & Precautions (${permitHazards.length})`}>
        <Form onSubmit={onAddHazard} style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <p style={{ color: NAVY, fontWeight: '600', fontSize: '13px', margin: '0 0 12px' }}>Add Hazard Entry</p>
          <div className="row">
            <div className="col-md-5">
              <Form.Group className="mb-2">
                <Form.Label style={addL}>Hazards</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Describe the hazard..."
                  value={haz_hazards}
                  onChange={e => setHazHazards(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-5">
              <Form.Group className="mb-2">
                <Form.Label style={addL}>Precautions</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="What precautions are in place?"
                  value={haz_precautions}
                  onChange={e => setHazPrecautions(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-2 d-flex align-items-end mb-2">
              <Button
                type="submit"
                disabled={!haz_hazards || hazSaving}
                style={{ width: '100%', backgroundColor: ORANGE, border: 'none', fontWeight: '600', fontSize: '13px' }}
              >
                {hazSaving ? 'Adding...' : 'Add'}
              </Button>
            </div>
          </div>
        </Form>

        {permitHazards.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '20px 0', margin: 0, fontSize: '13px' }}>No hazards added yet.</p>
        ) : (
          <Table hover responsive style={{ fontSize: '13px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Hazards</th>
                <th style={{ color: NAVY }}>Precautions</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {permitHazards.map(hz => (
                <tr key={hz.id}>
                  <td style={{ color: '#333' }}>{hz.hazards || '—'}</td>
                  <td style={{ color: '#666' }}>{hz.precautions || '—'}</td>
                  <td>
                    <Link to={`/hazardsandprecautionsedit/${hz.id}`} style={{ color: NAVY }}>
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDeleteHazard(hz.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </SectionCard>

      {/* Physical Controls */}
      <SectionCard title={`Physical Controls (${permitControls.length})`}>
        <Form onSubmit={onAddPhysical} style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <p style={{ color: NAVY, fontWeight: '600', fontSize: '13px', margin: '0 0 12px' }}>Add Physical Control</p>
          <div className="row">
            <div className="col-md-5">
              <Form.Group className="mb-2">
                <Form.Label style={addL}>Control Mechanisms</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Describe the control mechanism..."
                  value={pc_mechanisms}
                  onChange={e => setPcMechanisms(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-5">
              <Form.Group className="mb-2">
                <Form.Label style={addL}>How Controls Work</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="How will this control help?"
                  value={pc_how}
                  onChange={e => setPcHow(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-2 d-flex align-items-end mb-2">
              <Button
                type="submit"
                disabled={!pc_mechanisms || pcSaving}
                style={{ width: '100%', backgroundColor: ORANGE, border: 'none', fontWeight: '600', fontSize: '13px' }}
              >
                {pcSaving ? 'Adding...' : 'Add'}
              </Button>
            </div>
          </div>
        </Form>

        {permitControls.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '20px 0', margin: 0, fontSize: '13px' }}>No physical controls added yet.</p>
        ) : (
          <Table hover responsive style={{ fontSize: '13px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Control Mechanisms</th>
                <th style={{ color: NAVY }}>How Controls Work</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {permitControls.map(pc => (
                <tr key={pc.id}>
                  <td style={{ color: '#333' }}>{pc.control_mechanisms || '—'}</td>
                  <td style={{ color: '#666' }}>{pc.control_how_will_it_help || '—'}</td>
                  <td>
                    <Link to={`/physicalcontrolsedit/${pc.id}`} style={{ color: NAVY }}>
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDeletePhysical(pc.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </SectionCard>

      {/* Signatures */}
      <SectionCard title="Signatures">
        <Form onSubmit={onAddSigniture} style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <p style={{ color: NAVY, fontWeight: '600', fontSize: '13px', margin: '0 0 12px' }}>Add Signature</p>
          <div className="row">
            <div className="col-md-3">
              <Form.Group className="mb-2">
                <Form.Label style={addL}>Person</Form.Label>
                <Form.Select value={sig_person} onChange={e => setSigPerson(e.target.value)}>
                  <option value="">Select...</option>
                  {staffs.map(s => <option key={s.id} value={s.id}>{s.name} ({s.position})</option>)}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-2">
                <Form.Label style={addL}>Signature For</Form.Label>
                <Form.Select value={sig_for} onChange={e => setSigFor(e.target.value)}>
                  <option value="">Select...</option>
                  <option value="Details Of Work">Details Of Work</option>
                  <option value="Acceptance">Acceptance</option>
                  <option value="Completion">Completion</option>
                  <option value="Final Sign Off">Final Sign Off</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-2">
                <Form.Label style={addL}>Position Class</Form.Label>
                <Form.Select value={sig_position} onChange={e => setSigPosition(e.target.value)}>
                  <option value="">Select...</option>
                  <option value="Compenent Person">Competent Person</option>
                  <option value="Worker">Worker</option>
                  <option value="Authorizer">Authorizer</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-2">
                <Form.Label style={addL}>Signature Image</Form.Label>
                <Form.Control
                  id="sig-file-input"
                  type="file"
                  accept="image/*"
                  onChange={e => setSigFile(e.target.files[0] || null)}
                />
              </Form.Group>
            </div>
          </div>
          <div style={{ marginTop: '8px' }}>
            <Button
              type="submit"
              disabled={!sig_person || !sig_file || !sig_for || !sig_position || sigSaving}
              style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', fontSize: '13px', padding: '7px 20px' }}
            >
              {sigSaving ? 'Adding...' : 'Add Signature'}
            </Button>
          </div>
        </Form>

        {sigTables.map(({ label, filter }) => {
          const rows = signitures.filter(s => s.permit_to_work === Number(params.id) && filter(s))
          return (
            <div key={label} style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <h6 style={{ color: NAVY, fontWeight: '700', margin: 0 }}>{label}</h6>
                <span style={{
                  backgroundColor: '#e8edf5', color: NAVY, fontSize: '11px',
                  fontWeight: '700', padding: '1px 7px', borderRadius: '10px',
                }}>{rows.length}</span>
              </div>
              {rows.length === 0 ? (
                <p style={{ color: '#bbb', fontSize: '13px', margin: '0 0 8px', paddingLeft: '4px' }}>No signatures yet.</p>
              ) : (
                <Table hover responsive style={{ fontSize: '13px' }}>
                  <thead style={{ backgroundColor: '#f8f9fa' }}>
                    <tr>
                      <th style={{ color: NAVY }}>Person</th>
                      <th style={{ color: NAVY }}>Signature</th>
                      <th style={{ color: NAVY }}>Position</th>
                      <th style={{ color: NAVY }}>Edit</th>
                      <th style={{ color: NAVY }}>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(s => (
                      <tr key={s.id}>
                        <td style={{ color: '#333' }}>{staffName(s.person_name)}</td>
                        <td>
                          {s.person_signiture ? (
                            <a href={s.person_signiture} download>
                              <img src={s.person_signiture} alt="signature" style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                            </a>
                          ) : '—'}
                        </td>
                        <td style={{ color: '#666' }}>{s.position_class}</td>
                        <td>
                          <Link to={`/signituresedit/${s.id}`} style={{ color: NAVY }}>
                            <FontAwesomeIcon icon={faPen} />
                          </Link>
                        </td>
                        <td>
                          <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDeleteSigniture(s.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          )
        })}
      </SectionCard>

    </div>
  )
}
