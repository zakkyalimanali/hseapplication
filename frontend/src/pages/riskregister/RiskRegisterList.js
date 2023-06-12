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
    const [editedRiskRegisters, setEditedRiskRegisters] = useState([]);

    useEffect(() => {
        fetchRiskRegister()
    },[])

    const fetchRiskRegister = () => {
        RiskRegisterAPI.get('/')
        .then((res) => {
            setRiskRegisters(res.data);
            setEditedRiskRegisters(res.data);
        }).catch(console.log)
    }

    const handleInputChange = (event, index, key) => {
        const { value } = event.target;
        setEditedRiskRegisters((prevRiskRegisters) => {
          const newRiskRegisters = [...prevRiskRegisters];
          newRiskRegisters[index][key] = value;
          return newRiskRegisters;
        });
      };

      const handleSaveClick = () => {
        // Send the editedRiskRegisters to the server to save the changes
        axios
          .put('http://127.0.0.1:8000/hseapp/api/riskregister/', editedRiskRegisters)
          // .put('/hseapp/riskregister/', editedRiskRegisters)
          .then((res) => {
            // Handle the response if needed
            console.log(res);
            // Refresh the table
            fetchRiskRegister();
          })
          .catch((error) => {
            // Handle the error if needed
            console.log(error);
          });
      };


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
                {/* <th scope="col" className="col-1">Likelihood Of Risk</th> 
                <th scope="col" className="col-1">Impact Of Risk</th>
                <th scope="col" className="col-1">Severity</th>
                <th scope="col" className="col-1">Owner</th>
                <th scope="col" className="col-1">Mitigating Action</th>
                <th scope="col" className="col-1">Contingency Action</th>
                <th scope="col" className="col-1">Progress On Actions</th>
                <th scope="col" className="col-1">Status</th> */}
                <th scope="col" className="col-1">Edit</th>
                <th scope="col" className="col-1">Delete</th>
              </tr>
            </thead>
            {/* This is for the table body, this takes the incidentinvestigation from above and then uses maps so that each entry can be displayed */}
            <tbody>

              {editedRiskRegisters.map((riskregister , index) => {
                return (
                  <tr key={riskregister.id}>
                    
                
                    <td>{riskregister.id}</td>
                    {/* <td>{riskregister.date_raised}</td> */}
                    <td>
                        <Form.Control
                        type="text"
                        value={riskregister.date_raised}
                        onChange={(event) =>
                            handleInputChange(event, index, 'date_raised')
                        }
                        />
                    </td>
                    {/* <td>{riskregister.risk_description}</td> */}
                    <td>
                        <Form.Control
                        type="text"
                        value={riskregister.risk_description}
                        onChange={(event) =>
                            handleInputChange(event, index, 'risk_description')
                        }
                        />
                    </td>
                    {/* <td>{riskregister.likelihood_of_risk}</td>
                    <td>{riskregister.impact_of_risk}</td>
                    <td>{riskregister.severity}</td>
                    <td>{riskregister.owner}</td>
                    <td>{riskregister.mitigating_action}</td>
                    <td>{riskregister.contingency_action}</td>
                    <td>{riskregister.progress_on_actions}</td>
                    <td>{riskregister.status}</td> */}
                    <td>
                        {/* <Link to={`/equipmentedit/${equipment.id}`}><FontAwesomeIcon icon={faPen } /></Link>   */}

                    </td>
                    <td></td>
                    {/* <td className="delete" onClick={() => forDeletingEquipmentAndItems(equipment.id)}>
                      <FontAwesomeIcon icon={faTrash } />
                    </td> */}
              
                  </tr>
                );
              })}
              
            </tbody>
          </Table> 
          <div className="text-center">
          <Button
            className="middle col-2 mb-4 mt-3"
            variant="secondary"
            onClick={handleSaveClick}
          >
            Save Changes
          </Button>
          </div>

              </div>
    </div>
  )
}

export default RiskRegisterList
