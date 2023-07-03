import {useState , useEffect, useContext} from 'react'
import PermitToWorkAPI from '../../../API/PermitToWorkAPI';
import PhysicalControlsAPI from '../../../API/PhysicalControlsAPI';
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

function PhysicalControlsAdd(props) {
    const [permittoworks , setPermitToWorks] = useState([])
    const [physicalcontrols, setPhysicalControls] = useState([])
    const permit_to_work = props.permittowork
    const [control_mechanisms , setControlMechanisms] = useState('')
    const [control_how_will_it_help , setControlHowWillItHelp] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchPermitToWork()
        fetchPhysicalControls()
    },[])

    const fetchPermitToWork = () => {
        PermitToWorkAPI.get('/')
        .then((res) => {
            setPermitToWorks(res.data)
        })
        .catch(console.log)
    }

    const fetchPhysicalControls = () => {
        PhysicalControlsAPI.get('/')
        .then((res) => {
            setPhysicalControls(res.data)
        })
        .catch(console.log)
    }

    const willSubmitTheEntryIntoDatabase = (e) => {
        e.preventDefault()
        let item = {
            control_mechanisms,
            control_how_will_it_help,
            permit_to_work
        }
        navigate(0)
        PhysicalControlsAPI.post('/', item).then(() => fetchPhysicalControls())
    }




  return (
    <div className="container mt-5">
          <div className="row">
            <div className= "col-md-12"></div>
            <div className="col-md-12 ">
              <h3 className="float-left">Create a Physical Controls</h3>
              
              <Form onSubmit={willSubmitTheEntryIntoDatabase} 
              className="mt-4">
                
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Control Mechanisms</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Control Mechanisms"
                    value={control_mechanisms}
                    onChange={(e) => setControlMechanisms(e.target.value)}
                  />
                </Form.Group>
       
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>How Controls Works</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="How Controls Works"
                    value={control_how_will_it_help}
                    onChange={(e) => setControlHowWillItHelp(e.target.value)}
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

export default PhysicalControlsAdd
