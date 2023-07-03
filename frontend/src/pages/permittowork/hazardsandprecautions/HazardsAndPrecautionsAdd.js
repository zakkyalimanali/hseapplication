import {useState , useEffect, useContext} from 'react'
import PermitToWorkAPI from '../../../API/PermitToWorkAPI';
import HazardsAndPrecautionsAPI from '../../../API/HazardsAndPrecautionsAPI';
import StaffAPI from '../../../API/StaffAPI';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import AuthContext from "../../../context/AuthContext";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'
import { useParams } from 'react-router-dom';

function HazardsAndPrecautionsAdd(props) {
    const [permittoworks , setPermitToWorks] = useState([])
    const [hazardsandprecautions , setHazardsAndPrecautions] = useState([])
    const permit_to_work = props.permittowork
    const [hazards , setHazards] = useState('')
    const [precautions , setPrecautions] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchPermitToWork()
        fetchHazardsAndPrecautions()
    },[])

    const fetchPermitToWork = () => {
        PermitToWorkAPI.get('/')
        .then((res) => {
            setPermitToWorks(res.data)
        })
        .catch(console.log)
    }

    const fetchHazardsAndPrecautions = () => {
        HazardsAndPrecautionsAPI.get('/')
        .then((res) => {
            setHazardsAndPrecautions(res.data)
        })
        .catch(console.log)
    }

    const willSubmitTheEntryIntoDatabase = (e) => {
        e.preventDefault()
        let item = {
            hazards,
            precautions,
            permit_to_work
        }
        navigate(0)
        HazardsAndPrecautionsAPI.post('/', item).then(() => fetchHazardsAndPrecautions())
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
                  <Form.Label>Hazards</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Hazards"
                    value={hazards}
                    onChange={(e) => setHazards(e.target.value)}
                  />
                </Form.Group>
       
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Precautions</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Precautions"
                    value={precautions}
                    onChange={(e) => setPrecautions(e.target.value)}
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
            </div>            
          </div>
        </div>
  )
}

export default HazardsAndPrecautionsAdd
