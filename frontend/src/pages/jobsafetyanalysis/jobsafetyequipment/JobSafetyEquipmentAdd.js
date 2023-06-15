import {useState , useEffect, useContext} from 'react'
import JobSafetyAnalysisAPI from '../../../API/JobSafetyAnalysisAPI';
import JobSafetyEquipmentAPI from '../../../API/JobSafetyEquipmentAPI.js'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
// import AuthContext from "../../context/AuthContext";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'

function JobSafetyEquipmentAdd(props) {
    const [jobsafetyanalysises , setJobSafetyAnalysises] = useState([])
    const [jobsafetyequipments , setJobSafetyEquipments] = useState([])
    const job_safety_analysis = props.jobsafetyanalysis
    const [safety_equipment , setSafetyEquipment] = useState('')
    const navigate  = useNavigate()

    useEffect(() => {
        fetchJobSafetyAnalysis()
        fetchJobSafetyEquipment()
    },[])

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

    const willSubmitTheEntryIntoDatabase = (e) => {
        e.preventDefault()
        let item = {
            safety_equipment, 
        }
        navigate(0);
        JobSafetyEquipmentAPI.post('/', item).then(() => setJobSafetyEquipments())


    }

  return (
    <div className="container mt-5">
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="float-left">Create a JSA</h3>
              
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

export default JobSafetyEquipmentAdd
