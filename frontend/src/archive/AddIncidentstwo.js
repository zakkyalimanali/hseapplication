import {useState , useEffect} from 'react'
import IncidentAPI from '../API/IncidentAPI'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios';

export default function AddIncidents() {
    const [id , setId] = useState(null)
    const [short_desc , setShortDesc] = useState('') 
    const [raised_by, setRaisedBy] = useState('')
    const [incidents , setIncidents] = useState([])
    const [staffs , setStaffs] = useState([]) 

    useEffect(() => {
        incidentData()
        staffData()
    },[])
    
    const incidentData = () => {
        IncidentAPI.get('/')
        .then((res) => {
            setIncidents(res.data);
        }).catch(console.log)
    }

    const staffData = () => {
        axios.get('http://127.0.0.1:8000/hseapp/staff/')
        .then((res) => {
            setStaffs(res.data);
        }).catch(console.log)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let item = {short_desc, raised_by}
        IncidentAPI.post('/' , item).then(() => incidentData())
    }

    return(

    <div className="container mt-5">
        <div className="row">
          <div className= "col-md-4"></div>
            <div className="col-md-4 ">
                <h3 className="float-left">Create a new Incident</h3>
            
            <Form onSubmit={onSubmit} className="mt-4">
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={short_desc}
                  onChange={(e) => setShortDesc(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStaffName">
                <Form.Label>Raised by: </Form.Label>
                <Form.Control
                  as ="select"
                  // placeholder="Enter Staff Name"
                  value={raised_by}
                  onChange={(e) => setRaisedBy(e.target.value)}
                >
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name}</option>
                })}
                </Form.Control>
              </Form.Group>
              <Button
                  variant="primary"
                  type="submit"
                  onClick={onSubmit}
                  className="mx-2"
                >
                  Save
                </Button>
            </Form>
            </div>
        </div>
    </div>
    )
}

