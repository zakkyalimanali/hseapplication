import {useState , useEffect, useContext} from 'react'
// API
import IncidentAPI from '../../../API/IncidentAPI';
import SafetyCardAPI from '../../../API/SafetyCardAPI';
import SafetyCardPhotosAPI from '../../../API/SafetyCardPhotosAPI';
import IncidentEventPhotosAPI from '../../../API/IncidentEventPhotosAPI';

import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import AuthContext from "../../../context/AuthContext";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'


function IncidentEventPhotosAdd(props) {
    const [incidents , setIncidents] = useState([])
    const [incidenteventphotos , setIncidentEventPhotos] = useState([])
    const [title , setTitle] = useState('')
    const [description , setDescription] = useState('')
    const [incident_photo , setIncidentPhoto] = useState(null)
    const incident = props.incidentphoto
    const {authTokens} = useContext(AuthContext);
    const [id , setId] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
      fetchIncident()
      fetchIncidentEventPhoto()
    },[])

    const fetchIncident = () => {
      // IncidentAPI.get('/')
     SafetyCardAPI.get('/')
      .then((res) => {
          setIncidents(res.data);
      }).catch(console.log)
  }

    // const fetchIncidentEventPhoto = () => {
    //   IncidentEventPhotosAPI.get('/')
    //   .then((res) => {
    //     setIncidentEventPhotos(res.data)
    //   }).catch(console.log)
    // }
    const fetchIncidentEventPhoto = () => {
      SafetyCardPhotosAPI.get('/')
      .then((res) => {
        setIncidentEventPhotos(res.data)
      }).catch(console.log)
    }

    const willSubmitTheEntryIntoDatabase = (e) => {
      e.preventDefault()
      let item = {
          title,
          description,
          incident_photo,
          incident
      }
      navigate(0);
    //   let token= authTokens.access
    //   IncidentEventPhotosAPI.post('/' , item , {
    //       headers: {
    //           'content-type': 'multipart/form-data',
    //           'Authorization': `Bearer ${token}`
    //         },
    //         responseType: 'blob'
    //   }) 
    //   .then(() => fetchIncidentEventPhoto())
    // }
      let token= authTokens.access
      SafetyCardPhotosAPI.post('/' , item , {
          headers: {
              'content-type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            },
            responseType: 'blob'
      }) 
      .then(() => fetchIncidentEventPhoto())
    }

    const handleImageChange = (e) => {
      setIncidentPhoto(e.target.files[0]);
    };


  


  return (
    <div className="container mt-5">
        <div className="row">
          <div className= "col-md-2"></div>
            <div className="col-md-8 ">
                <h3 className="float-left">Insert New Photo</h3>
            
            <Form onSubmit={willSubmitTheEntryIntoDatabase} className="update mt-4">
               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Title</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="Title"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                 />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Description</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="Description"
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                 />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Incident Evidence</Form.Label>
                <Form.Control
                  type="file"
                  // placeholder="Enter Responsible Party"
                  onChange={handleImageChange}
                />
              </Form.Group>
{/*               
              <Button
                  variant="primary"
                  type="submit"
                  onClick={onSubmit}
                  className="mx-2"
                >
                  <Link className="white" to="/incidenttable">Save</Link>
                </Button> */}
                {/* <Link  onClick={onSubmit} className="white" to="/incidenttable">Save</Link> */}
                  <Button
                    variant="primary"
                    onClick={willSubmitTheEntryIntoDatabase}>
                      Save
                  </Button>
  
            </Form>

            

            
            </div>
            {/* <div><a href={`http://127.0.0.1:8000/media/post_documents/${hsemanagements.management_commitment_document}`} download>Download</a></div> */}

        </div>

    </div>
  )
}

export default IncidentEventPhotosAdd
