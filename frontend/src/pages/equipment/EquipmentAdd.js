import React, {useState , useEffect} from 'react'
import EquipmentAndItemsAPI from '../../API/EquipmentAndItemsAPI'
import axios from 'axios'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link , useNavigate } from 'react-router-dom';

function EquipmentAdd() {
    const [equipments , setEquipments] = useState([])
    const [equipment_item , setEquipmentItem] = useState('')
    const [type_of_equipment_item , setTypeOfEquipmentItem] = useState('')
    const [category , setCategory] = useState('')
    const [size , setSize] = useState('')
    const [quantity_in_item, setQuantityInItem] = useState('')
    const [dollar_value , setDollarValue] = useState('')
    const [condition, setCondition] = useState('')
    const [storage_location , setStorageLocation] = useState('')
    const [identification_code, setIdentificationCode] = useState('')
    const [id , setId] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchEquipment()
    },[]) 

    const fetchEquipment = () => {
        EquipmentAndItemsAPI.get('/')
        .then((res) => {
          setEquipments(res.data)
        })
        .catch(console.log)
      }
    
      const onSubmit = (e) => {
        e.preventDefault();
        let item = {equipment_item , type_of_equipment_item, quantity_in_item , category, size, dollar_value , condition, storage_location, identification_code}
        navigate(-1);
        EquipmentAndItemsAPI.post('/', item).then(() => fetchEquipment());
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
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
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
                    variant="primary"
                    type="submit"
                    onClick={onSubmit}
                    className="mx-2"
                  >
                    Save
                  </Button>
                </div>
              </Form>    
            </div>            
          </div>
        </div>
  )
}

export default EquipmentAdd
