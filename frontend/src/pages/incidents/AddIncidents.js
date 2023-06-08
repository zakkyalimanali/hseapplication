import {useState , useEffect, useContext} from 'react'
import IncidentAPI from '../../API/IncidentAPI'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";

export default function AddIncidents() {
    // const [id , setId] = useState(null)
    // const [short_desc , setShortDesc] = useState('') 
    // const [raised_by, setRaisedBy] = useState('')
    // const [incidents , setIncidents] = useState([])
    // const [staffs , setStaffs] = useState([]) 

    const [short_desc , setShortDesc] = useState('')
    const [what_happened , setWhatHappened] = useState('')
    const [why_happened , setWhyHappened] = useState('')
    const [date_raised , setDateRaised] = useState('')
    const [raised_by , setRaisedBy] = useState('')
    const [life_saving_rule , setLifeSavingRule] = useState('')
    const [findings , setFindings] = useState('')
    const [incident_date , setIncidentDate] = useState('')
    const [location , setLocation] = useState('')
    const [discussion, setDiscussion] = useState('')
    const [target_date  , setTargetDate] = useState('')
    const [follow_up , setFollowUp] = useState('')
    const [follow_up_remarks , setFollowUpRemarks] = useState('')
    const [status , setStatus] = useState('')
    const [responsible_party , setResponsibleParty] = useState('')
    const [photo_image , setPhotoImage] = useState(null)
    const [id , setId] = useState(null)
    const [incidents , setIncidents] = useState([])
    const [staffs , setStaffs] = useState([])
    const {authTokens} = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
        incidentData()
        staffData()
    },[])
    
    const incidentData = () => {
        IncidentAPI.get('/')
        .then((res) => {
            setIncidents(res.data);
        }).catch(console.log)
    }

    const staffData = () => {
        axios.get('http://127.0.0.1:8000/hseapp/staff/')
        .then((res) => {
            setStaffs(res.data);
        }).catch(console.log)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let item = {short_desc, raised_by , date_raised: date_raised || null  ,findings ,what_happened , why_happened, life_saving_rule, incident_date: incident_date || null, location, discussion, target_date: target_date || null, follow_up, follow_up_remarks, status, responsible_party, photo_image}
        navigate("/incidenttable");
      let token = authTokens.access
      IncidentAPI.post('/' , item,  {
                headers: {
                  'content-type': 'multipart/form-data',
                  'Authorization': `Bearer ${token}`
                },
                responseType: 'blob'
              })
              .then(() => incidentData())  
              
              console.log(authTokens)

    // const onSubmit = (e) => {
    //   e.preventDefault();
    //   let form_data = new FormData();
    //   form_data.append('short_desc', short_desc);
    //   form_data.append('raised_by', date_raised|| null);
    //   form_data.append('findings', findings);
    //   form_data.append('what_happened', what_happened);
    //   form_data.append('why_happened', why_happened);
    //   form_data.append('life_saving_rule', life_saving_rule);
    //   form_data.append('incident_date', incident_date || null);
    //   form_data.append('location', location);
    //   form_data.append('discussion', discussion);
    //   form_data.append('target_date', target_date || null);
    //   form_data.append('follow_up', follow_up);
    //   form_data.append('follow_up_remarks', follow_up_remarks);
    //   form_data.append('status', status);
    //   form_data.append('responsible_party', responsible_party);
    //   form_data.append('photo_image', photo_image);
    //   let url = 'http://127.0.0.1:8000/hseapp/incident/';
    //   let token = authTokens.access
    //   axios.post(url, form_data, {
    //     headers: {
    //       'content-type': 'multipart/form-data',
    //       'Authorization': `Bearer ${token}`
    //     },
    //     responseType: 'blob'
    //   })
    //     .then(res => {
    //       console.log(res.data);
    //     })
    //     .catch(err => console.log(err.response));
    //     navigate("/incidenttable");
    //   axios.post(url, form_data, {
    //     headers: {
    //          'content-type': 'multipart/form-data',
    //          'Authorization': `Bearer ${token}`
    //     },
    //     responseType: 'blob'
    //   })
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => console.log(err.response));
    //   navigate("/incidenttable");
    };
  
    // console.log(authTokens)

    const handleImageChange = (e) => {
      setPhotoImage(e.target.files[0]);
    };
  
  


    const onDelete = (id) => {
      IncidentAPI.delete(`/${id}/`).then((res) => incidentData())
    }

    return(

    <div className="container mt-5">
        <div className="row">
          <div className= "col-md-2"></div>
            <div className="col-md-8 ">
                <h3 className="float-left">Create a new Incident</h3>
            
            <Form onSubmit={onSubmit} className="update mt-4">
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Write a short Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Name"
                  value={short_desc}
                  onChange={(e) => setShortDesc(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPosition">
                 <Form.Label>What Happened</Form.Label>
                <Form.Control
                  as="select"
                  value={what_happened}
                   onChange={(e) => setWhatHappened(e.target.value)}
                 >
                   <option value=''>------</option>
                   <option value='(A) Head Protection not worn'>(A) Head Protection not worn</option>
                   <option value='(B) Eye protection not worn'>(B) Eye protection not worn</option>
                   <option value='(C) Face protection not worn'>(C) Face protection not worn</option>
                   <option value='(D) Ear protection not worn'>(D) Ear protection not worn</option>
                   <option value='(E) Protective clothing not worn'>(E) Protective clothing not worn</option>
                   <option value='(F) Leg/Feet protection not worn'>(F) Leg/Feet protection not worn</option>
                   <option value='(G) Hand protection not worn'>(G) Hand protection not worn</option>
                   <option value='(H) PPE in bad condition'>(H) PPE in bad condition</option>
                   <option value='(I) Wrong PPE for the job'>(I) Wrong PPE for the job</option>
                   <option value='(J) Substandard PPE'>(J) Substandard PPE</option>
                   <option value='(K) PPE not worn properly'>(K) PPE not worn properly</option>
                   <option value='(L) Respiration protection not worn'>(L) Respiration protection not worn</option>
                   <option value='(M) Body Protection not worn'>(M) Body Protection not worn</option>
                   <option value='(N) Wrong tool for the job'>(N) Wrong tool for the job</option>
                   <option value='(O) Tools in bad condition'>(O) Tools in bad condition</option>
                   <option value='(P) Tools not inpected'>(P) Tools not inpected</option>
                   <option value='(Q) Misuse'>(Q) Misuse</option>
                   <option value='(R) Uncertified tools'>(R) Uncertified tools</option>
                   <option value='(S) Too heaving for manual lifting'>(S) Too heaving for manual lifting</option>
                   <option value='(T) Wrong mechanical manual lifting'>(T) Wrong mechanical manual lifting</option>
                   <option value='(U) Lifting tool not inspected'>(U) Lifting tool not inspected</option>
                   <option value='(V) Chemical not properly handled'>(V) Chemical not properly handled</option>
                   <option value='(W) Waste not properly disposed'>(W) Waste not properly disposed</option>
                   <option value='(X) In danger of struck'>(X) In danger of struck</option>
                   <option value='(Y) In danger of striking against'>(Y) In danger of striking against</option>
                   <option value='(Z) In danger of caught by'>(Z) In danger of caught by</option>
                   <option value='(AA) In danger of fall/slip/trip'>(AA) In danger of fall/slip/trip</option>
                   <option value='(BB) In danger of electrocution'>(BB) In danger of electrocution</option>
                   <option value='(CC) In danger of burnt'>(CC) In danger of burnt</option>
                   <option value='(DD) Access obstructed'>(DD) Access obstructed</option>
                   <option value='(EE) Tools/materials disorganized'>(EE) Tools/materials disorganized</option>
                   <option value='(FF) Poor/Improper roping of'>(FF) Poor/Improper roping of</option>
                   <option value='(GG) Accumulation of rubbish'>(GG) Accumulation of rubbish</option>
                   <option value='(HH) Water is being polluted'>(HH) Water is being polluted</option>
                   <option value='(II) Air being polluted'>(II) Air being polluted</option>
                   <option value='(JJ) Too much noise'>(JJ) Too much noise</option>
                   <option value='(KK) Soil being polluted'>(KK) Soil being polluted</option>
                   <option value='(LL) Poor illumination'>(LL) Poor illumination</option>
                   <option value='(MM) Work without permission'>(MM) Work without permission</option>
                   <option value='(NN) Wrong permit'>(NN) Wrong permit</option>
                   <option value='(OO) Procedures / Standard not followed'>(OO) Procedures / Standard not followed</option>
                   <option value='(PP) Wrong instruction on permit'>(PP) Wrong instruction on permit</option>
                   <option value='(QQ) Permit procedure not follow'>(QQ) Permit procedure not follow</option>
                   <option value='(RR) Inadequate HIP'>(RR) Inadequate HIP</option>
                   <option value='(SS) Toolbox talk not given'>(SS) Toolbox talk not given</option>
                   <option value='(TT) Driving recklessly'>(TT) Driving recklessly</option>
                   <option value='(UU) Not wearing seat belt'>(UU) Not wearing seat belt</option>
                   <option value='(VV) Road traffic violation '>(VV) Road traffic violation - eg. Speeding, no entry & ect</option>
                   <option value='(WW) Vehicles / Transportation abuse'>(WW) Vehicles / Transportation abuse</option>
                   <option value='(XX) Not inspected for compliance'>(XX) Not inspected for compliance</option>
                   <option value='(YY) Vehicle defects'>(YY) Vehicle defects</option>
                   <option value='(ZZ) Compliance'>(ZZ) Compliance</option>
                   <option value='(AAA) Behavior & Attitude'>(AAA) Behavior & Attitude</option>
                 </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Why it happened</Form.Label>
                 <Form.Control
                  as="select"
                  placeholder="Why it happened"
                  value={why_happened}
                 onChange={(e) => setWhyHappened(e.target.value)}
              >
                  <option value=''>------</option>
                  <option value='(1) Not Informed'>(1) Not Informed</option>
                  <option value='(2) Languague Problem'>(2) Languague Problem</option>
                  <option value='(3) Not reasing permit'>(3) Not reasing permit</option>
                  <option value='(4) Wrong interpretation of risk'>(4) Wrong interpretation of risk</option>
                  <option value='(5) Wrong instruction'>(5) Wrong instruction</option>
                  <option value='(6) No procedure'>(6) No procedure</option>
                  <option value='(7) Lack of HSE Coaching / training'>(7) Lack of HSE Coaching / training</option>
                  <option value='(8) Behavior & Attitude (intentionally)'>(8) Behavior & Attitude (intentionally)</option>
                  <option value='(9) Negligence'>(9) Negligence</option>
                  <option value='(10) Working condition'>(10) Working condition</option>
                  <option value='(11) Working layout'>(11) Working layout</option>
                  <option value='(12) The design of equipment / tools'>(12) The design of equipment / tools</option>
                  <option value='(13) Work habits'>(13) Work habits</option>
                  <option value='(14) Lack of skill'>(14) Lack of skill</option>
                  <option value='(15) Time pressure'>(15) Time pressure</option>
                  <option value='(16) Not requested'>(16) Not requested</option>
                  <option value='(17) Physical limitations'>(17) Physical limitations</option>
                  <option value='(18) Not supplied/available'>(18) Not supplied/available</option>
                  <option value='(19) Lack of ownership'>(19) Lack of ownership</option>
                  <option value='(20) Behavior & Attitude (not intentionally)'>(20) Behavior & Attitude (not intentionally)</option>
                </Form.Control>

              </Form.Group>


              {/* <Form.Group className="mb-3" controlId="formPosition">
                <Form.Label>What Happened</Form.Label>
                <Form.Control
                  as="select"
                  value={what_happened}
                  onChange={(e) => setWhatHappened(e.target.value)}
                >
                  <option value={''}>------</option>
                  <option value={'(A) Head Protection not worn'}>(A) Head Protection not worn</option>
                  <option value={'(B) Eye protection not worn'}>(B) Eye protection not worn</option>
                </Form.Control>
              </Form.Group> */}

              <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                <Form.Label>Date it happend</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Staff Id Number"
                  value={date_raised}
                  // onChange={(e) => setDateRaised(e.target.value)}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    const formattedDate = selectedDate !== "" ? selectedDate : null;
                    setDateRaised(formattedDate);
                  }}
                />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formStaffName">
                <Form.Label>Raised by: </Form.Label>
                <Form.Control
                  as ="select"
                  // placeholder="Enter Staff Name"
                  value={raised_by}
                  onChange={(e) => setRaisedBy(e.target.value)}
                >
                <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name}</option>
                })}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Life Saving Rule</Form.Label>
                 <Form.Control
                   as="select"
                   placeholder="Life Saving Rule"
                   value={life_saving_rule}
                   onChange={(e) => setLifeSavingRule(e.target.value)}
                 >
                   <option value=''>------</option>
                   <option value='(1) Work with a valid work permit when required'>(1) Work with a valid work permit when required</option>
                   <option value='(2) Conduct gas test when required'>(2) Conduct gas test when required</option>
                   <option value='(3) Verify isolation before work begins and use the specific life protecting equipment'>(3) Verify isolation before work begins and use the specific life protecting equipment</option>
                   <option value='(4) Obtain authorization before entering a confined space'>(4) Obtain authorization before entering a confined space</option>
                   <option value='(5) Obatin authorization before overriding or disabiling safety critical equipment'>(5) Obatin authorization before overriding or disabiling safety critical equipment</option>
                   <option value='(6) Protect yourself against a fall when working at height'>(6) Protect yourself against a fall when working at height</option>
                   <option value='(7) Do not walk under a suspended load'>(7) Do not walk under a suspended load</option>
                   <option value='(8) Do not smoke outside designated smoking area'>(8) Do not smoke outside designated smoking area</option>
                   <option value='(9) No alcohol or drugs while working or driving'>(9) No alcohol or drugs while working or driving</option>
                   <option value='(10) While driving , do not use your phone and do not exceed limit'>(10) While driving , do not use your phone and do not exceed limit</option>
                   <option value='(11) Wear your seat belts'>(11) Wear your seat belts</option>
                   <option value='(12) Follow prescribed Journey Management Plan'>(12) Follow prescribed Journey Management Plan</option>
                 </Form.Control>
               </Form.Group>
               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                <Form.Label>Findings</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Findings"
                  value={findings}
                  onChange={(e) => setFindings(e.target.value)}
                >
                  
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Incident Date</Form.Label>
                 <Form.Control
                   type="date"
                   placeholder="Incident Date"
                   value={incident_date}
                  //  onChange={(e) => setIncidentDate(e.target.value)}
                   onChange={(e) => {
                    const selectedDate = e.target.value;
                    const formattedDate = selectedDate !== "" ? selectedDate : null;
                    setIncidentDate(formattedDate);
                  }}
                 />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Location</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="Location"
                   value={location}
                   onChange={(e) => setLocation(e.target.value)}
                 />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Discussion</Form.Label>
                 <Form.Control
                   as="textarea"
                   rows={3}
                   placeholder="Discussion"
                   value={discussion}
                   onChange={(e) => setDiscussion(e.target.value)}
                 />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Target Date</Form.Label>
                 <Form.Control
                   type="date"
                   placeholder="Target Date"
                   value={target_date}
                  //  onChange={(e) => setTargetDate(e.target.value)}
                   onChange={(e) => {
                    const selectedDate = e.target.value;
                    const formattedDate = selectedDate !== "" ? selectedDate : null;
                    setTargetDate(formattedDate);
                  }}
                 />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Follow Up</Form.Label>
                 <Form.Control
                   as="select"
                   placeholder="Follow Up"
                   value={follow_up}
                   onChange={(e) => setFollowUp(e.target.value)}
                 >
                   <option value=''>------</option>
                   <option value='Yes'>Yes</option>
                   <option value='No'>No</option>
                 </Form.Control>
               </Form.Group>
               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Follow Up Remarks</Form.Label>
                 <Form.Control
                   as="textarea"
                   rows={3}
                   placeholder="Follow Up Remarks"
                   value={follow_up_remarks}
                   onChange={(e) => setFollowUpRemarks(e.target.value)}
                 />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value=''>------</option>
                    <option value='No Further Action Required'>No Further Action Required</option>
                    <option value='Resolved'>Resolved</option>
                    <option value='Ongoing'>Ongoing</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Responsible Party</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Responsible Party"
                  value={responsible_party}
                  onChange={(e) => setResponsibleParty(e.target.value)}
                />
              </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Photo Evidence</Form.Label>
                <Form.Control
                  type="file"
                  // placeholder="Enter Responsible Party"
                  onChange={handleImageChange}
                />
              </Form.Group>
{/*               
              <Button
                  variant="primary"
                  type="submit"
                  onClick={onSubmit}
                  className="mx-2"
                >
                  <Link className="white" to="/incidenttable">Save</Link>
                </Button> */}
                {/* <Link  onClick={onSubmit} className="white" to="/incidenttable">Save</Link> */}
                  <Button
                    variant="primary"
                    onClick={onSubmit}>
                      Save
                  </Button>
  
            </Form>

            
            </div>
        </div>
    </div>
    )
}

