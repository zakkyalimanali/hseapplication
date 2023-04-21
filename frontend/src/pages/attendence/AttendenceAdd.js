import {useState , useEffect} from 'react'
import AttendenceAPI from '../../API/AttendenceAPI'
import AddDateAPI from '../../API/AddDateAPI';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';

export default function AttendenceAdd() {
    const [attendences ,setAttendences] = useState([])
    const [dates , setDates] = useState([])
    const [attendence_date , setAttendenceDate] = useState('')
    const [staff_name , setStaffName] = useState('')
    const [attendence_status , setAttendenceStatus] = useState('')
    const [selectAttendence , setSelectAttendence] = useState(null)
    const [staffs, setStaffs] = useState([])
    let navigate = useNavigate();

    useEffect(() =>{
        fetchStaff()
        fetchAttendence()
        fetchDate()
    },[])

    const fetchAttendence = () => {
        AttendenceAPI.get('/')
        .then((res) => {
            setAttendences(res.data)
        })
        .catch(console.log)
    }

    const fetchDate = () => {
        AddDateAPI.get('/')
        .then((res) => {
            setDates(res.data)
        })
        .catch(console.log)
    }

    const fetchStaff = () => {
        axios.get('http://127.0.0.1:8000/hseapp/staff/')
        .then((res) => {
            setStaffs(res.data)
        })
        .catch(console.log)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let item = {attendence_date, staff_name , attendence_status }
        navigate("/attendencelist");
        AttendenceAPI.post('/' , item).then(() => fetchAttendence())
    }


    return(
        <div>
            <h1>Attendence Add</h1>
                <div className="container mt-5">
                    <div className="row">
                        <div className= "col-md-2"></div>
                            <div className="col-md-8 ">
                                <h3 className="float-left">Create a new Attendence</h3>
                
                                <Form onSubmit={onSubmit} className="mt-4">
                                    <Form.Group className="mb-3" controlId="formStaffName">
                                        <Form.Label>Raised by: </Form.Label>
                                            <Form.Control
                                                as ="select"
                    // placeholder="Enter Staff Name"
                                                value={staff_name}
                                                onChange={(e) => setStaffName(e.target.value)}
                                            >
                                            <option value=''>Select An Option</option>
                                            {staffs.map(staff => {
                                            return <option key={staff.id} value={staff.id}>{staff.name}</option>
                                            })}
                                            </Form.Control>
                                    </Form.Group>

                                   
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Attendence Date</Form.Label>
                                        <Form.Control
                                        type="date"
                                        placeholder="Date"
                                        value={attendence_date}
                                        onChange={(e) => setAttendenceDate(e.target.value)}
                                        />
                                    </Form.Group>
                                    {/* <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Attendence Date</Form.Label>
                                        <Form.Control
                                        as="select"
                                        value={attendence_date}
                                        onChange={(e) => setAttendenceDate(e.target.value)}
                                        >
                                        <option value=''>------</option>
                                        {dates.map(date => {
                                            return <option key={date.id} value={date.id}>{date.date_attendence}</option>
                                            })}    
                                        </Form.Control>
                                    </Form.Group> */}

                <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                    <Form.Label>Attendence Status</Form.Label>
                    <Form.Control
                    as = "select"
                    placeholder="Attencedence Status"
                    value={attendence_status}
                    onChange={(e) => setAttendenceStatus(e.target.value)}
                    >
                    <option value=''>------</option>
                    <option value='Present'>Present</option>
                    <option value='MC'>MC</option>
                    <option value='Absent'>Absent</option>
                    </Form.Control>
                </Form.Group>
                    <Button
                        variant="primary"
                        onClick={onSubmit}>
                        Save
                    </Button>
    
                </Form>

                
                </div>
            </div>
        </div>
        </div>
    )
}