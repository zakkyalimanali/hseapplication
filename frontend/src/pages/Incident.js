import {useEffect , useState} from 'react'
import IncidentAPI from '../API/IncidentAPI'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios'
import StaffAPI from '../API/StaffAPI';

export default function Incident() {
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
    const [id , setId] = useState(null)
    const [incidents , setIncidents] = useState([])
    const [staffs , setStaffs] = useState([])
 
    // useEffect(() => {
    //     dataIncident()
    //     fetchStaff()
    // }, [params.incident_id])
    useEffect(() => {
        dataIncident()
        fetchStaff()
    },[])

    // const dataIncident = () => {
    //     IncidentAPI.get(`/${params.incident_id}`)
    //     .then((res) => {
    //         setIncidents(res.data)
    //     })
    //     .catch(console.log)
    // }
    const dataIncident = () => {
        IncidentAPI.get('/')
        .then((res) => {
            setIncidents(res.data)
        })
        .catch(console.log)
    }

    const fetchStaff = () => {
        axios.get('http://127.0.0.1:8000/hseapp/staff/')
        .then((res) => {
            setStaffs(res.data)
        })
        .catch(console.log)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let item = {short_desc, what_happened, why_happened , date_raised , raised_by, life_saving_rule, findings, incident_date, location , discussion , target_date , follow_up,follow_up_remarks, status }
        IncidentAPI.post('/', item).then(() => dataIncident());
    }

    // const onSubmit = (e) => {
    //   e.preventDefault();
    //   let item = {short_desc, what_happened, why_happened , date_raised , raised_by, life_saving_rule, findings, incident_date, location , discussion , target_date , follow_up,follow_up_remarks, status }
    //   IncidentAPI.post('/', item)
    //     .then(() => {
    //       dataIncident();
    //     })
    //     .catch((error) => {
    //       console.error('Error saving incident:', error);
    //     });
    // }

    const onUpdate = (id) => {
        let item = {short_desc, what_happened, why_happened , date_raised , raised_by, life_saving_rule, findings, incident_date, location, discussion, target_date , follow_up, follow_up_remarks, status};
        IncidentAPI.patch(`/${id}/`, item).then((res) => dataIncident())
      }

    const onDelete = (id) => {
        IncidentAPI.delete(`/${id}/`).then((res) => dataIncident())
    }

    function selectIncident(id) {
        let item = incidents.filter((incident) => incident.id === id)[0];
        setShortDesc(item.short_desc)
        setWhatHappened(item.what_happened)
        setWhyHappened(item.why_happened)
        setDateRaised(item.date_raised)
        setRaisedBy(item.raised_by)
        setLifeSavingRule(item.life_saving_rule)
        setFindings(item.findings)
        setIncidentDate(item.incident_date)
        setLocation(item.location)
        setDiscussion(item.discussion)
        setTargetDate(item.target_date)
        setFollowUp(item.follow_up)
        setFollowUpRemarks(item.follow_up_remarks)
        setStatus(item.status)
        setId(item.id)
    }

    return(

    <div className="container mt-5">
        <div className="row">
          <div className= "col-md-4"></div>
            <div className="col-md-4 ">
                <h3 className="float-left">Create a new Incident</h3>
            
            <Form onSubmit={onSubmit} className="mt-4">
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
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
                  <option value={''}>------</option>
                  <option value={'(A) Head Protection not worn'}>(A) Head Protection not worn</option>
                  <option value={'(B) Eye protection not worn'}>(B) Eye protection not worn</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                <Form.Label>Why it happened</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Enter Staff Id Number"
                  value={why_happened}
                  onChange={(e) => setWhyHappened(e.target.value)}
                >
                  <option value={''}>------</option>
                  <option value={'(1) Not Informed'}>(1) Not Informed</option>
                  <option value={'(2) Languague Problem'}>(2) Languague Problem</option>
                </Form.Control>

              </Form.Group>
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
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name}</option>
                })}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                <Form.Label>Life Saving Rule</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Enter Staff Id Number"
                  value={life_saving_rule}
                  onChange={(e) => setLifeSavingRule(e.target.value)}
                >
                  <option value={''}>------</option>
                  <option value={'(1) Work with a valid work permit when required'}>(1) Work with a valid work permit when required</option>
                  <option value={'(2) Conduct gas test when required'}>(2) Conduct gas test when required</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                <Form.Label>Findings</Form.Label>
                <Form.Control
                  type="text"
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
                  type="text"
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
                  <option value={''}>------</option>
                  <option value={'Yes'}>Yes</option>
                  <option value={'No'}>No</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                <Form.Label>Follow Up Remarks</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Follow Up Remarks"
                  value={follow_up_remarks}
                  onChange={(e) => setFollowUpRemarks(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Target Date"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </Form.Group>
  
              <div className="mt-3 float-right">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={onSubmit}
                  className="mx-2"
                >
                  Save
                </Button>
                <Button
                  variant="success"
                  type="button"
                  onClick={(e) => onUpdate(id)}
                  className="mx-2"
                >
                  Update
                </Button>
              </div>
  
            </Form>
            
          </div>
          
          <div>
            <div className="mt-5 col-md-12 m ">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Short Desc</th>
                    <th scope="col">What Happened</th>
                    <th scope="col">Why Happened</th>
                    <th scope="col">Date Raised</th>
                    <th scope="col">Raised By</th>
                    <th scope="col">LSR</th>
                    <th scope="col">Findings</th>
                    <th scope="col">Incident Date</th>
                    <th scope="col">Location</th>
                    <th scope="col">Discussion</th>
                    <th scope="col">Target Date</th>
                    <th scope="col">Follow Up</th>
                    <th scope="col">Follow Up Remarks</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((incident, index) => {
                    return (
                      <tr key={incident.id}>
                        <td>{incident.short_desc}</td>
                        <td>{incident.what_happened}</td>
                        <td>{incident.why_happened}</td>
                        <td>{incident.date_raised}</td>
                        <td>{incident.raised_by}</td>
                        <td>{incident.life_saving_rule}</td>
                        <td>{incident.findings }</td>
                        <td>{incident.incident_date }</td>
                        <td>{incident.location }</td>
                        <td>{incident.discussion }</td>
                        <td>{incident.target_date }</td>
                        <td>{incident.follow_up }</td>
                        <td>{incident.follow_up_remarks }</td>
                        <td>{incident.status }</td>
                        <td>{incident.follow_up }</td>
                        
  
                        <td>
  
                          <i
                            className="fa fa-pencil-square text-primary d-inline"
                            aria-hidden="true"
                            onClick={(e) => {selectIncident(incident.id)}}
                          >Edit</i>
                          <i
                            className="fa fa-trash-o text-danger d-inline mx-3"
                            aria-hidden="true"
                            onClick={() => onDelete(incident.id)}
                          >Delete</i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
  
            </div>
          </div>
        </div>
      </div>
    )
}