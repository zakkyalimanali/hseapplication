import {useEffect , useState} from 'react'
import { ListGroup, Card, Button, Form } from 'react-bootstrap';
import StaffAPI from '../../API/StaffAPI';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'


export default function StaffList() {
    const [staffs , setStaffs] = useState([])
    const [selectedStaff , setSelectedStaff] = useState([])

    useEffect(() => {
        fetchStaff();
    },[])

    const fetchStaff = () => {
        StaffAPI.get('/')
        .then((res) => {
            setStaffs(res.data)
        })
        .catch(console.log)
    }

    const onDelete = (id) => {
        StaffAPI.delete(`/${id}/`).then((res) => {
            fetchStaff();
        }).catch(console.log)
    }
   

    return(
        <div className="row justify-content-center"> 
            <div className="mt-4 col-md-10 m row justify-content-center">
                
        <Button className="middle col-2 mb-4" variant="secondary" href="/addstaff">
            Add Staff
        </Button>
            
          <Table striped bordered hover>
          <thead>
              <tr>
                {/* <th scope="col">#</th> */}
                {/* <th scope="col" class="d-none d-md-table-cell col-1"></th> */}
                <th scope="col" className="col-3">Name</th>
                <th scope="col" className="col-3">Position</th>
                <th scope="col" className="col-1">Staff Id Number</th>
                <th scope="col" className="col-1">Gender</th>
                <th scope="col" className="col-1">Edit</th>
                <th scope="col" className="col-1">Delete</th>
                {/* <th scope="col" class="d-none d-md-table-cell col-1"></th> */}
              </tr>
            </thead>
            <tbody>
              {staffs.map((staff, index) => {
                return (
                  <tr key={staff.id}>
                
                    <td>{staff.name}</td>
                    <td>{staff.position}</td>
                    <td>{staff.staff_id_number}</td>
                    <td>{staff.gender}</td>
                    <td>
                        <Link to={`/editstaff/${staff.id}`}><FontAwesomeIcon icon={faPen } /></Link>                                            
                    </td>
                    <td className="delete" onClick={() => onDelete(staff.id)}>
                      <FontAwesomeIcon icon={faTrash } />
                    </td>
              
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
    </div>

    )


}