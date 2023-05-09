import {useEffect , useState} from 'react'
import SiteHazardAPI from '../../../API/SiteHazardAPI'
import SiteVisitAPI from '../../../API/SiteVisitAPI'
import axios from 'axios'
import { useParams } from 'react-router'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router'

function SiteHazardEdit(props) {
  const params = useParams()
  const [siteHazards , setSiteHazards] = useState([])
  const [siteVisits, setSiteVisits] = useState([])
  const [id, setId] = useState(null)
  // const [visit , setVisit] = useState('')
  const visit = props.sitevisit
  const [hazard , setHazard] = useState('')
  const [status , setStatus] = useState('')
  const [notes , setNotes] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchHazards()
    setId(params.id)
  },[params.id])

  useEffect(() => {
    fetchVisits()
  },[])

  const fetchHazards = () => {
    axios.get(`http://127.0.0.1:8000/hseapp/sitehazard/${params.id}/`)
    .then((res) => {
      setSiteHazards(res.data)
      // setVisit(res.data.visit)
      setHazard(res.data.hazard)
      setStatus(res.data.status)
      setNotes(res.data.notes)
    })
    .catch(console.log)
  }

  const fetchVisits = () => {
    SiteVisitAPI.get('/')
    .then((res) => {
      setSiteVisits(res.data)
    })
    .catch(console.log)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let item = {visit , hazard , status, notes}
    SiteHazardAPI.post('/', item).then(() => fetchHazards());
}

const onUpdate = (id) => {
    let item = {visit , hazard , status, notes}
    SiteHazardAPI.patch(`/${id}/`, item).then(() => { 
        // setVisit('')
        setHazard('')
        setStatus('')
        setNotes('')
        fetchHazards()
      }
    )
    navigate(-1)
  }

  const onDelete = (id) => {
    SiteHazardAPI.delete(`/${id}/`).then((res) => {
        fetchHazards();
    }).catch(console.log)
}

  return (
    <div className="container mt-5">
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="float-left">Create new Site Visit</h3>
              
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
                  {/* <Button
                    variant="primary"
                    type="submit"
                    onClick={onSubmit}
                    className="mx-2"
                  >
                    Save
                  </Button> */}
                  {/* <Link to="/sitevisitlist/"> */}
                  {/* <Link to={`/sitevisitedit/${visit}/`}> */}
                <Button
                  variant="success"
                  type="button"
                  onClick={(e) => onUpdate(id)}
                  className="mx-2"
                >
                  Update
                </Button>
              {/* </Link> */}
                </div>
              </Form>    
            </div>            
          </div>
        </div>
  )
}

export default SiteHazardEdit
