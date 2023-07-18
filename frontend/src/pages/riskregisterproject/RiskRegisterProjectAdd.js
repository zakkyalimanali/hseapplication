import {useState , useEffect, useContext} from 'react'
import RiskRegisterProjectAPI from '../../API/RiskRegisterProjectAPI';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import StaffAPI from '../../API/StaffAPI';

import React from 'react'

function RiskRegisterProjectAdd() {
    const [riskregisterprojects , setRiskRegisterProjects] = useState([])
    const [staffs , setStaffs] = useState([])
    const [project_name , setProjectName] = useState('')
    const [raised_by , setRaisedBy] = useState('')
    // const [reviewed_by , setReviewedBy] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchRiskRegisterProject()
        fetchStaff()
    },[])
    
    const fetchRiskRegisterProject = () => {
        RiskRegisterProjectAPI.get('/')
        .then((res) => {
            setRiskRegisterProjects(res.data)
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

    const willSubmitTheEntryIntoDatabase = (e) => {
        e.preventDefault()
        let item = {
            project_name,
            raised_by : raised_by || null,
            // reviewed_by: reviewed_by || null,
        }
        navigate(-1);
        RiskRegisterProjectAPI.post('/', item).then(()=> 
            fetchRiskRegisterProject())
            .catch((error) => {
                console.log("Error:", error);
              })
    }




  return (
    <div className="container mt-5 pb-5">
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="float-left mt-5">Create a New Permit To Work</h3>
              
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
                {/* <Form.Group className="mb-3" controlId="formName">
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
                </Form.Group> */}
                
        

                

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

export default RiskRegisterProjectAdd
