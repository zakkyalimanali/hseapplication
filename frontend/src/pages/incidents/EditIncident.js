import { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Form, Button, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import SafetyCardAPI from '../../API/SafetyCardAPI'
import SafetyCardPhotosAPI from '../../API/SafetyCardPhotosAPI'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import API_BASE from '../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

const WHAT_OPTIONS = [
  '(A) Head Protection not worn', '(B) Eye protection not worn', '(C) Face protection not worn',
  '(D) Ear protection not worn', '(E) Protective clothing not worn', '(F) Leg/Feet protection not worn',
  '(G) Hand protection not worn', '(H) PPE in bad condition', '(I) Wrong PPE for the job',
  '(J) Substandard PPE', '(K) PPE not worn properly', '(L) Respiration protection not worn',
  '(M) Body Protection not worn', '(N) Wrong tool for the job', '(O) Tools in bad condition',
  '(P) Tools not inspected', '(Q) Misuse', '(R) Uncertified tools',
  '(S) Too heavy for manual lifting', '(T) Wrong mechanical manual lifting', '(U) Lifting tool not inspected',
  '(V) Chemical not properly handled', '(W) Waste not properly disposed', '(X) In danger of struck',
  '(Y) In danger of striking against', '(Z) In danger of caught by', '(AA) In danger of fall/slip/trip',
  '(BB) In danger of electrocution', '(CC) In danger of burnt', '(DD) Access obstructed',
  '(EE) Tools/materials disorganized', '(FF) Poor/Improper roping of', '(GG) Accumulation of rubbish',
  '(HH) Water is being polluted', '(II) Air being polluted', '(JJ) Too much noise',
  '(KK) Soil being polluted', '(LL) Poor illumination', '(MM) Work without permission',
  '(NN) Wrong permit', '(OO) Procedures / Standard not followed', '(PP) Wrong instruction on permit',
  '(QQ) Permit procedure not followed', '(RR) Inadequate HIP', '(SS) Toolbox talk not given',
  '(TT) Driving recklessly', '(UU) Not wearing seat belt',
  '(VV) Road traffic violation - eg. Speeding, no entry & etc', '(WW) Vehicles / Transportation abuse',
  '(XX) Not inspected for compliance', '(YY) Vehicle defects', '(ZZ) Compliance',
  '(AAA) Behavior & Attitude',
]

const WHY_OPTIONS = [
  '(1) Not Informed', '(2) Language Problem', '(3) Not reading permit',
  '(4) Wrong interpretation of risk', '(5) Wrong instruction', '(6) No procedure',
  '(7) Lack of HSE Coaching / training', '(8) Behavior & Attitude (intentionally)',
  '(9) Negligence', '(10) Working condition', '(11) Working layout',
  '(12) The design of equipment / tools', '(13) Work habits', '(14) Lack of skill',
  '(15) Time pressure', '(16) Not requested', '(17) Physical limitations',
  '(18) Not supplied/available', '(19) Lack of ownership',
  '(20) Behavior & Attitude (not intentionally)',
]

const LSR_OPTIONS = [
  '(1) Work with a valid work permit when required',
  '(2) Conduct gas test when required',
  '(3) Verify isolation before work begins and use the specific life protecting equipment',
  '(4) Obtain authorization before entering a confined space',
  '(5) Obtain authorization before overriding or disabling safety critical equipment',
  '(6) Protect yourself against a fall when working at height',
  '(7) Do not walk under a suspended load',
  '(8) Do not smoke outside designated smoking area',
  '(9) No alcohol or drugs while working or driving',
  '(10) While driving, do not use your phone and do not exceed limit',
  '(11) Wear your seat belts',
  '(12) Follow prescribed Journey Management Plan',
]

export default function EditIncident() {
  const { authTokens } = useContext(AuthContext)
  const params = useParams()

  const [short_desc, setShortDesc] = useState('')
  const [what_happened, setWhatHappened] = useState('')
  const [why_happened, setWhyHappened] = useState('')
  const [date_raised, setDateRaised] = useState('')
  const [raised_by, setRaisedBy] = useState('')
  const [life_saving_rule, setLifeSavingRule] = useState('')
  const [findings, setFindings] = useState('')
  const [incident_date, setIncidentDate] = useState('')
  const [location, setLocation] = useState('')
  const [discussion, setDiscussion] = useState('')
  const [target_date, setTargetDate] = useState('')
  const [follow_up, setFollowUp] = useState('')
  const [follow_up_remarks, setFollowUpRemarks] = useState('')
  const [status, setStatus] = useState('')
  const [responsible_party, setResponsibleParty] = useState('')
  const [staffs, setStaffs] = useState([])
  const [photos, setPhotos] = useState([])

  // Photo upload state
  const [photoTitle, setPhotoTitle] = useState('')
  const [photoDesc, setPhotoDesc] = useState('')
  const [photoFile, setPhotoFile] = useState(null)

  useEffect(() => {
    const headers = { Authorization: `Bearer ${authTokens.access}` }

    axios.get(`${API_BASE}/hseapp/safetycard/${params.id}/`, { headers })
      .then(res => {
        const d = res.data
        setShortDesc(d.short_desc || '')
        setWhatHappened(d.what_happened || '')
        setWhyHappened(d.why_happened || '')
        setDateRaised(d.date_raised || '')
        setRaisedBy(d.raised_by || '')
        setLifeSavingRule(d.life_saving_rule || '')
        setFindings(d.findings || '')
        setIncidentDate(d.incident_date || '')
        setLocation(d.location || '')
        setDiscussion(d.discussion || '')
        setTargetDate(d.target_date || '')
        setFollowUp(d.follow_up || '')
        setFollowUpRemarks(d.follow_up_remarks || '')
        setStatus(d.status || '')
        setResponsibleParty(d.responsible_party || '')
      }).catch(console.log)

    axios.get(`${API_BASE}/hseapp/staff/`, { headers })
      .then(res => setStaffs(res.data)).catch(console.log)

    fetchPhotos()
  }, [params.id])

  const fetchPhotos = () => {
    SafetyCardPhotosAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setPhotos(res.data)).catch(console.log)
  }

  const onUpdate = (e) => {
    e.preventDefault()
    const item = {
      short_desc, what_happened, why_happened,
      raised_by: raised_by || null, date_raised: date_raised || null,
      life_saving_rule, findings,
      incident_date: incident_date || null,
      location, discussion,
      target_date: target_date || null,
      follow_up, follow_up_remarks, status, responsible_party,
    }
    SafetyCardAPI.patch(`/${params.id}/`, item, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => {
      // Reload data after update
      axios.get(`${API_BASE}/hseapp/safetycard/${params.id}/`, {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      }).then(res => {
        const d = res.data
        setShortDesc(d.short_desc || ''); setWhatHappened(d.what_happened || '')
        setWhyHappened(d.why_happened || ''); setDateRaised(d.date_raised || '')
        setRaisedBy(d.raised_by || ''); setLifeSavingRule(d.life_saving_rule || '')
        setFindings(d.findings || ''); setIncidentDate(d.incident_date || '')
        setLocation(d.location || ''); setDiscussion(d.discussion || '')
        setTargetDate(d.target_date || ''); setFollowUp(d.follow_up || '')
        setFollowUpRemarks(d.follow_up_remarks || ''); setStatus(d.status || '')
        setResponsibleParty(d.responsible_party || '')
      })
    }).catch(console.log)
  }

  const onAddPhoto = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', photoTitle)
    formData.append('description', photoDesc)
    if (photoFile) formData.append('incident_photo', photoFile)
    formData.append('incident', params.id)

    SafetyCardPhotosAPI.post('/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authTokens.access}`,
      },
    }).then(() => {
      fetchPhotos()
      setPhotoTitle(''); setPhotoDesc(''); setPhotoFile(null)
      e.target.reset()
    }).catch(console.log)
  }

  const onDeletePhoto = (id) => {
    SafetyCardPhotosAPI.delete(`/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => fetchPhotos()).catch(console.log)
  }

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }
  const cardPhotos = photos.filter(p => p.incident === Number(params.id))

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto' }}>

      {/* Back + Header */}
      <div style={{ marginBottom: '32px' }}>
        <Link to="/incidenttable" style={{ color: '#888', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Safety Cards
        </Link>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Safety Card</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Update the details of this safety card record.
        </p>
      </div>

      {/* Main form */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '32px' }}>
        <Form onSubmit={onUpdate}>
          <div className="row">

            {/* Left column */}
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Short Description</Form.Label>
                <Form.Control
                  as="textarea" rows={3}
                  placeholder="Brief description of what was observed..."
                  value={short_desc} onChange={e => setShortDesc(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={L}>What Happened</Form.Label>
                <Form.Select value={what_happened} onChange={e => setWhatHappened(e.target.value)}>
                  <option value="">Select...</option>
                  {WHAT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={L}>Why It Happened</Form.Label>
                <Form.Select value={why_happened} onChange={e => setWhyHappened(e.target.value)}>
                  <option value="">Select...</option>
                  {WHY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </Form.Select>
              </Form.Group>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label style={L}>Date Raised</Form.Label>
                    <Form.Control type="date" value={date_raised} onChange={e => setDateRaised(e.target.value || null)} />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label style={L}>Incident Date</Form.Label>
                    <Form.Control type="date" value={incident_date} onChange={e => setIncidentDate(e.target.value || null)} />
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label style={L}>Raised By</Form.Label>
                <Form.Select value={raised_by} onChange={e => setRaisedBy(e.target.value)}>
                  <option value="">Select staff member...</option>
                  {staffs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={L}>Life Saving Rule</Form.Label>
                <Form.Select value={life_saving_rule} onChange={e => setLifeSavingRule(e.target.value)}>
                  <option value="">Select rule...</option>
                  {LSR_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </Form.Select>
              </Form.Group>
            </div>

            {/* Right column */}
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Location</Form.Label>
                <Form.Control
                  type="text" placeholder="Where did this occur?"
                  value={location} onChange={e => setLocation(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={L}>Findings</Form.Label>
                <Form.Control
                  as="textarea" rows={3}
                  placeholder="What was found during investigation..."
                  value={findings} onChange={e => setFindings(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={L}>Discussion</Form.Label>
                <Form.Control
                  as="textarea" rows={3}
                  placeholder="Summary of discussion held..."
                  value={discussion} onChange={e => setDiscussion(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={L}>Status</Form.Label>
                <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="">Select status...</option>
                  <option>Ongoing</option>
                  <option>Resolved</option>
                  <option>No Further Action Required</option>
                </Form.Select>
              </Form.Group>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label style={L}>Target Date</Form.Label>
                    <Form.Control type="date" value={target_date} onChange={e => setTargetDate(e.target.value || null)} />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label style={L}>Follow Up</Form.Label>
                    <Form.Select value={follow_up} onChange={e => setFollowUp(e.target.value)}>
                      <option value="">Select...</option>
                      <option>Yes</option>
                      <option>No</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label style={L}>Follow Up Remarks</Form.Label>
                <Form.Control
                  as="textarea" rows={2}
                  placeholder="Notes on follow-up actions taken..."
                  value={follow_up_remarks} onChange={e => setFollowUpRemarks(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={L}>Responsible Party</Form.Label>
                <Form.Control
                  type="text" placeholder="Name of responsible person or team"
                  value={responsible_party} onChange={e => setResponsibleParty(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <Button
              type="submit"
              style={{ flex: 1, backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
            >
              Save Changes
            </Button>
            <Link to="/incidenttable">
              <Button type="button" style={{ backgroundColor: 'transparent', border: `1.5px solid ${NAVY}`, color: NAVY, fontWeight: '600', padding: '10px 24px' }}>
                Return
              </Button>
            </Link>
          </div>
        </Form>
      </div>

      {/* Photos section */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px' }}>Evidence Photos</h5>

        {/* Upload form */}
        <Form onSubmit={onAddPhoto} style={{ marginBottom: '28px' }}>
          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Photo Title</Form.Label>
                <Form.Control
                  type="text" placeholder="e.g. Site observation photo"
                  value={photoTitle} onChange={e => setPhotoTitle(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Description</Form.Label>
                <Form.Control
                  type="text" placeholder="Brief description of photo"
                  value={photoDesc} onChange={e => setPhotoDesc(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Photo File</Form.Label>
                <Form.Control type="file" onChange={e => setPhotoFile(e.target.files[0])} />
              </Form.Group>
            </div>
          </div>
          <Button
            type="submit"
            style={{ backgroundColor: NAVY, border: 'none', fontWeight: '600', padding: '8px 24px' }}
          >
            Upload Photo
          </Button>
        </Form>

        {/* Photos table */}
        {cardPhotos.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '24px 0', margin: 0 }}>
            No photos uploaded yet.
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Title</th>
                <th style={{ color: NAVY }}>Description</th>
                <th style={{ color: NAVY }}>Photo</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cardPhotos.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: '600' }}>{p.title || '—'}</td>
                  <td style={{ color: '#666' }}>{p.description || '—'}</td>
                  <td>
                    {p.incident_photo ? (
                      <a href={p.incident_photo} download>
                        <img
                          src={p.incident_photo}
                          alt={p.title}
                          style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                      </a>
                    ) : <span style={{ color: '#ccc' }}>—</span>}
                  </td>
                  <td>
                    <Link to={`/incidenteventphotosedit/${p.id}`} style={{ color: NAVY }}>
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDeletePhoto(p.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  )
}
