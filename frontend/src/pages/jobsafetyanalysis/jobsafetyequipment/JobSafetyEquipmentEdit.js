import React , {useEffect , useState} from 'react'
import JobSafetyAnalysisAPI from '../../../API/JobSafetyAnalysisAPI';
import JobSafetyEquipmentAPI from '../../../API/JobSafetyEquipmentAPI';
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'

// Others 
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom';

function JobSafetyEquipmentEdit(props) {
    const [jobsafetyanalysises , setJobSafetyAnalysises] = useState([])
    const [jobsafetyequipments , setJobSafetyEquipments] = useState([])
    const job_safety_analysis = props.jobsafetyanalysis
    const [safety_equipment , setSafetyEquipment] = useState('')
    const [id , setId] = useState(null)
    const navigate  = useNavigate()
    console.log(props)
    const params = useParams()

    useEffect(() => {
        fetchJobSafetyEquipment()
        setId(params.id)
    },[params.id])

    const fetchJobSafetyEquipment = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/jobsafetyequipment/${params.id}`)
        .then((res) => {
            setJobSafetyEquipments(res.data)
            setSafetyEquipment(res.data.safety_equipment)
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
            safety_equipment, 
            job_safety_analysis
        }
        navigate(0);
        JobSafetyEquipmentAPI.post('/', item).then(() => fetchJobSafetyEquipment())
    }

    const updateButtonIsClickToUpdateEquipmentEntry = (id) => {
        let item = {
            safety_equipment, 
            job_safety_analysis
        }
        JobSafetyEquipmentAPI.patch(`/${id}/`, item).then(() => { 
            setSafetyEquipment('')
            fetchJobSafetyEquipment()
          }
        )
        navigate(-1)
      }
      
  return (
    <div className="container mt-5">
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="float-left">Up date PPE</h3>
              
              <Form onSubmit={willSubmitTheEntryIntoDatabase} 
              className="mt-4">
                
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Safety Equipment</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Safety Equipment"
                    value={safety_equipment}
                    onChange={(e) => setSafetyEquipment(e.target.value)}
                  />
                </Form.Group>

                <div className="mt-3 float-right">
                  <Button
                    variant="primary"
                    type="button"
                    onClick={(e) => updateButtonIsClickToUpdateEquipmentEntry(id)}
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

export default JobSafetyEquipmentEdit
