import React , {useState , useEffect} from 'react'
import IncidentInvestigationAPI from '../../API/IncidentInvestigationAPI'
import StaffAPI from '../../API/StaffAPI';
import axios from 'axios'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
// import { Link , useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'

function IncidentInvestigationList() {
    const [incidentinvestigations , setIncidentInvestigations] = useState([])
    const [staffs , setStaffs] = useState([])
    const[id , setId] = useState(null)

    useEffect(() => {
        fetchIncidentInvestigation()
        fetchStaff()
    },[]) 

    const fetchIncidentInvestigation = () => {
        IncidentInvestigationAPI.get('/')
        .then((res) => {
            setIncidentInvestigations(res.data)
        })
        .catch(console.log)
    }

    const fetchStaff =() => {
      StaffAPI.get('/')
      .then((res) => {
          setStaffs(res.data)
      })
      .catch(console.log)
  }

    const onDelete = (id) => {
       IncidentInvestigationAPI.delete(`/${id}/`).then((res) => {
        fetchIncidentInvestigation();
        }).catch(console.log)
    }

  return (
    <div className="container mt-5">
        <div className="row">\
        <h1 className="row justify-content-center mt-3">Incident Investigation</h1>
          <div className= "col-md-4"></div>
          <div className="col-md-4 "></div>
      
      <Table striped bordered hover className='mt-3'>
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
            <tbody>
              {/* {siteHazards.map((siteHazard, index) => { */}


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
                        {/* <Button onClick= {toogleShown}>Edit</Button>                                           */}
                    </td>
                    <td className="delete" onClick={() => onDelete(incidentinvestigation.id)}>
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
