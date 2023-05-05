import React , {useState, useEffect} from 'react'
import SiteHazardAPI from '../../../API/SiteHazardAPI'
import SiteVisitAPI from '../../../API/SiteVisitAPI'
import axios from 'axios'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link , useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';


function SiteHazardAdd() {
    const [siteHazards , setSiteHazards] = useState([])
    const [siteVisits , setSiteVisits] = useState([])
    const [visit , setVisit] = useState('')
    const [hazard , setHazard] = useState('')
    const [status , setStatus] = useState('')
    const [notes , setNotes] = useState('')
    const [id , setId] = useState(null)
    const navigate = useNavigate()
    // const [elhaz] = useOutletContext    

    useEffect(() => {
        fetchHazard()
        fetchVisit()
    },[])

    const fetchHazard = () => {
        SiteHazardAPI.get('/')
        .then((res) => {
            setSiteHazards(res.data)
        })
        .catch(console.log)
    }

    const fetchVisit = () => {
        SiteVisitAPI.get('/')
        .then((res) => {
            setSiteVisits(res.data)
        })
        .catch(console.log)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let item = {visit, hazard , status , notes }
        navigate(-1);
        SiteHazardAPI.post('/', item).then(() => fetchHazard());
    }



  return (

    <div className="container mt-5">
        {/* {elhaz} */}
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="float-left">Create new Site Hazard</h3>
              
              <Form onSubmit={onSubmit} className="mt-4">
                <Form.Group className="mb-3" controlId="formName">
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
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Hazard</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Hazard"
                    value={hazard}
                    onChange={(e) => setHazard(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
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
                    type="text"
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
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

export default SiteHazardAdd
