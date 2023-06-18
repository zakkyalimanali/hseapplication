import React , {useEffect , useState} from 'react'
import JobSafetyAnalysisAPI from '../../../API/JobSafetyAnalysisAPI';
import JobSafetyEquipmentAPI from '../../../API/JobSafetyEquipmentAPI';
import JobSafetyStepsAPI from '../../../API/JobSafetyStepsAPI';
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'

// Others 
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom';

function JobSafetyStepsEdit(props) {
    const [jobsafetyanalysises , setJobSafetyAnalysises] = useState([])
    const [jobsafetysteps , setJobSafetySteps] = useState([])
    const job_safety_analysis = props.jobsafetyanalysis
    const [job_steps , setJobSteps] = useState('')
    // const [hazards , setHazards] = useState('')
    // const [controls , setControls] = useState('')
    const [id , setId] = useState(null)
    const navigate  = useNavigate()
    const params = useParams()

    useEffect(() => {
        fetchJobSafetySteps()
        setId(params.id)
    },[params.id]) 

    // const fetchJobSafetySteps = () => {
    //     axios.get(`http://127.0.0.1:8000/hseapp/jobsafetysteps/${params.id}`)
    //     .then((res) => {
    //         setJobSafetySteps(res.data)
    //         setJobSteps(res.data.job_steps)
    //         setHazards(res.data.hazards)
    //         setControls(res.data.controls)
    //     })
    //     .catch(console.log)
    // }

    const fetchJobSafetySteps = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/jobsafetysteps/${params.id}`)
        .then((res) => {
            setJobSafetySteps(res.data)
            setJobSteps(res.data.job_steps)
        })
        .catch(console.log)
    }

    useEffect(() => {
        fetchJobSafetyAnalysis()
    },[]) 

    const fetchJobSafetyAnalysis = () => {
        JobSafetyAnalysisAPI.get('/')
        .then((res) => {
            setJobSafetyAnalysises(res.data)
        })
        .catch(console.log)
    }

    // const willSubmitTheEntryIntoDatabase = (e) => {
    //     e.preventDefault()
    //     let item = {
    //         job_steps,
    //         hazards,
    //         controls,
    //         job_safety_analysis
    //     }
    //     navigate(0)
    //     JobSafetyStepsAPI.post('/', item).then(() => fetchJobSafetySteps())
    // }
    const willSubmitTheEntryIntoDatabase = (e) => {
        e.preventDefault()
        let item = {
            job_steps,
            job_safety_analysis
        }
        navigate(0)
        JobSafetyStepsAPI.post('/', item).then(() => fetchJobSafetySteps())
    }

    // const updateEntryToDatabase = (id) => {
    //     let item = {
    //         job_steps,
    //         hazards,
    //         controls,
    //         job_safety_analysis
    //     }
    //     JobSafetyStepsAPI.patch(`/${id}/`, item).then(() => {
    //         setJobSteps('')
    //         setHazards('')
    //         setControls('')
    //         fetchJobSafetySteps()
    //     })
    //     navigate(-1)
    // }
    const updateEntryToDatabase = (id) => {
        let item = {
            job_steps,
            job_safety_analysis
        }
        JobSafetyStepsAPI.patch(`/${id}/`, item).then(() => {
            setJobSteps('')
            fetchJobSafetySteps()
        })
        navigate(-1)
    }

  return (
    <div className="container mt-5">
    <div className="row">
      <div className= "col-md-12"></div>
      <div className="col-md-12 ">
        <h3 className="float-left">Create a Job Steps</h3>
        
        <Form onSubmit={willSubmitTheEntryIntoDatabase} 
        className="mt-4">
          
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Job Steps</Form.Label>
            <Form.Control
              type="text"
              placeholder="Job Steps"
              value={job_steps}
              onChange={(e) => setJobSteps(e.target.value)}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Hazards</Form.Label>
            <Form.Control
              type="text"
              placeholder="Hazards"
              value={hazards}
              onChange={(e) => setHazards(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Controls</Form.Label>
            <Form.Control
              type="text"
              placeholder="Controls"
              value={controls}
              onChange={(e) => setControls(e.target.value)}
            />
          </Form.Group> */}

          <div className="mt-3 float-right">
            <Button
              variant="primary"
              type="button"
              onClick= {(e) => updateEntryToDatabase(id)}
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

export default JobSafetyStepsEdit
