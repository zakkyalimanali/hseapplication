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
import IncidentPhotosAdd from './incidentphotos/IncidentPhotosAdd'
// Others 
import { useNavigate } from 'react-router'
import IncidentPhotosAPI from '../../API/IncidentPhotosAPI';


function IncidentInvestigationEdit() {
  const [incidentinvestigations , setIncidentInvestigations] = useState([])
  const [incidentfactors , setIncidentFactors] = useState([])
  const [incidentphotos , setIncidentPhotos] = useState([])
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
  const navigate = useNavigate()
  const[id , setId] = useState(null)

  useEffect(() => {
    fetchIncidentInvestigation()
    setId(params.id)
  },[params.id]) 

  useEffect(() => {
    fetchStaff()
    fetchIncidentFactor()
    fetchIncidentPhoto()
  },[])

  const fetchIncidentPhoto = () => {
    IncidentPhotosAPI.get('/')
    .then((res) => {
      setIncidentPhotos(res.data)
    })
    .catch(console.log)
  }

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
   
   const onDeleteIncidentPhotos = (id) => {
    IncidentPhotosAPI.delete(`/${id}/`).then((res) => {
     fetchIncidentPhoto();
     }).catch(console.log)
 }

   const returnToPreviousIncidentInvestigationListPage = () => {
    navigate(-1)
  }
  

  return (
    <div className="container mt-5">
      <h3 className="float-left">Create a New Incident Investigation</h3>
        <Form onSubmit={onSubmit} className="mt-4">
      <div className="row">
      <div className='col-md-6'>
        <div className="row">
          <div className="col-md-10 ">
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
          </div>
        </div>
        </div>
        <div class="col">
        <div className="row">
          <div className="col-md-10 ">
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

          </div>
        </div>
        </div>
        

      </div>

      {/* <div className="col-md-12">
      
      </div> */}
      <div className="col-md-12">
        <div className="row">

      <IncidentPhotosAdd  incidentinvestigation = {params.id}/>  

      <h3 className="float-left">Incident Photos</h3>

      <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th scope="col" className="col-1">ID</th>
                        <th scope="col" className="col-1">Title</th>
                        <th scope="col" className="col-1">Description</th>
                        <th scope="col" className="col-3">Image</th>
                        <th scope="col" className="col-1">Edit</th>
                        <th scope="col" className="col-1">Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {incidentphotos.filter ((incidentphoto) => incidentphoto.incidentinvestigation === Number(params.id))
                      .map((incidentphoto) => {  
                        return (
                            <tr key={incidentphoto.id}>
                                <td>{incidentphoto.id}</td>
                                <td>{incidentphoto.title}</td>
                                <td>{incidentphoto.description}</td>
                                {/* <td>{hsemanagement.context}</td> */}
                                <td><a href={`${incidentphoto.incident_photo}`} download={incidentphoto.incident_photo}><img className="col-12" src={incidentphoto.incident_photo} alt={incidentphoto.incident_photo}/></a> 
                             
                                  {/* <a href={`${incidentphoto.incident_photo}`} download={incidentphoto.incident_photo}>Download</a> */}
                                </td>
                                <td><Link to={`/incidentphotosedit/${incidentphoto.id}`}><FontAwesomeIcon icon={faPen } /></Link></td>

                                <td className='delete' onClick={() => onDeleteIncidentPhotos(incidentphoto.id)}><FontAwesomeIcon icon={faTrash } /></td>
                            </tr>
                        )
                    })}
                </tbody>
        </Table>  

      <Incidentfactorsadd incidentinvestigation = {params.id}/>   

      <h3 className="float-left">Incident Factors</h3>
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
                    {/* This is the get the invidual incident factors for that incident , this works by filtering the by the id of the incidentinvestigation*/}
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
                              <Link to={`/incidentfactorsedit/${incidentfactor.id}`}><FontAwesomeIcon icon={faPen } /></Link>  
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



      <Form.Group className="mb-3 mt-3" controlId="formName">
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
      </div>
      </div>
    
      <div className="col mt-3 mb-3">
                {/* <Link to="/incidentinvestigationlist/"> */}
                  <Button
                    variant="warning"
                    type="button"
                    onClick={(e) => onUpdate(id)}
                    className="mx-2 mb-3"
                  >
                    Update
                  </Button>
                  <Button
                  variant="success"
                  type="button"       
                  className="mx-2 mb-3"
                  onClick={(e) => returnToPreviousIncidentInvestigationListPage()}
                >
                  Go Back
                </Button>
                {/* </Link> */}
                
              </div>
        </Form>
          {/* <div className="row">
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
          </div> */}
          {/* <Table striped bordered hover className='mt-3'>
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
       
                         
                          <td>
                              <Link to={`/incidentfactorsedit/${incidentfactor.id}`}><FontAwesomeIcon icon={faPen } /></Link>  
               
                          </td>
                          <td className="delete" onClick={() => onDelete(incidentfactor.id)}>
                            <FontAwesomeIcon icon={faTrash } />
                          </td>
                    
                        </tr>
                      );
                    })}
                    
                  </tbody>
                </Table>  */}
        </div>
  )
}

export default IncidentInvestigationEdit
