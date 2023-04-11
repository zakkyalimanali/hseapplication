import {useState , useEffect} from 'react'
import { ListGroup, Card, Button, Form } from 'react-bootstrap';
import AttendenceAPI from '../../API/AttendenceAPI'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import AddDateAPI from '../../API/AddDateAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'


export default function AttendenceList() {
    const [attendences ,setAttendences] = useState([])
    const [selectAttendence , setSelectAttendence] = useState(null)
    const [staffs, setStaffs] = useState([])
    const [dates , setDates] = useState([])

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

    const onDelete = (id) => {
        AttendenceAPI.delete(`/${id}/`).then((res) => {
            fetchAttendence();
        }).catch(console.log)
    }


    return(
        <div>
            <h1>Attendence List</h1>
            <div className="row justify-content-center"> 
        {/* <Button href="/addincident" variant="secondary" className="ms-10 mt-4 col-md-2 m">
                        Add Incident
        </Button> */}
        <div className="mt-4 col-md-10 m row justify-content-center">
        
        <Button href="/attendenceadd" variant="secondary" className="middle col-2 mb-4">Add Attedence</Button>
        

              <Table striped bordered hover>
              <thead>
                  <tr>
                    <th scope="col" className="col-1">ID</th>
                    <th scope="col" className="col-3">Staff</th>
                    <th scope="col" className="col-2">Date</th>
                    <th scope="col" className="col-2">Attendence Status</th>
                    <th scope="col" className="col-1">More Info</th>
                    <th scope="col" className="col-1">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {attendences.map((attendence, index) => {
                    return (
                      <tr key={attendence.id}>
                        <td>{attendence.id}</td>
                        <td>{staffs.find((staff) => staff.id === attendence.staff_name)?.name}</td>
                        {/* <td>{dates.find((date) => date.id === attendence.attendence_date)?.date_attendence}</td> */}
                        <td>{attendence.attendence_date}</td>
                        {/* <td>{dates.date_attendence}</td> */}
                        <td>{attendence.attendence_status}</td>
                        <td>
                            <Link to={`/attendenceedit/${attendence.id}`}>
                            <FontAwesomeIcon icon={faPen } />
                            </Link>
                        </td>
  
                        <td className="delete" onClick={() => onDelete(attendence.id)}>
                          {/* <i class="fa fa-trash" aria-hidden="true"></i> */}
                          {/* <FontAwesomeIcon icon="check-square" />
      Your <FontAwesomeIcon icon="coffee" /> is hot and ready! */}
      <FontAwesomeIcon icon={faTrash } />
                        </td>
                      </tr>
                       );
                      })}
                </tbody>


              </Table>

         
            </div>
          </div>


        </div>
    )
}