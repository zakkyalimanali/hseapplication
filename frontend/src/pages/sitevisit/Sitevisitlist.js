import React , {useEffect , useState} from 'react'
import SiteVisitAPI from '../../API/SiteVisitAPI'
import StaffAPI from '../../API/StaffAPI'
import axios from 'axios'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
// import { Link , useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'

function Sitevisitlist() {
    const [records, setRecords] = useState([]);
    const[siteVisits , setSiteVisits] = useState([])
    const[staffs , setStaffs] = useState([])
    const[id , setId] = useState(null)

    useEffect(() => {
        fetchSiteVisit()
        fetchStaff()
    },[]) 

    const fetchSiteVisit = () => {
        SiteVisitAPI.get('/')
        .then((res) => {
            setSiteVisits(res.data)
        }
        )
        .catch(console.log)
    }

    const fetchStaff= () => {
        StaffAPI.get('/')
        .then((res) => {
            setStaffs(res.data)
        }
        )
        .catch(console.log)
    }

    const columns = [
        {
          name: 'id',
          selector: (row) => row.id,
          sortable: true,
        },
        {
          name: 'inspector',
          selector: (row) => row.inspector,
          sortable: true,
        },
        {
          name: 'inspection_date',
          selector: (row) => row.inspection_date,
          sortable: true,
        },
        {
          name: 'location',
          selector: (row) => row.location,
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

      const onDelete = (id) => {
        SiteVisitAPI.delete(`/${id}/`).then((res) => {
            fetchSiteVisit();
        }).catch(console.log)
    }


      useEffect(() => {
        const data = siteVisits.map((siteVisit) => {
          const person_name = staffs.find((staff) => staff.id === siteVisit.inspector)?.name  
          return {
            id: siteVisit.id,
            inspector: person_name,
            inspection_date: siteVisit.inspection_date,
            location:siteVisit.location,
     
            edit : 

            // <Link to={`/toolboxtalkedit/${toolBoxTalk.id}`}><FontAwesomeIcon icon={faPen } /></Link>   ,
            <Link to={`#`}><FontAwesomeIcon icon={faPen } /></Link>   ,
            delete: (
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => onDelete(siteVisit.id)}
              />
            ),
          };
        });
        setRecords(data);
      }, [siteVisits, staffs]);


  return (

<div className="row justify-content-center"> 
<h1 className="row justify-content-center mt-3">Site Visit Inpection</h1>
  <div className="mt-4 col-md-10 m row justify-content-center">
      
<Button className="middle col-2 mb-4" variant="secondary" href="/sitevisitadd">
  Add Site Visit
</Button>
  

{/* <div className="text-end"><input type="text" onChange={handleFilter}/></div> */}

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

export default Sitevisitlist
