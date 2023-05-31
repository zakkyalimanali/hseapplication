import React , {useEffect , useState} from 'react'
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

function EquipmentTotals() {
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

// const catequipment = equipments.filter(equipment => equipment.type_of_equipment_item == "cat" )
// const dogequipment = equipments.filter(equipment => equipment.type_of_equipment_item == "dog" )
// const catcount = catequipment.length;
// const dogcount = dogequipment.length;
const equipmentCounts = {};

equipments.forEach(equipment => {
    const type = equipment.type_of_equipment_item;
    if (equipmentCounts[type]) {
      equipmentCounts[type] += 1;
    } else {
      equipmentCounts[type] = 1;
    }
  });
  return (
    // <div className="col-8 mx-auto mt-4">  
    //         <h1 className="row justify-content-center mt-3">Total Items</h1>
    //         <Table className="mt-3" striped bordered hover>
    //             <thead>
    //                 <tr>
    //                 <th scope="col" className="col-4">Item / Equipment</th>
    //                 <th scope="col" className="col-4">Numbers</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                     <tr>
    //                         <th className="col-4" scope="row">Cat</th>
    //                         <td className="col-4">{catcount}</td>
    //                     </tr>
    //                     <tr>
    //                         <th className="col-4" scope="row">Dog</th>
    //                         <td className="col-4">{dogcount}</td>
    //                     </tr>
    //             </tbody>
    //             </Table>
    //     </div>
    <div className="col-8 mx-auto mt-4">
    <h1 className="row justify-content-center mt-3">Total Items</h1>
    <Table className="mt-3" striped bordered hover>
      <thead>
        <tr>
          <th scope="col" className="col-4">Item / Equipment</th>
          <th scope="col" className="col-4">Numbers</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(equipmentCounts).map(type => (
          <tr key={type}>
            <th className="col-4" scope="row">{type}</th>
            <td className="col-4">{equipmentCounts[type]}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
  )
}

export default EquipmentTotals
