import React ,{useState , useEffect} from 'react'
import IncidentInvestigationAPI from '../../API/IncidentInvestigationAPI'
import axios from 'axios'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link , useNavigate } from 'react-router-dom';

function IncidentInvestigationAdd() {
    const [incidentinvestigations , setIncidentInvestigations] = useState([])
    const [investigator , setInvestigator] = useState('')
    const [date_of_incident , setDateOfIncident] = useState('')
    const [location_of_incident , setLocationOfIncident] = useState('')
    const [task_performed, setTaskPerformed] = useState('')
    const [what_happened, setWhatHappened] = useState('')
    const [team_member_one, setTeamMemberOne] = useState('')
    const [team_member_two, setTeamMemberTwo] = useState('')
    const [team_member_three, setTeamMemberThree] = useState('')
    const [team_member_four, setTeamMemberFour] = useState('')
    const[id , setId] = useState(null)

    useEffect(() => {
        fetchIncidentInvestigation()
    },[]) 

    const fetchIncidentInvestigation = () => {
        IncidentInvestigationAPI.get('/')
        .then((res) => {
            setIncidentInvestigations(res.data)
        })
        .catch(console.log)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let item = {investigator , date_of_incident , location_of_incident , task_performed , what_happened, team_member_one, team_member_two, team_member_three , team_member_four }
        navigate("/incidentinvestigationlist");
        IncidentInvestigationAPI.post('/', item).then(() => fetchIncidentInvestigation());
    }

  return (
    <div className="container mt-5">
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="float-left">Create a New Incident Investigation</h3>
              
              <Form onSubmit={onSubmit} className="mt-4">
              <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Staff Name</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Staff Name"
                    value={staff_name}
                    onChange={(e) => setStaffName(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name} ({staff.position})</option>
                })}

                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Training</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Training"
                    value={training}
                    onChange={(e) => setTraining(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Training Provider</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Training Provider"
                    value={training_provider}
                    onChange={(e) => setTrainingProvider(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Training Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Training Date"
                    value={training_date}
                    onChange={(e) => setTrainingDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Training Expiry</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Training Expiry"
                    value={training_expiry}
                    onChange={(e) => setTrainingExpiry(e.target.value)}
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
                </div>
              </Form>    
            </div>            
          </div>
        </div>
  )
}

export default IncidentInvestigationAdd
