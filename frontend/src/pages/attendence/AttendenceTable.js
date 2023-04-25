import {useState , useEffect} from 'react'
import { ListGroup, Card, Button, Form } from 'react-bootstrap';
import AttendenceAPI from '../../API/AttendenceAPI'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import AddDateAPI from '../../API/AddDateAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import React, { Fragment } from 'react';
import StaffAPI from '../../API/StaffAPI';

export default function AttendenceTable() {
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
          <h1>Attendence Table</h1>
          <div className="row justify-content-center"> 
      {/* <Button href="/addincident" variant="secondary" className="ms-10 mt-4 col-md-2 m">
                      Add Incident
      </Button> */}
      <div className="mt-4 col-md-10 m row justify-content-center">
      
      <Button href="/attendenceadd" variant="secondary" className="middle col-2 mb-4">Add Attedence</Button>
      

            <Table striped bordered hover>
            <thead>
                <tr>
                  <th scope="col" className="col-1">Name</th>
                  {dates.map((date)=> {
                    return <th>{date.date_attendence}</th>
                  })}
                  
                  <th scope="col" className="col-1">More Info</th>
                  <th scope="col" className="col-1">Delete</th>
                </tr>
              </thead>
              {/* <tbody>
                
                {attendences.map((attendence, index) => {
                  return (
                    {staffs.map((staff) =>
                      staff.map((sta) => (
                        <tr key={sta.id}>
                          <td>{sta.name}</td>
                        </tr>
                      ))
                    )}
                      
       



                      <td>
                          <Link to={`/attendenceedit/${attendence.id}`}>
                          <FontAwesomeIcon icon={faPen } />
                          </Link>
                      </td>

                      <td className="delete" onClick={() => onDelete(attendence.id)}>
                        {/* <i class="fa fa-trash" aria-hidden="true"></i> */}
                        {/* <FontAwesomeIcon icon="check-square" />
    Your <FontAwesomeIcon icon="coffee" /> is hot and ready! */}


              {/* <tbody>
                  {attendences.map((attendence, index) => {
                    return (
                      <React.Fragment key={attendence.id}>
                        {staffs.map((staff) => {
                          staff.map((sta) => (
                            <tr key={sta.id}>
                              <td>{sta.name}</td>
                              <td>
                                <Link to={`/attendenceedit/${attendence.id}`}>
                                  <FontAwesomeIcon icon={faPen} />
                                </Link>
                              </td>
                              <td className="delete" onClick={() => onDelete(attendence.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                              </td>
                            </tr>
                            
                          
                  )}}
                          ))
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
 */}
              {/* <tbody>
  {attendences.map((attendence, index) => {
    return (
        {staffs.map((staff) => {
            <tr key={staff.id}>
              <td>{staff.name}</td>
              <td>
                <Link to={`/attendenceedit/${attendence.id}`}>
                  <FontAwesomeIcon icon={faPen} />
                </Link>
              </td>
              <td className="delete" onClick={() => onDelete(attendence.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </td>
            </tr>
     
        })}

    );
  })}
</tbody> */}

<tbody>

    
   
        {/* {attendences.map((attendence) => (
          return (
          <tr key={attendence.id}>
          <td>{attendence.staff_name}</td>

        
        </tr>
        )))} */}
        {/* {attendences.map((attendence) => (
        <tr key={attendence.id}>
          <td>{attendence.staff_name}</td>
        </tr>
      ))} */}

{attendences.map((attendence) => {
  console.log(attendence.staff_name); // Debugging statement
  console.log(attendence.staff_name?.name); // Debugging statement
  return (
    <tr key={attendence.id}>
      {/* <td>{attendence.staff_name?.name}</td> */}
      {/* <td>{attendence.staff_name ? attendence.staff_name.name : ""}</td> */}
      <td>{attendence.staff_name}</td>
      <td>{attendence.attendence_status}</td>
    </tr>
  )
})}
              

    
        {/* })} */}

    
</tbody>


            </Table>

       
          </div>
        </div>


      </div>
  )
}