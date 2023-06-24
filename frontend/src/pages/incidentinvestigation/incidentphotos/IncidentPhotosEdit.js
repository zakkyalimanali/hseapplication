import React , {useState , useEffect , useContext} from 'react'

// APIs imports
import IncidentInvestigationAPI from '../../../API/IncidentInvestigationAPI'
import IncidentPhotosAPI from '../../../API/IncidentPhotosAPI'
import axios from 'axios'

// from bootstrap 
import { ListGroup, Card, Button, Form } from "react-bootstrap";

// from react router
import { useParams } from 'react-router-dom';

// Others 
import { useNavigate } from 'react-router'
import AuthContext from "../../../context/AuthContext";

function IncidentPhotosEdit(props) {
    const [incidentinvestigations , setIncidentInvestigations] = useState([])
    const [incidentfactors , setIncidentFactors] = useState([])
    const [staffs , setStaffs] = useState([])
    const [incidentphotos, setIncidentPhotos] = useState([])
    console.log(props)
    const incidentinvestigation = props.incidentinvestigation
    const [id , setId] = useState(null)
    const [title , setTitle] = useState('')
    const [description , setDescription] = useState('')
    const [incident_photo , setIncidentPhoto] = useState(null)
    const {authTokens} = useContext(AuthContext);
    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        fetchIncidentPhoto()
        setId(params.id) 
    },[params.id])

    useEffect(() => {
        fetchIncidentInvestigation()
    },[])

    const fetchIncidentPhoto = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/incidentphotos/${params.id}`)
        .then((res) => {
            setIncidentPhotos(res.data)
            setTitle(res.data.title)
            setDescription(res.data.description)
            setIncidentPhoto(res.data.incident_photo)
        })
        .catch(console.log)
    }

    const fetchIncidentInvestigation = () => {
        IncidentInvestigationAPI.get('/')
        .then((res) => {
          setIncidentInvestigations(res.data)
        })
        .catch(console.log)
      }

      const whenSubmitButtonIsClickedToAddFactor = (e) => {
        e.preventDefault();
        let item = {title, description, incident_photo,  incidentinvestigation }
        navigate(0);
        let token= authTokens.access
        IncidentPhotosAPI.post('/' , item , {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
              },
              responseType: 'blob'
        }) 
        .then(() => fetchIncidentPhoto())
    }
    
    const updateButtonIsClickToUpdateFactorEntry = (id) => {
      let item = {title, description, incident_photo,  incidentinvestigation }
      let token= authTokens.access

      IncidentPhotosAPI.patch(`/${id}/`, item , {
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
          fetchIncidentPhoto()
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
                <h3 className="float-left">Edit Photo</h3>
            
            <Form onSubmit={whenSubmitButtonIsClickedToAddFactor} className="update mt-4">
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
                    // onClick={updateButtonIsClickToUpdateFactorEntry}>
                    onClick= {(e) => updateButtonIsClickToUpdateFactorEntry (id)}
                    className="mx-2">
                      Update
                  </Button>
  
            </Form>

            

            
            </div>
            {/* <div><a href={`http://127.0.0.1:8000/media/post_documents/${hsemanagements.management_commitment_document}`} download>Download</a></div> */}

        </div>

    </div>
  )
}

export default IncidentPhotosEdit
