import {useEffect , useState} from 'react'
import StaffAPI from '../../API/StaffAPI'
import AddDateAPI from '../../API/AddDateAPI';
import { ListGroup, Card, Button, Form, Tab } from "react-bootstrap";
import axios from 'axios'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

// export default function EditStaff() {
//     const params = useParams()
//     const [dates , setDates] = useState([])
//     const [date_attendence , setDateAttendence] = useState('')
//     const [id, setId] = useState(null)
//     const [staffs , setStaffs] = useState([])
//     const [staff_name , setStaffName] = useState('')
//     const [attendence_status , setAttendenceStatus] = useState('')

//     useEffect(() => {
//         setId(params.id)
//         dataDate()
//     }, [params.id])

//     useEffect(() => {
//       fetchStaff()
//     },[])

//     const fetchStaff = () => {
//       StaffAPI.get('/')
//       .then((res) => {
//         setStaffs(res.data)
//       })
//     }

//     const dataDate = () => {
//         axios.get(`http://127.0.0.1:8000/hseapp/datelist/${params.id}/`)
//         .then((res) => {
//             setDates(res.data);
//             setDateAttendence(res.data.date_attendence);
//         })
//         .catch(console.log)
//     }


//     const onSubmit = (e) => {
//         e.preventDefault();
//         let item = {date_attendence}
//         AddDateAPI.post('/', item).then(() => dataDate());
//     }

//     const onUpdate = (id) => {
//         let item = {date_attendence};
//         AddDateAPI.patch(`/${id}/`, item).then(() => { 
//             setDateAttendence('')
//             dataDate()
//           }
//         )
//       }

//     function selectDate(id) {
//         let item = dates.filter((date) => date.id === id)[0];
//         setDateAttendence(item.date_attendence)
//         setId(item.id)
//     }


//     return(
//       <div className="container mt-5">
//         <div className="row">
//           <div className= "col-md-4"></div>
//           <div className="col-md-4 ">
//             <h3 className="float-left">Update Date</h3>
            
//             <Form onSubmit={onSubmit} className="mt-4">
//               <Form.Group className="mb-3" controlId="formName">
//                 <Form.Label>Date Attendence</Form.Label>
//                 <Form.Control
//                   type="date"
//                   placeholder="Date"
//                   value={date_attendence}
//                   onChange={(e) => setDateAttendence(e.target.value)}
//                 >
                    
//                 </Form.Control>
//               </Form.Group>
//           <Table>
//           <thead>
//                   <tr>
//                     {/* <th scope="col" className="col-1">ID</th> */}
//                     <th scope="col" className="col-3">Name</th>
//                     <th scope="col" className="col-3">Status</th>
//                     <th scope="col" className="col-1">More Info</th>
//                     <th scope="col" className="col-1">Delete</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//             {staffs.map((staff) => {
//               return (
//               <tr>
//                 <td>{staffs.find((staff) => staff.id === dates.staff_name)?.name}</td>
//                 <td>
//                 <Form.Group className="mb-3" controlId="formName">
//                 <Form.Label>Attendence Status</Form.Label>
//                 <Form.Control
//                   as= "select"
//                   placeholder="Attendence Status"
//                   value={attendence_status}
//                   onChange={(e) => setDateAttendence(e.target.value)}
//                 >
//                     <option value=''>------</option>
//                     <option value='Present'>Present</option>
//                     <option value='MC'>MC</option>
//                     <option value='Absent'>Absent</option>
//                 </Form.Control>
//               </Form.Group>
//                 </td>
//               </tr>
//             )})}
//             </tbody>
//           </Table>
//             <div className="mt-3 float-right">
//               <Link to="/stafflist/">
//                 <Button
//                   variant="success"
//                   type="button"
//                   onClick={(e) => onUpdate(id)}
//                   className="mx-2"
//                 >
//                   Update
//                 </Button>
//               </Link>
//             </div>

//           </Form>
          
              
            
//         </div>

//       </div>
//     </div>
//     )
// }

// import { useEffect , useState } from 'react'
// import StaffAPI from '../../API/StaffAPI'
// import AddDateAPI from '../../API/AddDateAPI';
// import { ListGroup, Card, Button, Form, Tab } from "react-bootstrap";
// import axios from 'axios'
// import { useParams } from 'react-router';
// import { Link } from 'react-router-dom';
// import Table from 'react-bootstrap/Table';

// export default function EditStaff() {
//     const params = useParams();
//     const [dates, setDates] = useState([]);
//     const [date_attendance, setDateAttendance] = useState('');
//     const [id, setId] = useState(null);
//     const [staffs, setStaffs] = useState([]);
//     const [attendance_status, setAttendanceStatus] = useState('');

//     useEffect(() => {
//         setId(params.id);
//         dataDate();
//     }, [params.id]);

//     useEffect(() => {
//         fetchStaff();
//     }, []);

//     const fetchStaff = () => {
//         StaffAPI.get('/').then((res) => {
//             setStaffs(res.data);
//         });
//     };

//     const dataDate = () => {
//         axios.get(`http://127.0.0.1:8000/hseapp/datelist/${params.id}/`).then((res) => {
//             setDates(res.data);
//             setDateAttendance(res.data.date_attendance);
//         }).catch(console.log);
//     };

//     const onSubmit = (e) => {
//         e.preventDefault();
//         let item = { date_attendance };
//         AddDateAPI.post('/', item).then(() => dataDate());
//     };

//     const onUpdate = (id) => {
//         let item = { date_attendance };
//         AddDateAPI.patch(`/${id}/`, item).then(() => {
//             setDateAttendance('');
//             dataDate();
//         });
//     };

//     function selectDate(id) {
//         let item = dates.filter((date) => date.id === id)[0];
//         setDateAttendance(item.date_attendance);
//         setId(item.id);
//     }

//     return (
//         <div className="container mt-5">
//             <div className="row">
//                 <div className="col-md-4"></div>
//                 <div className="col-md-4">
//                     <h3 className="float-left">Update Date</h3>

//                                <Form onSubmit={onSubmit} className="mt-4">
//                <Form.Group className="mb-3" controlId="formName">
//                 <Form.Label>Date Attendance</Form.Label>
//                <Form.Control
//                   type="date"
//                   placeholder="Date"
//                   value={date_attendance}
//                   onChange={(e) => setDateAttendance(e.target.value)}
//                 >
                    
//                 </Form.Control>
//               </Form.Group>

//               <Table>
//       <thead>
//         <tr>
//           <th scope="col" className="col-3">Name</th>
//           <th scope="col" className="col-3">Status</th>
//           <th scope="col" className="col-1">More Info</th>
//           <th scope="col" className="col-1">Delete</th>
//         </tr>
//       </thead>
      {/* <tbody>
        {staffs.map((staff) => {
          return (
          <tr>
            <td>{staffs.find((staff) => staff.id === dates.staff_name)?.name}</td>
            <td>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Attendence Status</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Attendence Status"
                  value={attendence_status}
                  onChange={(e) => setAttendenceStatus(e.target.value)}
                >
                  <option value=''>------</option>
                  <option value='Present'>Present</option>
                  <option value='MC'>MC</option>
                  <option value='Absent'>Absent</option>
                </Form.Control>
              </Form.Group>
            </td>
          </tr>
        )})}
      </tbody> */}


{/* <tbody>
  {staffs.map((staff) => {
    return (
      <tr key={staff.id}>
        <td>{staffs.find((s) => s.id === staff.id)?.name}</td>
        <td>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Attendance Status</Form.Label>
            <Form.Control
              as="select"
              placeholder="Attendance Status"
              value={attendance_status}
              onChange={(e) => setAttendanceStatus(e.target.value)}
            >
              <option value=''>------</option>
              <option value='Present'>Present</option>
              <option value='MC'>MC</option>
              <option value='Absent'>Absent</option>
            </Form.Control>
          </Form.Group>
        </td>
      </tr>
    );
  })}
</tbody>
    </Table>
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
);
} */}

// import { useEffect, useState } from 'react';
// import StaffAPI from '../../API/StaffAPI';
// import AddDateAPI from '../../API/AddDateAPI';
// import { ListGroup, Card, Button, Form } from 'react-bootstrap';
// import axios from 'axios';
// import { useParams } from 'react-router';
// import { Link } from 'react-router-dom';
// import Table from 'react-bootstrap/Table';

// export default function EditStaff() {
//   const params = useParams();
//   const [dates, setDates] = useState([]);
//   const [dateAttendance, setDateAttendance] = useState('');
//   const [id, setId] = useState(null);
//   const [staffs, setStaffs] = useState([]);
//   const [attendanceStatus, setAttendanceStatus] = useState('');

//   useEffect(() => {
//     setId(params.id);
//     dataDate();
//   }, [params.id]);

//   useEffect(() => {
//     fetchStaff();
//   }, []);

//   const fetchStaff = () => {
//     StaffAPI.get('/').then((res) => {
//       setStaffs(res.data);
//     });
//   };

//   const dataDate = () => {
//     axios
//       .get(`http://127.0.0.1:8000/hseapp/datelist/${params.id}/`)
//       .then((res) => {
//         setDates(res.data);
//         setDateAttendance(res.data.date_attendance);
//       })
//       .catch(console.log);
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     let item = { date_attendance: dateAttendance };
//     AddDateAPI.post('/', item).then(() => dataDate());
//   };

//   const onUpdate = (id) => {
//     let item = { date_attendance: dateAttendance };
//     AddDateAPI.patch(`/${id}/`, item).then(() => {
//       setDateAttendance('');
//       dataDate();
//     });
//   };

  // function selectDate(id) {
  //   let item = dates.filter((date) => date.id === id)[0];
  //   setDateAttendance(item.date_attendance);
  //   setId(item.id);
  // }

//   return (
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-4"></div>
//         <div className="col-md-4">
//           <h3 className="float-left">Update Date</h3>
//           <Form onSubmit={onSubmit} className="mt-4">
//             <Form.Group className="mb-3" controlId="formName">
//               <Form.Label>Date Attendance</Form.Label>
//               <Form.Control
//                 type="date"
//                 placeholder="Date"
//                 value={dateAttendance}
//                 onChange={(e) => setDateAttendance(e.target.value)}
//               />
//             </Form.Group>
//             <Table>
//               <thead>
//                 <tr>
//                   <th scope="col" className="col-3">
//                     Name
//                   </th>
//                   <th scope="col" className="col-3">
//                     Status
//                   </th>
//                   <th scope="col" className="col-1">
//                     More Info
//                   </th>
//                   <th scope="col" className="col-1">
//                     Delete
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {staffs.map((staff) => (
//                   <tr key={staff.id}>
//                     <td>{staffs.find((s) => s.id === staff.id)?.name}</td>
//                     <td>
//                       <Form.Group className="mb-3" controlId="formName">
//                         <Form.Label>Attendance Status</Form.Label>
//                         <Form.Control
//                           as="select"
//                           placeholder="Attendance Status"
//                           value={attendanceStatus}
//                           onChange={(e) =>
//                             setAttendanceStatus(e.target.value)
//                           }
//                         >
//                           <option value="">------</option>
//                           <option value="Present">Present</option>
//                           <option value="MC">MC</option>
//                           <option value="Absent">Absent</option>
//                         </Form.Control>
//                       </Form.Group>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//             <div className="mt-3 float-right">
//               <Link to="/stafflist/">
//                 <Button
//                   variant="success"
//                   type="button"
//                   onClick={(e) => onUpdate(id)}
//                   className="mx-2"
//                 >
//                   Update
//                 </Button>
//               </Link>
//             </div>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from 'react';
// import StaffAPI from '../../API/StaffAPI';
// import AddDateAPI from '../../API/AddDateAPI';
// import { ListGroup, Card, Button, Form } from 'react-bootstrap';
// import axios from 'axios';
// import { useParams } from 'react-router';
// import { Link } from 'react-router-dom';
// import Table from 'react-bootstrap/Table';

export default function EditStaff() {
  const params = useParams();
  const [dates, setDates] = useState([]);
  const [dateAttendance, setDateAttendance] = useState('');
  const [id, setId] = useState(null);
  const [staffs, setStaffs] = useState([]);
  // Store attendance status for each staff member separately
  const [attendanceStatuses, setAttendanceStatuses] = useState([]);

  useEffect(() => {
    setId(params.id);
    dataDate();
  }, [params.id]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = () => {
    StaffAPI.get('/').then((res) => {
      setStaffs(res.data);
      // Initialize attendance status for each staff member to an empty string
      setAttendanceStatuses(res.data.map((staff) => ({ id: staff.id, status: '' })));
    });
  };

  const dataDate = () => {
    axios
      .get(`http://127.0.0.1:8000/hseapp/datelist/${params.id}/`)
      .then((res) => {
        setDates(res.data);
        setDateAttendance(res.data.date_attendance);
        setAttendanceStatuses(res.data.attendanceStatuses)
      })
      .catch(console.log);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { date_attendance: dateAttendance , attendanceStatuses};
    AddDateAPI.post('/', item).then(() => dataDate());
  };

  const onUpdate = (id) => {
    let item = { date_attendance: dateAttendance ,attendanceStatuses};
    AddDateAPI.patch(`/${id}/`, item).then(() => {
      setDateAttendance('');
      dataDate();
    });
  };

  const onAttendanceStatusChange = (id, status) => {
    // Update attendance status for the staff member with the given id
    setAttendanceStatuses((statuses) =>
      statuses.map((s) => {
        if (s.id === id) {
          return { id, status };
        } else {
          return s;
        }
      })
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <h3 className="float-left">Update Date</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Date Attendance</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date"
                value={dateAttendance}
                onChange={(e) => setDateAttendance(e.target.value)}
              />
            </Form.Group>
            <Table>
              <thead>
                <tr>
                  <th scope="col" className="col-3">
                    Name
                  </th>
                  <th scope="col" className="col-3">
                    Status
                  </th>
                  <th scope="col" className="col-1">
                    More Info
                  </th>
                  <th scope="col" className="col-1">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {staffs.map((staff) => (
                  <tr key={staff.id}>
                    <td>{staff.name}</td>
                    <td>
                      <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Attendance Status</Form.Label>
                        <Form.Control
                          as="select"
                          placeholder="Attendance Status"
                          value={attendanceStatuses.find((staff) => staff.id === staff.id)?.status}
                          onChange={(e) => onAttendanceStatusChange(staff.id, e.target.value)}
                        >
                          <option value="">------</option>
                          <option value="Present">Present</option>
                          <option value="MC">MC</option>
                          <option value="Absent">Absent</option>
                        </Form.Control>
                      </Form.Group>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
  );
}