import React , {useEffect , useState} from 'react'
// APIS
import PermitToWorkAPI from '../../API/PermitToWorkAPI';
import HazardsAndPrecautionsAPI from '../../API/HazardsAndPrecautionsAPI';
import StaffAPI from '../../API/StaffAPI';
import PhysicalControlsAPI from '../../API/PhysicalControlsAPI';
import SignituresAPI from '../../API/SignituresAPI';

import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import HazardsAndPrecautionsAdd from './hazardsandprecautions/HazardsAndPrecautionsAdd';

// Others 
import { useNavigate } from 'react-router'
import PhysicalControlsAdd from './physicalcontrols/PhysicalControlsAdd';
import SignituresAdd from './signitures/SignituresAdd';

function PermitToWorkEdit() {
    const [permittoworks , setPermitToWorks] = useState([])
    const [hazardsandprecautions, setHazardsAndPrecautions] = useState([])
    const [physicalcontrols, setPhysicalControls] = useState([])
    const [signitures, setSignitures] = useState([])
    const [staffs , setStaffs] = useState([])
    const [permit_number , setPermitNumber] = useState('')
    const [location_of_work , setLocationOfWork] = useState('')
    const [nature_of_work, setNatureOfWork] = useState('')
    const [work_start , setWorkStart] = useState('')
    const [work_completed , setWorkCompleted] = useState('')
    const [id , setId] = useState(null)

    const navigate = useNavigate()
    const params = useParams()
    
    useEffect(() => {
        fetchPermitToWork()
        setId(params.id)
    },[params.id])

    useEffect(() => {
        fetchHazardsAndPrecautions()
        fetchPhysicalControls()
        fetchSignitures()
        fetchStaffs()
    },[])

    const fetchStaffs = () => {
      StaffAPI.get('/')
      .then((res) => {
          setStaffs(res.data)
      })
      .catch(console.log)
  }
    const fetchSignitures = () => {
      SignituresAPI.get('/')
      .then((res) => {
          setSignitures(res.data)
      })
      .catch(console.log)
  }

    const fetchHazardsAndPrecautions = () => {
      HazardsAndPrecautionsAPI.get('/')
      .then((res) => {
        setHazardsAndPrecautions(res.data)
      })
      .catch(console.log)
    }

    const fetchPhysicalControls = () => {
      PhysicalControlsAPI.get('/')
      .then((res) => {
          setPhysicalControls(res.data)
      })
      .catch(console.log)
  }


    const fetchPermitToWork = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/permittowork/${params.id}`)
        .then((res) => {
            setPermitToWorks(res.data)
            setPermitNumber(res.data.permit_number)
            setLocationOfWork(res.data.location_of_work)
            setNatureOfWork(res.data.nature_of_work)
            setWorkStart(res.data.work_start)
            setWorkCompleted(res.data.work_completed)
        })
        .catch(console.log)
    }

    const willSubmitTheEntryIntoDatabase = (e) => {
        e.preventDefault()
        let item = {
            permit_number,
            location_of_work,
            nature_of_work,
            work_start : work_start || null,
            work_completed : work_completed || null,
        }
        // navigate(-1);
        PermitToWorkAPI.post('/', item).then(()=> 
            fetchPermitToWork())
            .catch((error) => {
                console.log("Error:", error);
              })

    }

    const toUpdateDatabaseInfo = (id) => {
        let item = {
            permit_number,
            location_of_work,
            nature_of_work,
            work_start : work_start || null,
            work_completed : work_completed || null,
        }
        PermitToWorkAPI.patch(`/${id}/`, item).then(() => {
            setPermitNumber('')
            setLocationOfWork('')
            setNatureOfWork('')
            setWorkStart('')
            setWorkCompleted('')
            fetchPermitToWork()
  
        })
        navigate(-1)
    }

    const forDeletingHazards = (id) => {
      HazardsAndPrecautionsAPI.delete(`/${id}/`).then((res) => {
       fetchHazardsAndPrecautions();
       }).catch(console.log)
   }

    const forDeletingPhysical = (id) => {
      PhysicalControlsAPI.delete(`/${id}/`).then((res) => {
       fetchPhysicalControls();
       }).catch(console.log)
   }

    const forDeletingSigniture = (id) => {
      SignituresAPI.delete(`/${id}/`).then((res) => {
       fetchSignitures();
       }).catch(console.log)
   }


  return (
    <div className="container mt-5 pb-5">
    <div className="row">
      <div className= "col-md-4"></div>
      <div className="col-md-12 ">
        <h3 className="d-flex justify-content-center mt-5">Create a New Permit To Work</h3>
        
        <Form onSubmit={willSubmitTheEntryIntoDatabase} 
        className="mt-4">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Permit Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Permit Number"
              value={permit_number}
              onChange={(e) => setPermitNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Location of Work</Form.Label>
            <Form.Control
              type="text"
              placeholder="Location of Work"
              value={location_of_work}
              onChange={(e) => setLocationOfWork(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nature Of Work</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nature Of Work"
              value={nature_of_work}
              onChange={(e) => setNatureOfWork(e.target.value)}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Work Start</Form.Label>
            <Form.Control
              type="date"
              placeholder="Work Start"
              value={work_start}
              onChange={(e) => {
                  const selectedDate = e.target.value;
                  const formattedDate = selectedDate !== "" ? selectedDate : null;
                  setWorkStart(formattedDate);
                }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Work Completed</Form.Label>
            <Form.Control
              type="date"
              placeholder="Work Completed"
              value={work_completed}
              onChange={(e) => {
                  const selectedDate = e.target.value;
                  const formattedDate = selectedDate !== "" ? selectedDate : null;
                  setWorkCompleted(formattedDate);
                }}
            />
          </Form.Group>

          <HazardsAndPrecautionsAdd permittowork = {params.id} /> 

          <h3 className="float-left mt-3">Hazards and Precautions</h3>

                <Table striped bordered hover className='mt-3'>
                  <thead>
                    <tr>
                        <th scope="col" className="col-2">ID</th>
                        {/* <th scope="col" className="col-2">Job Steps</th> */}
                        <th scope="col" className="col-4">Hazards</th>
                        <th scope="col" className="col-4">Precautions</th>
                        <th scope="col" className="col-1">Edit</th>
                        <th scope="col" className="col-1">Delete</th>
                      </tr>

                  </thead>
                  <tbody>
                  {hazardsandprecautions.filter((hazardsandprecaution)=> hazardsandprecaution.permit_to_work === Number(params.id)).map((hazardsandprecaution) => {
                    return (
                      <tr key={hazardsandprecaution.id}>
                        <td>{hazardsandprecaution.id}</td>
                        {/* <td>{jobsafetystep.job_steps}</td> */}
                        <td>{hazardsandprecaution.hazards}</td>
                        <td>{hazardsandprecaution.precautions}</td>
                        <td><Link to={`/hazardsandprecautionsedit/${hazardsandprecaution.id}`}><FontAwesomeIcon icon={faPen } /></Link></td>
                        {/* <td>Edit</td> */}
                        <td><FontAwesomeIcon
                icon={faTrash}
                onClick={() => forDeletingHazards(hazardsandprecaution.id)}
              /></td>
              {/* <td>Delete</td> */}
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>

          <PhysicalControlsAdd permittowork = {params.id}/>
          <h3 className="float-left mt-3">Physical Controls</h3>

            <Table striped bordered hover className='mt-3'>
              <thead>
                <tr>
                    <th scope="col" className="col-2">ID</th>
                    {/* <th scope="col" className="col-2">Job Steps</th> */}
                    <th scope="col" className="col-4">Control Mechanisms</th>
                    <th scope="col" className="col-4">How Controls Works</th>
                    <th scope="col" className="col-1">Edit</th>
                    <th scope="col" className="col-1">Delete</th>
                  </tr>

              </thead>
              <tbody>
              {physicalcontrols.filter((physicalcontrol)=> physicalcontrol.permit_to_work === Number(params.id)).map((physicalcontrol) => {
                return (
                  <tr key={physicalcontrol.id}>
                    <td>{physicalcontrol.id}</td>
                    {/* <td>{jobsafetystep.job_steps}</td> */}
                    <td>{physicalcontrol.control_mechanisms}</td>
                    <td>{physicalcontrol.control_how_will_it_help}</td>
                    <td><Link to={`/physicalcontrolsedit/${physicalcontrol.id}`}><FontAwesomeIcon icon={faPen } /></Link></td>
                    {/* <td>Edit</td> */}
                    <td><FontAwesomeIcon
            icon={faTrash}
            onClick={() => forDeletingPhysical(physicalcontrol.id)}
            /></td>
            {/* <td>Delete</td> */}
                  </tr>
                )
              })}
              </tbody>
            </Table>

          <SignituresAdd permittowork = {params.id}/>  
          <h3 className="float-left mt-5">Details of Work (Worker)</h3>

          <Table striped bordered hover className='mt-3'>
              <thead>
                <tr>
                    <th scope="col" className="col-2">ID</th>
                    {/* <th scope="col" className="col-2">Job Steps</th> */}
                    <th scope="col" className="col-4">Person Name</th>
                    <th scope="col" className="col-4">Person Signiture</th>
                    {/* <th scope="col" className="col-4">Signiture For</th> */}
                    <th scope="col" className="col-4">Position Class</th>
                    {/* <th scope="col" className="col-4">Date Time Signed</th> */}
                    <th scope="col" className="col-1">Edit</th>
                    <th scope="col" className="col-1">Delete</th>
                  </tr>

              </thead>
              <tbody>
              {signitures.filter((signiture)=> signiture.permit_to_work === Number(params.id) && signiture.signiture_for === 'Details Of Work' && signiture.position_class === 'Worker' ).map((signiture) => {
                return (
                  <tr key={signiture.id}>
                    <td>{signiture.id}</td>
                    {/* <td>{jobsafetystep.job_steps}</td> */}
                    {/* <td>{signiture.person_name}</td> */}
                    {/* <td>{staffs.find((staff) => staff.id === signiture.person_name)?.name}</td> */}
                    <td>{staffs.find((staff) => staff.id === signiture.person_name)?.name} - ({staffs.find((staff) => staff.id === signiture.person_name)?.position})</td>
                    <td>
                      <a href={`${signiture.person_signiture}`} download={signiture.person_signiture}><div className="d-flex justify-content-center"><img className="col-md-6 " src={signiture.person_signiture} alt={signiture.person_signiture}/></div>
                      </a>
                    </td>
                    {/* <td>{signiture.signiture_for}</td> */}
                    <td>{signiture.position_class}</td>
                    {/* <td>{signiture.date_time_signed}</td> */}
                    <td><Link to={`/signituresedit/${signiture.id}`}><FontAwesomeIcon icon={faPen } /></Link></td>
                    {/* <td>Edit</td> */}
                    <td><FontAwesomeIcon
            icon={faTrash}
            onClick={() => forDeletingSigniture(signiture.id)}
            /></td>
            {/* <td>Delete</td> */}
                  </tr>
                )
              })}
              </tbody>
            </Table>
          <h3 className="float-left mt-5">Details of Work (Competent Person)</h3>

          <Table striped bordered hover className='mt-3'>
              <thead>
                <tr>
                    <th scope="col" className="col-2">ID</th>
                    {/* <th scope="col" className="col-2">Job Steps</th> */}
                    <th scope="col" className="col-4">Person Name</th>
                    <th scope="col" className="col-4">Person Signiture</th>
                    {/* <th scope="col" className="col-4">Signiture For</th> */}
                    <th scope="col" className="col-4">Position Class</th>
                    {/* <th scope="col" className="col-4">Date Time Signed</th> */}
                    <th scope="col" className="col-1">Edit</th>
                    <th scope="col" className="col-1">Delete</th>
                  </tr>

              </thead>
              <tbody>
              {signitures.filter((signiture)=> signiture.permit_to_work === Number(params.id) && signiture.signiture_for === 'Details Of Work' && signiture.position_class === 'Compenent Person' ).map((signiture) => {
                return (
                  <tr key={signiture.id}>
                    <td>{signiture.id}</td>
                    {/* <td>{jobsafetystep.job_steps}</td> */}
                    {/* <td>{signiture.person_name}</td> */}
                    {/* <td>{staffs.find((staff) => staff.id === signiture.person_name)?.name}</td> */}
                    <td>{staffs.find((staff) => staff.id === signiture.person_name)?.name} - ({staffs.find((staff) => staff.id === signiture.person_name)?.position})</td>
                    <td>
                      <a href={`${signiture.person_signiture}`} download={signiture.person_signiture}><div className="d-flex justify-content-center"><img className="col-md-6 " src={signiture.person_signiture} alt={signiture.person_signiture}/></div>
                      </a>
                    </td>
                    {/* <td>{signiture.signiture_for}</td> */}
                    <td>{signiture.position_class}</td>
                    {/* <td>{signiture.date_time_signed}</td> */}
                    <td><Link to={`/signituresedit/${signiture.id}`}><FontAwesomeIcon icon={faPen } /></Link></td>
                    {/* <td>Edit</td> */}
                    <td><FontAwesomeIcon
            icon={faTrash}
            onClick={() => forDeletingSigniture(signiture.id)}
            /></td>
            {/* <td>Delete</td> */}
                  </tr>
                )
              })}
              </tbody>
            </Table>
          <h3 className="float-left mt-5">Acceptance</h3>

          <Table striped bordered hover className='mt-3'>
              <thead>
                <tr>
                    <th scope="col" className="col-2">ID</th>
                    {/* <th scope="col" className="col-2">Job Steps</th> */}
                    <th scope="col" className="col-4">Person Name</th>
                    <th scope="col" className="col-4">Person Signiture</th>
                    {/* <th scope="col" className="col-4">Signiture For</th> */}
                    <th scope="col" className="col-4">Position Class</th>
                    {/* <th scope="col" className="col-4">Date Time Signed</th> */}
                    <th scope="col" className="col-1">Edit</th>
                    <th scope="col" className="col-1">Delete</th>
                  </tr>

              </thead>
              <tbody>
              {/* {signitures.filter((signiture)=> signiture.permit_to_work === Number(params.id) && signiture.signiture_for === 'Acceptance').map((signiture) => { */}
              {signitures.filter((signiture)=> signiture.permit_to_work === Number(params.id) && signiture.signiture_for === 'Acceptance' && signiture.position_class === 'Compenent Person' ).map((signiture) => {
              {/* {signitures.filter((signiture)=> signiture.permit_to_work === Number(params.id)).map((signiture) => { */}
                return (
                  <tr key={signiture.id}>
                    <td>{signiture.id}</td>
                    {/* <td>{jobsafetystep.job_steps}</td> */}
                    {/* <td>{signiture.person_name}</td> */}
                    {/* <td>{staffs.find((staff) => staff.id === signiture.person_name)?.name}</td> */}
                    <td>{staffs.find((staff) => staff.id === signiture.person_name)?.name} - ({staffs.find((staff) => staff.id === signiture.person_name)?.position})</td>
                    <td>
                      <a href={`${signiture.person_signiture}`} download={signiture.person_signiture}><div className="d-flex justify-content-center"><img className="col-md-6 " src={signiture.person_signiture} alt={signiture.person_signiture}/></div>
                      </a>
                    </td>
                    {/* <td>{signiture.signiture_for}</td> */}
                    <td>{signiture.position_class}</td>
                    {/* <td>{signiture.date_time_signed}</td> */}
                    <td><Link to={`/signituresedit/${signiture.id}`}><FontAwesomeIcon icon={faPen } /></Link></td>
                    {/* <td>Edit</td> */}
                    <td><FontAwesomeIcon
            icon={faTrash}
            onClick={() => forDeletingSigniture(signiture.id)}
            /></td>
            {/* <td>Delete</td> */}
                  </tr>
                )
              })}
              </tbody>
            </Table>

          <h3 className="float-left mt-5">Completion of Work</h3>

          <Table striped bordered hover className='mt-3'>
              <thead>
                <tr>
                    <th scope="col" className="col-2">ID</th>
                    {/* <th scope="col" className="col-2">Job Steps</th> */}
                    <th scope="col" className="col-4">Person Name</th>
                    <th scope="col" className="col-4">Person Signiture</th>
                    {/* <th scope="col" className="col-4">Signiture For</th> */}
                    <th scope="col" className="col-4">Position Class</th>
                    {/* <th scope="col" className="col-4">Date Time Signed</th> */}
                    <th scope="col" className="col-1">Edit</th>
                    <th scope="col" className="col-1">Delete</th>
                  </tr>

              </thead>
              <tbody>
              {signitures.filter((signiture)=> signiture.permit_to_work === Number(params.id) && signiture.signiture_for === 'Completion' && signiture.position_class === 'Compenent Person' ).map((signiture) => {
                return (
                  <tr key={signiture.id}>
                    <td>{signiture.id}</td>
                    {/* <td>{jobsafetystep.job_steps}</td> */}
                    {/* <td>{signiture.person_name}</td> */}
                    {/* <td>{staffs.find((staff) => staff.id === signiture.person_name)?.name}</td> */}
                    <td>{staffs.find((staff) => staff.id === signiture.person_name)?.name} - ({staffs.find((staff) => staff.id === signiture.person_name)?.position})</td>
                    <td>
                      <a href={`${signiture.person_signiture}`} download={signiture.person_signiture}><div className="d-flex justify-content-center"><img className="col-md-6 " src={signiture.person_signiture} alt={signiture.person_signiture}/></div>
                      </a>
                    </td>
                    {/* <td>{signiture.signiture_for}</td> */}
                    <td>{signiture.position_class}</td>
                    {/* <td>{signiture.date_time_signed}</td> */}
                    <td><Link to={`/signituresedit/${signiture.id}`}><FontAwesomeIcon icon={faPen } /></Link></td>
                    {/* <td>Edit</td> */}
                    <td><FontAwesomeIcon
            icon={faTrash}
            onClick={() => forDeletingSigniture(signiture.id)}
            /></td>
            {/* <td>Delete</td> */}
                  </tr>
                )
              })}
              </tbody>
            </Table>


          <h3 className="float-left mt-5">Final Sign Off</h3>

          <Table striped bordered hover className='mt-3'>
              <thead>
                <tr>
                    <th scope="col" className="col-2">ID</th>
                    {/* <th scope="col" className="col-2">Job Steps</th> */}
                    <th scope="col" className="col-4">Person Name</th>
                    <th scope="col" className="col-4">Person Signiture</th>
                    {/* <th scope="col" className="col-4">Signiture For</th> */}
                    <th scope="col" className="col-4">Position Class</th>
                    {/* <th scope="col" className="col-4">Date Time Signed</th> */}
                    <th scope="col" className="col-1">Edit</th>
                    <th scope="col" className="col-1">Delete</th>
                  </tr>

              </thead>
              <tbody>
              {signitures.filter((signiture)=> signiture.permit_to_work === Number(params.id) && signiture.signiture_for === 'Final Sign Off' && signiture.position_class === 'Authorizer' ).map((signiture) => {
                return (
                  <tr key={signiture.id}>
                    <td>{signiture.id}</td>
                    {/* <td>{jobsafetystep.job_steps}</td> */}
                    {/* <td>{signiture.person_name}</td> */}
                    {/* <td>{staffs.find((staff) => staff.id === signiture.person_name)?.name}</td> */}
                    <td>{staffs.find((staff) => staff.id === signiture.person_name)?.name} - ({staffs.find((staff) => staff.id === signiture.person_name)?.position})</td>
                    <td>
                      <a href={`${signiture.person_signiture}`} download={signiture.person_signiture}><div className="d-flex justify-content-center"><img className="col-md-6 " src={signiture.person_signiture} alt={signiture.person_signiture}/></div>
                      </a>
                    </td>
                    {/* <td>{signiture.signiture_for}</td> */}
                    <td>{signiture.position_class}</td>
                    {/* <td>{signiture.date_time_signed}</td> */}
                    <td><Link to={`/signituresedit/${signiture.id}`}><FontAwesomeIcon icon={faPen } /></Link></td>
                    {/* <td>Edit</td> */}
                    <td><FontAwesomeIcon
            icon={faTrash}
            onClick={() => forDeletingSigniture(signiture.id)}
            /></td>
            {/* <td>Delete</td> */}
                  </tr>
                )
              })}
              </tbody>
            </Table>


          

          <div className="mt-3 float-right">
            {/* <Button
              variant="primary"
              type="submit"
              onClick={willSubmitTheEntryIntoDatabase}
              className="mx-2"
            >
              Save
            </Button> */}
            <Button
                    variant="warning"
                    type="button"
                    onClick={(e) => toUpdateDatabaseInfo(id)}
                    className="mx-2"
                  >
                    Update
                  </Button>
          </div>
        </Form>    
      </div>            
    </div>
  </div>
  )
}

export default PermitToWorkEdit
