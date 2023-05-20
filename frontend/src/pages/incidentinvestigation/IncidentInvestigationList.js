// React dependences
import React , {useState , useEffect} from 'react'
// API from backend
import IncidentInvestigationAPI from '../../API/IncidentInvestigationAPI'
import StaffAPI from '../../API/StaffAPI';
import axios from 'axios'

// react-router-dom items
import { Link , useNavigate} from 'react-router-dom';

// bootstrap itms
import Table from 'react-bootstrap/Table';
import { ListGroup, Card, Button, Form } from "react-bootstrap";

// fontawesome items
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'

// DataTable items
import DataTable from 'react-data-table-component'

// This function's main role is to show a table of incident investigations and to lead to links for adding and editing incident investigations
function IncidentInvestigationList() {
    // setting up the useStates which allow you to change state and allow functionality
    // The 'useState([])' is used to initiate for the API
    const [incidentinvestigations , setIncidentInvestigations] = useState([])
    const [staffs , setStaffs] = useState([])
    const[id , setId] = useState(null)

    // The useEffect() here allows for the functions inside them to be called once
    useEffect(() => {
        fetchIncidentInvestigation()
        fetchStaff()
    },[]) 

    // the function get the url from the backend which allows its data to be used in the frontend
    const fetchIncidentInvestigation = () => {
        IncidentInvestigationAPI.get('/')
        .then((res) => {
            setIncidentInvestigations(res.data)
        })
        .catch(console.log)
    }

    // The fetchStaff is so that staff names can be called
    const fetchStaff =() => {
      StaffAPI.get('/')
      .then((res) => {
          setStaffs(res.data)
      })
      .catch(console.log)
  }

    const forDeletingIncidentInvestigationEntries = (id) => {
       IncidentInvestigationAPI.delete(`/${id}/`).then((res) => {
        fetchIncidentInvestigation();
        }).catch(console.log)
    }
    // the return function is for the html stuff
  return (
    //  fix this below 
    <div className="container mt-5">
        <div className="row">
        {/* This is for the title */}
        <h1 className="row justify-content-center mt-3">Incident Investigation</h1>
          <div className= "col-md-4"></div>
          <div className="col-md-4 "></div>
      <Table striped bordered hover className='mt-3'>
        {/* This is for the table heading */}
          <thead>
              <tr>
                <th scope="col" className="col-1">ID</th>
                <th scope="col" className="col-2">What Happened</th>
                <th scope="col" className="col-2">Task Performed</th>
                <th scope="col" className="col-2">Investigator</th>
                <th scope="col" className="col-3">Location</th>
                <th scope="col" className="col-3">Date of Incident</th> 
                <th scope="col" className="col-1">Edit</th>
                <th scope="col" className="col-1">Delete</th>
              </tr>
            </thead>
            {/* This is for the table body, this takes the incidentinvestigation from above and then uses maps so that each entry can be displayed */}
            <tbody>

              {incidentinvestigations.map((incidentinvestigation) => {
                return (
                  <tr key={incidentinvestigation.id}>
                    
                
                    <td>{incidentinvestigation.id}</td>
                    <td>{incidentinvestigation.what_happened}</td>
                    <td>{incidentinvestigation.task_performed}</td>
                    <td>{staffs.find((staff) => staff.id === incidentinvestigation.investigator)?.name} ({staffs.find((staff) => staff.id === incidentinvestigation.investigator)?.position} ) </td>
                    {/* <td>{incidentinvestigation.investigator}</td> */}
                    <td>{incidentinvestigation.location_of_incident}</td>
                    <td>{incidentinvestigation.date_of_incident}</td>
               




                    <td>
                        <Link to={`/incidentinvestigationedit/${incidentinvestigation.id}`}><FontAwesomeIcon icon={faPen } /></Link>  

                    </td>
                    <td className="delete" onClick={() => forDeletingIncidentInvestigationEntries(incidentinvestigation.id)}>
                      <FontAwesomeIcon icon={faTrash } />
                    </td>
              
                  </tr>
                );
              })}
              
            </tbody>
          </Table> 
          <Button className="middle col-2 mb-4 mt-3" variant="secondary" href="/incidentinvestigationadd">
            Add Incident Investigation
        </Button>

              </div>
    </div>
  )
}

export default IncidentInvestigationList
