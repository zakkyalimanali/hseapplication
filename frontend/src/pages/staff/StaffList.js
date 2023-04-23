import {useEffect , useState} from 'react'
import { ListGroup, Card, Button, Form } from 'react-bootstrap';
import StaffAPI from '../../API/StaffAPI';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'

export default function StaffList() {
    const [records, setRecords] = useState([]);
    const [staffs , setStaffs] = useState([])
    const [selectedStaff , setSelectedStaff] = useState([])

    useEffect(() => {
        fetchStaff();
    },[])

    const fetchStaff = () => {
        StaffAPI.get('/')
        .then((res) => {
            setStaffs(res.data)
        })
        .catch(console.log)
    }

    const onDelete = (id) => {
        StaffAPI.delete(`/${id}/`).then((res) => {
            fetchStaff();
        }).catch(console.log)
    }

    const columns = [
      {
        name: 'name',
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: 'position',
        selector: (row) => row.position,
        sortable: true,
      },
      {
        name: 'staff_id',
        selector: (row) => row.staff_id,
        sortable: true,
      },
      {
        name: 'gender',
        selector: (row) => row.gender,
        sortable: true,
      },
      {
        name: 'leave_left',
        selector: (row) => row.leave_left,
        sortable: true,
      },
      {
        name: 'edit',
        selector: (row) => row.edit,
      },
      {
        name: 'delete',
        selector: (row) => row.delete,
      },
    ];

    useEffect(() => {
      const data =staffs.map((staff) => {
        // const staff = staffs.find((staff) => staff.id === attendence.staff_id);
        // const staff_name = staff ? staff.name : '';
        // {staffs.find((staff) => staff.id === attendence.staff_name)?.name}
        // const person_name = staffs.find((staff) => staff.id === incident.raised_by)?.name  
        return {
          name: staff.name,
          position : staff.position,
          staff_id: staff.staff_id_number,
          gender: staff.gender,
          leave_left: staff.yearly_leave_left,
          // attendencestatus: attendence.attendence_status,
          // edit: <FontAwesomeIcon icon={faPen} />,
          edit : <Link to={`/editstaff/${staff.id}`}><FontAwesomeIcon icon={faPen } /></Link>  ,
          delete: (
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => onDelete(staff.id)}
            />
          ),
        };
      });
      setRecords(data);
    }, [staffs]);


    const handleFilter = (e) => {
      const newData = records.filter(row => {
    
        return  row.name.toLowerCase().includes(e.target.value.toLowerCase())

    });
      setRecords(newData);
    };
   

    return(
        <div className="row justify-content-center"> 
          <h1 className="row justify-content-center mt-3">Staff List</h1>
            <div className="mt-4 col-md-10 m row justify-content-center">
                
        <Button className="middle col-2 mb-4" variant="secondary" href="/addstaff">
            Add Staff
        </Button>
        <div className="text-end"><input type="text" onChange={handleFilter}/></div>
            
          {/* <Table striped bordered hover>
          <thead>
              <tr> */}
                {/* <th scope="col">#</th> */}
                {/* <th scope="col" class="d-none d-md-table-cell col-1"></th> */}
                {/* <th scope="col" className="col-3">Name</th>
                <th scope="col" className="col-2">Position</th>
                <th scope="col" className="col-1">Staff Id Number</th>
                <th scope="col" className="col-1">Gender</th>
                <th scope="col" className="col-1">Leave Left</th>
                <th scope="col" className="col-1">Edit</th>
                <th scope="col" className="col-1">Delete</th> */}
                {/* <th scope="col" class="d-none d-md-table-cell col-1"></th> */}
              {/* </tr>
            </thead>
            <tbody>
              {staffs.map((staff, index) => {
                return (
                  <tr key={staff.id}>
                
                    <td>{staff.name}</td>
                    <td>{staff.position}</td>
                    <td>{staff.staff_id_number}</td>
                    <td>{staff.gender}</td>
                    <td>{staff.yearly_leave_left}</td>
                    <td>
                        <Link to={`/editstaff/${staff.id}`}><FontAwesomeIcon icon={faPen } /></Link>                                            
                    </td>
                    <td className="delete" onClick={() => onDelete(staff.id)}>
                      <FontAwesomeIcon icon={faTrash } />
                    </td>
              
                  </tr>
                );
              })}
            </tbody>
          </Table> */}

          <DataTable 
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