import React , {useEffect, useState , useContext} from 'react'
import IncidentFactorsAPI from '../../../API/IncidentFactorsAPI'
import IncidentInvestigationAPI from '../../../API/IncidentInvestigationAPI'
import IncidentPhotosAPI from '../../../API/IncidentPhotosAPI'
import StaffAPI from '../../../API/StaffAPI'
import axios from 'axios'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link , useNavigate } from 'react-router-dom';
import AuthContext from "../../../context/AuthContext";

function IncidentPhotosAdd(props) {
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
    
    const navigate = useNavigate()

    useEffect(() => {
        fetchIncidentInvestigation()
        fetchIncidentPhoto()
    },[])

    const fetchIncidentInvestigation = () => {
        IncidentInvestigationAPI.get('/')
        .then((res) => {
            setIncidentInvestigations(res.data)
        })
        .catch(console.log)
      }

    const fetchIncidentPhoto = () => {
        IncidentPhotosAPI.get('/')
        .then((res) => {
            setIncidentInvestigations(res.data)
        })
        .catch(console.log)
      }
    
      const willSubmitTheEntryIntoDatabase = (e) => {
        e.preventDefault()
        let item = {
            title,
            description,
            incident_photo,
            incidentinvestigation
        }
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

export default IncidentPhotosAdd
