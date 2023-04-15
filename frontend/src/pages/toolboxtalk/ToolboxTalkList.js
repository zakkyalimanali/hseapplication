import {useEffect , useState} from 'react'
import ToolBoxTalkAPI from '../../API/ToolBoxTalkAPI'
import StaffAPI from '../../API/StaffAPI';
import axios from 'axios'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
// import { Link , useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'


export default function ToolBoxTalkList() {
    const [toolBoxTalks , setToolBoxTalks] = useState([])
    const [staffs , setStaffs] = useState([])
    const [id, setId] = useState(null)
    // const navigate = useNavigate()

    useEffect(() => {
        fetchToolBoxTalk()
        staffData()
    },[])

    const fetchToolBoxTalk = () => {
        ToolBoxTalkAPI.get('/')
        .then((res) => {
            setToolBoxTalks(res.data)
        })
        .catch(console.log)
    }

    const staffData = () => {
      axios.get('http://127.0.0.1:8000/hseapp/staff/')
      .then((res) => {
          setStaffs(res.data);
      }).catch(console.log)
  }

    const onDelete = (id) => {
        ToolBoxTalkAPI.delete(`/${id}/`).then((res) => {
            fetchToolBoxTalk();
        }).catch(console.log)
    }

    return(
        <div className="row justify-content-center"> 
          <h1 className="row justify-content-center mt-3">Toolbox Talk List</h1>
            <div className="mt-4 col-md-10 m row justify-content-center">
                
        <Button className="middle col-2 mb-4" variant="secondary" href="/toolboxtalkadd">
            Add ToolBox Talk
        </Button>
            
          <Table striped bordered hover>
          <thead>
              <tr>
                {/* <th scope="col">#</th> */}
                {/* <th scope="col" class="d-none d-md-table-cell col-1"></th> */}
                <th scope="col" className="col-1">ID</th>
                <th scope="col" className="col-2">Date</th>
                <th scope="col" className="col-3">Topic</th>
                <th scope="col" className="col-3">Project</th>
                <th scope="col" className="col-2">Presenter</th>
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
                    <td>{staffs.find((staff) => staff.id === toolBoxTalk.presenter)?.name}</td>
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