import {useEffect , useState} from 'react'
import { Button } from 'react-bootstrap';
import IncidentAPI from '../../API/IncidentAPI';
import SafetyCardAPI from '../../API/SafetyCardAPI';
import StaffAPI from '../../API/StaffAPI';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
// import {   } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'
// import AuthContext from '../../context/AuthContext';


export default function IncidentTable() {
    const [records, setRecords] = useState([]);
    const [incidents , setIncidents] = useState([])
    const [safetycards, setSafetyCards] = useState([])
    // const [selectedIncident , setSelectedIncident] = useState(null)
    const [staffs , setStaffs] = useState([])

    useEffect(() => {
        // fetchIncidents();
        fetchSafetyCards();
        fetchStaff();
    },[])

    const fetchStaff = () => {
      StaffAPI.get('/')
      .then((res) => {
          setStaffs(res.data)
      })
      .catch(console.log)
  }
    const fetchSafetyCards = () => {
      SafetyCardAPI.get('/')
      .then((res) => {
          setSafetyCards(res.data)
      })
      .catch(console.log)
  }

    // const fetchIncidents = () => {
    //     IncidentAPI.get('/')
    //     .then((res) => {
    //         setIncidents(res.data)
    //     })
    //     .catch(console.log) 
    // }

  //   const onDelete = (id) => {
  //     IncidentAPI.delete(`/${id}/`).then((res) => {
  //         fetchIncidents();
  //     }).catch(console.log)
  // }
    const onDelete = (id) => {
      SafetyCardAPI.delete(`/${id}/`).then((res) => {
          fetchSafetyCards();
      }).catch(console.log)
  }

    // const selectIncident = (id) => {
    //     setSelectedIncident(incidents.find((incident) => incident.id === id))
    // }

    // const clearSelectedIncident = () => {
    //     setSelectedIncident(null)
    // };

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
        // style: {
        //   background: 'rgba(251,212,124, 0.5)',
        // },
      },
      {
        name: 'Description',
        selector: (row) => row.description,
        sortable: true,
        // style: {
        //   background: 'rgba(251,212,124, 0.5)',
        // },
      },
      {
        name: 'Date',
        selector: (row) => row.date,
        sortable: true,
        width: '8rem'
        // style: {
        //   background: 'rgba(251,212,124, 0.5)',
        // },
      },
      {
        name: 'Raised',
        selector: (row) => row.raised,
        sortable: true,
        width: '12rem'
        // style: {
        //   background: 'rgba(251,212,124, 0.5)',
        // },
      },
      {
        name: 'More Info',
        selector: (row) => row.more_info,
        width: '6rem'
        // style: {
        //   background: 'rgba(251,212,124, 0.5)',
        // },
      },
      {
        name: 'Delete',
        selector: (row) => row.delete,
        width: '6rem'
        // style: {
        //   background: 'rgba(251,212,124, 0.5)',
        // },
      },
    ];

    useEffect(() => {
      // const data = incidents.map((incident) => {
      const data = safetycards.map((incident) => {
        const person_name = staffs.find((staff) => staff.id === incident.raised_by)?.name  
        return {
          id: incident.id,
          description: incident.short_desc,
          date: incident.date_raised,
          raised: person_name,
          more_info : <Link to={`/editincident/${incident.id}`}>
          <FontAwesomeIcon icon={faPen } />
          </Link>,
          delete: (
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => onDelete(incident.id)}
            />
          ),
        };
      });
      setRecords(data);
    // }, [incidents, staffs]);
    }, [safetycards, staffs]);

    // const handleFilter = (e) => {
    //   const newData = incidents.map((incident) => {
    //     const person_name = staffs.find((staff) => staff.id === incident.raised_by)?.name;
    //     return {
    //       ...incident,
    //       person_name,
    //     };
    //   }).filter((attendence) => {
    //     return attendence.person_name
    //       .toLowerCase()
    //       .includes(e.target.value.toLowerCase());
    //   });
    //   setIncidents(newData);
    // };

    // const handleFilter = (e) => {
    //   const searchText = e.target.value.toLowerCase();
      
    //   if (searchText === '') {
    //     // If the search text is empty, fetch all incidents again
    //     // fetchIncidents();
    //     fetchSafetyCards();
    //   } else {
    //     // const newData = incidents.map((incident) => {
    //     const newData = safetycards.map((incident) => {
    //       const person_name = staffs.find((staff) => staff.id === incident.raised_by)?.name;
    //       return {
    //         ...incident,
    //         person_name,
    //       };
    //     }).filter((attendence) => {
    //       return attendence.person_name
    //         .toLowerCase()
    //         .includes(searchText);
    //     });
    //     // setIncidents(newData);
    //     setSafetyCards(newData);
    //   }
    // };

    const handleFilter = (e) => {
      const searchText = e.target.value.toLowerCase();
    
      if (searchText === '') {
        // If the search text is empty, fetch all incidents again
        fetchSafetyCards();
      } else {
        const newData = safetycards
          .map((safetycard) => {
            const person_name = staffs.find(
              (staff) => staff.id === safetycard.raised_by
            )?.name;
            return {
              ...safetycard,
              person_name,
            };
          })
          .filter((safetycard) => {
            const incidentProps = Object.values(safetycard);
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
        setSafetyCards(newData);
      }
    };


    return (
      <div className="row justify-content-center"> 
      <h1 className="row justify-content-center mt-5">Safety Incident Card List</h1>
  
        <div className="mt-4 col-md-10 m row justify-content-center">
        <div className="row justify-content-around">
          <Button href="/addincident" variant="secondary" className="col-md-2 mb-4">Add Incident</Button>
          <div className="col-md-2 mb-4"><input className="text-center" type="text" placeholder="Search..." onChange={handleFilter}/></div>
        </div>

              {/* <Table striped bordered hover>
              <thead>
                  <tr>
                    <th scope="col" className="col-1">ID</th>
                    <th scope="col" className="col-3">Short Desc</th>
                    <th scope="col" className="col-2">Date Raised</th>
                    <th scope="col" className="col-2">Raised By</th>
                    <th scope="col" className="col-1">More Info</th>
                    <th scope="col" className="col-1">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((incident, index) => {
                    return (
                      <tr key={incident.id}>
                        <td>{incident.id}</td>
                        <td>{incident.short_desc}</td>

                        <td>{incident.date_raised}</td> */}
                        {/* <td>{incident.raised_by}</td> */}
                        {/* <td>{staffs.find((staff) => staff.id === incident.raised_by)?.name}</td>
                        <td>
                            <Link to={`/editincident/${incident.id}`}>
                            <FontAwesomeIcon icon={faPen } />
                            </Link>
                        </td>
  
                        <td className="delete" onClick={() => onDelete(incident.id)}> */}
                          {/* <i class="fa fa-trash" aria-hidden="true"></i> */}
                          {/* <FontAwesomeIcon icon="check-square" />
      Your <FontAwesomeIcon icon="coffee" /> is hot and ready! */}
      {/* <FontAwesomeIcon icon={faTrash } />
                        </td>
                      </tr>
                       );
                      })}
                </tbody>


              </Table> */}
              
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
          </div>
    )

}
