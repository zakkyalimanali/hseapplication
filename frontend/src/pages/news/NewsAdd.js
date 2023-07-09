import {useState , useEffect, useContext} from 'react'
import NewsAPI from '../../API/NewsAPI';
import StaffAPI from '../../API/StaffAPI';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'
import { useParams } from 'react-router-dom';

function NewsAdd() {
    const [worknews , setWorkNews] = useState([])
    const [staffs , setStaffs] = useState([])
    const [person_name , setPersonName] = useState('')
    const [headline , setHeadline] = useState('')
    const [textbody , setTextbody] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchStaff()
        fetchNews()
    },[])

    const fetchStaff = () => {
        StaffAPI.get('/')
        .then((res) => {
            setStaffs(res.data)
        })
        .catch(console.log)
    }

    const fetchNews = () => {
        NewsAPI.get('/')
        .then((res) => {
            setWorkNews(res.data)
        })
        .catch(console.log)
    }

    const willSubmitTheEntryIntoDatabase = (e) => {
        e.preventDefault()
        let item = {
            person_name,
            headline,
            textbody,
        }
        navigate(-1);
        NewsAPI.post('/', item).then(()=> 
            fetchNews())
            .catch((error) => {
                console.log("Error:", error);
              })
    }

  return (
    <div className="container mt-5 pb-5">
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="float-left mt-5">Create a New Permit To Work</h3>
              
              <Form onSubmit={willSubmitTheEntryIntoDatabase} 
              className="mt-4">
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Reporter</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Reporter"
                    value={person_name}
                    onChange={(e) => setPersonName(e.target.value)}
                  >
                    <option value=''>Select An Option</option>
                {staffs.map(staff => {
                  return <option key={staff.id} value={staff.id}>{staff.name} ({staff.position})</option>
                })}


                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Headline</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Headline"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Textbody</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Textbody"
                    value={textbody}
                    onChange={(e) => setTextbody(e.target.value)}
                  />
                </Form.Group>


                

                <div className="mt-3 float-right">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={willSubmitTheEntryIntoDatabase}
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

export default NewsAdd
