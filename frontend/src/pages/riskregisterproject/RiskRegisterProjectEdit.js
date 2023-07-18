import React , {useEffect , useState} from 'react'
// APIS
import RiskRegisterProjectAPI from '../../API/RiskRegisterProjectAPI';
import StaffAPI from '../../API/StaffAPI';
import RiskRegisterAPI from '../../API/RiskRegisterAPI';
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import RiskRegisterAdd from './riskregister/RiskRegisterAdd';


// Others 
import { useNavigate } from 'react-router'

function RiskRegisterProjectEdit() {
    const [riskregisterprojects , setRiskRegisterProjects] = useState([])
    const [riskregisters , setRiskRegisters] = useState([])
    const [staffs , setStaffs] = useState([])
    const [project_name , setProjectName] = useState('')
    const [raised_by , setRaisedBy] = useState('')
    const [reviewed_by , setReviewedBy] = useState('')
    const [id , setId] = useState(null)
    const navigate = useNavigate()
    const params = useParams()

    useEffect( () => {
        fetchStaff()
        fetchRiskRegister()
    },[])

    const fetchStaff = () => {
        StaffAPI.get('/')
        .then((res) => {
            setStaffs(res.data)
        })
        .catch(console.log)
    }

    const fetchRiskRegister = () => {
        RiskRegisterAPI.get('/')
        .then((res) => {
            setRiskRegisters(res.data);
        }).catch(console.log)
    }


    useEffect(() => {
        fetchRiskRegisterProject()
        setId(params.id)
    },[params.id]) 

    const fetchRiskRegisterProject = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/riskregisterproject/${params.id}`)
        .then((res) => {
            setRiskRegisterProjects(res.data)
            setProjectName(res.data.project_name)
            setRaisedBy(res.data.raised_by)
            setReviewedBy(res.data.reviewed_by)
        })
        .catch(console.log)
    }

    const willSubmitTheEntryIntoDatabase = (e) => {
        e.preventDefault()
        let item = {
            project_name,
            raised_by : raised_by || null,
            reviewed_by: reviewed_by || null,
        }
        navigate(-1);
        RiskRegisterProjectAPI.post('/', item).then(()=> 
            fetchRiskRegisterProject())
            .catch((error) => {
                console.log("Error:", error);
              })
    }

    const toUpdateDatabaseInfo = (id) => {
        let item = {
            project_name,
            raised_by : raised_by || null,
            reviewed_by: reviewed_by || null,
        }
    RiskRegisterProjectAPI.patch(`/${id}/`, item).then(() => {
        setProjectName('')
        setRaisedBy('')
        setReviewedBy('')
        fetchRiskRegisterProject()
    })
    navigate(-1)
    }


  return (
    <div className="container mt-5 pb-5">
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="float-left mt-5">Edit Project</h3>
              
              <Form onSubmit={willSubmitTheEntryIntoDatabase} 
              className="mt-4">
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Project Name"
                    value={project_name}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Raised By</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Raised By"
                    value={raised_by}
                    onChange={(e) => setRaisedBy(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name} ({staff.position})</option>
                })}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Reviewed By</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Reviewed By"
                    value={reviewed_by}
                    onChange={(e) => setReviewedBy(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name} ({staff.position})</option>
                })}
                  </Form.Control>
                </Form.Group>
                
        

                

                <div className="mt-3 float-right">
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
          <RiskRegisterAdd projectlist = {params.id}/>
        </div>
  )
}

export default RiskRegisterProjectEdit
