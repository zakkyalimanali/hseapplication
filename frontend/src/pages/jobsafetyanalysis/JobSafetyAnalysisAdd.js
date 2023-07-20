import {useState , useEffect, useContext} from 'react'
import JobSafetyAnalysisAPI from '../../API/JobSafetyAnalysisAPI';
import JobSafetyEquipmentAPI from '../../API/JobSafetyEquipmentAPI';
import StaffAPI from '../../API/StaffAPI';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'
import JobSafetyEquipmentAdd from './jobsafetyequipment/JobSafetyEquipmentAdd';
import { useParams } from 'react-router-dom';

function JobSafetyAnalysisAdd() {
    // for APIs
    const [staffs , setStaffs] = useState([])
    const [jobsafetyanalysises , setJobSafetyAnalysises ] = useState([])
    const [jobsafetyequipments , setJobSafetyEquipments] = useState([])
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

    // useEffect(() => {
    //     setId(params.id)
    // },[params.id])

    useEffect(() => {
        fetchStaff()
        fetchJobSafetyAnalysis()
        // fetchJobSafetyEquipment()
    },[]) 

    const fetchStaff = () => {
        StaffAPI.get('/')
        .then((res) => {
            setStaffs(res.data)
        })
        .catch(console.log)
    }

    const fetchJobSafetyAnalysis = () => {
        JobSafetyAnalysisAPI.get('/')
        .then((res) => {
            setJobSafetyAnalysises(res.data)
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

    // const jobPerformerValue = job_performer === '' ? null : job_performer;

    const willSubmitTheEntryIntoDatabase = (e) => {
        e.preventDefault()
        let item = {
            job_title,
            jsa_id,
            // job_performer : jobPerformerValue,
            job_performer : job_performer || null,
            supervisor : supervisor || null,
            analysis_by : analysis_by || null,
            company,
            location,
            department,
            reviewed_by : reviewed_by || null,
            date_raised : date_raised || null, 
        }
        navigate(-1);
        JobSafetyAnalysisAPI.post('/', item).then(() => fetchJobSafetyAnalysis())
        .catch((error) => {
          console.log("Error:", error);
        })

    }



  return (
    <div className="container pb-5">
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="float-left mt-3">Create a JSA</h3>
              
              <Form onSubmit={willSubmitTheEntryIntoDatabase} 
              className="mt-4">
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

                {/* <JobSafetyEquipmentAdd jobsafetyanalysis = {params.id}/>

                <h3 className="float-left">Safety Equipment</h3>

                <Table striped bordered hover className='mt-3'>
                  <thead>
                    <tr>
                      <th scope="col" className="col-1">ID</th>
                      <th scope="col" className="col-1">Safety Equipment</th>
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
                          <td>Edit</td>
                          <td>Delete</td>

                        </tr>
                      )
                    })
                    
                    }
                  </tbody>

                </Table> */}

                <div className="mt-3 float-right">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={willSubmitTheEntryIntoDatabase}
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

export default JobSafetyAnalysisAdd
