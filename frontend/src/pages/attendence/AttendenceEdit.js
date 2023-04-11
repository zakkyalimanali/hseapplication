// import {useState , useEffect} from 'react'
// import AttendenceAPI from '../../API/AttendenceAPI'
// import { ListGroup, Card, Button, Form } from "react-bootstrap";
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useParams } from 'react-router';

// export default function AttendenceEdit() {
//     const params = useParams()
//     console.log(params.id)
//     const [attendence_date , setAttendenceDate] = useState('')
//     const [staff_name , setStaffName] = useState('')
//     const [attendence_status , setAttendenceStatus] = useState('')
//     const [attendences ,setAttendences] = useState([])
//     const [staffs, setStaffs] = useState([])
//     const [id , setId] = useState(null)

//     useEffect(() => {
//                 fetchStaff()
//              },[]) 
        
        
//             useEffect(() => {
//                 setId(params.id);
//                 dataAttendence()
//             },[params.id])
        
//              const fetchStaff = () => {
//                  axios.get('http://127.0.0.1:8000/hseapp/staff/')
//                  .then((res) => {
//                      setStaffs(res.data)
//                  })
//                  .catch(console.log)
//              }

//              const dataAttendence = () => {
//                       if (params.id) {
//                         axios
//                           .get(`http://127.0.0.1:8000/hseapp/attendence/${params.id}/`)
//                           .then((res) => {
//                             setAttendences(res.data);
//                             console.log(attendences)
//                           })
//                           .catch(console.log);
//                       }
//                     };
        

//     return(
//         <div>Attendence Edit</div>
//     )
// }





import {useState , useEffect} from 'react'
import AttendenceAPI from '../../API/AttendenceAPI'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router';
import AddDateAPI from '../../API/AddDateAPI';

export default function AttendenceEdit() {
    const params = useParams()
    console.log(params.id)
    const [attendence_date , setAttendenceDate] = useState('')
    const [staff_name , setStaffName] = useState('')
    const [attendence_status , setAttendenceStatus] = useState('')
    const [attendences ,setAttendences] = useState([])
    const [dates , setDates] = useState([])
    const [staffs, setStaffs] = useState([])
    const [id , setId] = useState(null)
    

    useEffect(() => {
        fetchStaff()
        fetchDate()
     },[]) 
    
     const fetchDate = () => {
      AddDateAPI.get('/')
      .then((res) => {
        setDates(res.data)
      })
      .catch(console.log)
     }


    useEffect(() => {
        setId(params.id);
        dataAttendence()
    },[params.id])

     const fetchStaff = () => {
         axios.get('http://127.0.0.1:8000/hseapp/staff/')
         .then((res) => {
             setStaffs(res.data)
         })
         .catch(console.log)
     }


    const dataAttendence = () => {
      if (params.id) {
        axios
          .get(`http://127.0.0.1:8000/hseapp/attendence/${params.id}/`)
          .then((res) => {
            setAttendences(res.data);
            setAttendenceDate(res.data.attendence_date);
            setStaffName(res.data.staff_name);
            setAttendenceStatus(res.data.attendence_status);
            console.log(attendences)
          })
          .catch(console.log);
      }
    };
    const onSubmit = (e) => {
        e.preventDefault();
        let item = {attendence_date , staff_name, attendence_status}
        AttendenceAPI.post('/', item).then(() => dataAttendence());
    }


  
const onUpdate = (id) => {
  let item = {attendence_date , staff_name, attendence_status};
  AttendenceAPI.patch(`/${id}/`, item).then(() => {
    setAttendenceDate('');
    setStaffName('');
    setAttendenceStatus('');
    dataAttendence();
  });
}

const onDelete = (id) => {
    AttendenceAPI.delete(`/${id}/`).then((res) => dataAttendence())
}

function selectAttendence(id) {
    let item = attendences.filter((attendence) => attendence.id === id)[0];
    setAttendenceDate(item.attendence_date)
    setStaffName(item.staff_name)
    setId(item.id)
}



    return(
        <div>
            <h1>Attendence Edit</h1>
                <div className="container mt-5">
            <div className="row">
            <div className= "col-md-2"></div>
                <div className="col-md-8 ">
                    <h3 className="float-center">Update Attendence</h3>
                <Form onSubmit={onSubmit} className="update mt-4">
                    <Form.Group className="mb-3" controlId="formStaffName">
                        <Form.Label>Staff</Form.Label>
                        <Form.Control
                        as ="select"
                        placeholder="Staff"
                        value={staff_name}
                        onChange={(e) => setStaffName(e.target.value)}
                        >
                        <option value=''>Select An Option</option>
                        {staffs.map(staff => {
                        return <option key={staff.id} value={staff.id}>{staff.name}</option>
                        })}
                        </Form.Control>
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                        <Form.Label>Attendence Date</Form.Label>
                        <Form.Control
                        as ="select"
                        placeholder="Date it happened"
                        value={attendence_date}
                        onChange={(e) => setAttendenceDate(e.target.value)}
                        >
                          <option value=''>Select An Option</option>
                        {dates.map(date => {
                        return <option key={date.id} value={date.id}>{date.date_attendence}</option>
                        })}
                        </Form.Control>
                    </Form.Group> */}
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Attendence Date</Form.Label>
                        <Form.Control
                        type="date"
                        placeholder="Date"
                        value={attendence_date}
                        onChange={(e) => setAttendenceDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPosition">
                        <Form.Label>Attendence Status</Form.Label>
                        <Form.Control
                        as="select"
                        value={attendence_status}
                        onChange={(e) => setAttendenceStatus(e.target.value)}
                        >
                        <option value=''>------</option>
                        <option value='Present'>Present</option>
                        <option value='MC'>MC</option>
                        <option value='Absent'>Absent</option>
                        </Form.Control>
                    </Form.Group>



                <div className="mt-3 float-right">
                    <Link to="/attendencelist/">
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
        </div>
    )
}

// import {useEffect , useState} from 'react'
// import AttendenceAPI from '../../API/IncidentAPI'
// import { ListGroup, Card, Button, Form } from "react-bootstrap";
// import { Link } from 'react-router-dom';
// import axios from 'axios'
// import { useParams } from 'react-router';


// export default function EditIncident() {
//     const params = useParams()
//     console.log(params.id);
//     const [attendences ,setAttendences] = useState([])
//     const [attendence_date , setAttendenceDate] = useState('')
//     const [id , setId] = useState(null)


    // useEffect(() => {
    //     fetchStaff()
    //  },[]) 


    // useEffect(() => {
    //     setId(params.id);
    //     dataAttendence()
    // },[params.id])

    //  const fetchStaff = () => {
    //      axios.get('http://127.0.0.1:8000/hseapp/staff/')
    //      .then((res) => {
    //          setStaffs(res.data)
    //      })
    //      .catch(console.log)
    //  }


//     const dataAttendence = () => {
//       if (params.id) {
//         axios
//           .get(`http://127.0.0.1:8000/hseapp/attendenceedit/${params.id}/`)
//           .then((res) => {
//             setAttendences(res.data);
//             setAttendenceDate(res.data.attendence_date);
//             console.log(attendences)
//           })
//           .catch(console.log);
//       }
//     };
//     const onSubmit = (e) => {
//         e.preventDefault();
//         let item = {attendence_date}
//         AttendenceAPI.post('/', item).then(() => dataAttendence());
//     }


  
// const onUpdate = (id) => {
//   let item = {attendence_date};
//   AttendenceAPI.patch(`/${id}/`, item).then(() => {
//     setAttendenceDate('')
//     dataAttendence();
//   });
// }
//     const onDelete = (id) => {
//         AttendenceAPI.delete(`/${id}/`).then((res) => dataAttendence())
//     }
//     function selectIncident(id) {
//         let item = attendences.filter((attendence) => attendence.id === id)[0];
//         setAttendenceDate(item.attendence_date)
//         setId(item.id)
//     }
//     return( 
//     <div className="container mt-5">
//         <div className="row">
//           <div className= "col-md-2"></div>
//             <div className="col-md-8 ">
//                 <h3 className="float-center">Update Attendence</h3>
//             <Form onSubmit={onSubmit} className="update mt-4">
//                 <Form.Group className="mb-3" controlId="formStaffIdNumber=">
//                   <Form.Label>Attendence Date</Form.Label>
//                        <Form.Control
//                          type="date"
//                          placeholder="Date it happened"
//                          value={attendence_date}
//                          onChange={(e) => setAttendenceDate(e.target.value)}
//                          />
//                      </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Write a short Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Short description"
                  value={short_desc}
                  onChange={(e) => setShortDesc(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPosition">
                 <Form.Label>What Happened</Form.Label>
                <Form.Control
                  as="select"
                  value={what_happened}
                   onChange={(e) => setWhatHappened(e.target.value)}
                 >
                   <option value=''>------</option>
                   <option value='(A) Head Protection not worn'>(A) Head Protection not worn</option>
                   <option value='(B) Eye protection not worn'>(B) Eye protection not worn</option>
                 </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Why it happened</Form.Label>
                 <Form.Control
                  as="select"
                  placeholder="Why it happened"
                  value={why_happened}
                 onChange={(e) => setWhyHappened(e.target.value)}
              >
                  <option value=''>------</option>
                  <option value='(1) Not Informed'>(1) Not Informed</option>
                  <option value='(2) Languague Problem'>(2) Languague Problem</option>
                </Form.Control>

              </Form.Group>

              <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Date it happened</Form.Label>
                 <Form.Control
                  type="date"
                  placeholder="Date it happened"
                  value={date_raised}
                   onChange={(e) => setDateRaised(e.target.value)}
                 />
               </Form.Group>

              <Form.Group className="mb-3" controlId="formStaffName">
                <Form.Label>Raised by: </Form.Label>
                <Form.Control
                  as ="select"
                  placeholder="Raised By"
                  value={raised_by}
                  onChange={(e) => setRaisedBy(e.target.value)}
                 >
                <option value=''>Select An Option</option>
                 {staffs.map(staff => {
                   return <option key={staff.id} value={staff.id}>{staff.name}</option>
                 })}
                 </Form.Control>
               </Form.Group>
               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Life Saving Rule</Form.Label>
                 <Form.Control
                   as="select"
                   placeholder="Life Saving Rule"
                   value={life_saving_rule}
                   onChange={(e) => setLifeSavingRule(e.target.value)}
                 >
                   <option value=''>------</option>
                   <option value='(1) Work with a valid work permit when required'>(1) Work with a valid work permit when required</option>
                   <option value='(2) Conduct gas test when required'>(2) Conduct gas test when required</option>
                 </Form.Control>
               </Form.Group>

               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Findings</Form.Label>
                 <Form.Control
                   as="textarea"
                   rows={3}
                   placeholder="Findings"
                   value={findings}
                   onChange={(e) => setFindings(e.target.value)}
                 >
                  
                 </Form.Control>
               </Form.Group>

              <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Incident Date</Form.Label>
                 <Form.Control
                   type="date"
                   placeholder="Incident Date"
                   value={incident_date}
                   onChange={(e) => setIncidentDate(e.target.value)}
                 />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Location</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="Location"
                   value={location}
                   onChange={(e) => setLocation(e.target.value)}
                 />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Discussion</Form.Label>
                 <Form.Control
                   as="textarea"
                   rows={3}
                   placeholder="Discussion"
                   value={discussion}
                   onChange={(e) => setDiscussion(e.target.value)}
                 />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Target Date</Form.Label>
                 <Form.Control
                   type="date"
                   placeholder="Target Date"
                   value={target_date}
                   onChange={(e) => setTargetDate(e.target.value)}
                 />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Follow Up</Form.Label>
                 <Form.Control
                   as="select"
                   placeholder="Follow Up"
                   value={follow_up}
                   onChange={(e) => setFollowUp(e.target.value)}
                 >
                   <option value=''>------</option>
                   <option value='Yes'>Yes</option>
                   <option value='No'>No</option>
                 </Form.Control>
               </Form.Group>
               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Follow Up Remarks</Form.Label>
                 <Form.Control
                   as="textarea"
                   rows={3}
                   placeholder="Follow Up Remarks"
                   value={follow_up_remarks}
                   onChange={(e) => setFollowUpRemarks(e.target.value)}
                 />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value=''>------</option>
                    <option value='No Further Action Required'>No Further Action Required</option>
                    <option value='Resolved'>Resolved</option>
                    <option value='Ongoing'>Ongoing</option>
                  </Form.Control>
                </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Responsible Party</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Responsible Party"
                  value={responsible_party}
                  onChange={(e) => setResponsibleParty(e.target.value)}
                />
              </Form.Group> */}

              {/* <div className="mt-3 float-right"> */}
                {/* <Button
                  variant="primary"
                  type="submit"
                  onClick={onSubmit}
                  className="mx-2"
                >
                  Save
                </Button> */}
                {/* <Link to="/incidenttable/">
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
    ) */}
