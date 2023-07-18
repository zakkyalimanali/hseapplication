import {useState , useEffect, useContext} from 'react'
import RiskRegisterAPI from '../../../API/RiskRegisterAPI';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import StaffAPI from '../../../API/StaffAPI';
// import AuthContext from "../../context/AuthContext";

function RiskRegisterAdd(props) {
    const [riskregisters , setRiskRegisters] = useState([])
    const [staffs , setStaffs] = useState([])
    const [id, setId] = useState(null)
    const project_name = props.projectlist
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

    useEffect(() => {
        fetchRiskRegister()
        fetchStaff()
    },[])

    const fetchRiskRegister = () => {
        RiskRegisterAPI.get('/')
        .then((res) => {
            setRiskRegisters(res.data);
        }).catch(console.log)
    }

    const fetchStaff = () => {
      StaffAPI.get('/')
      .then((res) => {
        setStaffs(res.data)
      }).catch(console.log)
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
            project_name,

        }
        navigate(-1);
        RiskRegisterAPI.post('/', item).then(() => fetchRiskRegister())


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
                    variant="primary"
                    type="submit"
                    onClick={willSubmitTheEntryIntoDatabase}
                    className="mx-2"
                  >
                    Save
                  </Button>
                </div>
              </Form>    
            </div>            
          </div>
        </div>
  )
}

export default RiskRegisterAdd
