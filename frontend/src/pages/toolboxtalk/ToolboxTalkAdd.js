import {useEffect , useState} from 'react'
import ToolBoxTalkAPI from '../../API/ToolBoxTalkAPI'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios'
import { Link , useNavigate } from 'react-router-dom';

export default function ToolBoxTalkAdd() {
    const [toolbox_date , setToolBoxDate] = useState('')
    const [topic , setTopic] = useState('')
    const [project , setProject] = useState('')
    const [toolBoxTalks , setToolBoxTalks] = useState([])
    const [id, setId] = useState(null)
    let navigate = useNavigate()

    useEffect(() => {
        fetchToolBoxTalk()
    },[])

    const fetchToolBoxTalk = () => {
        ToolBoxTalkAPI.get('/')
        .then((res) => {
            setToolBoxTalks(res.data)
        })
        .catch(console.log)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let item = {toolbox_date , topic , project}
        // let item = {toolbox_date }
        navigate("/toolboxtalklist");
        ToolBoxTalkAPI.post('/', item).then(() => fetchToolBoxTalk());
    }



    return(
        <div className="container mt-5">
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="float-left">Create a new Staff</h3>
              
              <Form onSubmit={onSubmit} className="mt-4">
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Toolbox Talk Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="ToolBox Talk Date"
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