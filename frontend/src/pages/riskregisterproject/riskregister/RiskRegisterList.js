import React, {useState, useEffect} from 'react'
import RiskRegisterAPI from '../../../API/RiskRegisterAPI';
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
import StaffAPI from '../../../API/StaffAPI';

function RiskRegisterList() {
    const [riskregisters , setRiskRegisters] = useState([])
    const [staffs, setStaffs] = useState([])
    const [records, setRecords] = useState([]);
    

    useEffect(() => {
        fetchRiskRegister()
        fetchStaff()
    },[])

    const fetchRiskRegister = () => {
        RiskRegisterAPI.get('/')
        .then((res) => {
            setRiskRegisters(res.data);
        }).catch(console.log)
    }

    const fetchStaff = () => {
      StaffAPI.get('/')
      .then((res) => {
        setStaffs(res.data);
      }).catch(console.log)
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
        // width: '12rem'
        // style: {
        //   background: 'rgba(251,212,124, 0.5)',
        // },
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

    useEffect(() => {
      const data = riskregisters.map((riskregister) => {
        const raised_by = staffs.find((staff) => staff.id === riskregister.raised_by)?.name  
        const reviewed_by = staffs.find((staff) => staff.id === riskregister.reviewed_by)?.name  
        return {
          id: riskregister.id,
          date_raised : riskregister.date_raised ,
          date_reviewed : riskregister.date_reviewed,
          textbrief : riskregister.textbrief,
          raised_by : raised_by,
          reviewed_by : reviewed_by,
          risk_description : riskregister.risk_description,
          likelihood_of_risk : riskregister.likelihood_of_risk,
          impact_of_risk : riskregister.impact_of_risk,
          severity : riskregister.severity,
          responsible_party : riskregister.responsible_party,
          mitigating_action : riskregister.mitigating_action,
          contingency_action : riskregister.contingency_action,
          progress_on_actions : riskregister.progress_on_actions,
          status : riskregister.status,
          more_info : <Link to={`/riskregisteredit/${riskregister.id}`}><FontAwesomeIcon icon={faPen } /></Link> ,
          // more_info : "More Info",
          delete: (
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => deleteRisk(riskregister.id)}
            />
          ),
          // delete: "Delete",
    
        }
      })
      setRecords(data);
    }, [riskregisters])
    


  return (
    // <div className="container mt-5">
    //     <div className="row">
    //     {/* This is for the title */}
    //     <h1 className="row justify-content-center mt-3">Risk Register</h1>
        
    //       <div className= "col-md-4"></div>
    //       <div className="col-md-4 "></div>
    //   <Table striped bordered hover className='mt-3'>
    //     {/* This is for the table heading */}
    //       <thead>
    //           <tr>
    //             <th scope="col" className="col-1">ID</th>
    //             <th scope="col" className="col-2">Date Raised</th>
    //             <th scope="col" className="col-2">Risk Description</th>
    //              <th scope="col" className="col-1">Likelihood Of Risk</th> 
    //             <th scope="col" className="col-1">Impact Of Risk</th>
    //             <th scope="col" className="col-1">Severity</th>
    //             <th scope="col" className="col-1">Owner</th>
    //             <th scope="col" className="col-1">Mitigating Action</th>
    //             <th scope="col" className="col-1">Contingency Action</th>
    //             <th scope="col" className="col-1">Progress On Actions</th>
    //             <th scope="col" className="col-1">Status</th>
    //             <th scope="col" className="col-1">Edit</th>
    //             <th scope="col" className="col-1">Delete</th>
    //           </tr>
    //         </thead>
    //         {/* This is for the table body, this takes the incidentinvestigation from above and then uses maps so that each entry can be displayed */}
    //         <tbody>

    //           {riskregisters.map((riskregister) => {
    //             return (
    //               <tr key={riskregister.id}>
                    
                
    //                 <td>{riskregister.id}</td>
    //                 <td>{riskregister.date_raised}</td>
    //                 <td>{riskregister.risk_description}</td>
    //                 <td>{riskregister.likelihood_of_risk}</td>
    //                 <td>{riskregister.impact_of_risk}</td>
    //                 <td>{riskregister.severity}</td>
    //                 <td>{riskregister.owner}</td>
    //                 <td>{riskregister.mitigating_action}</td>
    //                 <td>{riskregister.contingency_action}</td>
    //                 <td>{riskregister.progress_on_actions}</td>
    //                 <td>{riskregister.status}</td>
    //                 <td>
    //                     <Link to={`/riskregisteredit/${riskregister.id}`}><FontAwesomeIcon icon={faPen } /></Link>  

    //                 </td>
    //                 {/* <td></td> */}
    //                 <td className="delete" onClick={() => deleteRisk(riskregister.id)}>
    //                   <FontAwesomeIcon icon={faTrash } />
    //                 </td>
              
    //               </tr>
    //             );
    //           })}
              
    //         </tbody>
    //       </Table> 
    //       <div className="text-center">
    //           <Button className="middle col-2 mb-4 mt-3" variant="secondary" href="/riskregisteradd">
    //             Add Risk
    //         </Button>
    //       </div>

    //           </div>
    // </div>
    <div className="row justify-content-center"> 
    <h1 className="row justify-content-center mt-5">Project (insert project name here) Risk Register</h1>
      
      <div className="mt-4 col-md-10 m row justify-content-center">
      <div className="row justify-content-around">
      <Button href="/riskregisteradd" variant="secondary" className="mb-4 col-md-2">
                      Add Risk
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

export default RiskRegisterList
