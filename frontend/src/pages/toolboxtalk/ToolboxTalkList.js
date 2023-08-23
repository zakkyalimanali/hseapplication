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
import DataTable from 'react-data-table-component'


export default function ToolBoxTalkList() {
    const [records, setRecords] = useState([]);
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

    const columns = [
      {
        name: 'id',
        selector: (row) => row.id,
        sortable: true,
        width: '6rem'
      },
      {
        name: 'date',
        selector: (row) => row.date,
        sortable: true,
      },
      {
        name: 'topic',
        selector: (row) => row.topic,
        sortable: true,
      },
      {
        name: 'project',
        selector: (row) => row.project,
        sortable: true,
      },
      {
        name: 'presenter',
        selector: (row) => row.presenter,
        sortable: true,
      },
      {
        name: 'edit',
        selector: (row) => row.edit,
        width: '6rem'
      },
      {
        name: 'delete',
        selector: (row) => row.delete,
        width: '6rem'
      },
    ];

    const customStyles = {
      headCells : {
        style: {
          border: '1px solid black',
  
        },
          },
      cells : {
        style: {
          border: '1px solid black'
        },
      },
  }

    useEffect(() => {
      const data = toolBoxTalks.map((toolBoxTalk) => {
        // const staff = staffs.find((staff) => staff.id === attendence.staff_id);
        // const staff_name = staff ? staff.name : '';
        // {staffs.find((staff) => staff.id === attendence.staff_name)?.name}
        const person_name = staffs.find((staff) => staff.id === toolBoxTalk.presenter)?.name  
        return {
          id: toolBoxTalk.id,
          date: toolBoxTalk.toolbox_date,
          topic: toolBoxTalk.topic,
          project:toolBoxTalk.project,
          presenter: person_name,
          // attendencestatus: attendence.attendence_status,
          // edit: <FontAwesomeIcon icon={faPen} />,
          edit : 
          // <Link to={`/editincident/${incident.id}`}>
          // <FontAwesomeIcon icon={faPen } />
          // </Link>,
          <Link to={`/toolboxtalkedit/${toolBoxTalk.id}`}><FontAwesomeIcon icon={faPen } /></Link>   ,
          delete: (
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => onDelete(toolBoxTalk.id)}
            />
          ),
        };
      });
      setRecords(data);
    }, [toolBoxTalks, staffs]);

    const handleFilter = (e) => {
      const newData = toolBoxTalks.map((toolBoxTalk) => {
        const person_name = staffs.find((staff) => staff.id === toolBoxTalk.presenter)?.name;
        return {
          ...toolBoxTalk,
          person_name,
        };
      }).filter((attendence) => {
        return attendence.person_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setToolBoxTalks(newData);
    };

    return(
        <div className="row justify-content-center"> 
          <h1 className="row justify-content-center mt-3">Toolbox Talk List</h1>
            <div className="mt-4 col-md-10 m row justify-content-center">
                
        {/* <Button className="middle col-2 mb-4" variant="secondary" href="/toolboxtalkadd">
            Add ToolBox Talk
        </Button> */}

        <div className="row justify-content-around">
        <Button className="middle col-2 mb-4" variant="secondary" href="/toolboxtalkadd">
            Add ToolBox Talk
        </Button>
          <div className="col-md-2 mb-4"><input className="text-center" type="text" placeholder="Search..." onChange={handleFilter}/>
          </div>
        </div>
            
          {/* <Table striped bordered hover>
          <thead>
              <tr> */}
                {/* <th scope="col">#</th> */}
                {/* <th scope="col" class="d-none d-md-table-cell col-1"></th> */}
                {/* <th scope="col" className="col-1">ID</th>
                <th scope="col" className="col-2">Date</th>
                <th scope="col" className="col-3">Topic</th>
                <th scope="col" className="col-3">Project</th>
                <th scope="col" className="col-2">Presenter</th> */}
                {/* <th scope="col" class="d-none d-md-table-cell col-1"></th> */}
                {/* <th>Edit</th>
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
          </Table> */}

          {/* <div className="text-end"><input type="text" onChange={handleFilter}/></div> */}

              <DataTable className='table-container mb-5'
                 customStyles={customStyles}
                 columns={columns}
                 data={records}
                 selectableRows
                 fixedHeader
                 pagination
              >

              </DataTable>


        </div>
    </div>

    )
}