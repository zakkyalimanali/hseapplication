import React , {useState, useEffect} from 'react'
import TrainingAPI from '../../API/TrainingAPI'
import StaffAPI from '../../API/StaffAPI'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios'

function Trainingedit() {
    const params = useParams()
    const [trainingsLists , setTrainingsList] = useState([])
    const [staffs , setStaffs] = useState([])
    const [staff_name , setStaffName] = useState('')
    const [training_date , setTrainingDate] = useState('')
    const [training_expiry , setTrainingExpiry] = useState('')
    const [training , setTraining] = useState('')
    const [training_provider, setTrainingProvider] = useState('')
    const [id , setId] = useState(null)
    
    useEffect(() => {
        fetchTraining()
        setId(params.id)
    }, [params.id])

    useEffect(() => {
        fetchStaff()
    },[])

    const fetchStaff = () => {
        StaffAPI.get('/')
        .then((res) => {
            setStaffs(res.data);
        }).catch(console.log)
    }

    const fetchTraining = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/training/${params.id}/`)
        .then((res) => {
            setTrainingsList(res.data)
            setTrainingDate(res.data.training_date)
            setTrainingExpiry(res.data.training_expiry)
            setTrainingProvider(res.data.training_provider)
            setTraining(res.data.training)
            setStaffName(res.data.staff_name)
        })
        .catch(console.log)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let item = {staff_name, training_date, training_expiry, training, training_provider};
        TrainingAPI.post('/', item).then(() => fetchTraining())
    }

    const onUpdate = (id) => {
        let item = {staff_name, training_date, training_expiry, training, training_provider};
        TrainingAPI.patch(`/${id}/`, item).then(() => {
            setStaffName('')
            setTrainingDate('')
            setTraining('')
            setTrainingExpiry('')
            setTrainingProvider('')
            setTrainingsList()
        }
        )
    } 

    
  return (
    <div className="container mt-5">
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="float-left">Create a new Staff</h3>
              
              <Form onSubmit={onSubmit} className="mt-4">
              <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Staff Name</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Staff Name"
                    value={staff_name}
                    onChange={(e) => setStaffName(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name} ({staff.position})</option>
                })}

                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Training</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Training"
                    value={training}
                    onChange={(e) => setTraining(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Training Provider</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Training Provider"
                    value={training_provider}
                    onChange={(e) => setTrainingProvider(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Training Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Training Date"
                    value={training_date}
                    onChange={(e) => setTrainingDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Training Expiry</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Training Expiry"
                    value={training_expiry}
                    onChange={(e) => setTrainingExpiry(e.target.value)}
                  />
                </Form.Group>
                <div className="mt-3 float-right">
              <Link to="/traininglist/">
                <Button
                  variant="success"
                  type="button"
                  onClick={(e) => onUpdate(id)}
                  className="mx-2"
                >
                  Update
                </Button>
              </Link>
            </div>

                </Form>
            </div>
        </div>
    </div>
  )
}

export default Trainingedit
