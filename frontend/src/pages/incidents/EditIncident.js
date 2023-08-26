import {useEffect , useState , useContext} from 'react'
import IncidentAPI from '../../API/IncidentAPI'
import SafetyCardAPI from '../../API/SafetyCardAPI';
import SafetyCardPhotosAPI from '../../API/SafetyCardPhotosAPI';
import IncidentEventPhotosAPI from '../../API/IncidentEventPhotosAPI';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useParams } from 'react-router';
import Table from 'react-bootstrap/Table';
import IncidentEventPhotosAdd from './incidenteventphotos/IncidentEventPhotosAdd';
import AuthContext from "../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'


export default function EditIncident() {
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
    // const [photo_image , setPhotoImage] = useState(null)
    const [id , setId] = useState(null)
    const [incidents , setIncidents] = useState([])
    const [staffs , setStaffs] = useState([])
    const [incidenteventphotos , setIncidentEventPhotos] = useState([])
    // const [safetycardphotos , setSafetyCardPhotos] = useState([])
    const [responsible_party , setResponsibleParty] = useState('')
    const {authTokens} = useContext(AuthContext);
    

    useEffect(() => {
        fetchStaff()
        // fetchIncidentEventPhoto()
        fetchSafetyCardPhotos()
     },[]) 

    //  const fetchIncidentEventPhoto = () => {
    //   IncidentEventPhotosAPI.get('/')
    //   .then((res) => {
    //     setIncidentEventPhotos(res.data)
    //   }).catch(console.log)
    // }
     const fetchSafetyCardPhotos = () => {
      SafetyCardPhotosAPI.get('/')
      .then((res) => {
        setIncidentEventPhotos(res.data)
      }).catch(console.log)
    }


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


    // const dataIncident = () => {
    //   if (params.id) {
    //     axios
    //       .get(`http://127.0.0.1:8000/hseapp/oneincident/${params.id}/`)
    //       .then((res) => {
    //         setIncidents(res.data);
    //         setShortDesc(res.data.short_desc);
    //         setWhatHappened(res.data.what_happened);
    //         setWhyHappened(res.data.why_happened);
    //         setRaisedBy(res.data.raised_by)
    //         setDateRaised(res.data.date_raised)
    //         setLifeSavingRule(res.data.life_saving_rule)
    //         setFindings(res.data.findings)
    //         setIncidentDate(res.data.incident_date)
    //         setLocation(res.data.location)
    //         setDiscussion(res.data.discussion)
    //         setTargetDate(res.data.target_date)
    //         setFollowUp(res.data.follow_up)
    //         setFollowUpRemarks(res.data.follow_up_remarks)
    //         setStatus(res.data.status)
    //         setResponsibleParty(res.data.responsible_party)
    //         setPhotoImage(res.data.photo_image)
    //         console.log(incidents)
    //       })
    //       .catch(console.log);
    //   }
    // };
    const dataIncident = () => {
      if (params.id) {
        axios
          // .get(`http://127.0.0.1:8000/hseapp/oneincident/${params.id}/`)
          .get(`http://127.0.0.1:8000/hseapp/safetycard/${params.id}/`)
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
    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     let item = {short_desc, raised_by , date_raised: date_raised || null  ,findings ,what_happened , why_happened, life_saving_rule, incident_date: incident_date || null, location, discussion, target_date: target_date || null, follow_up, follow_up_remarks, status, responsible_party, photo_image}
        // IncidentAPI.post('/', item).then(() => dataIncident());
//         let token = authTokens.access
//         IncidentAPI.post('/' , item,  {
//                 headers: {
//                   'content-type': 'multipart/form-data',
//                   'Authorization': `Bearer ${token}`
//                 },
//                 responseType: 'blob'
//               })
//               .then(() => dataIncident())  
              
              

//     }
// console.log(authTokens)
    const onSubmit = (e) => {
        e.preventDefault();
        let item = {short_desc, raised_by : raised_by|| null, date_raised: date_raised || null  ,findings ,what_happened , why_happened, life_saving_rule, incident_date: incident_date || null, location, discussion, target_date: target_date || null, follow_up, follow_up_remarks, status, responsible_party}
        // IncidentAPI.post('/', item).then(() => dataIncident());
        let token = authTokens.access
        // IncidentAPI.post('/' , item,  {
        SafetyCardAPI.post('/' , item,  {
                headers: {
                  'content-type': 'multipart/form-data',
                  'Authorization': `Bearer ${token}`
                },
                responseType: 'blob'
              })
              .then(() => dataIncident())  
              
              

    }
console.log(authTokens)

  
const onUpdate = (id) => {
  // let item = {short_desc ,what_happened , why_happened , raised_by, date_raised, life_saving_rule,findings,incident_date , location, discussion , target_date, follow_up , follow_up_remarks , status , responsible_party,  photo_image};
  let item = {short_desc ,what_happened , why_happened , raised_by, date_raised, life_saving_rule,findings,incident_date , location, discussion , target_date, follow_up , follow_up_remarks , status , responsible_party};
  let token = authTokens.access
  // IncidentAPI.patch(`/${id}/`, item , {
  SafetyCardAPI.patch(`/${id}/`, item , {
    headers: {
      'content-type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
    responseType: 'blob'
  })
  .then(() => {
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
    // setPhotoImage('')
    setShortDesc(''); // Reset the short_desc state value after update
    dataIncident();
  });
}
// const onUpdate = (id) => {
//   let item = {short_desc ,what_happened , why_happened , raised_by, date_raised, life_saving_rule,findings,incident_date , location, discussion , target_date, follow_up , follow_up_remarks , status , responsible_party};
//   IncidentAPI.patch(`/${id}/`, item)
//   .then(() => {
//     setWhatHappened('')
//     setWhyHappened('')
//     setRaisedBy('')
//     setDateRaised('')
//     setLifeSavingRule('')
//     setFindings('')
//     setIncidentDate('')
//     setLocation('')
//     setDiscussion('')
//     setTargetDate('')
//     setFollowUp('')
//     setFollowUpRemarks('')
//     setStatus('')
//     setResponsibleParty('')
//     setShortDesc(''); // Reset the short_desc state value after update
//     dataIncident();
//   });
// }
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
        // setPhotoImage(item.photo_image)
        setId(item.id)
    }

    
    // const handleImageChange = (e) => {
    //   setPhotoImage(e.target.files[0]);
    // };

  //   const onDeleteIncidentPhotos = (id) => {
  //     IncidentEventPhotosAPI.delete(`/${id}/`).then((res) => {
  //      fetchIncidentEventPhoto();
  //      }).catch(console.log)
  //  }
  
    const onDeleteIncidentPhotos = (id) => {
      SafetyCardPhotosAPI.delete(`/${id}/`).then((res) => {
       fetchSafetyCardPhotos();
       }).catch(console.log)
   }
  

  return( 
    <div className="container mt-3">
      <div className="d-flex justify-content-center">
        <h1 className="mt-3  mb-3">Update Safety Card</h1>
      </div>
      
        <Form onSubmit={onSubmit} className="update mt-4">
          <div className="row">
            <div className='col-md-6'>
              <div className="row">
                <div className="col-md-10 ">
                
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
                        <option value='(C) Face protection not worn'>(C) Face protection not worn</option>
                        <option value='(D) Ear protection not worn'>(D) Ear protection not worn</option>
                        <option value='(E) Protective clothing not worn'>(E) Protective clothing not worn</option>
                        <option value='(F) Leg/Feet protection not worn'>(F) Leg/Feet protection not worn</option>
                        <option value='(G) Hand protection not worn'>(G) Hand protection not worn</option>
                        <option value='(H) PPE in bad condition'>(H) PPE in bad condition</option>
                        <option value='(I) Wrong PPE for the job'>(I) Wrong PPE for the job</option>
                        <option value='(J) Substandard PPE'>(J) Substandard PPE</option>
                        <option value='(K) PPE not worn properly'>(K) PPE not worn properly</option>
                        <option value='(L) Respiration protection not worn'>(L) Respiration protection not worn</option>
                        <option value='(M) Body Protection not worn'>(M) Body Protection not worn</option>
                        <option value='(N) Wrong tool for the job'>(N) Wrong tool for the job</option>
                        <option value='(O) Tools in bad condition'>(O) Tools in bad condition</option>
                        <option value='(P) Tools not inpected'>(P) Tools not inpected</option>
                        <option value='(Q) Misuse'>(Q) Misuse</option>
                        <option value='(R) Uncertified tools'>(R) Uncertified tools</option>
                        <option value='(S) Too heaving for manual lifting'>(S) Too heaving for manual lifting</option>
                        <option value='(T) Wrong mechanical manual lifting'>(T) Wrong mechanical manual lifting</option>
                        <option value='(U) Lifting tool not inspected'>(U) Lifting tool not inspected</option>
                        <option value='(V) Chemical not properly handled'>(V) Chemical not properly handled</option>
                        <option value='(W) Waste not properly disposed'>(W) Waste not properly disposed</option>
                        <option value='(X) In danger of struck'>(X) In danger of struck</option>
                        <option value='(Y) In danger of striking against'>(Y) In danger of striking against</option>
                        <option value='(Z) In danger of caught by'>(Z) In danger of caught by</option>
                        <option value='(AA) In danger of fall/slip/trip'>(AA) In danger of fall/slip/trip</option>
                        <option value='(BB) In danger of electrocution'>(BB) In danger of electrocution</option>
                        <option value='(CC) In danger of burnt'>(CC) In danger of burnt</option>
                        <option value='(DD) Access obstructed'>(DD) Access obstructed</option>
                        <option value='(EE) Tools/materials disorganized'>(EE) Tools/materials disorganized</option>
                        <option value='(FF) Poor/Improper roping of'>(FF) Poor/Improper roping of</option>
                        <option value='(GG) Accumulation of rubbish'>(GG) Accumulation of rubbish</option>
                        <option value='(HH) Water is being polluted'>(HH) Water is being polluted</option>
                        <option value='(II) Air being polluted'>(II) Air being polluted</option>
                        <option value='(JJ) Too much noise'>(JJ) Too much noise</option>
                        <option value='(KK) Soil being polluted'>(KK) Soil being polluted</option>
                        <option value='(LL) Poor illumination'>(LL) Poor illumination</option>
                        <option value='(MM) Work without permission'>(MM) Work without permission</option>
                        <option value='(NN) Wrong permit'>(NN) Wrong permit</option>
                        <option value='(OO) Procedures / Standard not followed'>(OO) Procedures / Standard not followed</option>
                        <option value='(PP) Wrong instruction on permit'>(PP) Wrong instruction on permit</option>
                        <option value='(QQ) Permit procedure not follow'>(QQ) Permit procedure not follow</option>
                        <option value='(RR) Inadequate HIP'>(RR) Inadequate HIP</option>
                        <option value='(SS) Toolbox talk not given'>(SS) Toolbox talk not given</option>
                        <option value='(TT) Driving recklessly'>(TT) Driving recklessly</option>
                        <option value='(UU) Not wearing seat belt'>(UU) Not wearing seat belt</option>
                        <option value='(VV) Road traffic violation'>(VV) Road traffic violation - eg. Speeding, no entry & ect</option>
                        <option value='(WW) Vehicles / Transportation abuse'>(WW) Vehicles / Transportation abuse</option>
                        <option value='(XX) Not inspected for compliance'>(XX) Not inspected for compliance</option>
                        <option value='(YY) Vehicle defects'>(YY) Vehicle defects</option>
                        <option value='(ZZ) Compliance'>(ZZ) Compliance</option>
                        <option value='(AAA) Behavior & Attitude'>(AAA) Behavior & Attitude</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
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
                        <option value='(3) Not reasing permit'>(3) Not reasing permit</option>
                        <option value='(4) Wrong interpretation of risk'>(4) Wrong interpretation of risk</option>
                        <option value='(5) Wrong instruction'>(5) Wrong instruction</option>
                        <option value='(6) No procedure'>(6) No procedure</option>
                        <option value='(7) Lack of HSE Coaching / training'>(7) Lack of HSE Coaching / training</option>
                        <option value='(8) Behavior & Attitude (intentionally)'>(8) Behavior & Attitude (intentionally)</option>
                        <option value='(9) Negligence'>(9) Negligence</option>
                        <option value='(10) Working condition'>(10) Working condition</option>
                        <option value='(11) Working layout'>(11) Working layout</option>
                        <option value='(12) The design of equipment / tools'>(12) The design of equipment / tools</option>
                        <option value='(13) Work habits'>(13) Work habits</option>
                        <option value='(14) Lack of skill'>(14) Lack of skill</option>
                        <option value='(15) Time pressure'>(15) Time pressure</option>
                        <option value='(16) Not requested'>(16) Not requested</option>
                        <option value='(17) Physical limitations'>(17) Physical limitations</option>
                        <option value='(18) Not supplied/available'>(18) Not supplied/available</option>
                        <option value='(19) Lack of ownership'>(19) Lack of ownership</option>
                        <option value='(20) Behavior & Attitude (not intentionally)'>(20) Behavior & Attitude (not intentionally)</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                      <Form.Label>Date it happened</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Date it happened"
                        value={date_raised}
                        //  onChange={(e) => setDateRaised(e.target.value)}
                        onChange={(e) => {
                          const selectedDate = e.target.value;
                          const formattedDate = selectedDate !== "" ? selectedDate : null;
                          setDateRaised(formattedDate);
                        }}
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
                        <option value='(3) Verify isolation before work begins and use the specific life protecting equipment'>(3) Verify isolation before work begins and use the specific life protecting equipment</option>
                        <option value='(4) Obtain authorization before entering a confined space'>(4) Obtain authorization before entering a confined space</option>
                        <option value='(5) Obatin authorization before overriding or disabiling safety critical equipment'>(5) Obatin authorization before overriding or disabiling safety critical equipment</option>
                        <option value='(6) Protect yourself against a fall when working at height'>(6) Protect yourself against a fall when working at height</option>
                        <option value='(7) Do not walk under a suspended load'>(7) Do not walk under a suspended load</option>
                        <option value='(8) Do not smoke outside designated smoking area'>(8) Do not smoke outside designated smoking area</option>
                        <option value='(9) No alcohol or drugs while working or driving'>(9) No alcohol or drugs while working or driving</option>
                        <option value='(10) While driving , do not use your phone and do not exceed limit'>(10) While driving , do not use your phone and do not exceed limit</option>
                        <option value='(11) Wear your seat belts'>(11) Wear your seat belts</option>
                        <option value='(12) Follow prescribed Journey Management Plan'>(12) Follow prescribed Journey Management Plan</option>
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

                </div>
              </div>
            </div>
            <div class="col">
              <div className="row">
                <div className="col-md-10 ">

                    <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                      <Form.Label>Incident Date</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Incident Date"
                        value={incident_date}
                        //  onChange={(e) => setIncidentDate(e.target.value)}
                        onChange={(e) => {
                          const selectedDate = e.target.value;
                          const formattedDate = selectedDate !== "" ? selectedDate : null;
                          setIncidentDate(formattedDate);
                        }}
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
                        //  onChange={(e) => setTargetDate(e.target.value)}
                        onChange={(e) => {
                          const selectedDate = e.target.value;
                          const formattedDate = selectedDate !== "" ? selectedDate : null;
                          setTargetDate(formattedDate);
                        }}
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
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label>Responsible Party</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Responsible Party"
                        value={responsible_party}
                        onChange={(e) => setResponsibleParty(e.target.value)}
                      />
                    </Form.Group>


                    
            </div>
          </div>
        </div>

        </div>
        <IncidentEventPhotosAdd incidentphoto={params.id}/>

              <h3 className="float-left">Incident Photos</h3>

              <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th scope="col" className="col-1">ID</th>
                        <th scope="col" className="col-2">Title</th>
                        <th scope="col" className="col-4">Description</th>
                        <th scope="col" className="col-3">Image</th>
                        <th scope="col" className="col-1">Edit</th>
                        <th scope="col" className="col-1">Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {incidenteventphotos.filter ((incidenteventphoto) => incidenteventphoto.incident === Number(params.id))
                      .map((incidenteventphoto) => {  
                        return (
                            <tr key={incidenteventphoto.id}>
                                <td>{incidenteventphoto.id}</td>
                                <td>{incidenteventphoto.title}</td>
                                <td>{incidenteventphoto.description}</td>
                                <td><a href={`${incidenteventphoto.incident_photo}`} download={incidenteventphoto.incident_photo}><div className="d-flex justify-content-center"><img className="col-md-6 " src={incidenteventphoto.incident_photo} alt={incidenteventphoto.incident_photo}/></div></a> 
                                </td>
                                <td><Link to={`/incidenteventphotosedit/${incidenteventphoto.id}`}><FontAwesomeIcon icon={faPen } /></Link></td>
                                <td className='delete' onClick={() => onDeleteIncidentPhotos(incidenteventphoto.id)}><FontAwesomeIcon icon={faTrash } /></td>
                            </tr>
                        )
                    })}
                </tbody>
                </Table>  
                  <div className="text-center mt-3 pt-3 pb-5">
                        <Button
                          variant="success"
                          type="button"
                          onClick={(e) => onUpdate(id)}
                          className="mx-2"
                        >
                          Update
                        </Button>
                        <Link  to="/incidenttable/">
                          <Button>Return</Button>
                        </Link>
                      </div>
      </Form>
    </div>
  )
}

