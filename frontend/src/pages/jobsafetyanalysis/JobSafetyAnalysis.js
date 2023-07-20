import {useEffect , useState} from 'react'
import { ListGroup, Card, Button, Form } from 'react-bootstrap';
import StaffAPI from '../../API/StaffAPI';
import JobSafetyAnalysisAPI from '../../API/JobSafetyAnalysisAPI';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'

function JobSafetyAnalysis() {
    const [records, setRecords] = useState([]);
    const [staffs , setStaffs] = useState([])
    const [jobsafetyanalysises, setJobSafetyAnalysises] = useState([])

    useEffect(() => {
        fetchStaff();
        fetchJobSafetyAnalysis() 
    },[]) 

    const fetchStaff = () => {
        StaffAPI.get('/')
        .then((res) => {
            setStaffs(res.data)
        })
        .catch(console.log)
    }

    const fetchJobSafetyAnalysis = () => {
        JobSafetyAnalysisAPI.get('/')
        .then((res) => {
            setJobSafetyAnalysises(res.data)
        })
        .catch(console.log)
    }

    const forDeletingJSAEntries = (id) => {
      JobSafetyAnalysisAPI.delete(`/${id}/`).then((res) => {
       fetchJobSafetyAnalysis();
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
          width: '6rem'
        },
        {
          name: 'Job Title',
          selector: (row) => row.job_title,
          sortable: true,
        },
        {
          name: 'JSA Id',
          selector: (row) => row.jsa_id,
          sortable: true,
          width: '10rem'
        },
        {
          name: 'Job Performer',
          selector: (row) => row.job_performer,
          sortable: true,
          width: '10rem'
        },
        {
          name: 'Supervisor',
          selector: (row) => row.supervisor,
          sortable: true,
          width: '10rem'
        },
        {
          name: 'Edit',
          selector: (row) => row.edit,
          width: '6rem'
        },
        {
          name: 'Delete',
          selector: (row) => row.delete,
          width: '6rem'
        },
      ];

    // useEffect(() => {
    //     const data = jobsafetyanalysises.map((jobsafetyanalysis) => {
    //     const job_performer = staffs.find((staff) => staff.id === jobsafetyanalysis.job_performer)?.name
    //     const job_performer_title = staffs.find((staff) => staff.id === jobsafetyanalysis.job_performer)?.position  
    //     const supervisor = staffs.find((staff) => staff.id === jobsafetyanalysis.supervisor)?.name  
    //         return {
    //             id : jobsafetyanalysis.id,
    //             job_title : jobsafetyanalysis.job_title,
    //             jsa_id : jobsafetyanalysis.jsa_id,
    //             job_performer : job_performer, job_performer_title, 
    //             supervisor : supervisor,
    //             edit : <FontAwesomeIcon icon={faPen } />  ,
    //             delete: (
    //         <FontAwesomeIcon
    //           icon={faTrash}
    //         //   onClick={() => onDelete(staff.id)}
    //         />
    //       ),

    //         }
    //     })
    //     setRecords(data);
    // }, [jobsafetyanalysises])

    useEffect(() => {
        const data = jobsafetyanalysises.map((jobsafetyanalysis) => {
          const job_performer_staff = staffs.find((staff) => staff.id === jobsafetyanalysis.job_performer);
          const job_performer = job_performer_staff ? `${job_performer_staff.name} (${job_performer_staff.position})` : '';
          const supervisor_staff = staffs.find((staff) => staff.id === jobsafetyanalysis.supervisor);
          const supervisor = supervisor_staff ? `${supervisor_staff.name} (${supervisor_staff.position})` : '';
          return {
            id: jobsafetyanalysis.id,
            job_title: jobsafetyanalysis.job_title,
            jsa_id: jobsafetyanalysis.jsa_id,
            job_performer: job_performer,
            job_performer_title: job_performer_staff ? job_performer_staff.position : '',
            supervisor: supervisor,
            edit: <Link to={`/jobsafetyanalysisedit/${jobsafetyanalysis.id}`}><FontAwesomeIcon icon={faPen } /></Link> ,
            delete: (
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => forDeletingJSAEntries(jobsafetyanalysis.id)}
              />
            ),
          };
        });
        
        setRecords(data);
      }, [jobsafetyanalysises]);

      


  return (
    <div className="row justify-content-center"> 
    <h1 className="row justify-content-center mt-3">Job Safety Analysis List</h1>
      <div className="mt-4 col-md-10 m row justify-content-center">
          
  <Button className="middle col-2 mb-4" variant="secondary" href="/jobsafetyanalysisadd">
      Job Safety Analysis Add
  </Button>
  {/* <div className="text-end"><input type="text" onChange={handleFilter}/></div> */}
  {/* <div className="text-end"><input type="text" /></div> */}
      

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

export default JobSafetyAnalysis
