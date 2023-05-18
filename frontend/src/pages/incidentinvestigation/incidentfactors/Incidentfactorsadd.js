import React , {useEffect, useState} from 'react'
import IncidentFactorsAPI from '../../../API/IncidentFactorsAPI'
import IncidentInvestigationAPI from '../../../API/IncidentInvestigationAPI'
import StaffAPI from '../../../API/StaffAPI'
import axios from 'axios'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link , useNavigate } from 'react-router-dom';

function Incidentfactorsadd(props) {
  const [incidentinvestigations , setIncidentInvestigations] = useState([])
  const [incidentfactors , setIncidentFactors] = useState([])
  const [staffs , setStaffs] = useState([])
  const [factor , setFactor] = useState('')
  const [type_of_factor , setTypeOfFactor] = useState('')
  const [action_taken , setActionTaken] = useState('')
  const [who_will_fix , setWhoWillFix] = useState('')
  const [when_will_fix , setWhenWillFix] = useState('')
  const [planned_completion_date, setPlannedCompletionDate] = useState('')
  console.log(props)
  const incidentinvestigation = props.incidentinvestigation
  const [id , setId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchStaff()
    fetchIncidentFactor()
    fetchIncidentInvestigation()
  },[])

  const fetchIncidentInvestigation = () => {
    IncidentInvestigationAPI.get('/')
    .then((res) => {
        setIncidentInvestigations(res.data)
    })
    .catch(console.log)
  }

  const fetchStaff =() => {
    StaffAPI.get('/')
    .then((res) => {
        setStaffs(res.data)
    })
    .catch(console.log)
  }

  const fetchIncidentFactor = () => {
    IncidentFactorsAPI.get('/')
    .then((res) => {
      setIncidentFactors(res.data)
    })
    .catch(console.log)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let item = {factor , type_of_factor , action_taken , who_will_fix , when_will_fix, planned_completion_date, incidentinvestigation }
    navigate(0);
    IncidentFactorsAPI.post('/', item).then(() => fetchIncidentFactor());
}



  return (
    <div className="container mt-5">
          <div className="row">
            {/* <div className= "col-md-4"></div>
            <div className="col-md-4 "> */}
              <h3 className="float-left">Create new Site Hazard</h3>
              
              <Form onSubmit={onSubmit} className="mt-4">
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

                {/* <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                    <option value='yes'>Yes</option>
                    <option value='no'>No</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Notes"
                    rows={5}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </Form.Group>
                 */}
                
                <div className="mt-3 mb-3 float-right">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={onSubmit}
                    className="mx-2"
                  >
                    Save
                  </Button>
                </div>
              </Form>    
            </div>            
          {/* </div> */}
        </div>
  )
}

export default Incidentfactorsadd
