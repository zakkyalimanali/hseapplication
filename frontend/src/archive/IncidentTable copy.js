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
                   <button className="center col-2">
                      <a  href="addincident">Add Incident</a>
                   </button>
                   <div class="col-5"></div>
                   
              <table className="table">
                <thead>
                  <tr>
                    {/* <th scope="col">#</th> */}
                    <th scope="col">ID</th>
                    <th scope="col">Short Desc</th>
                    <th scope="col">What Happened</th>
                    <th scope="col">Why Happened</th>
                    <th scope="col">Date Raised</th>
                    <th scope="col">Raised By</th>
                    <th scope="col">LSR</th>
                    <th scope="col">Findings</th>
                    <th scope="col">Incident Date</th>
                    <th scope="col">Location</th>
                    <th scope="col">Discussion</th>
                    <th scope="col">Target Date</th>
                    <th scope="col">Follow Up</th>
                    <th scope="col">Follow Up Remarks</th>
                    <th scope="col">Status</th>
                    <th scope='col'>Party</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((incident, index) => {
                    return (
                      <tr key={incident.id}>
                        <td>{incident.id}</td>
                        <td>{incident.short_desc}</td>
                        <td>{incident.what_happened}</td>
                        <td>{incident.why_happened}</td>
                        <td>{incident.date_raised}</td>
                        {/* <td>{incident.raised_by}</td> */}
                        <td>{staffs.find((staff) => staff.id === incident.raised_by)?.name}</td>
                        <td>{incident.life_saving_rule}</td>
                        <td>{incident.findings }</td>
                        <td>{incident.incident_date }</td>
                        <td>{incident.location }</td>
                        <td>{incident.discussion }</td>
                        <td>{incident.target_date }</td>
                        <td>{incident.follow_up }</td>
                        <td>{incident.follow_up_remarks }</td>
                        <td>{incident.status }</td>
                        <td>{incident.responsible_party }</td>
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
