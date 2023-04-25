import {useState , useEffect} from 'react'
import AddDateAPI from '../../API/AddDateAPI';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';


export default function AddDate() {
    const [dates ,setDates] = useState([])
    const [date_attendence , setDateAttendence] = useState('')
    let navigate = useNavigate();

    useEffect(() =>{
        fetchDate()
    },[])

    const fetchDate = () => {
        AddDateAPI.get('/')
        .then((res) => {
            setDates(res.data)
        })
        .catch(console.log)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let item = {date_attendence}
        navigate("/datelist");
        AddDateAPI.post('/' , item).then(() => fetchDate())
    }


    return(
        <div>
            <h1>Attendence Add</h1>
                <div className="container mt-5">
                    <div className="row">
                        <div className= "col-md-2"></div>
                            <div className="col-md-8 ">
                                <h3 className="float-left">Create a new Attendence</h3>
                
                                <Form onSubmit={onSubmit} className="mt-4">
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Attendence Date</Form.Label>
                                        <Form.Control
                                        type="date"
                                        placeholder="Date"
                                        value={date_attendence}
                                        onChange={(e) => setDateAttendence(e.target.value)}
                                        />
                                    </Form.Group>

                    <Button
                        variant="primary"
                        onClick={onSubmit}>
                        Save
                    </Button>
    
                </Form>

                
                </div>
            </div>
        </div>
        </div>
    )
}