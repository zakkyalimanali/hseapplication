import {useEffect , useState} from 'react'
import { ListGroup, Card, Button, Form } from 'react-bootstrap';
import IncidentAPI from '../API/IncidentAPI';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        <div className="table_main mt-5 col-md-12 m ">
                   {/* <button className="center">
                      <a  href="addincident">Add Incident</a>
                   </button>
                    */}
                    <div class="col-5"></div>
                   {/* <button className="center col-2">
                      <a  href="addincident">Add Incident</a>
                   </button> */}
                   <Button  variant="secondary">
                        <a  className="white" href="addincident">Add Incident</a>
                   </Button>
                   <div class="col-5"></div>
                   
              <table className="table">
                <thead>
                  <tr>
                    {/* <th scope="col">#</th> */}
                    <th scope="col-1">ID</th>
                    <th scope="col-3">Short Desc</th>
                    <th scope="col-3">Date Raised</th>
                    <th scope="col-3">Raised By</th>
                    <th scope="col-1">Edit</th>
                    <th scope="col-1">Delete</th>
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
                              Edit
                            </Link>
                        </td>
  
                        <td>
                          {/* <Link to={`/oneincident/21`}> */}
                          {/* <Link to={`/incidenttable/oneincident/${incident.id}`}>
  
                          <i
                            className="fa fa-pencil-square text-primary d-inline"
                            aria-hidden="true"
                            onClick={(e) => {selectIncident(incident.id)}}
                          >Edit</i>
                          </Link> */}
                          <i
                            className="fa fa-trash-o text-danger d-inline mx-3"
                            aria-hidden="true"
                            onClick={() => onDelete(incident.id)}
                          >Delete</i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
  
            </div>
    )

}
