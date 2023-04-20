import {useState , useEffect} from 'react'
import IncidentAPI from '../../API/IncidentAPI'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';

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
    const [id , setId] = useState(null)
    const [incidents , setIncidents] = useState([])
    const [staffs , setStaffs] = useState([])
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
        let item = {short_desc, raised_by , date_raised  ,findings ,what_happened , why_happened, life_saving_rule, incident_date, location, discussion, target_date, follow_up, follow_up_remarks, status, responsible_party}
        navigate("/incidenttable");
        IncidentAPI.post('/' , item).then(() => incidentData())
    }
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
                  onChange={(e) => setDateRaised(e.target.value)}
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
                   onChange={(e) => setIncidentDate(e.target.value)}
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
                   onChange={(e) => setTargetDate(e.target.value)}
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

