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
    const [staffs , setStaffs] = useState([])
    const [toolBoxTalks , setToolBoxTalks] = useState([])
    const [id, setId] = useState(null)

    useEffect(() => {
        setId(params.id)
        fetchToolBoxTalk()
    },[params.id])

    const fetchToolBoxTalk = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/toolboxtalk/${params.id}/`)
        .then((res) => {
            setToolBoxTalks(res.data)
            setToolBoxDate(res.data.toolbox_date)
            setTopic(res.data.topic)
            setProject(res.data.project)
        })
        .catch(console.log)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let item = {toolbox_date , topic , project}
        ToolBoxTalkAPI.post('/', item).then(() => fetchToolBoxTalk());
    }

    const onUpdate = (id) => {
        let item = {toolbox_date , topic, project};
        ToolBoxTalkAPI.patch(`/${id}/`, item).then(() => { 
            setToolBoxDate('')
            setTopic('')
            setProject('')
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