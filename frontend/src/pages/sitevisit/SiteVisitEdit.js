import React , {useEffect , useState} from 'react'
import StaffAPI from '../../API/StaffAPI'
import SiteVisitAPI from '../../API/SiteVisitAPI'
import SiteHazardAPI from '../../API/SiteHazardAPI'
import axios from 'axios'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'


function SiteVisitEdit() {
    const [records, setRecords] = useState([]);
    const [siteVisits , setSiteVisits] = useState([])
    const [staffs , setStaffs] = useState([])
    const [siteHazards, setSiteHazards] = useState([])
    const params = useParams()
    const [id , setId] = useState(null)
    const [inspector, setInspector] = useState('')
    const [inspection_date , setInspectionDate] = useState('')
    const [location , setLocation] = useState('') 

    useEffect(() => {
        fetchSiteVisit()
        setId(params.id)
    },[params.id]) 

    useEffect(() => {
        fetchStaff()
        fetchSiteHazard() 
    },[])

    const fetchStaff = () => {
        StaffAPI.get('/')
        .then((res) => {
            setStaffs(res.data)
        })
        .catch(console.log)
    }

    const fetchSiteHazard = () => {
        SiteHazardAPI.get('/')
        .then((res) => {
            setSiteHazards(res.data)
        })
        .catch(console.log)
    }

    const fetchSiteVisit = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/sitevisit/${params.id}/`)
        .then((res) => {
            setSiteVisits(res.data)
            setInspector(res.data.inspector)
            setInspectionDate(res.data.inspection_date)
            setLocation(res.data.location)

        })
        .catch(console.log)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let item = {inspector , inspection_date , location}
        SiteVisitAPI.post('/', item).then(() => fetchSiteVisit());
    }

    const onUpdate = (id) => {
        let item = {inspector , inspection_date , location}
        SiteVisitAPI.patch(`/${id}/`, item).then(() => { 
            setInspector('')
            setInspectionDate('')
            setLocation('')
            fetchSiteVisit()
          }
        )
      }

      const columns = [
        {
          name: 'id',
          selector: (row) => row.id,
          sortable: true,
        },
        {
          name: 'hazard',
          selector: (row) => row.hazard,
          sortable: true,
        },
        {
          name: 'status',
          selector: (row) => row.status,
          sortable: true,
        },
        {
          name: 'notes',
          selector: (row) => row.notes,
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
        SiteHazardAPI.delete(`/${id}/`).then((res) => {
            fetchSiteHazard();
        }).catch(console.log)
    }

    useEffect(() => {
        const data = siteHazards.map((siteHazard) => {
          return {
            id: siteHazard.id,
            hazard: siteHazard.hazard,
            status: siteHazard.status,
            notes:siteHazard.notes,
     
            edit : 

            // <Link to={`/toolboxtalkedit/${toolBoxTalk.id}`}><FontAwesomeIcon icon={faPen } /></Link>   ,
            <Link to={`#`}><FontAwesomeIcon icon={faPen } /></Link>   ,
            delete: (
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => onDelete(siteHazard.id)}
              />
            ),
          };
        });
        setRecords(data);
      }, [siteHazards]);



  return (
    <div className="container mt-5">
        <div className="row">
          <div className= "col-md-4"></div>
          <div className="col-md-4 ">
            <h3 className="float-left">Site Visit Edit</h3>
            
            <Form onSubmit={onSubmit} className="mt-4">
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Inspection Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Inspection Date"
                  value={inspection_date}
                  onChange={(e) => setInspectionDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Inspector</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Inspector"
                    value={inspector}
                    onChange={(e) => setInspector(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name}</option>
                })}

                  </Form.Control>
                </Form.Group>
     
                
                {/* <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    placeholder="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </Form.Group> */}
                {/* <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Crew Present</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="crew present"
                    value={crew_number}
                    onChange={(e) => setCrewNumber(e.target.value)}
                  />
                </Form.Group> */}
               
     
            <div className="mt-3 float-right">
              <Link to="/sitevisitlist/">
                <Button
                  variant="success"
                  type="button"
                  onClick={(e) => onUpdate(id)}
                  className="mx-2"
                >
                  Update
                </Button>
              </Link>
            </div>

          </Form>
          
              
            
        </div>

      </div>
      <Button className="middle col-2 mb-4" variant="secondary" href="#">
                 Add Hazard
                </Button>

                <DataTable 
                    columns={columns}
                    data={records}
                    selectableRows
                    fixedHeader
                    pagination
                    >

                </DataTable>   
    </div>
  )
}

export default SiteVisitEdit