import {useEffect , useState} from 'react'
import { ListGroup, Card, Button, Form } from 'react-bootstrap';
import PermitToWorkAPI from '../../API/PermitToWorkAPI';
// import StaffAPI from '../../API/StaffAPI';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
// import {   } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'


function PermitToWorkList() {
  const [records, setRecords] = useState([]);
  const [permittoworks , setPermitToWorks] = useState([])
  // const [staffs , setStaffs] = useState([])

  useEffect(() => {
    fetchPermitToWork()
    // fetchStaff()
  },[])

  const fetchPermitToWork = () => {
    PermitToWorkAPI.get('/')
    .then((res) => {
      setPermitToWorks(res.data)
    })
    .catch(console.log)
  }

  // const fetchStaff = () => {
  //   StaffAPI.get('/')
  //   .then((res) => {
  //     setStaffs(res.data)
  //   })
  //   .catch(console.log)
  // }

  const onDelete = (id) => {
    PermitToWorkAPI.delete(`/${id}/`).then((res) => {
        fetchPermitToWork();
    }).catch(console.log)
}

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

const columns = [
  {
    name: 'Id',
    selector: (row) => row.id,
    sortable: true,
    // width: '6rem'
    // style: {
    //   background: 'rgba(251,212,124, 0.5)',
    // },
  },
  {
    name: 'Permit Number',
    selector: (row) => row.permit_number,
    sortable: true,
    // width: '8rem'
    // style: {
    //   background: 'rgba(251,212,124, 0.5)',
    // },
  },
  {
    name: 'Location ',
    selector: (row) => row.location_of_work,
    sortable: true,
    // width: '8rem'
    // style: {
    //   background: 'rgba(251,212,124, 0.5)',
    // },
  },
  {
    name: 'Nature of Work',
    selector: (row) => row.nature_of_work,
    sortable: true,
    // width: '12rem'
    // style: {
    //   background: 'rgba(251,212,124, 0.5)',
    // },
  },
  {
    name: 'Work Start',
    selector: (row) => row.work_start,
    sortable: true,
    // width: '12rem'
    // style: {
    //   background: 'rgba(251,212,124, 0.5)',
    // },
  },
  {
    name: 'Work Completed',
    selector: (row) => row.work_completed,
    sortable: true,
    // width: '12rem'
    // style: {
    //   background: 'rgba(251,212,124, 0.5)',
    // },
  },
  {
    name: 'More Info',
    selector: (row) => row.more_info,
    // width: '6rem'
    // style: {
    //   background: 'rgba(251,212,124, 0.5)',
    // },
  },
  {
    name: 'Delete',
    selector: (row) => row.delete,
    // width: '6rem'
    // style: {
    //   background: 'rgba(251,212,124, 0.5)',
    // },
  },
];

useEffect(() => {
  const data = permittoworks.map((permittowork) => {
    return {
      id: permittowork.id,
      permit_number: permittowork.permit_number,
      location_of_work: permittowork.location_of_work,
      nature_of_work: permittowork.nature_of_work,
      work_start: permittowork.work_start,
      work_completed: permittowork.work_completed,
      // more_info : <Link to={`/editincident/${incident.id}`}>
      more_info : <Link to={`#`}>
      <FontAwesomeIcon icon={faPen } />
      </Link>,
      delete: (
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => onDelete(permittowork.id)}
        />
      ),
    };
  });
  setRecords(data);
}, [permittoworks]);


const handleFilter = (e) => {
  const searchText = e.target.value.toLowerCase();
  
  if (searchText === '') {
    // If the search text is empty, fetch all incidents again
    fetchPermitToWork();
  } else {
    const newData = records.filter(row => {
   
      // return row.permit_number.toLowerCase().includes(e.target.value.toLowerCase()), row.location_of_work.toLowerCase().includes(e.target.value.toLowerCase())
      
      // const permitNumberMatch = row.permit_number.toLowerCase().includes(searchText);
      // const locationMatch = row.location_of_work.toLowerCase().includes(searchText);

      // return permitNumberMatch || locationMatch
      for (let key in row) {
        if (row[key] && row[key].toString().toLowerCase().includes(searchText)) {
          return true; // Return true if a match is found in any field
        }
      }
      return false;
      })
      
        // permittowork,

    setPermitToWorks(newData);
  }
};




  return (
    <div className="row justify-content-center"> 
    <h1 className="row justify-content-center mt-5">Permit To Work List</h1>
      {/* <Button href="/addincident" variant="secondary" className="ms-10 mt-4 col-md-2 m">
                      Add Incident
      </Button> */}
      <div className="mt-4 col-md-10 m row justify-content-center">
      <div className="row justify-content-around">
        <Button href="#" variant="secondary" className="col-md-2 mb-4">Add Permit to Work</Button>
        <div className="col-md-2 mb-4"><input className="text-center" type="text" placeholder="Search..." onChange={handleFilter}/></div>
      </div>

       
  
            <div>
            <div className="table-container mb-5">
              <DataTable 
                customStyles={customStyles}
                //  style={{backgroundColor: 'rgba(235,114,106, 0.5)'}}
                //  className='stripe'
                columns={columns}
                data={records}
                selectableRows
                fixedHeader
                pagination
              >
              </DataTable>
            </div>
            </div>

       
          </div>
        </div>
  )
}

export default PermitToWorkList
