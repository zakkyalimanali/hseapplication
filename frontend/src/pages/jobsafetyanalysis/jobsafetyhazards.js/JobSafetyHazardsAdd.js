import {useState , useEffect, useContext} from 'react'
// API
import JobSafetyAnalysisAPI from '../../../API/JobSafetyAnalysisAPI';

import JobSafetyHazardsAPI from '../../../API/JobSafetyHazardsAPI';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
// import AuthContext from "../../context/AuthContext";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'

function JobSafetyHazardsAdd(props) {
    const [jobsafetyanalysises , setJobSafetyAnalysises] = useState([])

    const [jobsafetyhazards , setJobSafetyHazards] = useState([])
    const job_safety_analysis = props.jobsafetyanalysis
    const [hazards , setHazards] = useState('')
    const [controls , setControls] = useState('')
    const navigate  = useNavigate()

    useEffect(() => {
        fetchJobSafetyAnalysis()
        fetchJobSafetyHazards()
    },[])

    const fetchJobSafetyAnalysis = () => {
        JobSafetyAnalysisAPI.get('/')
        .then((res) => {
            setJobSafetyAnalysises(res.data)
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

  return (
    <div className="container mt-5 ">
          <div className="row">
            <div className= "col-md-12"></div>
            {/* <div className="d-flex justify-content-center"> */}
            <div className="col-md-12">
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

                <div className="mt-3 d-flex justify-content-center">
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
              {/* </div> */}
            </div>            
          </div>
        </div>
  )
}

export default JobSafetyHazardsAdd
