import React from 'react'
import TrainingAPI from '../../API/TrainingAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom';
import StaffAPI from '../../API/StaffAPI';
import axios from 'axios'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import {useEffect , useState} from 'react'


function Traininglist() {
    const [records, setRecords] = useState([]);
    const [trainings , setTrainings] = useState([])
    const [staffs , setStaffs] = useState([])
    const [id, setId] = useState(null)

    useEffect( () => {
        fetchTraining()
        staffData()
    },[])

    const fetchTraining = () => {
        TrainingAPI.get('/')
        .then((res) => {
            setTrainings(res.data);
        }).catch(console.log)
    }

    const staffData = () => {
        axios.get('http://127.0.0.1:8000/hseapp/staff/')
        .then((res) => {
            setStaffs(res.data);
        }).catch(console.log)
    }

    const onDelete = (id) => {
        TrainingAPI.delete(`/${id}/`).then((res) => {
            fetchTraining();
        }).catch(console.log)
    }

    const columns = [
        {
          name: 'id',
          selector: (row) => row.id,
          sortable: true,
        },
        {
          name: 'staff_name',
          selector: (row) => row.staff_name,
          sortable: true,
        },
        {
            name: 'staff_position',
            selector: (row) => row.staff_position,
            sortable: true,
        },
        {
            name: 'training',
            selector: (row) => row.training,
            sortable: true,
        },
        {
          name: 'training_date',
          selector: (row) => row.training_date,
          sortable: true,
        },
        {
          name: 'training_expiry',
          selector: (row) => row.training_expiry,
          sortable: true,
        },
        
        {
          name: 'training_provider',
          selector: (row) => row.training_provider,
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

      useEffect(() =>{
        const data = trainings.map((training) => {
        const person_name = staffs.find((staff) => staff.id === training.staff_name)?.name  
        const staff_post = staffs.find((staff) => staff.id === training.staff_name)?.position 
        
        
        return {
          id: training.id,
          staff_name: person_name,
          staff_position: staff_post,
          training: training.training,
          training_date: training.training_date,
          training_expiry: training.training_expiry,
          training_provider: training.training_provider,
          edit : 
          <Link to={`/trainingedit/${training.id}`}><FontAwesomeIcon icon={faPen } /></Link>   ,
          delete: (
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => onDelete(training.id)}
            />
          ),
        };
    })

    setRecords(data);
}, [trainings, staffs]);

const handleFilter = (e) => {
  const newData = trainings.map((training) => {
    const person_name = staffs.find((staff) => staff.id === training.staff_name)?.name;
    return {
      ...training,
      person_name,
    };
  }).filter((attendence) => {
    return attendence.person_name
      .toLowerCase()
      .includes(e.target.value.toLowerCase());
  });
  setTrainings(newData);
};

      

  return (
    <div className="row justify-content-center"> 
          <h1 className="row justify-content-center mt-3">Training List</h1>
            <div className="mt-4 col-md-10 m row justify-content-center">
                
        <Button className="middle col-2 mb-4" variant="secondary" href="/trainingadd">
            Add Training 
        </Button>
            

          <div className="text-end"><input type="text" onChange={handleFilter}/></div>

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

export default Traininglist
