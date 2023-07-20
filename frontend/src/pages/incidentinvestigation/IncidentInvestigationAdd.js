import React ,{useState , useEffect} from 'react'
import IncidentInvestigationAPI from '../../API/IncidentInvestigationAPI'
import StaffAPI from '../../API/StaffAPI';
import axios from 'axios'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link , useNavigate } from 'react-router-dom';

function IncidentInvestigationAdd() {
    const [incidentinvestigations , setIncidentInvestigations] = useState([])
    const [staffs , setStaffs] = useState([])
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
    const navigate = useNavigate()

    useEffect(() => {
        fetchIncidentInvestigation()
        fetchStaff()
    },[]) 

    const fetchIncidentInvestigation = () => {
        IncidentInvestigationAPI.get('/')
        .then((res) => {
            setIncidentInvestigations(res.data)
        })
        .catch(console.log)
    }

    const fetchStaff =() => {
      StaffAPI.get('/')
      .then((res) => {
          setStaffs(res.data)
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
    <div className="container mt-3 pb-5">
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="float-left mt-3">Create a New Incident Investigation</h3>
              
              <Form onSubmit={onSubmit} className="mt-4">
              <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Investigator</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Investigator"
                    value={investigator}
                    onChange={(e) => setInvestigator(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name} ({staff.position})</option>
                })}

                  </Form.Control>
                </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Team Member One</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Team Member One"
                    value={team_member_one}
                    onChange={(e) => setTeamMemberOne(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name} ({staff.position})</option>
                })}

                  </Form.Control>
                </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Team Member Two</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Team Member Two"
                    value={team_member_two}
                    onChange={(e) => setTeamMemberTwo(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name} ({staff.position})</option>
                })}

                  </Form.Control>
                </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Team Member Three</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Team Member Three"
                    value={team_member_three}
                    onChange={(e) => setTeamMemberThree(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name} ({staff.position})</option>
                })}

                  </Form.Control>
                </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Team Member Four</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Team Member Four"
                    value={team_member_four}
                    onChange={(e) => setTeamMemberFour(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name} ({staff.position})</option>
                })}

                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Location of Incident</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Location of Incident"
                    value={location_of_incident}
                    onChange={(e) => setLocationOfIncident(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Task Performed</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Task Performed"
                    value={task_performed}
                    onChange={(e) => setTaskPerformed(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>What Happened</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="What Happened"
                    value={what_happened}
                    onChange={(e) => setWhatHappened(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Date of Incident</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date of Incident"
                    value={date_of_incident}
                    onChange={(e) => setDateOfIncident(e.target.value)}
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Training Expiry</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Training Expiry"
                    value={training_expiry}
                    onChange={(e) => setTrainingExpiry(e.target.value)}
                  />
                </Form.Group> */}
                
                
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
