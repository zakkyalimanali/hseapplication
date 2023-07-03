import React , {useEffect , useState} from 'react'
import PermitToWorkAPI from '../../../API/PermitToWorkAPI';
import PhysicalControlsAPI from '../../../API/PhysicalControlsAPI';
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'

// Others 
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom';


function PhysicalControlsEdit(props) {
    const [permittoworks , setPermitToWorks] = useState([])
    const [physicalcontrols, setPhysicalControls] = useState([])
    const permit_to_work = props.permittowork
    const [control_mechanisms , setControlMechanisms] = useState('')
    const [control_how_will_it_help , setControlHowWillItHelp] = useState('')
    const [id , setId] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetchPermitToWork()
       
    },[])

    const fetchPermitToWork = () => {
        PermitToWorkAPI.get('/')
        .then((res) => {
            setPermitToWorks(res.data)
        })
        .catch(console.log)
    }

    useEffect(() => {
        fetchPhysicalControls()
        setId(params.id)
    },[params.id])

    const fetchPhysicalControls = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/physicalcontrols/${params.id}`)
        .then((res) => {
            setPhysicalControls(res.data)
            setControlMechanisms(res.data.control_mechanisms)
            setControlHowWillItHelp(res.data.control_how_will_it_help)
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

    const updateEntryToDatabase = (id) => {
        let item = {
            control_mechanisms,
            control_how_will_it_help,
            permit_to_work
        }
        PhysicalControlsAPI.patch(`/${id}/`, item).then(() => {
            setControlMechanisms('')
            setControlHowWillItHelp('')
            fetchPhysicalControls()
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
                        type="button"
                        onClick= {(e) => updateEntryToDatabase(id)}
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

export default PhysicalControlsEdit
