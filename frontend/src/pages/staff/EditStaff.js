import {useEffect , useState} from 'react'
import StaffAPI from '../../API/StaffAPI'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default function EditStaff() {
    const params = useParams()
    console.log(params.id)
    const [name , setName] = useState('')
    const [position , setPosition] = useState('')
    const [staff_id_number , setStaffIdNumber] = useState('') 
    const [date_of_birth , setDateOfBirth] = useState('')
    const [gender , setGender] = useState('')
    const [smart_card_colour , setSmartCardColour] = useState('')
    const [staffs , setStaffs] = useState([])
    const [id, setId] = useState(null)


    useEffect(() => {
        setId(params.id)
        dataStaff()
    }, [params.id])

    const dataStaff = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/staff/${params.id}/`)
        .then((res) => {
            setStaffs(res.data)
            setName(res.data.name)
            setPosition(res.data.position)
            setStaffIdNumber(res.data.staff_id_number)
            setDateOfBirth(res.data.date_of_birth)
            setGender(res.data.gender)
            setSmartCardColour(res.data.smart_card_colour)
        })
        .catch(console.log)
    }

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     let item = {name, position, staff_id_number}
    //     StaffAPI.post('/', item).then(() => dataStaff());
    // }
    const onSubmit = (e) => {
        e.preventDefault();
        let item = {name ,position, staff_id_number, date_of_birth ,gender, smart_card_colour}
        StaffAPI.post('/', item).then(() => dataStaff());
    }

    // const onUpdate = (id) => {
    //     let item = {name, position, staff_id_number};
    //     StaffAPI.patch(`/${id}/`, item).then((res) => dataStaff())
    //   }
    const onUpdate = (id) => {
        let item = {name ,position, staff_id_number, date_of_birth, gender, smart_card_colour};
        StaffAPI.patch(`/${id}/`, item).then(() => { 
          setPosition('')
          setStaffIdNumber('')
          setName('')
          setDateOfBirth('')
          setGender('')
          setSmartCardColour('')
          dataStaff()
          }
        )
      }

    // const onDelete = (id) => {
    //     StaffAPI.delete(`/${id}/`).then((res) => dataStaff())
    // }

    // function selectStaff(id) {
    //     let item = staffs.filter((staff) => staff.id === id)[0];
    //     setName(item.name)
    //     setPosition(item.position)
    //     setStaffIdNumber(item.staff_id_number)
    //     setId(item.id)
    // }
    // function selectStaff(id) {
    //     let item = staffs.filter((staff) => staff.id === id)[0];
    //     setPosition(item.position)
    //     setStaffIdNumber(item.staff_id_number)
    //     setName(item.name)
    //     // setPosition(item.position)
    //     // setStaffIdNumber(item.staff_id_number)
    //     setId(item.id)
    // }

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
            <Form.Group className="mb-3" controlId="formStaffIdNumber=">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Staff Id Number"
                value={date_of_birth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStaffIdNumber=">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                placeholder="Staff Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
              <option value=''>-------</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStaffIdNumber=">
              <Form.Label>Smart Card Colour</Form.Label>
              <Form.Control
                as="select"
                placeholder="Smart Card Colour"
                value={smart_card_colour}
                onChange={(e) => setSmartCardColour(e.target.value)}
              >
              <option value=''>-------</option>
              <option value='Yellow'>Yellow</option>
              <option value='Red'>Red</option>
              <option value='Green'>Green</option>
              </Form.Control>
            </Form.Group>

        
            
      

            <div className="mt-3 float-right">
              <Link to="/stafflist/">
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