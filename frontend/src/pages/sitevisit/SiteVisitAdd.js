import React , {useEffect, useState} from 'react'
import SiteVisitAPI from '../../API/SiteVisitAPI'
import StaffAPI from '../../API/StaffAPI'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios'
import { Link , useNavigate } from 'react-router-dom';

function SiteVisitAdd() {
    const [siteVisits , setSiteVisits] = useState([])
    const [staffs , setStaffs] = useState([])
    const [inspector, setInspector] = useState('')
    const [inspection_date , setInspectionDate] = useState('')
    const [inspection_time , setInspectionTime] = useState('')
    const [location , setLocation] = useState('') 
    const [id , setId] = useState(null)
    let navigate = useNavigate()

    useEffect(() => {
        fetchSiteVisit()
        fetchStaff()
    },[])

    const fetchSiteVisit =() => {
        SiteVisitAPI.get('/')
        .then((res) => {
            setSiteVisits(res.data)
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

    const onSubmit = (e) => {
        e.preventDefault();
        let item = {inspector , inspection_date , location ,inspection_time}
        navigate("/sitevisitlist");
        SiteVisitAPI.post('/', item).then(() => fetchSiteVisit());
    }

  return (
    <div className="container pb-5 mt-3">
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="d-flex justify-content-center mt-3">Create new Site Visit</h3>
              
              <Form onSubmit={onSubmit} className="mt-4">
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Inspection Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Inspection Date"
                    value={inspection_date}
                    onChange={(e) => setInspectionDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Inspector</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="ToolBox Talk Date"
                    value={inspector}
                    onChange={(e) => setInspector(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name}</option>
                })}

                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Inspection Time</Form.Label>
                  <Form.Control
                    type="time"
                    placeholder="time"
                    value={inspection_time}
                    onChange={(e) => setInspectionTime(e.target.value)}
                  />
                </Form.Group>

                <div className="mt-3 float-right">
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
          </div>
        </div>
  )
}

export default SiteVisitAdd
