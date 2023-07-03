import React , {useEffect , useState} from 'react'
import PermitToWorkAPI from '../../../API/PermitToWorkAPI';
import HazardsAndPrecautionsAPI from '../../../API/HazardsAndPrecautionsAPI';
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'

// Others 
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom';

function HazardsAndPrecautionsEdit(props) {
    const [permittoworks , setPermitToWorks] = useState([])
    const [hazardsandprecautions , setHazardsAndPrecautions] = useState([])
    const permit_to_work = props.permittowork
    const [hazards , setHazards] = useState('')
    const [precautions , setPrecautions] = useState('')
    const [id , setId] = useState(null)
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        fetchHazardsAndPrecautions()
        setId(params.id)
    },[params.id])

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

    const fetchHazardsAndPrecautions = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/hazardsandprecautions/${params.id}`)
        .then((res) => {
            setHazardsAndPrecautions(res.data)
            setHazards(res.data.hazards)
            setPrecautions(res.data.precautions)
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

    const updateEntryToDatabase = (id) => {
        let item = {
            hazards,
            precautions,
            permit_to_work
        }
        HazardsAndPrecautionsAPI.patch(`/${id}/`, item).then(() => {
            setHazards('')
            setPrecautions('')
            fetchHazardsAndPrecautions()
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
                  {/* <Button
                    variant="primary"
                    type="submit"
                    onClick={willSubmitTheEntryIntoDatabase}
                    className="mx-2"
                  >
                    Save
                  </Button> */}
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

export default HazardsAndPrecautionsEdit
