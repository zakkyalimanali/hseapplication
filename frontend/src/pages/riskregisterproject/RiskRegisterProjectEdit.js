import React , {useEffect , useState} from 'react'
// APIS
import RiskRegisterProjectAPI from '../../API/RiskRegisterProjectAPI';
import StaffAPI from '../../API/StaffAPI';
import RiskRegisterAPI from '../../API/RiskRegisterAPI';
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import RiskRegisterAdd from './riskregister/RiskRegisterAdd';
import { Link , useNavigate} from 'react-router-dom';

// DataTable items
import DataTable from 'react-data-table-component'


function RiskRegisterProjectEdit() {
    const [riskregisterprojects , setRiskRegisterProjects] = useState([])
    const [riskregisters , setRiskRegisters] = useState([])
    const [staffs , setStaffs] = useState([])
    const [project_name , setProjectName] = useState('')
    const [raised_by , setRaisedBy] = useState('')
    const [reviewed_by , setReviewedBy] = useState('')
    const [id , setId] = useState(null)
    const [records, setRecords] = useState([]);
    const navigate = useNavigate()
    const params = useParams()

    useEffect( () => {
        fetchStaff()
        fetchRiskRegister()
    },[])

    const fetchStaff = () => {
        StaffAPI.get('/')
        .then((res) => {
            setStaffs(res.data)
        })
        .catch(console.log)
    }

    const fetchRiskRegister = () => {
        RiskRegisterAPI.get('/')
        .then((res) => {
            setRiskRegisters(res.data);
        }).catch(console.log)
    }


    useEffect(() => {
        fetchRiskRegisterProject()
        setId(params.id)
    },[params.id]) 

    const fetchRiskRegisterProject = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/riskregisterproject/${params.id}`)
        .then((res) => {
            setRiskRegisterProjects(res.data)
            setProjectName(res.data.project_name)
            setRaisedBy(res.data.raised_by)
            setReviewedBy(res.data.reviewed_by)
        })
        .catch(console.log)
    }

    const willSubmitTheEntryIntoDatabase = (e) => {
        e.preventDefault()
        let item = {
            project_name,
            raised_by : raised_by || null,
            reviewed_by: reviewed_by || null,
        }
        navigate(-1);
        RiskRegisterProjectAPI.post('/', item).then(()=> 
            fetchRiskRegisterProject())
            .catch((error) => {
                console.log("Error:", error);
              })
    }

    const toUpdateDatabaseInfo = (id) => {
        let item = {
            project_name,
            raised_by : raised_by || null,
            reviewed_by: reviewed_by || null,
        }
    RiskRegisterProjectAPI.patch(`/${id}/`, item).then(() => {
        setProjectName('')
        setRaisedBy('')
        setReviewedBy('')
        fetchRiskRegisterProject()
    })
    navigate(-1)
    }

    const deleteRisk = (id) => {
        RiskRegisterAPI.delete(`/${id}`).then((res) => {
          fetchRiskRegister();
  
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
          name: 'Date Raised',
          selector: (row) => row.date_raised,
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
          // width: '8rem'
          // style: {
          //   background: 'rgba(251,212,124, 0.5)',
          // },
        },
        {
          name: 'Raised By',
          selector: (row) => row.raised_by,
          sortable: true,
          // width: '8rem'
          // style: {
          //   background: 'rgba(251,212,124, 0.5)',
          // },
        },
        {
          name: 'Reviwed By',
          selector: (row) => row.reviewed_by,
          sortable: true,
          // width: '12rem'
          // style: {
          //   background: 'rgba(251,212,124, 0.5)',
          // },
        },
        {
          name: 'Risk Description',
          selector: (row) => row.risk_description,
          sortable: true,
          // width: '12rem'
          // style: {
          //   background: 'rgba(251,212,124, 0.5)',
          // },
        },
        {
          name: 'Likelihood Of Risk',
          selector: (row) => row.likelihood_of_risk,
          sortable: true,
          // width: '12rem'
          // style: {
          //   background: 'rgba(251,212,124, 0.5)',
          // },
        },
        {
          name: 'Impact Of Risk',
          selector: (row) => row.impact_of_risk,
          sortable: true,
          // width: '12rem'
          // style: {
          //   background: 'rgba(251,212,124, 0.5)',
          // },
        },
        {
          name: 'Severity',
          selector: (row) => row.severity,
          sortable: true,
          // width: '12rem'
          // style: {
          //   background: 'rgba(251,212,124, 0.5)',
          // },
        },
        {
          name: 'Responsible Party',
          selector: (row) => row.responsible_party,
          sortable: true,
          // width: '12rem'
          // style: {
          //   background: 'rgba(251,212,124, 0.5)',
          // },
        },
        {
          name: 'Mitigating Action',
          selector: (row) => row.mitigating_action,
          sortable: true,
          width: '12rem',
          cell: (row) => (
            <div style={{ wordWrap: 'break-word', width: '150px' }}>
              {row.mitigating_action}
            </div>
          ),
 
        },
        {
          name: 'Contingency Action',
          selector: (row) => row.contingency_action,
          sortable: true,
          // width: '12rem'
          // style: {
          //   background: 'rgba(251,212,124, 0.5)',
          // },
        },
        {
          name: 'Progress On Actions',
          selector: (row) => row.progress_on_actions,
          sortable: true,
          // width: '12rem'
          // style: {
          //   background: 'rgba(251,212,124, 0.5)',
          // },
        },
        {
          name: 'Status',
          selector: (row) => row.status,
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

    //   useEffect(() => {
    //     // const data = riskregisters.map((riskregister) => {
    //     const data = riskregisters.filter((riskregister) => riskregister.project_name === Number(params.id).map((riskregister))) 


    //       const raised_by = staffs.find((staff) => staff.id === riskregister.raised_by)?.name  
    //       const reviewed_by = staffs.find((staff) => staff.id === riskregister.reviewed_by)?.name  
          
    //       return {
    //         id: riskregister.id,
    //         date_raised : riskregister.date_raised ,
    //         date_reviewed : riskregister.date_reviewed,
    //         textbrief : riskregister.textbrief,
    //         raised_by : raised_by,
    //         reviewed_by : reviewed_by,
    //         risk_description : riskregister.risk_description,
    //         likelihood_of_risk : riskregister.likelihood_of_risk,
    //         impact_of_risk : riskregister.impact_of_risk,
    //         severity : riskregister.severity,
    //         responsible_party : riskregister.responsible_party,
    //         mitigating_action : riskregister.mitigating_action,
    //         contingency_action : riskregister.contingency_action,
    //         progress_on_actions : riskregister.progress_on_actions,
    //         status : riskregister.status,
    //         // more_info : <Link to={`/riskregisteredit/${riskregister.id}`}><FontAwesomeIcon icon={faPen } /></Link> ,
    //         more_info : "More Info",
    //         delete: (
    //           <FontAwesomeIcon
    //             icon={faTrash}
    //             onClick={() => deleteRisk(riskregister.id)}
    //           />
    //         ),
    //         // delete: "Delete",
      
    //       }
    //     })
    //     setRecords(data);
    //   }, [riskregisters])

    useEffect(() => {
        const data = riskregisters
          .filter((riskregister) => riskregister.project_name === Number(params.id))
          .map((riskregister) => {
            const raised_by = staffs.find((staff) => staff.id === riskregister.raised_by)?.name;
            const reviewed_by = staffs.find((staff) => staff.id === riskregister.reviewed_by)?.name;
      
            return {
              id: riskregister.id,
              date_raised: riskregister.date_raised,
              date_reviewed: riskregister.date_reviewed,
              textbrief: riskregister.textbrief,
              raised_by: raised_by,
              reviewed_by: reviewed_by,
              risk_description: riskregister.risk_description,
              likelihood_of_risk: riskregister.likelihood_of_risk,
              impact_of_risk: riskregister.impact_of_risk,
              severity: riskregister.severity,
              responsible_party: riskregister.responsible_party,
              mitigating_action: riskregister.mitigating_action,
              contingency_action: riskregister.contingency_action,
              progress_on_actions: riskregister.progress_on_actions,
              status: riskregister.status,
              more_info: <Link to={`/riskregisteredit/${riskregister.id}`}><FontAwesomeIcon icon={faPen} /></Link>,
              delete: (
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => deleteRisk(riskregister.id)}
                />
              ),
            };
          });
      
        setRecords(data);
      }, [riskregisters, params.id]);


      const handleFilter = (e) => {
        const searchText = e.target.value.toLowerCase();
      
        if (searchText === '') {
          // If the search text is empty, fetch all incidents again
          fetchRiskRegister();
        } else {
          const newData = riskregisters
            .map((riskregister) => {
              const person_raised = staffs.find(
                (staff) => staff.id === riskregister.raised_by
              )?.name;
              const person_reviewed = staffs.find(
                (staff) => staff.id === riskregister.reviewed_by
              )?.name;
              return {
                ...riskregister,
                person_raised,
                person_reviewed,
              };
            })
            .filter((riskregister) => {
              const incidentProps = Object.values(riskregister);
              for (let i = 0; i < incidentProps.length; i++) {
                if (
                  incidentProps[i] &&
                  incidentProps[i].toString().toLowerCase().includes(searchText)
                ) {
                  return true; // Return true if a match is found in any property
                }
              }
              return false; // Return false if no match is found in any property
            });
          setRiskRegisters(newData);
        }
      };
  


  return (
    <div className="container mt-5 pb-5">
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="float-left mt-5">Edit Project</h3>
              
              <Form onSubmit={willSubmitTheEntryIntoDatabase} 
              className="mt-4">
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Project Name"
                    value={project_name}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Raised By</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Raised By"
                    value={raised_by}
                    onChange={(e) => setRaisedBy(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name} ({staff.position})</option>
                })}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Reviewed By</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Reviewed By"
                    value={reviewed_by}
                    onChange={(e) => setReviewedBy(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name} ({staff.position})</option>
                })}
                  </Form.Control>
                </Form.Group>
                
        

                

                <div className="mt-3 float-right">
                <Button
                    variant="warning"
                    type="button"
                    onClick={(e) => toUpdateDatabaseInfo(id)}
                    className="mx-2"
                  >
                    Update
                  </Button>
                </div>
              </Form>    
            </div>            
          </div>
          <RiskRegisterAdd projectlist = {params.id}/>

          <div className="table-container mb-5 mt-5">
          <div className="col-md-2 mb-4"><input className="text-center" type="text" placeholder="Search..." onChange={handleFilter}/></div>
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
  )
}

export default RiskRegisterProjectEdit
