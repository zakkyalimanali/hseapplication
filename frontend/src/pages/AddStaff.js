import {useEffect , useState} from 'react'
import StaffAPI from '../API/StaffAPI'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios'

export default function AddStaff() {
    const [name , setName] = useState('')
    const [position , setPosition] = useState('')
    const [staff_id_number , setStaffIdNumber] = useState('') 
    const [staffs , setStaffs] = useState([])
    const [id, setId] = useState(null)


    useEffect(() => {
        dataStaff()
    }, [])

    const dataStaff = () => {
        StaffAPI.get('/')
        .then((res) => {
            setStaffs(res.data)
        })
        .catch(console.log)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let item = {name, position, staff_id_number}
        StaffAPI.post('/', item).then(() => dataStaff());
    }


    const onDelete = (id) => {
        StaffAPI.delete(`/${id}/`).then((res) => dataStaff())
    }


    return(
        <div className="container mt-5">
      <div className="row">
        <div className= "col-md-4"></div>
        <div className="col-md-4 ">
          <h3 className="float-left">Create a new Staff</h3>
          
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPosition">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Postioon"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStaffIdNumber=">
              <Form.Label>Staff Id Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Staff Id Number"
                value={staff_id_number}
                onChange={(e) => setStaffIdNumber(e.target.value)}
              />
            </Form.Group>

            <div className="mt-3 float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="mx-2"
              >
                Save
              </Button>
              {/* <Button
                onClick={(e) => {handleClick(e)}}
              >
                Show
              </Button>
              <Button
                onClick={(e) => {handleClickForm(e)}}
              >
                Show Form
              </Button> */}
            </div>

          </Form>
          
              
            
        </div>
          
      </div>
    </div>
    // <div>
    //   <h1>Add Staff</h1>
    // </div>
    )
}