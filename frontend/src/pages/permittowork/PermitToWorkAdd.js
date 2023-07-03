import {useState , useEffect, useContext} from 'react'
import PermitToWorkAPI from '../../API/PermitToWorkAPI';
import StaffAPI from '../../API/StaffAPI';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'
import { useParams } from 'react-router-dom';

function PermitToWorkAdd() {
    const [permittoworks , setPermitToWorks] = useState([])

    const [permit_number , setPermitNumber] = useState('')
    const [location_of_work , setLocationOfWork] = useState('')
    const [nature_of_work, setNatureOfWork] = useState('')
    const [work_start , setWorkStart] = useState('')
    const [work_completed , setWorkCompleted] = useState('')

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

    const willSubmitTheEntryIntoDatabase = (e) => {
        e.preventDefault()
        let item = {
            permit_number,
            location_of_work,
            nature_of_work,
            work_start : work_start || null,
            work_completed : work_completed || null,
        }
        navigate(-1);
        PermitToWorkAPI.post('/', item).then(()=> 
            fetchPermitToWork())
            .catch((error) => {
                console.log("Error:", error);
              })

    }



  return (
    <div className="container mt-5 pb-5">
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="float-left mt-5">Create a New Permit To Work</h3>
              
              <Form onSubmit={willSubmitTheEntryIntoDatabase} 
              className="mt-4">
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Permit Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Permit Number"
                    value={permit_number}
                    onChange={(e) => setPermitNumber(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Location of Work</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Location of Work"
                    value={location_of_work}
                    onChange={(e) => setLocationOfWork(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Nature Of Work</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nature Of Work"
                    value={nature_of_work}
                    onChange={(e) => setNatureOfWork(e.target.value)}
                  />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Work Start</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Work Start"
                    value={work_start}
                    onChange={(e) => {
                        const selectedDate = e.target.value;
                        const formattedDate = selectedDate !== "" ? selectedDate : null;
                        setWorkStart(formattedDate);
                      }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Work Completed</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Work Completed"
                    value={work_completed}
                    onChange={(e) => {
                        const selectedDate = e.target.value;
                        const formattedDate = selectedDate !== "" ? selectedDate : null;
                        setWorkCompleted(formattedDate);
                      }}
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

export default PermitToWorkAdd

