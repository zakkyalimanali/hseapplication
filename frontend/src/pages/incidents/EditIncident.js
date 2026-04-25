import { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import SafetyCardAPI from '../../API/SafetyCardAPI'
import SafetyCardPhotosAPI from '../../API/SafetyCardPhotosAPI'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import API_BASE from '../../utils/apiBase'

const NAVY   = '#1B2B4B'
const ORANGE = '#E15047'
const GREEN  = '#059669'
const AMBER  = '#D97706'
const BLUE   = '#2563EB'

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

const STATUS_STYLE = {
  'Ongoing':                   { bg: '#FEF3C7', color: AMBER },
  'Resolved':                  { bg: '#D1FAE5', color: GREEN },
  'No Further Action Required':{ bg: '#DBEAFE', color: BLUE  },
}

// ── Shared style tokens ──────────────────────────────────────────────────────
const lbl = {
  display: 'block', marginBottom: '6px',
  fontWeight: '600', fontSize: '13px', color: NAVY,
}
const inp = {
  width: '100%', padding: '10px 12px',
  border: '1.5px solid #E5E7EB', borderRadius: '8px',
  fontSize: '14px', color: '#374151',
  outline: 'none', boxSizing: 'border-box', backgroundColor: 'white',
}
const card = {
  backgroundColor: 'white', borderRadius: '12px',
  padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  marginBottom: '24px',
}
const sectionHead = {
  margin: '0 0 20px', paddingBottom: '12px',
  borderBottom: '1px solid #F3F4F6',
  fontSize: '11px', fontWeight: '700',
  letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7280',
}
const grid2   = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }
const grid3   = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }
const fld     = { marginBottom: '20px' }

function Field({ label, children }) {
  return (
    <div style={fld}>
      <label style={lbl}>{label}</label>
      {children}
    </div>
  )
}

export default function EditIncident() {
  const { authTokens } = useContext(AuthContext)
  const params = useParams()

  const [short_desc,       setShortDesc]      = useState('')
  const [what_happened,    setWhatHappened]   = useState('')
  const [why_happened,     setWhyHappened]    = useState('')
  const [date_raised,      setDateRaised]     = useState('')
  const [raised_by,        setRaisedBy]       = useState('')
  const [life_saving_rule, setLifeSavingRule] = useState('')
  const [findings,         setFindings]       = useState('')
  const [incident_date,    setIncidentDate]   = useState('')
  const [location,         setLocation]       = useState('')
  const [discussion,       setDiscussion]     = useState('')
  const [target_date,      setTargetDate]     = useState('')
  const [follow_up,        setFollowUp]       = useState('')
  const [follow_up_remarks,setFollowUpRemarks]= useState('')
  const [status,           setStatus]         = useState('')
  const [responsible_party,setResponsibleParty]= useState('')
  const [staffs,           setStaffs]         = useState([])
  const [photos,           setPhotos]         = useState([])
  const [saved,            setSaved]          = useState(false)

  // Photo upload state
  const [photoTitle, setPhotoTitle] = useState('')
  const [photoDesc,  setPhotoDesc]  = useState('')
  const [photoFile,  setPhotoFile]  = useState(null)

  const headers = { Authorization: `Bearer ${authTokens.access}` }

  useEffect(() => {
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
    SafetyCardPhotosAPI.get('/', { headers })
      .then(res => setPhotos(res.data)).catch(console.log)
  }

  const onUpdate = (e) => {
    e.preventDefault()
    const item = {
      short_desc, what_happened, why_happened,
      raised_by: raised_by || null,
      date_raised: date_raised || null,
      life_saving_rule, findings,
      incident_date: incident_date || null,
      location, discussion,
      target_date: target_date || null,
      follow_up, follow_up_remarks, status, responsible_party,
    }
    SafetyCardAPI.patch(`/${params.id}/`, item, { headers })
      .then(() => {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
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
      headers: { 'Content-Type': 'multipart/form-data', ...headers },
    }).then(() => {
      fetchPhotos()
      setPhotoTitle(''); setPhotoDesc(''); setPhotoFile(null)
      e.target.reset()
    }).catch(console.log)
  }

  const onDeletePhoto = (id) => {
    SafetyCardPhotosAPI.delete(`/${id}/`, { headers })
      .then(() => fetchPhotos()).catch(console.log)
  }

  const staffName = (id) => staffs.find(s => s.id === Number(id))?.name || '—'
  const cardPhotos = photos.filter(p => p.incident === Number(params.id))
  const statusStyle = STATUS_STYLE[status] || { bg: '#F3F4F6', color: '#6B7280' }

  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100%' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px' }}>

        {/* ── Back + Header ── */}
        <div style={{ marginBottom: '32px' }}>
          <Link
            to="/safetycardtable"
            style={{ color: '#6B7280', fontSize: '13px', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to Safety Cards
          </Link>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Safety Card</h2>
              <p style={{ color: '#9CA3AF', margin: 0, fontSize: '14px' }}>
                Update the details of this safety observation record.
              </p>
            </div>
            {status && (
              <span style={{
                backgroundColor: statusStyle.bg, color: statusStyle.color,
                fontSize: '12px', fontWeight: '700', padding: '4px 14px',
                borderRadius: '6px', letterSpacing: '0.05em',
              }}>
                {status.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <form onSubmit={onUpdate}>

          {/* ── Section 1 : Incident Details ── */}
          <div style={card}>
            <p style={sectionHead}>Incident Details</p>

            <Field label="Short Description">
              <textarea
                rows={3} style={{ ...inp, resize: 'vertical' }}
                placeholder="Brief description of what was observed..."
                value={short_desc} onChange={e => setShortDesc(e.target.value)}
              />
            </Field>

            <div style={grid2}>
              <Field label="Location">
                <input style={inp} type="text" placeholder="Where did this occur?"
                  value={location} onChange={e => setLocation(e.target.value)} />
              </Field>
              <Field label="Raised By">
                <select style={inp} value={raised_by} onChange={e => setRaisedBy(e.target.value)}>
                  <option value="">Select staff member...</option>
                  {staffs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </Field>
            </div>

            <div style={grid2}>
              <Field label="Date Raised">
                <input style={inp} type="date" value={date_raised}
                  onChange={e => setDateRaised(e.target.value || null)} />
              </Field>
              <Field label="Incident Date">
                <input style={inp} type="date" value={incident_date}
                  onChange={e => setIncidentDate(e.target.value || null)} />
              </Field>
            </div>
          </div>

          {/* ── Section 2 : Classification ── */}
          <div style={card}>
            <p style={sectionHead}>Classification</p>

            <Field label="What Happened">
              <select style={inp} value={what_happened} onChange={e => setWhatHappened(e.target.value)}>
                <option value="">Select...</option>
                {WHAT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>

            <Field label="Why It Happened">
              <select style={inp} value={why_happened} onChange={e => setWhyHappened(e.target.value)}>
                <option value="">Select...</option>
                {WHY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>

            <Field label="Life Saving Rule (if applicable)">
              <select style={inp} value={life_saving_rule} onChange={e => setLifeSavingRule(e.target.value)}>
                <option value="">Select rule...</option>
                {LSR_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
          </div>

          {/* ── Section 3 : Follow-up & Resolution ── */}
          <div style={card}>
            <p style={sectionHead}>Follow-up & Resolution</p>

            <div style={grid2}>
              <Field label="Findings">
                <textarea rows={3} style={{ ...inp, resize: 'vertical' }}
                  placeholder="What was found during investigation..."
                  value={findings} onChange={e => setFindings(e.target.value)} />
              </Field>
              <Field label="Discussion">
                <textarea rows={3} style={{ ...inp, resize: 'vertical' }}
                  placeholder="Summary of discussion held..."
                  value={discussion} onChange={e => setDiscussion(e.target.value)} />
              </Field>
            </div>

            <div style={grid3}>
              <Field label="Status">
                <select style={inp} value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="">Select status...</option>
                  <option>Ongoing</option>
                  <option>Resolved</option>
                  <option>No Further Action Required</option>
                </select>
              </Field>
              <Field label="Target Date">
                <input style={inp} type="date" value={target_date}
                  onChange={e => setTargetDate(e.target.value || null)} />
              </Field>
              <Field label="Follow Up">
                <select style={inp} value={follow_up} onChange={e => setFollowUp(e.target.value)}>
                  <option value="">Select...</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </Field>
            </div>

            <Field label="Follow Up Remarks">
              <textarea rows={2} style={{ ...inp, resize: 'vertical' }}
                placeholder="Notes on follow-up actions taken..."
                value={follow_up_remarks} onChange={e => setFollowUpRemarks(e.target.value)} />
            </Field>

            <Field label="Responsible Party">
              <input style={inp} type="text" placeholder="Name of responsible person or team"
                value={responsible_party} onChange={e => setResponsibleParty(e.target.value)} />
            </Field>
          </div>

          {/* ── Form Actions ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <button type="submit" style={{
              backgroundColor: ORANGE, color: 'white', border: 'none',
              borderRadius: '8px', padding: '11px 32px',
              fontWeight: '600', fontSize: '14px', cursor: 'pointer',
            }}>
              Save Changes
            </button>
            <Link to="/safetycardtable" style={{ textDecoration: 'none' }}>
              <button type="button" style={{
                backgroundColor: 'transparent', border: `1.5px solid #D1D5DB`,
                color: '#6B7280', borderRadius: '8px', padding: '11px 24px',
                fontWeight: '600', fontSize: '14px', cursor: 'pointer',
              }}>
                Cancel
              </button>
            </Link>
            {saved && (
              <span style={{ color: GREEN, fontSize: '13px', fontWeight: '600' }}>
                ✓ Saved successfully
              </span>
            )}
          </div>
        </form>

        {/* ── Evidence Photos ── */}
        <div style={card}>
          <p style={sectionHead}>Evidence Photos</p>

          {/* Upload form */}
          <form onSubmit={onAddPhoto}>
            <div style={{ ...grid3, marginBottom: '16px' }}>
              <Field label="Photo Title">
                <input style={inp} type="text" placeholder="e.g. Site observation photo"
                  value={photoTitle} onChange={e => setPhotoTitle(e.target.value)} />
              </Field>
              <Field label="Description">
                <input style={inp} type="text" placeholder="Brief description"
                  value={photoDesc} onChange={e => setPhotoDesc(e.target.value)} />
              </Field>
              <Field label="File">
                <input style={{ ...inp, padding: '8px 12px' }} type="file"
                  onChange={e => setPhotoFile(e.target.files[0])} />
              </Field>
            </div>
            <button type="submit" style={{
              backgroundColor: NAVY, color: 'white', border: 'none',
              borderRadius: '8px', padding: '9px 24px',
              fontWeight: '600', fontSize: '13px', cursor: 'pointer',
            }}>
              Upload Photo
            </button>
          </form>

          {/* Photo grid */}
          {cardPhotos.length === 0 ? (
            <p style={{ color: '#9CA3AF', textAlign: 'center', padding: '32px 0', margin: '24px 0 0', borderTop: '1px solid #F3F4F6' }}>
              No photos uploaded yet.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #F3F4F6' }}>
              {cardPhotos.map(p => (
                <div key={p.id} style={{ backgroundColor: '#F8F9FA', borderRadius: '10px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                  {p.incident_photo ? (
                    <a href={p.incident_photo} target="_blank" rel="noreferrer">
                      <img src={p.incident_photo} alt={p.title}
                        style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} />
                    </a>
                  ) : (
                    <div style={{ width: '100%', height: '140px', backgroundColor: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#9CA3AF', fontSize: '13px' }}>No image</span>
                    </div>
                  )}
                  <div style={{ padding: '12px' }}>
                    <p style={{ margin: '0 0 4px', fontWeight: '600', fontSize: '13px', color: NAVY }}>{p.title || '—'}</p>
                    <p style={{ margin: '0 0 10px', fontSize: '12px', color: '#6B7280' }}>{p.description || '—'}</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link to={`/incidenteventphotosedit/${p.id}`} style={{
                        fontSize: '12px', fontWeight: '600', color: NAVY,
                        textDecoration: 'none', padding: '4px 10px',
                        border: `1px solid ${NAVY}`, borderRadius: '4px',
                      }}>
                        Edit
                      </Link>
                      <button onClick={() => onDeletePhoto(p.id)} style={{
                        fontSize: '12px', fontWeight: '600', color: '#DC2626',
                        background: 'none', border: '1px solid #DC2626',
                        borderRadius: '4px', padding: '4px 10px', cursor: 'pointer',
                      }}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
