import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Form, Button, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import JobSafetyAnalysisAPI from '../../API/JobSafetyAnalysisAPI'
import JobSafetyEquipmentAPI from '../../API/JobSafetyEquipmentAPI'
import JobSafetyStepsAPI from '../../API/JobSafetyStepsAPI'
import JobSafetyHazardsAPI from '../../API/JobSafetyHazardsAPI'
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

export default function JobSafetyAnalysisEdit() {
  const { authTokens } = useContext(AuthContext)
  const params = useParams()
  const navigate = useNavigate()
  const h = { Authorization: `Bearer ${authTokens.access}` }

  // JSA fields
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

  // Sub-items
  const [equipments, setEquipments] = useState([])
  const [steps, setSteps] = useState([])
  const [hazards, setHazards] = useState([])
  const [staffs, setStaffs] = useState([])

  // Equipment form
  const [eq_equipment, setEqEquipment] = useState('')
  const [eqSaving, setEqSaving] = useState(false)

  // Steps form
  const [st_steps, setStSteps] = useState('')
  const [stSaving, setStSaving] = useState(false)

  // Hazards form
  const [hz_hazards, setHzHazards] = useState('')
  const [hz_controls, setHzControls] = useState('')
  const [hzSaving, setHzSaving] = useState(false)

  useEffect(() => {
    fetchJsa()
    fetchEquipments()
    fetchSteps()
    fetchHazards()
    fetchStaff()
  }, [params.id])

  const fetchJsa = () => {
    axios.get(`${API_BASE}/hseapp/jobsafetyanalysis/${params.id}/`, { headers: h })
      .then(res => {
        const d = res.data
        setJobTitle(d.job_title || '')
        setJsaId(d.jsa_id || '')
        setJobPerformer(d.job_performer || '')
        setSupervisor(d.supervisor || '')
        setAnalysisBy(d.analysis_by || '')
        setReviewedBy(d.reviewed_by || '')
        setCompany(d.company || '')
        setLocation(d.location || '')
        setDepartment(d.department || '')
        setDateRaised(d.date_raised || '')
      }).catch(console.log)
  }

  const fetchEquipments = () => {
    JobSafetyEquipmentAPI.get('/', { headers: h })
      .then(res => setEquipments(res.data)).catch(console.log)
  }

  const fetchSteps = () => {
    JobSafetyStepsAPI.get('/', { headers: h })
      .then(res => setSteps(res.data)).catch(console.log)
  }

  const fetchHazards = () => {
    JobSafetyHazardsAPI.get('/', { headers: h })
      .then(res => setHazards(res.data)).catch(console.log)
  }

  const fetchStaff = () => {
    StaffAPI.get('/', { headers: h })
      .then(res => setStaffs(res.data)).catch(console.log)
  }

  const onUpdateJsa = (e) => {
    e.preventDefault()
    JobSafetyAnalysisAPI.patch(`/${params.id}/`, {
      job_title, jsa_id,
      job_performer: job_performer || null,
      supervisor: supervisor || null,
      analysis_by: analysis_by || null,
      reviewed_by: reviewed_by || null,
      company, location, department,
      date_raised: date_raised || null,
    }, { headers: h }).then(() => navigate(-1)).catch(console.log)
  }

  const onAddEquipment = (e) => {
    e.preventDefault()
    if (!eq_equipment) return
    setEqSaving(true)
    JobSafetyEquipmentAPI.post('/', {
      safety_equipment: eq_equipment,
      job_safety_analysis: Number(params.id),
    }, { headers: h }).then(() => {
      setEqEquipment('')
      fetchEquipments()
    }).catch(console.log).finally(() => setEqSaving(false))
  }

  const onDeleteEquipment = (id) => {
    JobSafetyEquipmentAPI.delete(`/${id}/`, { headers: h })
      .then(() => fetchEquipments()).catch(console.log)
  }

  const onAddStep = (e) => {
    e.preventDefault()
    if (!st_steps) return
    setStSaving(true)
    JobSafetyStepsAPI.post('/', {
      job_steps: st_steps,
      job_safety_analysis: Number(params.id),
    }, { headers: h }).then(() => {
      setStSteps('')
      fetchSteps()
    }).catch(console.log).finally(() => setStSaving(false))
  }

  const onDeleteStep = (id) => {
    JobSafetyStepsAPI.delete(`/${id}/`, { headers: h })
      .then(() => fetchSteps()).catch(console.log)
  }

  const onAddHazard = (e) => {
    e.preventDefault()
    if (!hz_hazards) return
    setHzSaving(true)
    JobSafetyHazardsAPI.post('/', {
      hazards: hz_hazards,
      controls: hz_controls,
      job_safety_analysis: Number(params.id),
    }, { headers: h }).then(() => {
      setHzHazards('')
      setHzControls('')
      fetchHazards()
    }).catch(console.log).finally(() => setHzSaving(false))
  }

  const onDeleteHazard = (id) => {
    JobSafetyHazardsAPI.delete(`/${id}/`, { headers: h })
      .then(() => fetchHazards()).catch(console.log)
  }

  const staffName = (id) => {
    const s = staffs.find(s => s.id === id)
    return s ? `${s.name} (${s.position})` : ''
  }

  const jsaEquipments = equipments.filter(e => e.job_safety_analysis === Number(params.id))
  const jsaSteps = steps.filter(s => s.job_safety_analysis === Number(params.id))
  const jsaHazards = hazards.filter(h => h.job_safety_analysis === Number(params.id))

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }
  const addL = { fontWeight: '600', fontSize: '13px', color: NAVY }

  const StaffSelect = ({ label, value, onChange }) => (
    <Form.Group className="mb-3">
      <Form.Label style={L}>{label}</Form.Label>
      <Form.Select value={value} onChange={onChange}>
        <option value="">Select...</option>
        {staffs.map(s => <option key={s.id} value={s.id}>{s.name} ({s.position})</option>)}
      </Form.Select>
    </Form.Group>
  )

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto' }}>

      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', padding: 0, color: '#888', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back to JSA List
        </button>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Job Safety Analysis</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Update JSA details, job steps, safety equipment, and hazard controls.
        </p>
      </div>

      {/* JSA Details */}
      <SectionCard title="JSA Details">
        <Form onSubmit={onUpdateJsa}>
          <div className="row">
            <div className="col-md-5">
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
            <div className="col-md-4">
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
                <Form.Control type="text" placeholder="Company name" value={company} onChange={e => setCompany(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Location</Form.Label>
                <Form.Control type="text" placeholder="Work location" value={location} onChange={e => setLocation(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-4">
                <Form.Label style={L}>Department</Form.Label>
                <Form.Control type="text" placeholder="Department" value={department} onChange={e => setDepartment(e.target.value)} />
              </Form.Group>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button type="submit" style={{ flex: 1, backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}>
              Save Changes
            </Button>
            <Button type="button" onClick={() => navigate(-1)} style={{ backgroundColor: 'transparent', border: `1.5px solid ${NAVY}`, color: NAVY, fontWeight: '600', padding: '10px 24px' }}>
              Cancel
            </Button>
          </div>
        </Form>
      </SectionCard>

      {/* Safety Equipment */}
      <SectionCard title={`Safety Equipment (${jsaEquipments.length})`}>
        <Form onSubmit={onAddEquipment} style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <p style={{ color: NAVY, fontWeight: '600', fontSize: '13px', margin: '0 0 12px' }}>Add Safety Equipment</p>
          <div className="row">
            <div className="col-md-10">
              <Form.Group className="mb-2">
                <Form.Label style={addL}>Safety Equipment</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Hard hat, Safety harness, Gloves..."
                  value={eq_equipment}
                  onChange={e => setEqEquipment(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-2 d-flex align-items-end mb-2">
              <Button
                type="submit"
                disabled={!eq_equipment || eqSaving}
                style={{ width: '100%', backgroundColor: ORANGE, border: 'none', fontWeight: '600', fontSize: '13px' }}
              >
                {eqSaving ? 'Adding...' : 'Add'}
              </Button>
            </div>
          </div>
        </Form>

        {jsaEquipments.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '20px 0', margin: 0, fontSize: '13px' }}>No safety equipment added yet.</p>
        ) : (
          <Table hover responsive style={{ fontSize: '13px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Safety Equipment</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {jsaEquipments.map(eq => (
                <tr key={eq.id}>
                  <td style={{ color: '#333' }}>{eq.safety_equipment || '—'}</td>
                  <td>
                    <Link to={`/jobsafetyequipmentedit/${eq.id}`} style={{ color: NAVY }}>
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDeleteEquipment(eq.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </SectionCard>

      {/* Job Steps */}
      <SectionCard title={`Job Steps (${jsaSteps.length})`}>
        <Form onSubmit={onAddStep} style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <p style={{ color: NAVY, fontWeight: '600', fontSize: '13px', margin: '0 0 12px' }}>Add Job Step</p>
          <div className="row">
            <div className="col-md-10">
              <Form.Group className="mb-2">
                <Form.Label style={addL}>Job Step</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Describe the job step..."
                  value={st_steps}
                  onChange={e => setStSteps(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-2 d-flex align-items-end mb-2">
              <Button
                type="submit"
                disabled={!st_steps || stSaving}
                style={{ width: '100%', backgroundColor: ORANGE, border: 'none', fontWeight: '600', fontSize: '13px' }}
              >
                {stSaving ? 'Adding...' : 'Add'}
              </Button>
            </div>
          </div>
        </Form>

        {jsaSteps.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '20px 0', margin: 0, fontSize: '13px' }}>No job steps added yet.</p>
        ) : (
          <Table hover responsive style={{ fontSize: '13px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Job Step</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {jsaSteps.map((st, i) => (
                <tr key={st.id}>
                  <td style={{ color: '#333' }}>
                    <span style={{ color: '#999', marginRight: '8px', fontSize: '12px' }}>{i + 1}.</span>
                    {st.job_steps || '—'}
                  </td>
                  <td>
                    <Link to={`/jobsafetystepsedit/${st.id}`} style={{ color: NAVY }}>
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDeleteStep(st.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </SectionCard>

      {/* Job Hazards */}
      <SectionCard title={`Job Hazards (${jsaHazards.length})`}>
        <Form onSubmit={onAddHazard} style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <p style={{ color: NAVY, fontWeight: '600', fontSize: '13px', margin: '0 0 12px' }}>Add Job Hazard</p>
          <div className="row">
            <div className="col-md-5">
              <Form.Group className="mb-2">
                <Form.Label style={addL}>Hazards</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Describe the hazard..."
                  value={hz_hazards}
                  onChange={e => setHzHazards(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-5">
              <Form.Group className="mb-2">
                <Form.Label style={addL}>Controls</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Control measures in place..."
                  value={hz_controls}
                  onChange={e => setHzControls(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-2 d-flex align-items-end mb-2">
              <Button
                type="submit"
                disabled={!hz_hazards || hzSaving}
                style={{ width: '100%', backgroundColor: ORANGE, border: 'none', fontWeight: '600', fontSize: '13px' }}
              >
                {hzSaving ? 'Adding...' : 'Add'}
              </Button>
            </div>
          </div>
        </Form>

        {jsaHazards.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '20px 0', margin: 0, fontSize: '13px' }}>No hazards added yet.</p>
        ) : (
          <Table hover responsive style={{ fontSize: '13px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Hazards</th>
                <th style={{ color: NAVY }}>Controls</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {jsaHazards.map(hz => (
                <tr key={hz.id}>
                  <td style={{ color: '#333' }}>{hz.hazards || '—'}</td>
                  <td style={{ color: '#666' }}>{hz.controls || '—'}</td>
                  <td>
                    <Link to={`/jobsafetyhazardsedit/${hz.id}`} style={{ color: NAVY }}>
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

    </div>
  )
}
