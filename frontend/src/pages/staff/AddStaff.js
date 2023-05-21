import {useEffect , useState} from 'react'
import StaffAPI from '../../API/StaffAPI'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios'
import { Link , useNavigate } from 'react-router-dom';

export default function AddStaff() {
    const [name , setName] = useState('')
    const [position , setPosition] = useState('')
    const [staff_id_number , setStaffIdNumber] = useState('') 
    const [date_of_birth , setDateOfBirth] = useState('')
    const [joining_date , setJoiningDate] = useState('')
    const [smart_card_number , setSmartCardNumber] = useState('')
    const [gender , setGender] = useState('')
    const [smart_card_colour , setSmartCardColour] = useState('')
    const [home_address , setHomeAddress] = useState('')
    const [nationality , setNationality] = useState('')
    const [citizenship , setCitizenship] = useState('')
    const [telephone_number , setTelephoneNumber] = useState('')
    const [email_address , setEmailAddress] = useState('')
    const [passport_number , setPassportNumber] = useState('')
    const [passport_expiry_date , setPassportExpiryDate] = useState('')
    const [yearly_leave_days, setYearlyLeaveDays] = useState('')
    const [yearly_leave_taken , setYearlyLeaveTaken] = useState('')
    const [staffs , setStaffs] = useState([])
    const [id, setId] = useState(null)
    let navigate = useNavigate();

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
        let item = {name, position, staff_id_number ,date_of_birth: date_of_birth || null  ,joining_date: joining_date || null, smart_card_number, gender , smart_card_colour, home_address, nationality, citizenship, telephone_number, email_address, passport_number, passport_expiry_date: passport_expiry_date || null, yearly_leave_days, yearly_leave_taken  }
        navigate("/stafflist");
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
            <Form.Group className="mb-3" controlId="formPosition">
              <Form.Label>Smart Card Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Smart Card Number"
                value={smart_card_number}
                onChange={(e) => setSmartCardNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPosition">
              <Form.Label>Telephone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Telephone Number"
                value={telephone_number}
                onChange={(e) => setTelephoneNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPosition">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email Address"
                value={email_address}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPosition">
              <Form.Label>Yearly Leave Days</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Yearly Leave Days"
                value={yearly_leave_days}
                onChange={(e) => setYearlyLeaveDays(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPosition">
              <Form.Label>Yearly Leave Taken</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Yearly Leave Taken"
                value={yearly_leave_taken}
                onChange={(e) => setYearlyLeaveTaken(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPosition">
              <Form.Label>Passport Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Passport Number"
                value={passport_number}
                onChange={(e) => setPassportNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStaffIdNumber=">
              <Form.Label>Passport Expiry Date</Form.Label>
              <Form.Control
                // type="date"
                // placeholder="Enter Passport Expiry Date"
                // value={passport_expiry_date}
                // onChange={(e) => setPassportExpiryDate(e.target.value)}
                type="date"
                placeholder="Enter Passport Expiry Date"
                value={passport_expiry_date}
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  const formattedDate = selectedDate !== "" ? selectedDate : null;
                  setPassportExpiryDate(formattedDate);
                }}
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
              <Form.Label>Home Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Home Address"
                value={home_address}
                onChange={(e) => setHomeAddress(e.target.value)}
              />
            </Form.Group>
             <Form.Group className="mb-3" controlId="formStaffIdNumber=">
              <Form.Label>Citizenship</Form.Label>
              <Form.Control
                as="select"
                placeholder="Citizenship"
                value={citizenship}
                onChange={(e) => setCitizenship(e.target.value)}>
                  <option value=''>-------</option>
                  <option value='Citizen'>Citizen</option>
                  <option value='PR'>PR</option>
                  <option value='Other'>Other</option>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStaffIdNumber=">
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                as="select"
                placeholder="Home Address"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              >
              <option value=''>-------</option>
              <option value='Brunei'>Brunei</option>
              <option value='Malaysia'>Malaysia</option>
              <option value='UK'>UK</option>
              <option value='Australia'>Australia</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStaffIdNumber=">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Staff Id Number"
                value={date_of_birth}
                // onChange={(e) => setDateOfBirth(e.target.value)}
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  const formattedDate = selectedDate !== "" ? selectedDate : null;
                  setDateOfBirth(formattedDate);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStaffIdNumber=">
              <Form.Label>Joining Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Joining Date"
                value={joining_date}
                // onChange={(e) => setJoiningDate(e.target.value)}
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  const formattedDate = selectedDate !== "" ? selectedDate : null;
                  setJoiningDate(formattedDate);
                }}
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