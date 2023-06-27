import React , {useEffect , useState} from 'react'
// APIS
import JobSafetyAnalysisAPI from '../../API/JobSafetyAnalysisAPI';
import JobSafetyEquipmentAPI from '../../API/JobSafetyEquipmentAPI';
import JobSafetyStepsAPI from '../../API/JobSafetyStepsAPI';
import JobSafetyHazardsAPI from '../../API/JobSafetyHazardsAPI';
import StaffAPI from '../../API/StaffAPI';

import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import JobSafetyEquipmentAdd from '../jobsafetyanalysis/jobsafetyequipment/JobSafetyEquipmentAdd'

// Others 
import { useNavigate } from 'react-router'
import JobSafetyStepsAdd from './jobsafetysteps/JobSafetyStepsAdd';
import JobSafetyHazardsAdd from './jobsafetyhazards.js/JobSafetyHazardsAdd';


function JobSafetyAnalysisEdit() {
        // for APIs
        const [staffs , setStaffs] = useState([])
        const [jobsafetyanalysises , setJobSafetyAnalysises ] = useState([])
        const [jobsafetyequipments , setJobSafetyEquipments] = useState([])
        const [jobsafetysteps, setJobSafetySteps] = useState([])
        const [jobsafetyhazards , setJobSafetyHazards] = useState([])
        // for varibales
        const [job_title , setJobTitle] = useState('')
        const [jsa_id , setJsaId] = useState('')
        const [job_performer , setJobPerformer] = useState('')
        const [supervisor , setSupervisor] = useState('')
        const [analysis_by , setAnalysisBy] = useState('')
        const [company , setCompany] = useState('')
        const [location , setLocation] = useState('')
        const [department , setDepartment ] = useState('')
        const [reviewed_by , setReviewedBy] = useState('')
        const [date_raised , setDateRaised] = useState('')
        const [id , setId] = useState(null)
        const params = useParams()
    
        // for Others
        const navigate = useNavigate()

        useEffect(() => {
            fetchJobSafetyAnalysis()
            setId(params.id)
        },[params.id])

        useEffect(() => {
            fetchStaff()      
            fetchJobSafetyEquipment()
            fetchJobSafetySteps()
            fetchJobSafetyHazards()
        },[]) 
    
        const fetchStaff = () => {
            StaffAPI.get('/')
            .then((res) => {
                setStaffs(res.data)
            })
            .catch(console.log)
        }

        const fetchJobSafetySteps = () => {
          JobSafetyStepsAPI.get('/')
          .then((res) => {
            setJobSafetySteps(res.data)
          })
          .catch(console.log)
        }

        const fetchJobSafetyHazards = () => {
          JobSafetyHazardsAPI.get('/')
          .then((res) => {
            setJobSafetyHazards(res.data)
          })
          .catch(console.log)
        }
    
        const fetchJobSafetyAnalysis = () => {
            axios.get(`http://127.0.0.1:8000/hseapp/jobsafetyanalysis/${params.id}`)
            .then((res) => {
                setJobSafetyAnalysises(res.data)
                setJobTitle(res.data.job_title)
                setJsaId(res.data.jsa_id)
                setJobPerformer(res.data.job_performer)
                setSupervisor(res.data.supervisor)
                setAnalysisBy(res.data.analysis_by)
                setCompany(res.data.company)
                setLocation(res.data.location)
                setDepartment(res.data.department)
                setReviewedBy(res.data.reviewed_by)
                setDateRaised(res.data.date_raised)
            })
            .catch(console.log)
        }
    
        const fetchJobSafetyEquipment = () => {
          JobSafetyEquipmentAPI.get('/')
          .then((res) => {
            setJobSafetyEquipments(res.data)
          })
          .catch(console.log)
        }
    
        const willSubmitTheEntryIntoDatabase = (e) => {
            e.preventDefault()
            let item = {
                job_title,
                jsa_id,
                job_performer : job_performer || null,
                supervisor : supervisor || null,
                analysis_by : analysis_by || null,
                company,
                location,
                department,
                reviewed_by : reviewed_by || null,
                date_raised : date_raised || null, 
            }
            JobSafetyAnalysisAPI.post('/', item).then(() => fetchJobSafetyAnalysis())
        }

        const toUpdateDatabaseInfo = (id) => {
            let item = {
                job_title,
                jsa_id,
                job_performer : job_performer || null,
                supervisor : supervisor || null,
                analysis_by : analysis_by || null,
                company,
                location,
                department,
                reviewed_by : reviewed_by || null,
                date_raised : date_raised || null, 
        } 
        JobSafetyAnalysisAPI.patch(`/${id}/`, item).then(() => {
            setJobTitle('')
            setJsaId('')
            setJobPerformer('')
            setSupervisor('')
            setAnalysisBy('')
            setCompany('')
            setLocation('')
            setDepartment('')
            setReviewedBy('')
            setDateRaised('')
            fetchJobSafetyAnalysis()
        })
        navigate(-1)
        }

        const forDeletingEquipment = (id) => {
          JobSafetyEquipmentAPI.delete(`/${id}/`).then((res) => {
           fetchJobSafetyEquipment();
           }).catch(console.log)
       }
    
       const forDeletingSteps = (id) => {
        JobSafetyStepsAPI.delete(`/${id}/`).then((res) => {
         fetchJobSafetySteps();
         }).catch(console.log)
     }

       const forDeletingHazards = (id) => {
        JobSafetyHazardsAPI.delete(`/${id}/`).then((res) => {
         fetchJobSafetyHazards();
         }).catch(console.log)
     }

  return (
    <div className="container mt-5">
      <h3 className="float-left">Create a JSA</h3>
        <Form onSubmit={willSubmitTheEntryIntoDatabase} 
              className="mt-4">
          <div className="row">
            <div className="col-md-6">
              <div className="row ">
                <div className="col-md-10 ">
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Date Raised</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Date Raised"
                        value={date_raised}
                        onChange={(e) => {
                            const selectedDate = e.target.value;
                            const formattedDate = selectedDate !== "" ? selectedDate : null;
                            setDateRaised(formattedDate);
                          }}
                      />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Job Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Job Title"
                      value={job_title}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>JSA Id</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="JSA Id"
                      value={jsa_id}
                      onChange={(e) => setJsaId(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Job Performer</Form.Label>
                    <Form.Control
                      as ="select"
                      placeholder="Job Performer"
                      value={job_performer}
                      onChange={(e) => setJobPerformer(e.target.value)}
                    >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name} ({staff.position})</option>
                })}

                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Supervisor</Form.Label>
                  <Form.Control
                    as ="select"
                    placeholder="Supervisor"
                    value={supervisor}
                    onChange={(e) => setSupervisor(e.target.value)}
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
                <div className="col">
                <div className="row">
                <div className="col-md-10 ">

                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Analysed By</Form.Label>
                  <Form.Control
                    as ="select"
                    placeholder="Analysed By"
                    value={analysis_by}
                    onChange={(e) => setAnalysisBy(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name} ({staff.position})</option>
                })}

                  </Form.Control>
                </Form.Group>


                
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Reviewed By</Form.Label>
                  <Form.Control
                    as ="select"
                    placeholder="Reviewed By"
                    value={reviewed_by}
                    onChange={(e) => setReviewedBy(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name} ({staff.position})</option>
                })}

                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </Form.Group>
              
                </div>
              </div>
              </div>
              </div>












              <div className="row">
                <div className="col-md-4">
                <JobSafetyEquipmentAdd jobsafetyanalysis = {params.id}/>
                </div>
                <div className="col-md-8">
                <h3 className="float-left mt-5">Safety Equipment</h3>

                <Table striped bordered hover className='mt-3'>
                  <thead>
                    <tr>
                      <th scope="col" className="col-1">ID</th>
                      <th scope="col" className="col-9">Safety Equipment</th>
                      <th scope="col" className="col-1">Edit</th>
                      <th scope="col" className="col-1">Delete</th>

                    </tr>
                  </thead>
                  <tbody>
                    {jobsafetyequipments.filter((jobsafetyequipment) => jobsafetyequipment.job_safety_analysis === Number(params.id))
                    .map((jobsafetyequipment) => {
                      return (
                        <tr key={jobsafetyequipment.id}>
                          <td>{jobsafetyequipment.id}</td>
                          <td>{jobsafetyequipment.safety_equipment}</td>
                          <td><Link to={`/jobsafetyequipmentedit/${jobsafetyequipment.id}`}><FontAwesomeIcon icon={faPen } /></Link></td>
                          <td><FontAwesomeIcon
                icon={faTrash}
                onClick={() => forDeletingEquipment(jobsafetyequipment.id)}
              /></td>

                        </tr>
                      )
                    })
                    
                    }
                  </tbody>

                </Table>

              </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                <JobSafetyStepsAdd jobsafetyanalysis = {params.id}/>
                </div>
                <div className="col-md-8 mt-5">
                <h3 className="float-left">Job Steps</h3>

                <Table striped bordered hover className='mt-3'>
                  <thead>
                    <tr>
                        <th scope="col" className="col-1">ID</th>
                        <th scope="col" className="col-9">Job Steps</th>
                        {/* <th scope="col" className="col-2">Hazards</th>
                        <th scope="col" className="col-2">Controls</th> */}
                        <th scope="col" className="col-1">Edit</th>
                        <th scope="col" className="col-1">Delete</th>
                      </tr>

                  </thead>
                  <tbody>
                  {jobsafetysteps.filter((jobsafetystep)=> jobsafetystep.job_safety_analysis === Number(params.id)).map((jobsafetystep) => {
                    return (
                      <tr key={jobsafetystep.id}>
                        <td>{jobsafetystep.id}</td>
                        <td>{jobsafetystep.job_steps}</td>
                        {/* <td>{jobsafetystep.hazards}</td>
                        <td>{jobsafetystep.controls}</td> */}
                        <td><Link to={`/jobsafetystepsedit/${jobsafetystep.id}`}><FontAwesomeIcon icon={faPen } /></Link></td>
                        <td><FontAwesomeIcon
                icon={faTrash}
                onClick={() => forDeletingSteps(jobsafetystep.id)}
              /></td>
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>
                </div>
              </div>
              {/* <div className="row">
                <div className="col-md-4"> */}

                <JobSafetyHazardsAdd jobsafetyanalysis = {params.id}/>
                {/* </div>
                <div className="col-md-8 mt-5"> */}
                <h3 className="float-left mt-3">Job Hazards</h3>

                <Table striped bordered hover className='mt-3'>
                  <thead>
                    <tr>
                        <th scope="col" className="col-2">ID</th>
                        {/* <th scope="col" className="col-2">Job Steps</th> */}
                        <th scope="col" className="col-4">Hazards</th>
                        <th scope="col" className="col-4">Controls</th>
                        <th scope="col" className="col-1">Edit</th>
                        <th scope="col" className="col-1">Delete</th>
                      </tr>

                  </thead>
                  <tbody>
                  {jobsafetyhazards.filter((jobsafetyhazard)=> jobsafetyhazard.job_safety_analysis === Number(params.id)).map((jobsafetyhazard) => {
                    return (
                      <tr key={jobsafetyhazard.id}>
                        <td>{jobsafetyhazard.id}</td>
                        {/* <td>{jobsafetystep.job_steps}</td> */}
                        <td>{jobsafetyhazard.hazards}</td>
                        <td>{jobsafetyhazard.controls}</td>
                        <td><Link to={`/jobsafetyhazardsedit/${jobsafetyhazard.id}`}><FontAwesomeIcon icon={faPen } /></Link></td>
                        {/* <td>Edit</td> */}
                        <td><FontAwesomeIcon
                icon={faTrash}
                onClick={() => forDeletingHazards(jobsafetyhazard.id)}
              /></td>
              {/* <td>Delete</td> */}
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>
                {/* </div>

                </div> */}

                <div className="mt-3 pb-3 d-flex justify-content-center">
                  <Button
                    variant="warning"
                    type="button"
                    onClick={(e) => toUpdateDatabaseInfo(id)}
                    className="mx-2"
                  >
                    Update
                  </Button>
     
                </div>
                 
                
  
          </Form> 
        </div>
  )
}

export default JobSafetyAnalysisEdit
