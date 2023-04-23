import {useState , useEffect} from 'react'
import { ListGroup, Card, Button, Form } from 'react-bootstrap';
import AttendenceAPI from '../../API/AttendenceAPI'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import AddDateAPI from '../../API/AddDateAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'


// export default function AttendenceList() {
    

    // const data = [
    //   {
    //     id: 1,
    //     name: 'Zakky',
    //     date: '01.01.2023',
    //     attendencestatus: "present",
    //     edit: "edit",
    //     delete: 'delete',
    //   },
    //   {
    //     id: 2,
    //     name: 'Cat',
    //     date: '01.01.2023',
    //     attendencestatus: "MC",
    //     edit: "edit",
    //     delete: 'delete',
    //   },
    // ]
    // const data = 

    // const handleFilter = (e) => {
    //   const newData = data.filter(row => {
    //     return row.name.toLowerCase().includes(e.target.value.toLowerCase())
    //   })
    //   setRecords(newData)
    // }



    

    // const [records , setRecords] = useState(data) 
    // const [attendences ,setAttendences] = useState([])
    // const [selectAttendence , setSelectAttendence] = useState(null)
    // const [staffs, setStaffs] = useState([])
    // const [dates , setDates] = useState([])

  //   useEffect(() =>{
  //       fetchStaff()
  //       fetchAttendence()
  //       fetchDate()
  //   },[])

  //   const fetchAttendence = () => {
  //       AttendenceAPI.get('/')
  //       .then((res) => {
  //           setAttendences(res.data)
  //       })
  //       .catch(console.log)
  //   }

  //   const fetchDate = () => {
  //     AddDateAPI.get('/')
  //     .then((res) => {
  //         setDates(res.data)
  //     })
  //     .catch(console.log)
  // }

  //   const fetchStaff = () => {
  //       axios.get('http://127.0.0.1:8000/hseapp/staff/')
  //       .then((res) => {
  //           setStaffs(res.data)
  //       })
  //       .catch(console.log)
  //   }

  //   const onDelete = (id) => {
  //       AttendenceAPI.delete(`/${id}/`).then((res) => {
  //           fetchAttendence();
  //       }).catch(console.log)
  //   }


  //   const columns = [
  //     {
  //       name: 'id',
  //       selector: row => row.id,
  //       sortable: true,
  //     },
  //     {
  //       name: 'name',
  //       selector: row => row.name,
  //       sortable: true,
  //     },
  //     {
  //       name: 'date',
  //       selector: row => row.date,
  //       sortable: true,
  //     },
  //     {
  //       name: 'attendencestatus',
  //       selector: row => row.attendencestatus,
  //       sortable: true,
  //     },
  //     {
  //       name: 'edit',
  //       selector: row => row.edit,
  //     },
  //     {
  //       name: 'delete',
  //       selector: row => row.delete,
  //     },


  //   ];

  //   const data = attendences.map((attendence) => {
  //     return {
  //       id: attendence.id,
  //       name: attendence.staff_name,
  //       date: attendence.attendence_date,
  //       attendencestatus: attendence.attendence_status,
  //       edit: <FontAwesomeIcon icon={faPen} />,
  //       delete: (
  //         <FontAwesomeIcon
  //           icon={faTrash}
  //           onClick={() => onDelete(attendence.id)}
  //         />
  //       ),
  //     };
  //   });
  
  //   const handleFilter = (e) => {
  //     const newData = data.filter((row) => {
  //       return row.name.toLowerCase().includes(e.target.value.toLowerCase());
  //     });
  //     setRecords(newData);
  //   };

    // const data = 
    //   attendences.map((attendence) => {
    //     return(
    //       <div>
    //         <td>{attendence.id}</td>
    //         <td>{attendence.staff_name}</td>
    //         <td>{attendence.attendence_date}</td>
    //         <td>{attendence.attendence_status}</td>
    //       </div>
    //     )
    //   })
      
    // const handleFilter = (e) => {
    //   const newData = data.filter(row => {
    //     return row.name.toLowerCase().includes(e.target.value.toLowerCase())
    //   })
    //   setRecords(newData)
    // }


    // const data = 
    //   attendences.map((attendence) => {
    //     return(
    //       <div>
    //         <td>{attendence.id}</td>
    //         <td>{attendence.staff_name}</td>
    //         <td>{attendence.attendence_date}</td>
    //         <td>{attendence.attendence_status}</td>
    //       </div>
    //     )
    //   })
      
    // const handleFilter = (e) => {
    //   const newData = data.filter(row => {
    //     return row.name.toLowerCase().includes(e.target.value.toLowerCase())
    //   })
    //   setRecords(newData)
    // }
    

    // return(
    //     <div>
            
    //         <div className="row justify-content-center"> 
    //         <h1 className="row justify-content-center mt-3">Attendence List</h1>
    //     {/* <Button href="/addincident" variant="secondary" className="ms-10 mt-4 col-md-2 m">
    //                     Add Incident
    //     </Button> */}
    //     <div className="mt-4 col-md-10 m row justify-content-center">
        
    //     <Button href="/attendenceadd" variant="secondary" className="middle col-2 mb-4">Add Attedence</Button>
        

              {/* <Table striped bordered hover>
              <thead>
                  <tr>
                    <th scope="col" className="col-1">ID</th>
                    <th scope="col" className="col-3">Staff</th>
                    <th scope="col" className="col-2">Date</th>
                    <th scope="col" className="col-2">Attendence Status</th>
                    <th scope="col" className="col-1">More Info</th>
                    <th scope="col" className="col-1">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {attendences.map((attendence, index) => {
                    return (
                      <tr key={attendence.id}>
                        <td>{attendence.id}</td>
                        <td>{staffs.find((staff) => staff.id === attendence.staff_name)?.name}</td> */}
                        {/* <td>{dates.find((date) => date.id === attendence.attendence_date)?.date_attendence}</td> */}
                        {/* <td>{attendence.attendence_date}</td> */}
                        {/* <td>{dates.date_attendence}</td> */}
                        {/* <td>{attendence.attendence_status}</td>
                        <td>
                            <Link to={`/attendenceedit/${attendence.id}`}>
                            <FontAwesomeIcon icon={faPen } />
                            </Link>
                        </td>
  
                        <td className="delete" onClick={() => onDelete(attendence.id)}> */}
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
              {/* <div className="text-end"><input type="text" onChange={handleFilter}/></div>
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


        </div>
    )
} */}


// import {useState , useEffect} from 'react'
// import { ListGroup, Card, Button, Form } from 'react-bootstrap';
// import AttendenceAPI from '../../API/AttendenceAPI'
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Table from 'react-bootstrap/Table';
// import AddDateAPI from '../../API/AddDateAPI';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
// import DataTable from 'react-data-table-component'


// export default function AttendenceList() {
    
//     const [records , setRecords] = useState(data) 
//     const [attendences ,setAttendences] = useState([])
//     const [selectAttendence , setSelectAttendence] = useState(null)
//     const [staffs, setStaffs] = useState([])
//     const [dates , setDates] = useState([])

//     useEffect(() =>{
//         fetchStaff()
//         fetchAttendence()
//         fetchDate()
//     },[])

//     const fetchAttendence = () => {
//         AttendenceAPI.get('/')
//         .then((res) => {
//             setAttendences(res.data)
//         })
//         .catch(console.log)
//     }

//     const fetchDate = () => {
//       AddDateAPI.get('/')
//       .then((res) => {
//           setDates(res.data)
//       })
//       .catch(console.log)
//   }

//     const fetchStaff = () => {
//         axios.get('http://127.0.0.1:8000/hseapp/staff/')
//         .then((res) => {
//             setStaffs(res.data)
//         })
//         .catch(console.log)
//     }

//     const onDelete = (id) => {
//         AttendenceAPI.delete(`/${id}/`).then((res) => {
//             fetchAttendence();
//         }).catch(console.log)
//     }
//     const columns = [
//       {
//         name: 'id',
//         selector: row => row.id,
//         sortable: true,
//       },
//       {
//         name: 'name',
//         selector: row => row.name,
//         sortable: true,
//       },
//       {
//         name: 'date',
//         selector: row => row.date,
//         sortable: true,
//       },
//       {
//         name: 'attendencestatus',
//         selector: row => row.attendencestatus,
//         sortable: true,
//       },
//       {
//         name: 'edit',
//         selector: row => row.edit,
//       },
//       {
//         name: 'delete',
//         selector: row => row.delete,
//       },
//     ];
//     const data = attendences.map((attendence) => {
//       return {
//         id: attendence.id,
//         name: attendence.staff_name,
//         date: attendence.attendence_date,
//         attendencestatus: attendence.attendence_status,
//         edit: <FontAwesomeIcon icon={faPen} />,
//         delete: (
//           <FontAwesomeIcon
//             icon={faTrash}
//             onClick={() => onDelete(attendence.id)}
//           />
//         ),
//       };
//     });
//     const handleFilter = (e) => {
//       const newData = data.filter((row) => {
//         return row.name.toLowerCase().includes(e.target.value.toLowerCase());
//       });
//       setRecords(newData);
//     };

// import { useState, useEffect } from 'react';
// import { ListGroup, Card, Button, Form } from 'react-bootstrap';
// import AttendenceAPI from '../../API/AttendenceAPI';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Table from 'react-bootstrap/Table';
// import AddDateAPI from '../../API/AddDateAPI';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
// import DataTable from 'react-data-table-component';

export default function AttendenceList() {
  const [records, setRecords] = useState([]);
  const [attendences, setAttendences] = useState([]);
  const [selectAttendence, setSelectAttendence] = useState(null);
  const [staffs, setStaffs] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    fetchStaff();
    fetchAttendence();
    fetchDate();
  }, []);

  const fetchAttendence = () => {
    AttendenceAPI.get('/')
      .then((res) => {
        setAttendences(res.data);
      })
      .catch(console.log);
  };

  const fetchDate = () => {
    AddDateAPI.get('/')
      .then((res) => {
        setDates(res.data);
      })
      .catch(console.log);
  };

  const fetchStaff = () => {
    axios
      .get('http://127.0.0.1:8000/hseapp/staff/')
      .then((res) => {
        setStaffs(res.data);
      })
      .catch(console.log);
  };

  const onDelete = (id) => {
    AttendenceAPI.delete(`/${id}/`)
      .then((res) => {
        fetchAttendence();
      })
      .catch(console.log);
  };

  const columns = [
    {
      name: 'id',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'date',
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: 'attendencestatus',
      selector: (row) => row.attendencestatus,
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
  // const cat = attendences.map((attendence) => {

  //   const person_name = staffs.find((staff) => staff.id === attendence.staff_name)?.name  

  // })

  useEffect(() => {
    const data = attendences.map((attendence) => {
      // const staff = staffs.find((staff) => staff.id === attendence.staff_id);
      // const staff_name = staff ? staff.name : '';
      // {staffs.find((staff) => staff.id === attendence.staff_name)?.name}
      const person_name = staffs.find((staff) => staff.id === attendence.staff_name)?.name  
      return {
        id: attendence.id,
        name: person_name,
        date: attendence.attendence_date,
        attendencestatus: attendence.attendence_status,
        // edit: <FontAwesomeIcon icon={faPen} />,
        edit : <Link to={`/attendenceedit/${attendence.id}`}>
        <FontAwesomeIcon icon={faPen } />
        </Link>,
        delete: (
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => onDelete(attendence.id)}
          />
        ),
      };
    });
    setRecords(data);
  }, [attendences, staffs]);

  // const handleFilter = (e) => {
    // const newData = attendences.filter((attendence) => {
    //   return attendence.staff_name
    //     .toLowerCase()
    //     .includes(e.target.value.toLowerCase());
    // });
    // setAttendences(newData);
    // const newData = attendences.filter((attendence) => {
    //   return attendence.person_name
    //   .toLowerCase()
    //   .includes(e.target.value.toLowerCase());
    // })
    // setAttendences(newData);
  // };


  // const handleFilter = (e) => {
  //   const newData = attendences.map((attendence) => {
  //     const person_name = staffs.find((staff) => staff.id === attendence.staff_name)?.name;
  //     return {
  //       ...attendence,
  //       person_name,
  //     };
  //   }).filter((attendence) => {
  //     return attendence.person_name
  //       .toLowerCase()
  //       .includes(e.target.value.toLowerCase());
  //   });
  //   setRecords(newData);
  // };

  const handleFilter = (e) => {
    const newData = attendences.map((attendence) => {
      const person_name = staffs.find((staff) => staff.id === attendence.staff_name)?.name;
      return {
        ...attendence,
        person_name,
      };
    }).filter((attendence) => {
      return attendence.person_name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setAttendences(newData);
  };

  // const handleFilter = (e) => {
  //   const newData = attendences.filter((attendence) => {
  //     const person_name = staffs.find((staff) => staff.id === attendence.staff_name)?.name;
  //     return person_name
        // .toLowerCase()
        // .includes(e.target.value.toLowerCase());
  //   });
  //   setRecords(newData);
  // };
  
    return(
      <div className="row justify-content-center"> 
          <h1 className="row justify-content-center mt-3">Attendence List</h1>
            <div className="mt-4 col-md-10 m row justify-content-center">

  
        <Button href="/attendenceadd" variant="secondary" className="middle col-2 mb-4">Add Attedence</Button>
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