import {useEffect , useState} from 'react'
import { ListGroup, Card, Button, Form } from 'react-bootstrap';
import IncidentAPI from '../API/IncidentAPI';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash  } from '@fortawesome/free-solid-svg-icons'
import { faPen  } from '@fortawesome/free-solid-svg-icons'



export default function IncidentTable() {
    const [incidents , setIncidents] = useState([])
    const [selectedIncident , setSelectedIncident] = useState(null)
    const [staffs , setStaffs] = useState([])

    useEffect(() => {
        fetchIncidents();
        fetchStaff();
    },[])

    const fetchStaff = () => {
      axios.get('http://127.0.0.1:8000/hseapp/staff/')
      .then((res) => {
          setStaffs(res.data)
      })
      .catch(console.log)
  }

    const fetchIncidents = () => {
        IncidentAPI.get('/')
        .then((res) => {
            setIncidents(res.data)
        })
        .catch(console.log) 
    }

    const onDelete = (id) => {
        IncidentAPI.delete(`/${id}/`).then((res) => {
            fetchIncidents();
        }).catch(console.log)
    }

    const selectIncident = (id) => {
        setSelectedIncident(incidents.find((incident) => incident.id === id))
    }

    const clearSelectedIncident = () => {
        setSelectedIncident(null)
    };

    return (
      <div className="row justify-content-center"> 
        
        <Button href="/addincident" variant="secondary" className="ms-10 mt-4 col-md-2 m">
                        Add Incident
        </Button>

        
        <div className="table_main mt-4 col-md-12 m">
                   {/* <button className="center">
                      <a  href="addincident">Add Incident</a>
                   </button>
                    */}
                    
                   {/* <button className="center col-2">
                      <a  href="addincident">Add Incident</a>
                   </button> */}
                   
                   
                   
              
              <Table striped bordered hover>
              <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Short Desc</th>
                    <th scope="col">Date Raised</th>
                    <th scope="col">Raised By</th>
                    <th scope="col">More Info</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((incident, index) => {
                    return (
                      <tr key={incident.id}>
                        <td>{incident.id}</td>
                        <td>{incident.short_desc}</td>

                        <td>{incident.date_raised}</td>
                        {/* <td>{incident.raised_by}</td> */}
                        <td>{staffs.find((staff) => staff.id === incident.raised_by)?.name}</td>
                        <td>
                            <Link to={`/oneincident/${incident.id}`}>
                            <FontAwesomeIcon icon={faPen } />
                            </Link>
                        </td>
  
                        <td className="delete" onClick={() => onDelete(incident.id)}>
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
    )

}
