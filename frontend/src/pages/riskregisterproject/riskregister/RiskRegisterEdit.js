import React ,{useState, useEffect , useContext} from 'react'
import RiskRegisterAPI from '../../../API/RiskRegisterAPI';
import StaffAPI from '../../../API/StaffAPI';
import { useParams } from 'react-router'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'


function RiskRegisterEdit() {
    const [riskregisters , setRiskRegisters] = useState([])
    const [staffs , setStaffs] = useState([])
    const [id, setId] = useState(null)
    // const [date_raised, setDateRaised] = useState('') 
    const [raised_by , setRaisedBy] = useState('')
    const [reviewed_by , setReviewedBy] = useState('')
    const [risk_description, setRiskDescription] = useState('') 
    const [likelihood_of_risk, setLikelihoodOfRisk] = useState('') 
    const [impact_of_risk, setImpactOfRisk] = useState('') 
    const [severity,setSeverity] = useState('') 
    const [responsible_party, setResponsibleParty] = useState('') 
    const [mitigating_action, setMitigatingAction] = useState('') 
    const [contingency_action, setContingencyAction] = useState('') 
    const [progress_on_actions, setProgressOnActions] = useState('') 
    const [status, setStatus] = useState('') 
    let navigate = useNavigate();
    const params = useParams()

    useEffect(() => {
        fetchRiskRegister()
        setId(params.id)
    },[params.id]) 

    useEffect(() => {
      fetchStaff()
    },[])

    const fetchStaff = () => {
      StaffAPI.get('/')
      .then((res) => {
        setStaffs(res.data)
      })
      .catch(console.log)
    }

    const fetchRiskRegister = () =>{
        axios.get(`http://127.0.0.1:8000/hseapp/riskregister/${params.id}`)
        .then((res) => {
            setRiskRegisters(res.data)
            // setDateRaised(res.data.date_raised)
            setRaisedBy(res.data.raised_by)
            setReviewedBy(res.data.reviewed_by)
            setRiskDescription(res.data.risk_description)
            setLikelihoodOfRisk(res.data.likelihood_of_risk)
            setImpactOfRisk(res.data.impact_of_risk)
            setSeverity(res.data.severity)
            setResponsibleParty(res.data.responsible_party)
            setMitigatingAction(res.data.mitigating_action)
            setContingencyAction(res.data.contingency_action)
            setProgressOnActions(res.data.progress_on_actions)
            setStatus(res.data.status)
        })
        .catch(console.log)
    }

    const willSubmitTheEntryIntoDatabase = (e) => {
        e.preventDefault()
        let item = {
            // date_raised : date_raised || null, 
            raised_by : raised_by || null,
            reviewed_by : reviewed_by || null,
            risk_description,
            likelihood_of_risk,
            impact_of_risk,
            severity,
            responsible_party,
            mitigating_action,
            contingency_action,
            progress_on_actions,
            status,
        }
        // navigate(-1);
        RiskRegisterAPI.post('/', item).then(() => fetchRiskRegister())


    }

    const willUpdateRiskOnDatabase = (id) => {
        let item = {
            // date_raised : date_raised || null, 
            raised_by : raised_by || null,
            reviewed_by : reviewed_by || null,
            risk_description,
            likelihood_of_risk,
            impact_of_risk,
            severity,
            responsible_party,
            mitigating_action,
            contingency_action,
            progress_on_actions,
            status,
        }
        RiskRegisterAPI.patch(`/${id}/`, item).then(() => {
            // setDateRaised('')
            setRaisedBy('')
            setReviewedBy('')
            setRiskDescription('')
            setLikelihoodOfRisk('')
            setImpactOfRisk('')
            setSeverity('')
            setResponsibleParty('')
            setMitigatingAction('')
            setContingencyAction('')
            setProgressOnActions('')
            setStatus('')
            fetchRiskRegister()
        }
        )
        navigate(-1)

    }

  return (
    <div className="container mt-5">
    <div className="row">
      <div className= "col-md-4"></div>
      <div className="col-md-4 ">
        <h3 className="float-left">Create a Risk Registar</h3>
        
        <Form onSubmit={willSubmitTheEntryIntoDatabase} 
        className="mt-4">
          {/* <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Date Raised</Form.Label>
            <Form.Control
              type="date"
              placeholder="Equipment / Item"
              value={date_raised}
              onChange={(e) => {
                  const selectedDate = e.target.value;
                  const formattedDate = selectedDate !== "" ? selectedDate : null;
                  setDateRaised(formattedDate);
                }}
            />
          </Form.Group> */}
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
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Risk Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Risk_Description"
              value={risk_description}
              onChange={(e) => setRiskDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Likelihood Of Risk</Form.Label>
            <Form.Control
              type="text"
              placeholder="Likelihood Of Risk"
              value={likelihood_of_risk}
              onChange={(e) => setLikelihoodOfRisk(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Impact Of Risk</Form.Label>
            <Form.Control
              type="text"
              placeholder="Impact Of Risk"
              value={impact_of_risk}
              onChange={(e) => setImpactOfRisk(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Severity</Form.Label>
            <Form.Control
              type="text"
              placeholder="Severity"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Responsible Party</Form.Label>
            <Form.Control
              type="text"
              placeholder="Responsible Party"
              value={responsible_party}
              onChange={(e) => setResponsibleParty(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Mitigating Action</Form.Label>
            <Form.Control
              type="text"
              placeholder="Mitigating Action"
              value={mitigating_action}
              onChange={(e) => setMitigatingAction(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Contingency Action</Form.Label>
            <Form.Control
              type="text"
              placeholder="Contingency Action"
              value={contingency_action}
              onChange={(e) =>  setContingencyAction(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Progress on Actions</Form.Label>
            <Form.Control
              type="text"
              placeholder="Progress On Actions"
              value={progress_on_actions}
              onChange={(e) => setProgressOnActions(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </Form.Group>



        
 
          
          
          <div className="mt-3 float-right">
                  <Button
                    variant="warning"
                    type="button"
                    onClick={(e) => willUpdateRiskOnDatabase(id)}
                    className="mx-2 mb-3"
                  >
                    Update
                  </Button>
                </div>
        </Form>    
      </div>            
    </div>
  </div>
  )
}

export default RiskRegisterEdit
