import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import SafetyCardAPI from '../../API/SafetyCardAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'

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

export default function AddIncidents() {
  const { authTokens, user } = useContext(AuthContext)
  const navigate = useNavigate()

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

  useEffect(() => {
    StaffAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setStaffs(res.data)).catch(console.log)
  }, [])

  // Auto-select the logged-in user's staff record once staffs are loaded
  useEffect(() => {
    if (staffs.length === 0 || raised_by) return
    const uname = (user?.username || '').toLowerCase().replace(/\s/g, '')
    const match = staffs.find(s => {
      const sname = (s.name || '').toLowerCase().replace(/\s/g, '')
      return sname === uname || sname.startsWith(uname) || uname.startsWith(sname)
    })
    if (match) setRaisedBy(String(match.id))
  }, [staffs])

  const onSubmit = (e) => {
    e.preventDefault()
    const item = {
      short_desc,
      raised_by: raised_by || null,
      date_raised: date_raised || null,
      findings,
      what_happened,
      why_happened,
      life_saving_rule,
      incident_date: incident_date || null,
      location,
      discussion,
      target_date: target_date || null,
      follow_up,
      follow_up_remarks,
      status,
      responsible_party,
    }
    SafetyCardAPI.post('/', item, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => navigate('/incidenttable')).catch(console.log)
  }

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto' }}>

      {/* Back + Header */}
      <div style={{ marginBottom: '32px' }}>
        <Link to="/incidenttable" style={{ color: '#888', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Safety Cards
        </Link>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>New Safety Card</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Record a safety observation, near miss, or unsafe act.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onSubmit}>
          <div className="row">

            {/* Left column */}
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Short Description</Form.Label>
                <Form.Control
                  as="textarea" rows={3}
                  placeholder="Brief description of what was observed..."
                  value={short_desc}
                  onChange={e => setShortDesc(e.target.value)}
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
                    <Form.Control
                      type="date" value={date_raised}
                      onChange={e => setDateRaised(e.target.value || null)}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label style={L}>Incident Date</Form.Label>
                    <Form.Control
                      type="date" value={incident_date}
                      onChange={e => setIncidentDate(e.target.value || null)}
                    />
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label style={L}>
                  Raised By
                  {raised_by && staffs.find(s => String(s.id) === String(raised_by)) && (
                    <span style={{ fontWeight: '400', color: '#10B981', fontSize: '12px', marginLeft: '8px' }}>
                      ✓ auto-filled
                    </span>
                  )}
                </Form.Label>
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
                    <Form.Control
                      type="date" value={target_date}
                      onChange={e => setTargetDate(e.target.value || null)}
                    />
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
              Save Safety Card
            </Button>
            <Link to="/incidenttable">
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
