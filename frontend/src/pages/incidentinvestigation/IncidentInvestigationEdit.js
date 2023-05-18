import React , {useEffect , useState} from 'react'
import IncidentInvestigationAPI from '../../API/IncidentInvestigationAPI'
import IncidentFactorsAPI from '../../API/IncidentFactorsAPI';
import StaffAPI from '../../API/StaffAPI';
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import Incidentfactorsadd from './incidentfactors/Incidentfactorsadd';


function IncidentInvestigationEdit() {
  const [incidentinvestigations , setIncidentInvestigations] = useState([])
  const [incidentfactors , setIncidentFactors] = useState([])
  const [staffs , setStaffs] = useState([])
  const params = useParams()
  const [investigator , setInvestigator] = useState('')
  const [date_of_incident , setDateOfIncident] = useState('')
  const [location_of_incident , setLocationOfIncident] = useState('')
  const [task_performed, setTaskPerformed] = useState('')
  const [what_happened, setWhatHappened] = useState('')
  const [team_member_one, setTeamMemberOne] = useState('')
  const [team_member_two, setTeamMemberTwo] = useState('')
  const [team_member_three, setTeamMemberThree] = useState('')
  const [team_member_four, setTeamMemberFour] = useState('')
  const [summary_of_remedial_action , setSummaryOfRemedialAction] = useState('')
  const [summary_of_incident_investigation , setSummaryOfIncidentInvestigation] = useState('')
  const[id , setId] = useState(null)

  useEffect(() => {
    fetchIncidentInvestigation()
    setId(params.id)
  },[params.id]) 

  useEffect(() => {
    fetchStaff()
    fetchIncidentFactor()
  },[])

  const fetchIncidentInvestigation = () => {
    axios.get(`http://127.0.0.1:8000/hseapp/incidentinvestigation/${params.id}/`)
    .then((res) => {
      setIncidentInvestigations(res.data)
      setInvestigator(res.data.investigator)
      setDateOfIncident(res.data.date_of_incident)
      setLocationOfIncident(res.data.location_of_incident)
      setTaskPerformed(res.data.task_performed)
      setWhatHappened(res.data.what_happened)
      setTeamMemberOne(res.data.team_member_one)
      setTeamMemberTwo(res.data.team_member_two)
      setTeamMemberThree(res.data.team_member_three)
      setTeamMemberFour(res.data.team_member_four)
      setSummaryOfRemedialAction(res.data.summary_of_remedial_action)
      setSummaryOfIncidentInvestigation(res.data.summary_of_incident_investigation)
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

  const fetchIncidentFactor = () => {
    IncidentFactorsAPI.get('/')
    .then((res) => {
        setIncidentFactors(res.data)
    })
    .catch(console.log)
  }

  const onSubmit = (e) => {
        e.preventDefault();
        let item = {investigator , date_of_incident , location_of_incident , task_performed, what_happened, team_member_one, team_member_two, team_member_three , team_member_four, summary_of_remedial_action, summary_of_incident_investigation}
        IncidentInvestigationAPI.post('/', item).then(() => fetchIncidentInvestigation());
    }

  const onUpdate = (id) => {
        let item = {investigator , date_of_incident , location_of_incident , task_performed, what_happened, team_member_one, team_member_two, team_member_three , team_member_four, summary_of_remedial_action, summary_of_incident_investigation}
        IncidentInvestigationAPI.patch(`/${id}/`, item).then(() => { 
          setInvestigator('')
          setDateOfIncident('')
          setLocationOfIncident('')
          setTaskPerformed('')
          setWhatHappened('')
          setTeamMemberOne('')
          setTeamMemberTwo('')
          setTeamMemberThree('')
          setTeamMemberFour('')
          setSummaryOfRemedialAction('')
          setSummaryOfIncidentInvestigation('')
          fetchIncidentInvestigation()
        }
      )
    }

    const onDelete = (id) => {
      IncidentFactorsAPI.delete(`/${id}/`).then((res) => {
       fetchIncidentFactor();
       }).catch(console.log)
   }

  return (
    <div className="container mt-5">
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="float-left">Create a New Incident Investigation</h3>
              
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

                <Incidentfactorsadd incidentinvestigation = {params.id}/>

                




                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Summary of Remedial Action</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Summary of Remedial Action"
                    value={summary_of_remedial_action}
                    onChange={(e) => setSummaryOfRemedialAction(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Summary of Incident Investigation</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Summary of Incident Investigation"
                    value={summary_of_incident_investigation}
                    onChange={(e) => setSummaryOfIncidentInvestigation(e.target.value)}
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
                
{/*                 
                <div className="mt-3 float-right">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={onSubmit}
                    className="mx-2"
                  >
                    Save
                  </Button>
                </div> */}
                <div className="mt-3 float-right">
                <Link to="/incidentinvestigationlist/">
                  <Button
                    variant="success"
                    type="button"
                    onClick={(e) => onUpdate(id)}
                    className="mx-2"
                  >
                    Update
                  </Button>
                </Link>
                
              </div>
              </Form>    
              
            </div>            
          </div>
          <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>

                      <th scope="col" className="col-1">ID</th>
                      <th scope="col" className="col-2">Factor</th>
                      <th scope="col" className="col-2">Type </th>
                      <th scope="col" className="col-3">Action Taken</th> 
                      <th scope="col" className="col-2">Who fix</th> 
                      <th scope="col" className="col-1">When fix</th> 
                      <th scope="col" className="col-1">Complete By</th> 
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {siteHazards.map((siteHazard, index) => { */}

                    {incidentfactors.filter ((incidentfactor) => incidentfactor.incidentinvestigation === Number(params.id))
                    .map((incidentfactor) => {
                      return (
                        <tr key={incidentfactor.id}>
                          
                      
                          <td>{incidentfactor.id}</td>
                          <td>{incidentfactor.factor}</td>
                          <td>{incidentfactor.type_of_factor}</td>
                          <td>{incidentfactor.action_taken}</td>
                          <td>{incidentfactor.who_will_fix}</td>
                          <td>{incidentfactor.when_will_fix}</td>
                          <td>{incidentfactor.planned_completion_date}</td>
                          {/* <td>{incidentfactor.factor}</td> */}
                         
                          <td>
                              {/* <Link to={`/sitehazardedit/${incidentfactor.id}`}><FontAwesomeIcon icon={faPen } /></Link>   */}
                              {/* <Button onClick= {toogleShown}>Edit</Button>                                           */}
                          </td>
                          <td className="delete" onClick={() => onDelete(incidentfactor.id)}>
                            <FontAwesomeIcon icon={faTrash } />
                          </td>
                    
                        </tr>
                      );
                    })}
                    
                  </tbody>
                </Table> 
        </div>
  )
}

export default IncidentInvestigationEdit
