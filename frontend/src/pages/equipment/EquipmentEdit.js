import React ,{useState, useEffect} from 'react'
import EquipmentAndItemsAPI from '../../API/EquipmentAndItemsAPI'
import { useParams } from 'react-router'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'


function EquipmentEdit() {
    const [equipments, setEquipments] = useState([])
    const [equipment_item , setEquipmentItem] = useState('')
    const [type_of_equipment_item , setTypeOfEquipmentItem] = useState('')
    const [category , setCategory] = useState('')
    const [quantity_in_item, setQuantityInItem] = useState('')
    const [dollar_value , setDollarValue] = useState('')
    const [condition, setCondition] = useState('')
    const [storage_location , setStorageLocation] = useState('')
    const [identification_code, setIdentificationCode] = useState('')
    const [id , setId] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetchEquipment()
        setId(params.id)
    },[params.id])

    const fetchEquipment = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/equipmentanditems/${params.id}`)
        .then((res) => {
            setEquipments(res.data)
            setEquipmentItem(res.data.equipment_item)
            setTypeOfEquipmentItem(res.data.type_of_equipment_item)
            setCategory(res.data.category)
            setQuantityInItem(res.data.quantity_in_item)
            setDollarValue(res.data.dollar_value)
            setCondition(res.data.condition)
            setStorageLocation(res.data.storage_location)
            setIdentificationCode(res.data.identification_code)
        })
        .catch(console.log)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let item = {equipment_item , type_of_equipment_item, quantity_in_item , category, dollar_value , condition, storage_location, identification_code}
        EquipmentAndItemsAPI.post('/', item).then(() => fetchEquipment());
    }

    const onUpdate = (id) => {
        let item = {equipment_item , type_of_equipment_item, quantity_in_item , category, dollar_value , condition, storage_location, identification_code}
        EquipmentAndItemsAPI.patch(`/${id}/`, item).then(() => { 
            setEquipmentItem('')
            setTypeOfEquipmentItem('')
            setCategory('')
            setQuantityInItem('')
            setDollarValue('')
            setCondition('')
            setStorageLocation('')
            fetchEquipment()
        }
      )
      navigate(-1)
    }

    const onDelete = (id) => {
        EquipmentAndItemsAPI.delete(`/${id}/`).then((res) => {
         fetchEquipment();
         }).catch(console.log)
     }


  return (
    <div className="container mt-5">
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="float-left">Create a New Equipment / Item</h3>
              
              <Form onSubmit={onSubmit} 
              className="mt-4">
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Equipment / Item</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Equipment / Item"
                    value={equipment_item}
                    onChange={(e) => setEquipmentItem(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Type of Equipment / Item</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type of Equipment / Item"
                    value={type_of_equipment_item}
                    onChange={(e) => setTypeOfEquipmentItem(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Quantity In Item</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Quantity In Item"
                    value={quantity_in_item}
                    onChange={(e) => setQuantityInItem(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Dollar Value</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Dollar Value"
                    value={dollar_value}
                    onChange={(e) => setDollarValue(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Condition</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Condition"
                    value={condition}
                    onChange={(e) =>  setCondition(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Storage Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Storage Location"
                    value={storage_location}
                    onChange={(e) => setStorageLocation(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Identification Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Identification Code"
                    value={identification_code}
                    onChange={(e) => setIdentificationCode(e.target.value)}
                  />
                </Form.Group>



              
       
                
                
                <div className="mt-3 float-right">
                  <Button
                    variant="warning"
                    type="button"
                    onClick={(e) => onUpdate(id)}
                    className="mx-2 mb-3"
                  >
                    Update
                  </Button>
                </div>
              </Form>    
            </div>            
          </div>
        </div>
  )
}

export default EquipmentEdit
