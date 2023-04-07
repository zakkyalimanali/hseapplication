// import {useEffect , useState} from 'react'
// import IncidentAPI from '../API/IncidentAPI'
// import { ListGroup, Card, Button, Form } from "react-bootstrap";
// import axios from 'axios'
// import StaffAPI from '../API/StaffAPI';
// import { useParams } from 'react-router';

// export default function OneIncident() {
//     const params = useParams()
//     console.log(params.id);
//     const [short_desc , setShortDesc] = useState('')
//     const [what_happened , setWhatHappened] = useState('')
//     const [why_happened , setWhyHappened] = useState('')
//     const [date_raised , setDateRaised] = useState('')
//     const [raised_by , setRaisedBy] = useState('')
//     const [life_saving_rule , setLifeSavingRule] = useState('')
//     const [findings , setFindings] = useState('')
//     const [incident_date , setIncidentDate] = useState('')
//     const [location , setLocation] = useState('')
//     const [discussion, setDiscussion] = useState('')
//     const [target_date  , setTargetDate] = useState('')
//     const [follow_up , setFollowUp] = useState('')
//     const [follow_up_remarks , setFollowUpRemarks] = useState('')
//     const [status , setStatus] = useState('')
//     const [id , setId] = useState(null)
//     const [incidents , setIncidents] = useState([])
//     const [staffs , setStaffs] = useState([])
 
//     // useEffect(() => {
//     //     dataIncident()
//     //     fetchStaff()
//     // }, [params.id])

//     useEffect(() => {
//         fetchStaff()
//     },[]) 

//     useEffect(() => {
//         setId(params.id);
//         dataIncident()
//     },[params.id])
//     // useEffect(() => {
//     //     dataIncident()
//     //     fetchStaff()
//     // },[])

//     // const dataIncident = () => {
//     //     IncidentAPI.get(`/${params.incident_id}`)
//     //     .then((res) => {
//     //         setIncidents(res.data)
//     //     })
//     //     .catch(console.log)
//     // }
//     // const dataIncident = () => {
//     //     IncidentAPI.get(`/${params.id}`)
//     //     .then((res) => {
//     //         setIncidents(res.data)
//     //     })
//     //     .catch(console.log)
//     // }

//     const dataIncident = () => {
//       if (params.id) {
//         axios
//           .get(`http://127.0.0.1:8000/hseapp/oneincident/${params.id}/`)
//           .then((res) => {
//             setIncidents(res.data);
//             setShortDesc(res.data.short_desc);
//             setWhatHappened(res.data.what_happened);
//             setDateRaised(res.data.date_raised);
//             setRaisedBy(res.data.raised_by);
//             setLifeSavingRule(res.data.life_saving_rule);
//             setFindings(res.data.findings);
//             console.log(incidents)
//           })
//           .catch(console.log);
//       }
//     };

//     const fetchStaff = () => {
//         axios.get('http://127.0.0.1:8000/hseapp/staff/')
//         .then((res) => {
//             setStaffs(res.data)
//         })
//         .catch(console.log)
//     }

//     const onSubmit = (e) => {
//         e.preventDefault();
//         let item = {short_desc, what_happened, why_happened , date_raised , raised_by, life_saving_rule, findings, incident_date, location , discussion , target_date , follow_up,follow_up_remarks, status }
//         IncidentAPI.post('/', item).then(() => dataIncident());
//     }

//     // const onSubmit = (e) => {
//     //   e.preventDefault();
//     //   let item = {short_desc, what_happened, why_happened , date_raised , raised_by, life_saving_rule, findings, incident_date, location , discussion , target_date , follow_up,follow_up_remarks, status }
//     //   IncidentAPI.post('/', item)
//     //     .then(() => {
//     //       dataIncident();
//     //     })
//     //     .catch((error) => {
//     //       console.error('Error saving incident:', error);
//     //     });
//     // }

//     const onUpdate = (id) => {
//         let item = {short_desc, what_happened, why_happened , date_raised , raised_by, life_saving_rule, findings, incident_date, location, discussion, target_date , follow_up, follow_up_remarks, status};
//         // IncidentAPI.patch(`/${id}/`, item).then((res) => dataIncident())
//         IncidentAPI.patch(`/${id}/`, item).then(() => {setShortDesc(''); dataIncident()});
//       }

//     const onDelete = (id) => {
//         IncidentAPI.delete(`/${id}/`).then((res) => dataIncident())
//     }

//     function selectIncident(id) {
//         let item = incidents.filter((incident) => incident.id === id)[0];
//         setShortDesc(item.short_desc)
//         setWhatHappened(item.what_happened)
//         setWhyHappened(item.why_happened)
//         setDateRaised(item.date_raised)
//         setRaisedBy(item.raised_by)
//         setLifeSavingRule(item.life_saving_rule)
//         setFindings(item.findings)
//         setIncidentDate(item.incident_date)
//         setLocation(item.location)
//         setDiscussion(item.discussion)
//         setTargetDate(item.target_date)
//         setFollowUp(item.follow_up)
//         setFollowUpRemarks(item.follow_up_remarks)
//         setStatus(item.status)
//         setId(item.id)
//     }

//     return(
//       // <div>{JSON.stringify(incidents)}</div>
//       // <div>{incidents.raised_by}</div>

//     <div className="container mt-5">
//         <div className="row">
//           <div className= "col-md-4"></div>
//             <div className="col-md-4 ">
//                 <h3 className="float-left">Create a new Incident</h3>
            
//             <Form onSubmit={onSubmit} className="mt-4">
//               <Form.Group className="mb-3" controlId="formName">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter Name"
//                   value={short_desc}
//                   onChange={(e) => setShortDesc(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formPosition">
//                 <Form.Label>What Happened</Form.Label>
//                 <Form.Control
//                   as="select"
//                   value={what_happened}
//                   onChange={(e) => setWhatHappened(e.target.value)}
//                 >
//                   <option value={''}>------</option>
//                   <option value={'(A) Head Protection not worn'}>(A) Head Protection not worn</option>
//                   <option value={'(B) Eye protection not worn'}>(B) Eye protection not worn</option>
//                 </Form.Control>
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
//                 <Form.Label>Why it happened</Form.Label>
//                 <Form.Control
//                   as="select"
//                   placeholder="Enter Staff Id Number"
//                   value={why_happened}
//                   onChange={(e) => setWhyHappened(e.target.value)}
//                 >
//                   <option value={''}>------</option>
//                   <option value={'(1) Not Informed'}>(1) Not Informed</option>
//                   <option value={'(2) Languague Problem'}>(2) Languague Problem</option>
//                 </Form.Control>

//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
//                 <Form.Label>Date it happend</Form.Label>
//                 <Form.Control
//                   type="date"
//                   placeholder="Enter Staff Id Number"
//                   value={date_raised}
//                   onChange={(e) => setDateRaised(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formStaffName">
//                 <Form.Label>Raised by: </Form.Label>
//                 <Form.Control
//                   as ="select"
//                   // placeholder="Enter Staff Name"
//                   value={raised_by}
//                   onChange={(e) => setRaisedBy(e.target.value)}
//                 >
//                 <option>Select An Option</option>
//                 {staffs.map(staff => {
//                   return <option key={staff.id} value={staff.id}>{staff.name}</option>
//                 })}
//                 </Form.Control>
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
//                 <Form.Label>Life Saving Rule</Form.Label>
//                 <Form.Control
//                   as="select"
//                   placeholder="Enter Staff Id Number"
//                   value={life_saving_rule}
//                   onChange={(e) => setLifeSavingRule(e.target.value)}
//                 >
//                   <option value={''}>------</option>
//                   <option value={'(1) Work with a valid work permit when required'}>(1) Work with a valid work permit when required</option>
//                   <option value={'(2) Conduct gas test when required'}>(2) Conduct gas test when required</option>
//                 </Form.Control>
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
//                 <Form.Label>Findings</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Findings"
//                   value={findings}
//                   onChange={(e) => setFindings(e.target.value)}
//                 >
                  
//                 </Form.Control>
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
//                 <Form.Label>Incident Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   placeholder="Incident Date"
//                   value={incident_date}
//                   onChange={(e) => setIncidentDate(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
//                 <Form.Label>Location</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Location"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
//                 <Form.Label>Discussion</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Discussion"
//                   value={discussion}
//                   onChange={(e) => setDiscussion(e.target.value)}
//                 />
//               </Form.Group>
  
//               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
//                 <Form.Label>Target Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   placeholder="Target Date"
//                   value={target_date}
//                   onChange={(e) => setTargetDate(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
//                 <Form.Label>Follow Up</Form.Label>
//                 <Form.Control
//                   as="select"
//                   placeholder="Follow Up"
//                   value={follow_up}
//                   onChange={(e) => setFollowUp(e.target.value)}
//                 >
//                   <option value={''}>------</option>
//                   <option value={'Yes'}>Yes</option>
//                   <option value={'No'}>No</option>
//                 </Form.Control>
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
//                 <Form.Label>Follow Up Remarks</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Follow Up Remarks"
//                   value={follow_up_remarks}
//                   onChange={(e) => setFollowUpRemarks(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
//                 <Form.Label>Status</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Target Date"
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                 />
//               </Form.Group>
  
//               <div className="mt-3 float-right">
//                 <Button
//                   variant="primary"
//                   type="submit"
//                   onClick={onSubmit}
//                   className="mx-2"
//                 >
//                   Save
//                 </Button>
//                 <Button
//                   variant="success"
//                   type="button"
//                   onClick={(e) => onUpdate(id)}
//                   className="mx-2"
//                 >
//                   Update
//                 </Button>
//               </div>
  
//             </Form>
            
//           </div>
//         </div>
//       </div>
//     )
// }






import {useEffect , useState} from 'react'
import IncidentAPI from '../API/IncidentAPI'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useParams } from 'react-router';


export default function OneIncident() {
    const params = useParams()
    console.log(params.id);
    const [short_desc , setShortDesc] = useState('')
    const [what_happened , setWhatHappened] = useState('')
    const [why_happened , setWhyHappened] = useState('')
    const [date_raised , setDateRaised] = useState('')
    const [raised_by , setRaisedBy] = useState('')
    const [life_saving_rule , setLifeSavingRule] = useState('')
    const [findings , setFindings] = useState('')
    const [incident_date , setIncidentDate] = useState('')
    const [location , setLocation] = useState('')
    const [discussion, setDiscussion] = useState('')
    const [target_date  , setTargetDate] = useState('')
    const [follow_up , setFollowUp] = useState('')
    const [follow_up_remarks , setFollowUpRemarks] = useState('')
    const [status , setStatus] = useState('')
    const [id , setId] = useState(null)
    const [incidents , setIncidents] = useState([])
    const [staffs , setStaffs] = useState([])
    const [responsible_party , setResponsibleParty] = useState('')
    

    useEffect(() => {
        fetchStaff()
     },[]) 


    useEffect(() => {
        setId(params.id);
        dataIncident()
    },[params.id])

     const fetchStaff = () => {
         axios.get('http://127.0.0.1:8000/hseapp/staff/')
         .then((res) => {
             setStaffs(res.data)
         })
         .catch(console.log)
     }


    const dataIncident = () => {
      if (params.id) {
        axios
          .get(`http://127.0.0.1:8000/hseapp/oneincident/${params.id}/`)
          .then((res) => {
            setIncidents(res.data);
            setShortDesc(res.data.short_desc);
            setWhatHappened(res.data.what_happened);
            setWhyHappened(res.data.why_happened);
            setRaisedBy(res.data.raised_by)
            setDateRaised(res.data.date_raised)
            setLifeSavingRule(res.data.life_saving_rule)
            setFindings(res.data.findings)
            setIncidentDate(res.data.incident_date)
            setLocation(res.data.location)
            setDiscussion(res.data.discussion)
            setTargetDate(res.data.target_date)
            setFollowUp(res.data.follow_up)
            setFollowUpRemarks(res.data.follow_up_remarks)
            setStatus(res.data.status)
            setResponsibleParty(res.data.responsible_party)
            console.log(incidents)
          })
          .catch(console.log);
      }
    };
    const onSubmit = (e) => {
        e.preventDefault();
        let item = {short_desc , what_happened, why_happened , raised_by , date_raised, life_saving_rule,findings ,incident_date , location, discussion , target_date, follow_up, follow_up_remarks , status, responsible_party}
        IncidentAPI.post('/', item).then(() => dataIncident());
    }


  
const onUpdate = (id) => {
  let item = {short_desc ,what_happened , why_happened , raised_by, date_raised, life_saving_rule,findings,incident_date , location, discussion , target_date, follow_up , follow_up_remarks , status , responsible_party};
  IncidentAPI.patch(`/${id}/`, item).then(() => {
    setWhatHappened('')
    setWhyHappened('')
    setRaisedBy('')
    setDateRaised('')
    setLifeSavingRule('')
    setFindings('')
    setIncidentDate('')
    setLocation('')
    setDiscussion('')
    setTargetDate('')
    setFollowUp('')
    setFollowUpRemarks('')
    setStatus('')
    setResponsibleParty('')
    setShortDesc(''); // Reset the short_desc state value after update
    dataIncident();
  });
}
    const onDelete = (id) => {
        IncidentAPI.delete(`/${id}/`).then((res) => dataIncident())
    }
    function selectIncident(id) {
        let item = incidents.filter((incident) => incident.id === id)[0];
        setShortDesc(item.short_desc)
        setWhatHappened(item.what_happened)
        setWhyHappened(item.why_happened)
        setRaisedBy(item.raised_by)
        setDateRaised(item.date_raised)
        setLifeSavingRule(item.life_saving_rule)
        setFindings(item.findings)
        setIncidentDate(item.incident_date)
        setLocation(item.location)
        setDiscussion(item.discussion)
        setTargetDate(item.target_date)
        setFollowUp(item.follow_up)
        setFollowUpRemarks(item.follow_up_remarks)
        setStatus(item.status)
        setResponsibleParty(item.responsible_party)
        setId(item.id)
    }
    return( 
    <div className="container mt-5">
        <div className="row">
          <div className= "col-md-2"></div>
            <div className="col-md-8 ">
                <h3 className="float-center">Update an Incident</h3>
            <Form onSubmit={onSubmit} className="update mt-4">
              <Form.Group className="mb-3" controlId="formName">
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
              </Form.Group>

              <div className="mt-3 float-right">
                {/* <Button
                  variant="primary"
                  type="submit"
                  onClick={onSubmit}
                  className="mx-2"
                >
                  Save
                </Button> */}
                <Link to="/incidenttable/">
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

