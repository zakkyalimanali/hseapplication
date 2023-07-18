import React , {useState , useEffect , useContext} from 'react'

// APIs imports
import IncidentAPI from '../../../API/IncidentAPI';
import SafetyCardAPI from '../../../API/SafetyCardAPI';
import IncidentEventPhotosAPI from '../../../API/IncidentEventPhotosAPI';
import axios from 'axios'

// from bootstrap 
import { ListGroup, Card, Button, Form } from "react-bootstrap";

// from react router
import { useParams } from 'react-router-dom';


// Others 
import { useNavigate } from 'react-router'
import AuthContext from "../../../context/AuthContext";

function IncidentEventPhotosEdit(props) {
    const [incidents , setIncidents] = useState([])
    const [incidenteventphotos , setIncidentEventPhotos] = useState([])
    const [title , setTitle] = useState('')
    const [description , setDescription] = useState('')
    const [incident_photo , setIncidentPhoto] = useState(null)
    const incident = props.incidentphoto
    const {authTokens} = useContext(AuthContext);
    const [id , setId] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetchIncidentEventPhoto()
        setId(params.id)
    },[params.id])

    const fetchIncidentEventPhoto = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/incidenteventphotos/${params.id}`)
        .then((res) => {
            setIncidentEventPhotos(res.data)
            setTitle(res.data.title)
            setDescription(res.data.description)
            setIncidentPhoto(res.data.incident_photo)
        })
    }

    useEffect(() => {
        fetchIncident()
    },[])

    const fetchIncident = () => {
        // IncidentAPI.get('/')
        SafetyCardAPI.get('/')
        .then((res) => {
            setIncidents(res.data);
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
        let token= authTokens.access
        IncidentEventPhotosAPI.post('/' , item , {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
              },
              responseType: 'blob'
        }) 
        .then(() => fetchIncidentEventPhoto())
      }


    const updateEntryToDatabase = (id) => {
        let item = {
            title,
            description,
            incident_photo,
            incident
        }
        let token= authTokens.access
  
        IncidentEventPhotosAPI.patch(`/${id}/`, item , {
          headers: {
              'content-type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            },
            responseType: 'blob'
      }) 
        .then(() => { 
            setTitle('')
            setDescription('')
            setIncidentPhoto('')
            fetchIncidentEventPhoto()
          }
        )
        navigate(-1)
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
                <Form.Label>Incident Photo</Form.Label>
                <Form.Control
                  type="file"
                  // placeholder="Enter Responsible Party"
                  onChange={handleImageChange}
                />
              </Form.Group>
                <Button
                    variant="primary"
                    onClick= {(e) => updateEntryToDatabase (id)}
                    className="mx-2">
                      Update
                  </Button>
            </Form>
            </div>
        </div>
    </div>
  )
}

export default IncidentEventPhotosEdit
