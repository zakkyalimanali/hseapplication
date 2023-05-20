import React , {useState , useEffect} from 'react'

// APIs imports
import IncidentFactorsAPI from '../../../API/IncidentFactorsAPI'
import IncidentInvestigationAPI from '../../../API/IncidentInvestigationAPI'
import StaffAPI from '../../../API/StaffAPI'
import axios from 'axios'

// from bootstrap 
import Table from 'react-bootstrap/Table';
import { ListGroup, Card, Button, Form } from "react-bootstrap";

// from react router
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';

// from fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'

// Others 
import { useNavigate } from 'react-router'


// We props from the incident investigation edit page so that we can get the corrent incident investigation page
function Incidentfactorsedit(props) {
  // useParams set up
  const params = useParams()

  // setting up the useState([]) for the apis 
  const [incidentfactors , setIncidentFactors ] = useState([])
  const [incidentinvestigations , setIncidentInvestigations] = useState([])
  const [staffs , setStaffs] = useState([])

  // setting up the useState('') to link the models from the backend 
  const [factor , setFactor] = useState('')
  const [type_of_factor , setTypeOfFactor] = useState('')
  const [action_taken , setActionTaken] = useState('')
  const [who_will_fix , setWhoWillFix] = useState('')
  const [when_will_fix , setWhenWillFix] = useState('')
  const [planned_completion_date, setPlannedCompletionDate] = useState('')
  const [id , setId] = useState(null)

  // setting up the incident investigation linked to the incident investigation edit page
  console.log(props)
  const incidentinvestigation = props.incidentinvestigation

  // others
  const navigate = useNavigate()

  // this is so that the fetchIncidentFactor can be called if there is a change on the params which is the individual factor 
  useEffect(() => {
    fetchIncidentFactor()
    setId(params.id)
    
  },[params.id]) 

  useEffect(() => {
    fetchIncidentInvestigation()
    fetchStaff()
  },[])

  // this fetchs the incident factors api, it uses params.id so that the unique entry can be retrived
  // after the then((res) => {}) allows the items inside to be filled up with their existing extries
  const fetchIncidentFactor = () => {
    axios.get(`http://127.0.0.1:8000/hseapp/incidentfactors/${params.id}/`)
    .then((res) => {
      setIncidentFactors(res.data)
      setFactor(res.data.factor)
      setTypeOfFactor(res.data.type_of_factor)
      setActionTaken(res.data.action_taken)
      setWhoWillFix(res.data.who_will_fix)
      setWhenWillFix(res.data.when_will_fix)
      setPlannedCompletionDate(res.data.planned_completion_date)
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

  const fetchStaff = () => {
    StaffAPI.get('/')
    .then((res) => {
      setStaffs(res.data)
    })
    .catch(console.log)
  }
  
  const whenSubmitButtonIsClickedToAddFactor = (e) => {
    e.preventDefault();
    let item = {factor , type_of_factor , action_taken , who_will_fix , when_will_fix, planned_completion_date, incidentinvestigation }
    navigate(0);
    IncidentFactorsAPI.post('/', item).then(() => fetchIncidentFactor());
}

const updateButtonIsClickToUpdateFactorEntry = (id) => {
  let item = {factor , type_of_factor , action_taken , who_will_fix , when_will_fix, planned_completion_date, incidentinvestigation }
  IncidentFactorsAPI.patch(`/${id}/`, item).then(() => { 
      setFactor('')
      setTypeOfFactor('')
      setActionTaken('')
      setWhoWillFix('')
      setWhenWillFix('')
      setPlannedCompletionDate('')
      fetchIncidentFactor()
    }
  )
  navigate(-1)
}

  
  return (
    <div className="container mt-5">
    <div className="row">
        <h3 className="float-left">Create new Site Hazard</h3>
        
        <Form onSubmit={whenSubmitButtonIsClickedToAddFactor} className="mt-4">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Factor</Form.Label>
            <Form.Control
              type="text"
              placeholder="Factor"
              value={factor}
              onChange={(e) => setFactor(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Type Of Factor</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type Of Factor"
              value={type_of_factor}
              onChange={(e) => setTypeOfFactor(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Action Taken</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Action Taken"
              value={action_taken}
              onChange={(e) => setActionTaken(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Who Will Fix It</Form.Label>
            <Form.Control
              as="select"
              placeholder="Who Will Fix It"
              value={who_will_fix }
              onChange={(e) => setWhoWillFix(e.target.value)}
            >
              <option value=''>Select An Option</option>
          {staffs.map(staff => {
            return <option key={staff.id} value={staff.id}>{staff.name} ({staff.position})</option>
          })}

            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formStaffIdNumber=">
          <Form.Label>When will it be fix</Form.Label>
          <Form.Control
            type="date"
            placeholder="When will it be fix"
            value={when_will_fix}
            onChange={(e) => setWhenWillFix(e.target.value)}
          />
        </Form.Group>
          <Form.Group className="mb-3" controlId="formStaffIdNumber=">
          <Form.Label>Planned Completion Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Planned Completion Date"
            value={planned_completion_date }
            onChange={(e) => setPlannedCompletionDate(e.target.value)}
          />
        </Form.Group>

          <div className="mt-3 mb-3 float-right">
          <Button
                  variant="success"
                  type="button"
                  onClick={(e) => updateButtonIsClickToUpdateFactorEntry (id)}
                  className="mx-2"
                >
                  Update
                </Button>
          </div>
        </Form>    
      </div>            
    {/* </div> */}
  </div>
  )
}

export default Incidentfactorsedit
