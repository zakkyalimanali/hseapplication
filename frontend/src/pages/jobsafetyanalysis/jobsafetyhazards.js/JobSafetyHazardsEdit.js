import React , {useEffect , useState} from 'react'
import JobSafetyAnalysisAPI from '../../../API/JobSafetyAnalysisAPI';

import JobSafetyHazardsAPI from '../../../API/JobSafetyHazardsAPI';
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

function JobSafetyHazardsEdit(props) {
    const [jobsafetyanalysises , setJobSafetyAnalysises] = useState([])

    const [jobsafetyhazards , setJobSafetyHazards] = useState([])
    const job_safety_analysis = props.jobsafetyanalysis
    const [hazards , setHazards] = useState('')
    const [controls , setControls] = useState('')
    const [id , setId] = useState(null)
    const navigate  = useNavigate()
    const params = useParams()

    useEffect(() => {
        fetchJobSafetyHazards()
        setId(params.id)
    },[params.id])

    const fetchJobSafetyHazards = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/jobsafetyhazards/${params.id}`)    
        .then((res) => {
            setJobSafetyHazards(res.data)
            setControls(res.data.controls)
            setHazards(res.data.hazards)
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

    const willSubmitTheEntryIntoDatabase = (e) => {
        e.preventDefault()
        let item = {
            hazards,
            controls,
            job_safety_analysis
        }
        navigate(0)
        JobSafetyHazardsAPI.post('/', item).then(() => fetchJobSafetyHazards())
    }

    const updateEntryToDatabase = (id) => {
        let item = {
            hazards,
            controls,
            job_safety_analysis
        }
        JobSafetyHazardsAPI.patch(`/${id}/`, item).then(() => {
            setHazards('')
            setControls('')
            fetchJobSafetyHazards()
        })
        navigate(-1)
    }


  return (
    <div className="container mt-5">
          <div className="row">
            <div className= "col-md-12"></div>
            <div className="col-md-12 ">
              <h3 className="float-left">List Job Hazard</h3>
              
              <Form onSubmit={willSubmitTheEntryIntoDatabase} 
              className="mt-4">
                <Form.Group className="mb-3" controlId="formName">
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
                </Form.Group>

                <div className="mt-3 float-right">
                  <Button
                    variant="primary"
                    type="button"
                    onClick={(e) =>  updateEntryToDatabase(id)}
                    className="mx-2"
                  >
                    Update
                  </Button>
                </div>
              </Form>    
            </div>            
          </div>
        </div>
  )
}

export default JobSafetyHazardsEdit
