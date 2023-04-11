import {useEffect , useState} from 'react'
import StaffAPI from '../../API/StaffAPI'
import AddDateAPI from '../../API/AddDateAPI';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default function EditStaff() {
    const params = useParams()
    const [dates , setDates] = useState([])
    const [date_attendence , setDateAttendence] = useState('')
    const [id, setId] = useState(null)

    useEffect(() => {
        setId(params.id)
        dataDate()
    }, [params.id])

    const dataDate = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/datelist/${params.id}/`)
        .then((res) => {
            setDates(res.data);
            setDateAttendence(res.data.date_attendence);
        })
        .catch(console.log)
    }


    const onSubmit = (e) => {
        e.preventDefault();
        let item = {date_attendence}
        AddDateAPI.post('/', item).then(() => dataDate());
    }

    const onUpdate = (id) => {
        let item = {date_attendence};
        AddDateAPI.patch(`/${id}/`, item).then(() => { 
            setDateAttendence('')
            dataDate()
          }
        )
      }

    function selectDate(id) {
        let item = dates.filter((date) => date.id === id)[0];
        setDateAttendence(item.date_attendence)
        setId(item.id)
    }


    return(
      <div className="container mt-5">
        <div className="row">
          <div className= "col-md-4"></div>
          <div className="col-md-4 ">
            <h3 className="float-left">Update Date</h3>
            
            <Form onSubmit={onSubmit} className="mt-4">
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Date Attendence</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  value={date_attendence}
                  onChange={(e) => setDateAttendence(e.target.value)}
                >
                    
                </Form.Control>
              </Form.Group>

            <div className="mt-3 float-right">
              <Link to="/stafflist/">
                <Button
                  variant="success"
                  type="button"
                  onClick={(e) => onUpdate(id)}
                  className="mx-2"
                >
                  Update
                </Button>
              </Link>
            </div>

          </Form>
          
              
            
        </div>

      </div>
    </div>
    )
}