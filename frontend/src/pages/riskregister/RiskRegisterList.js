import React, {useState, useEffect} from 'react'
import RiskRegisterAPI from '../../API/RiskRegisterAPI';
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

function RiskRegisterList() {
    const [riskregisters , setRiskRegisters] = useState([])
    

    useEffect(() => {
        fetchRiskRegister()
    },[])

    const fetchRiskRegister = () => {
        RiskRegisterAPI.get('/')
        .then((res) => {
            setRiskRegisters(res.data);
        }).catch(console.log)
    }

    const deleteRisk = (id) => {
      RiskRegisterAPI.delete(`/${id}`).then((res) => {
        fetchRiskRegister();

      }).catch(console.log)
    }


  return (
    <div className="container mt-5">
        <div className="row">
        {/* This is for the title */}
        <h1 className="row justify-content-center mt-3">Risk Register</h1>
        
          <div className= "col-md-4"></div>
          <div className="col-md-4 "></div>
      <Table striped bordered hover className='mt-3'>
        {/* This is for the table heading */}
          <thead>
              <tr>
                <th scope="col" className="col-1">ID</th>
                <th scope="col" className="col-2">Date Raised</th>
                <th scope="col" className="col-2">Risk Description</th>
                 <th scope="col" className="col-1">Likelihood Of Risk</th> 
                <th scope="col" className="col-1">Impact Of Risk</th>
                <th scope="col" className="col-1">Severity</th>
                <th scope="col" className="col-1">Owner</th>
                <th scope="col" className="col-1">Mitigating Action</th>
                <th scope="col" className="col-1">Contingency Action</th>
                <th scope="col" className="col-1">Progress On Actions</th>
                <th scope="col" className="col-1">Status</th>
                <th scope="col" className="col-1">Edit</th>
                <th scope="col" className="col-1">Delete</th>
              </tr>
            </thead>
            {/* This is for the table body, this takes the incidentinvestigation from above and then uses maps so that each entry can be displayed */}
            <tbody>

              {riskregisters.map((riskregister) => {
                return (
                  <tr key={riskregister.id}>
                    
                
                    <td>{riskregister.id}</td>
                    <td>{riskregister.date_raised}</td>
                    <td>{riskregister.risk_description}</td>
                    <td>{riskregister.likelihood_of_risk}</td>
                    <td>{riskregister.impact_of_risk}</td>
                    <td>{riskregister.severity}</td>
                    <td>{riskregister.owner}</td>
                    <td>{riskregister.mitigating_action}</td>
                    <td>{riskregister.contingency_action}</td>
                    <td>{riskregister.progress_on_actions}</td>
                    <td>{riskregister.status}</td>
                    <td>
                        <Link to={`/riskregisteredit/${riskregister.id}`}><FontAwesomeIcon icon={faPen } /></Link>  

                    </td>
                    {/* <td></td> */}
                    <td className="delete" onClick={() => deleteRisk(riskregister.id)}>
                      <FontAwesomeIcon icon={faTrash } />
                    </td>
              
                  </tr>
                );
              })}
              
            </tbody>
          </Table> 
          <div className="text-center">
              <Button className="middle col-2 mb-4 mt-3" variant="secondary" href="/riskregisteradd">
                Add Risk
            </Button>
          </div>

              </div>
    </div>
  )
}

export default RiskRegisterList
