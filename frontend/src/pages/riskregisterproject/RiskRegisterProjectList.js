import React, {useState, useEffect} from 'react'
import RiskRegisterProjectAPI from '../../API/RiskRegisterProjectAPI'
import StaffAPI from '../../API/StaffAPI'
import {  Button } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
// import {   } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'

function RiskRegisterProjectList() {
  const [riskregisterprojects , setRiskRegisterProjects] = useState([])
  const [staffs , setStaffs] = useState([])
  const [records, setRecords] = useState([]);

    useEffect(() => {
        fetchStaff()
        fetchRiskRegisterProject()
    },[])

    const fetchRiskRegisterProject = () => {
        RiskRegisterProjectAPI.get('/')
        .then((res) => {
            setRiskRegisterProjects(res.data)
        })
        .catch(console.log)
    }

    const fetchStaff = () => {
        StaffAPI.get('/')
        .then((res) => {
            setStaffs(res.data)
        })
        .catch(console.log)
    }

    const onDelete = (id) => {
        RiskRegisterProjectAPI.delete(`/${id}/`).then((res) => {
            fetchRiskRegisterProject();
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
      name: 'Project Name',
      selector: (row) => row.project_name,
      sortable: true,
      // width: '8rem'
      // style: {
      //   background: 'rgba(251,212,124, 0.5)',
      // },
    },
    {
      name: 'Date Raised ',
      selector: (row) => row.date_raised ,
      sortable: true,
      // width: '8rem'
      // style: {
      //   background: 'rgba(251,212,124, 0.5)',
      // },
    },
    {
      name: 'Date Reviewed',
      selector: (row) => row.date_reviewed,
      sortable: true,
      // width: '12rem'
      // style: {
      //   background: 'rgba(251,212,124, 0.5)',
      // },
    },
    {
      name: 'Raised By',
      selector: (row) => row.raised_by,
      sortable: true,
      // width: '12rem'
      // style: {
      //   background: 'rgba(251,212,124, 0.5)',
      // },
    },
    {
      name: 'Reviewed By',
      selector: (row) => row.reviewed_by,
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
const data = riskregisterprojects.map((riskregisterproject) => {
  const raised_by = staffs.find((staff) => staff.id === riskregisterproject.raised_by)?.name  
  const reviewed_by = staffs.find((staff) => staff.id === riskregisterproject.reviewed_by)?.name   
return {
  id: riskregisterproject.id,
  project_name : riskregisterproject.project_name,
  date_raised : riskregisterproject.date_raised,
  date_reviewed : riskregisterproject.date_reviewed,
  raised_by : raised_by,
  reviewed_by  : reviewed_by ,
  more_info : <Link to={`/riskregisterprojectedit/${riskregisterproject.id}`}><FontAwesomeIcon icon={faPen } /></Link> ,
  // more_info : "More Info",
  delete: (
    <FontAwesomeIcon
      icon={faTrash}
      onClick={() => onDelete(riskregisterproject.id)}
    />
  ),
  // delete: "Delete",

}
})
setRecords(data);
}, [riskregisterprojects , ])

  return (
    <div className="row justify-content-center"> 
    <h1 className="row justify-content-center mt-3">Project List</h1>
      
      <div className="mt-4 col-md-10 m row justify-content-center">
      <div className="row justify-content-around">
      <Button href="/riskregisterprojectadd" variant="secondary" className="mb-4 col-md-2">
                      Add Project
      </Button>

        {/* <Button href="/permittoworkadd" variant="secondary" className="col-md-2 mb-4">Add Permit to Work</Button> */}
        {/* <div className="col-md-2 mb-4"><input className="text-center" type="text" placeholder="Search..." onChange={handleFilter}/></div> */}
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

export default RiskRegisterProjectList
