import {useEffect , useState} from 'react'
import ToolBoxTalkAPI from '../../API/ToolBoxTalkAPI'
import StaffAPI from '../../API/StaffAPI';
import axios from 'axios'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function ToolBoxTalkEdit() {
    const params = useParams()
    const [toolbox_date , setToolBoxDate] = useState('')
    const [topic , setTopic] = useState('')
    const [project , setProject] = useState('')
    const [presenter , setPresenter] = useState('')
    const [supervisor , setSupervisor] = useState('')
    const [time , setTime] = useState('')
    const [crew_number , setCrewNumber] = useState('')
    const [address , setAddress] = useState('')
    const [staffs , setStaffs] = useState([])
    const [toolBoxTalks , setToolBoxTalks] = useState([])
    const [id, setId] = useState(null)

    useEffect(() => {
        setId(params.id)
        fetchToolBoxTalk()
    },[params.id])

    useEffect(() => {
        staffData()
    },[])

    const staffData = () => {
        axios.get('http://127.0.0.1:8000/hseapp/staff/')
        .then((res) => {
            setStaffs(res.data);
        }).catch(console.log)
    }

    const fetchToolBoxTalk = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/toolboxtalk/${params.id}/`)
        .then((res) => {
            setToolBoxTalks(res.data)
            setToolBoxDate(res.data.toolbox_date)
            setTopic(res.data.topic)
            setProject(res.data.project)
            setPresenter(res.data.presenter)
            setSupervisor(res.data.supervisor)
            setTime(res.data.time)
            setCrewNumber(res.data.crew_number)
            setAddress(res.data.address)
        })
        .catch(console.log)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let item = {toolbox_date , topic , project , presenter , supervisor, time , crew_number ,address}
        ToolBoxTalkAPI.post('/', item).then(() => fetchToolBoxTalk());
    }

    const onUpdate = (id) => {
        let item = {toolbox_date , topic, project ,presenter ,supervisor, time, crew_number , address};
        ToolBoxTalkAPI.patch(`/${id}/`, item).then(() => { 
            setToolBoxDate('')
            setTopic('')
            setProject('')
            setPresenter('')
            setSupervisor('')
            setTime('')
            setCrewNumber('')
            setAddress('')
            fetchToolBoxTalk()
          }
        )
      }



    return(
        <div className="container mt-5">
        <div className="row">
          <div className= "col-md-4"></div>
          <div className="col-md-4 ">
            <h3 className="float-left">Create a new Staff</h3>
            
            <Form onSubmit={onSubmit} className="mt-4">
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter date"
                  value={toolbox_date}
                  onChange={(e) => setToolBoxDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Topic</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ToolBox Talk Date"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Project</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ToolBox Talk Date"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Presenter</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="ToolBox Talk Date"
                    value={presenter}
                    onChange={(e) => setPresenter(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name}</option>
                })}

                  </Form.Control>
                </Form.Group>
     
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Supervisor</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="supervisor"
                    value={supervisor}
                    onChange={(e) => setSupervisor(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name}</option>
                })}

                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    placeholder="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Crew Present</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="crew present"
                    value={crew_number}
                    onChange={(e) => setCrewNumber(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
     
            <div className="mt-3 float-right">
              <Link to="/toolboxtalklist/">
                <Button
                  variant="success"
                  type="button"
                  onClick={(e) => onUpdate(id)}
                  className="mx-2"
                >
                  Update
                </Button>
              </Link>
            </div>

          </Form>
          
              
            
        </div>

      </div>
    </div>
    )
}