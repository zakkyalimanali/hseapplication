import React, {useState, useEffect} from 'react'
import EquipmentAndItemsAPI from '../../API/EquipmentAndItemsAPI'
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

function Equipment() {
  const [equipments , setEquipments ] = useState([])
  const [id , setId] = useState(null)
  
  useEffect( () => {
    fetchEquipment()
  },[])

  const fetchEquipment = () => {
    EquipmentAndItemsAPI.get('/')
    .then((res) => {
      setEquipments(res.data)
    })
    .catch(console.log)
  }

  const forDeletingEquipmentAndItems = (id) => {
    EquipmentAndItemsAPI.delete(`/${id}/`).then((res) => {
     fetchEquipment();
     }).catch(console.log)
 }

  return (
    <div className="container mt-5">
        <div className="row">
        {/* This is for the title */}
        <h1 className="row justify-content-center mt-3">Equipment and Items</h1>
        <div className="text-center">
          <Button className="middle col-2 mb-4 mt-3" variant="warning" href="/equipmenttotals">
            Equipment / Items Totals
        </Button>
        </div>
        
          <div className= "col-md-4"></div>
          <div className="col-md-4 "></div>
        <div className="table-responsive-md">
      <Table striped bordered hover className='mt-3'>
        {/* This is for the table heading */}
          <thead>
              <tr>
                <th scope="col" className="col-1">ID</th>
                <th scope="col" className="col-2">Item / Equipment</th>
                <th scope="col" className="col-2">Type of equipment / item</th>
                 <th scope="col" className="col-1">Identification Code</th> 
                <th scope="col" className="col-1">Category</th>
                {/* <th scope="col" className="col-1">Dollar Value</th> */}
                {/* <th scope="col" className="col-2">Condition and Remarks</th> */}
                <th scope="col" className="col-1">Size</th>
                <th scope="col" className="col-1">Quantity in item</th>
                <th scope="col" className="col-2">Storage Location</th>
                <th scope="col" className="col-1">Edit</th>
                <th scope="col" className="col-1">Delete</th>
              </tr>
            </thead>
            {/* This is for the table body, this takes the incidentinvestigation from above and then uses maps so that each entry can be displayed */}
            <tbody>

              {equipments.map((equipment) => {
                return (
                  <tr key={equipment.id}>
                    
                
                    <td>{equipment.id}</td>
                    <td>{equipment.equipment_item}</td>
                    <td>{equipment.type_of_equipment_item}</td>
                    <td>{equipment.identification_code}</td>
                    <td>{equipment.category}</td>
                    <td>{equipment.size}</td>
                    {/* <td>{equipment.dollar_value}</td>
                    <td>{equipment.condition}</td> */}
                    <td>{equipment.quantity_in_item}</td>
                    <td>{equipment.storage_location}</td>
                    
               




                    <td>
                        <Link to={`/equipmentedit/${equipment.id}`}><FontAwesomeIcon icon={faPen } /></Link>  

                    </td>
                    <td className="delete" onClick={() => forDeletingEquipmentAndItems(equipment.id)}>
                      <FontAwesomeIcon icon={faTrash } />
                    </td>
              
                  </tr>
                );
              })}
              
            </tbody>
          </Table> 

          </div>
          <div className="text-center">
              <Button className="middle col-2 mb-4 mt-3" variant="secondary" href="/equipmentadd">
                Add Equipment / Item 
            </Button>
          </div>

              </div>
    </div>
  )
}

export default Equipment
