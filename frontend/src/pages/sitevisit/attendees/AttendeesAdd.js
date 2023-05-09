import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SiteVisitAPI from '../../../API/SiteVisitAPI';
import StaffAPI from '../../../API/StaffAPI'
import AttendeesAPI from '../../../API/AttendeesAPI';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link , useNavigate } from 'react-router-dom';

function AttendeesAdd(props) {
    const [siteVisits , setSiteVisits] = useState([])
    const [staffs , setStaffs] = useState([])
    const [names , setNames] = useState([])
    const [staff_name , setStaffName] = useState('')
    const visit = props.sitevisit
    const [id , setId] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchSiteVisit()
        fetchStaff()
        fetchAttendees()
    },[])

    const fetchSiteVisit = () => {
        SiteVisitAPI.get('/')
        .then((res) => {
            setSiteVisits(res.data)
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
    const fetchAttendees = () => {
        AttendeesAPI.get('/')
        .then((res) => {
            setNames(res.data)
        })
        .catch(console.log)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let item = {visit, staff_name }
        // navigate(-1);
        navigate(0);
        AttendeesAPI.post('/', item).then(() => fetchAttendees());
    }




  return (
    <div className="container mt-5">
        {/* {elhaz} */}
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="float-left">Create new Site Hazard</h3>
              
              <Form onSubmit={onSubmit} className="mt-4">
                {/* <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Visit</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Visit"
                    value={visit}
                    onChange={(e) => setVisit(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                    {siteVisits.map(siteVisit => {
                  return <option key={siteVisit.id} value={siteVisit.id}>{siteVisit.inspection_date} / {siteVisit.location}</option>
                })}


                  </Form.Control>
                </Form.Group> */}
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Staff</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Staff Name"
                    value={staff_name}
                    onChange={(e) => setStaffName(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name}</option>
                })}
                  </Form.Control>
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
                </Form.Group> */}
                
                
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

export default AttendeesAdd
