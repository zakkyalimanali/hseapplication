import {useEffect , useState} from 'react'
import ToolBoxTalkAPI from '../../API/ToolBoxTalkAPI'
import axios from 'axios'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
// import { Link , useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'


export default function ToolBoxTalkList() {
    const [toolBoxTalks , setToolBoxTalks] = useState([])
    const [id, setId] = useState(null)
    // const navigate = useNavigate()

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

    const onDelete = (id) => {
        ToolBoxTalkAPI.delete(`/${id}/`).then((res) => {
            fetchToolBoxTalk();
        }).catch(console.log)
    }

    return(
        <div className="row justify-content-center"> 
            <div className="mt-4 col-md-10 m row justify-content-center">
                
        <Button className="middle col-2 mb-4" variant="secondary" href="/toolboxtalkadd">
            Add ToolBox Talk
        </Button>
            
          <Table striped bordered hover>
          <thead>
              <tr>
                {/* <th scope="col">#</th> */}
                {/* <th scope="col" class="d-none d-md-table-cell col-1"></th> */}
                <th scope="col" className="col-3">ID</th>
                <th scope="col" className="col-3">Date</th>
                <th scope="col" className="col-3">Topic</th>
                <th scope="col" className="col-3">Project</th>
                {/* <th scope="col" class="d-none d-md-table-cell col-1"></th> */}
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {toolBoxTalks.map((toolBoxTalk, index) => {
                return (
                  <tr key={toolBoxTalk.id}>
                
                    <td>{toolBoxTalk.id}</td>
                    <td>{toolBoxTalk.toolbox_date}</td>
                    <td>{toolBoxTalk.topic}</td>
                    <td>{toolBoxTalk.project}</td>
                    <td>
                        <Link to={`/toolboxtalkedit/${toolBoxTalk.id}`}><FontAwesomeIcon icon={faPen } /></Link>                                            
                    </td>
                    <td className="delete" onClick={() => onDelete(toolBoxTalk.id)}>
                      <FontAwesomeIcon icon={faTrash } />
                    </td>
              
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
    </div>

    )
}