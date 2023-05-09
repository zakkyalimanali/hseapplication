import {useEffect , useState} from 'react'
import StaffAPI from '../../../API/StaffAPI'
import AttendeesAPI from '../../../API/AttendeesAPI'
import SiteVisitAPI from '../../../API/SiteVisitAPI'
import axios from 'axios'
import { useParams } from 'react-router'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router'

function AttendeesEdit(props) {
    const params = useParams()
    const [staffs , setStaffs] = useState([])
    const [names , setNames] = useState([])
    const [siteVisits, setSiteVisits] = useState([])
    const [staff_name , setStaffName] = useState('')
    const [id, setId] = useState(null)
    // const [visit , setVisit] = useState('')
    const visit = props.sitevisit
    const navigate = useNavigate()

    useEffect(() => {
        fetchAttendees()
        setId(params.id)

    },[params.id]) 

    useEffect(() => {
        fetchVisits()
        fetchStaff()
      },[])

      const fetchStaff = () => {
        StaffAPI.get('/')
        .then((res) => {
            setStaffs(res.data)
        })
        .catch(console.log)
    }
    
      const fetchAttendees = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/staffadd/${params.id}/`)
        .then((res) => {
          setNames(res.data)
          // setVisit(res.data.visit)
          setStaffName(res.data.staff_name)
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
        let item = {visit, staff_name }
        AttendeesAPI.post('/', item).then(() => fetchAttendees());
    }

    const onUpdate = (id) => {
        let item = {visit , staff_name}
        AttendeesAPI.patch(`/${id}/`, item).then(() => { 
            // setVisit('')
            setStaffName('')
            fetchAttendees()
          }
        )
        navigate(-1)
      }

      const onDelete = (id) => {
        AttendeesAPI.delete(`/${id}/`).then((res) => {
            fetchAttendees();
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

export default AttendeesEdit
