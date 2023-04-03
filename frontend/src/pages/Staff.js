import {useEffect , useState} from 'react'
import StaffAPI from '../API/StaffAPI'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios'

export default function Staff() {
    const [name , setName] = useState('')
    const [position , setPosition] = useState('')
    const [staff_id_number , setStaffIdNumber] = useState('') 
    const [staffs , setStaffs] = useState([])
    const [staff_id, setStaffId] = useState(null)


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

    const onUpdate = (staff_id) => {
        let item = {name, position, staff_id_number};
        StaffAPI.patch(`/${staff_id}/`, item).then((res) => dataStaff())
      }

    const onDelete = (staff_id) => {
        StaffAPI.delete(`/${staff_id}/`).then((res) => dataStaff())
    }

    function selectStaff(staff_id) {
        let item = staffs.filter((staff) => staff.staff_id === staff_id)[0];
        setName(item.name)
        setPosition(item.position)
        setStaffIdNumber(item.staff_id_number)
        setStaffId(item.staff_id)
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
              <Button
                variant="success"
                type="button"
                onClick={(e) => onUpdate(staff_id)}
                className="mx-2"
              >
                Update
              </Button>
            </div>

          </Form>
          
              
            
        </div>
        <div>
          <div className="mt-5 col-md-12 m ">
            <table className="table">
              <thead>
                <tr>
                  {/* <th scope="col">#</th> */}
                  <th scope="col">Name</th>
                  <th scope="col">Position</th>
                  <th scope="col">Staff Id Number</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {staffs.map((staff, index) => {
                  return (
                    <tr key={staff.staff_id}>
                      <td>{staff.name}</td>
                      <td>{staff.position}</td>
                      <td>{staff.staff_id_number}</td>

                      <td>

                        <i
                          className="fa fa-pencil-square text-primary d-inline"
                          aria-hidden="true"
                          onClick={(e) => {selectStaff(staff.staff_id)}}
                        >Edit</i>
                        <i
                          className="fa fa-trash-o text-danger d-inline mx-3"
                          aria-hidden="true"
                          onClick={() => onDelete(staff.staff_id)}
                        >Delete</i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
    )
}