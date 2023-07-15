// React dependences
import React , {useState , useEffect} from 'react'
// API from backend
import IncidentInvestigationAPI from '../../API/IncidentInvestigationAPI'
import StaffAPI from '../../API/StaffAPI';
import axios from 'axios'

// react-router-dom items
import { Link , useNavigate} from 'react-router-dom';

// bootstrap itms
import Table from 'react-bootstrap/Table';
import { ListGroup, Card, Button, Form } from "react-bootstrap";

// fontawesome items
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'

// DataTable items
import DataTable from 'react-data-table-component'

// This function's main role is to show a table of incident investigations and to lead to links for adding and editing incident investigations
function IncidentInvestigationList() {
    // setting up the useStates which allow you to change state and allow functionality
    // The 'useState([])' is used to initiate for the API
    const [incidentinvestigations , setIncidentInvestigations] = useState([])
    const [staffs , setStaffs] = useState([])
    const[id , setId] = useState(null)
    const [records, setRecords] = useState([]);

    // The useEffect() here allows for the functions inside them to be called once
    useEffect(() => {
        fetchIncidentInvestigation()
        fetchStaff()
    },[]) 

    // the function get the url from the backend which allows its data to be used in the frontend
    const fetchIncidentInvestigation = () => {
        IncidentInvestigationAPI.get('/')
        .then((res) => {
            setIncidentInvestigations(res.data)
        })
        .catch(console.log)
    }

    // The fetchStaff is so that staff names can be called
    const fetchStaff =() => {
      StaffAPI.get('/')
      .then((res) => {
          setStaffs(res.data)
      })
      .catch(console.log)
  }

    const forDeletingIncidentInvestigationEntries = (id) => {
       IncidentInvestigationAPI.delete(`/${id}/`).then((res) => {
        fetchIncidentInvestigation();
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
      // id : {
      //   style: {
      //     width: '10px'
      //   }
      // }

    
      // rows : {
      //   style: {
      //     backgroundColor: 'lightgray' 
      //   }
      // }
    

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
        name: 'What Happened',
        selector: (row) => row.what_happened,
        sortable: true,
        // style: {
        //   background: 'rgba(251,212,124, 0.5)',
        // },
      },
      {
        name: 'Task Performed',
        selector: (row) => row.task_performed,
        sortable: true,
        // width: '8rem'
        // style: {
        //   background: 'rgba(251,212,124, 0.5)',
        // },
      },
      {
        name: 'Investigator',
        selector: (row) => row.investigator,
        sortable: true,
        // width: '12rem'
        // style: {
        //   background: 'rgba(251,212,124, 0.5)',
        // },
      },
      {
        name: 'Location',
        selector: (row) => row.location_of_incident,
        sortable: true,
        // width: '12rem'
        // style: {
        //   background: 'rgba(251,212,124, 0.5)',
        // },
      },
      {
        name: 'Date of Incident',
        selector: (row) => row.date_of_incident,
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
      const data = incidentinvestigations.map((incidentinvestigation) => {
        // const staff = staffs.find((staff) => staff.id === attendence.staff_id);
        // const staff_name = staff ? staff.name : '';
        // {staffs.find((staff) => staff.id === attendence.staff_name)?.name}
        const person_name = staffs.find((staff) => staff.id === incidentinvestigation.investigator)?.name  
        return {
          id: incidentinvestigation.id,
          what_happened: incidentinvestigation.what_happened,
          task_performed: incidentinvestigation.task_performed,
          investigator: person_name,
          location_of_incident: incidentinvestigation.location_of_incident,
          date_of_incident: incidentinvestigation.date_of_incident,
          more_info : <Link to={`/incidentinvestigationedit/${incidentinvestigation.id}`}>
          <FontAwesomeIcon icon={faPen } />
          </Link>,
          delete: (
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => forDeletingIncidentInvestigationEntries(incidentinvestigation.id)}
            />
          ),
        };
      });
      setRecords(data);
    }, [incidentinvestigations, staffs]);

    // const handleFilter = (e) => {
    //   const searchText = e.target.value.toLowerCase();
      
    //   if (searchText === '') {
    //     // If the search text is empty, fetch all incidents again
    //     fetchIncidentInvestigation();
    //   } else {
    //     const newData = incidentinvestigations.map((incidentinvestigation) => {
    //       const person_name = staffs.find((staff) => staff.id === incidentinvestigation.investigator)?.name;
    //       return {
    //         ...incidentinvestigation,
    //         person_name,
    //       };
    //     }).filter((attendence) => {
    //       return attendence.person_name
    //         .toLowerCase()
    //         .includes(searchText);
    //     });
    //     setIncidentInvestigations(newData);
    //   }
    // };

    // const handleFilter = (e) => {
    //   const newData = incidentinvestigations.map((incidentinvestigation) => {
    //     const person_name = staffs.find((staff) => staff.id === incidentinvestigation.investigator)?.name;
    //     return {
    //       ...incidentinvestigation,
    //       person_name,
    //     };
    //   }).filter((attendence) => {
    //     return attendence.person_name
    //       .toLowerCase()
    //       .includes(e.target.value.toLowerCase());
    //   });
    //   setIncidentInvestigations(newData);
    // };

    // const handleFilter = (e) => {
    //   const searchText = e.target.value.toLowerCase();
      
    //   if (searchText === '') {
    //     // If the search text is empty, fetch all incidents again
    //     fetchPermitToWork();
    //   } else {
    //     const newData = records.filter(row => {
       
    //       // return row.permit_number.toLowerCase().includes(e.target.value.toLowerCase()), row.location_of_work.toLowerCase().includes(e.target.value.toLowerCase())
          
    //       // const permitNumberMatch = row.permit_number.toLowerCase().includes(searchText);
    //       // const locationMatch = row.location_of_work.toLowerCase().includes(searchText);
    
    //       // return permitNumberMatch || locationMatch
    //       for (let key in row) {
    //         if (row[key] && row[key].toString().toLowerCase().includes(searchText)) {
    //           return true; // Return true if a match is found in any field
    //         }
    //       }
    //       return false;
    //       })
          
    //         // permittowork,
    
    //     setPermitToWorks(newData);
    //   }
    // };
    
    const handleFilter = (e) => {
      const searchText = e.target.value.toLowerCase();
    
      if (searchText === '') {
        // If the search text is empty, fetch all incidents again
        fetchIncidentInvestigation();
      } else {
        const newData = incidentinvestigations
          .map((incidentinvestigation) => {
            const person_name = staffs.find(
              (staff) => staff.id === incidentinvestigation.investigator
            )?.name;
            return {
              ...incidentinvestigation,
              person_name,
            };
          })
          .filter((incidentinvestigation) => {
            const incidentProps = Object.values(incidentinvestigation);
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
        setIncidentInvestigations(newData);
      }
    };



    // the return function is for the html stuff
  return (
    // //  fix this below 
    // <div className="container mt-5">
    //     <div className="row">
    //     {/* This is for the title */}
    //     <h1 className="row justify-content-center mt-3">Incident Investigation</h1>
    //       <div className= "col-md-4"></div>
    //       <div className="col-md-4 "></div>
    //   <Table striped bordered hover className='mt-3'>
    //     {/* This is for the table heading */}
    //       <thead>
    //           <tr>
    //             <th scope="col" className="col-1">ID</th>
    //             <th scope="col" className="col-2">What Happened</th>
    //             <th scope="col" className="col-2">Task Performed</th>
    //             <th scope="col" className="col-2">Investigator</th>
    //             <th scope="col" className="col-3">Location</th>
    //             <th scope="col" className="col-3">Date of Incident</th> 
    //             <th scope="col" className="col-1">Edit</th>
    //             <th scope="col" className="col-1">Delete</th>
    //           </tr>
    //         </thead>
    //         {/* This is for the table body, this takes the incidentinvestigation from above and then uses maps so that each entry can be displayed */}
    //         <tbody>

    //           {incidentinvestigations.map((incidentinvestigation) => {
    //             return (
    //               <tr key={incidentinvestigation.id}>
                    
                
    //                 <td>{incidentinvestigation.id}</td>
    //                 <td>{incidentinvestigation.what_happened}</td>
    //                 <td>{incidentinvestigation.task_performed}</td>
    //                 <td>{staffs.find((staff) => staff.id === incidentinvestigation.investigator)?.name} ({staffs.find((staff) => staff.id === incidentinvestigation.investigator)?.position} ) </td>
    //                 {/* <td>{incidentinvestigation.investigator}</td> */}
    //                 <td>{incidentinvestigation.location_of_incident}</td>
    //                 <td>{incidentinvestigation.date_of_incident}</td>
               




    //                 <td>
    //                     <Link to={`/incidentinvestigationedit/${incidentinvestigation.id}`}><FontAwesomeIcon icon={faPen } /></Link>  

    //                 </td>
    //                 <td className="delete" onClick={() => forDeletingIncidentInvestigationEntries(incidentinvestigation.id)}>
    //                   <FontAwesomeIcon icon={faTrash } />
    //                 </td>
              
    //               </tr>
    //             );
    //           })}
              
    //         </tbody>
    //       </Table> 
    //       <Button className="middle col-2 mb-4 mt-3" variant="secondary" href="/incidentinvestigationadd">
    //         Add Incident Investigation
    //     </Button>

    //           </div>
    // </div>
    <div className="row justify-content-center"> 
      <h1 className="row justify-content-center mt-5">Incident Investigation</h1>
        <div className="mt-4 col-md-10 m row justify-content-center">
        <div className="row justify-content-around">
          <Button href="/incidentinvestigationadd" variant="secondary" className="col-md-2 mb-4">Add Incident Investigation</Button>
          <div className="col-md-2 mb-4"><input className="text-center" type="text" placeholder="Search..." onChange={handleFilter}/></div>
        </div>


              <div>
              <div className="table-container mb-5">
                <DataTable 
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

         
            </div>
            <div>
            </div>
          </div>
  )
}

export default IncidentInvestigationList
