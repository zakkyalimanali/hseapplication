import React , {useEffect , useState} from 'react'
// APIS
import BlogAPI from '../../API/BlogAPI';
import StaffAPI from '../../API/StaffAPI';

import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'


// Others 
import { useNavigate } from 'react-router'

function BlogEdit() {
    const [blogs , setBlogs] = useState([])
    const [staffs , setStaffs] = useState([])
    const [person_name , setPersonName] = useState('')
    const [headline , setHeadline] = useState('')
    const [textbrief , setTextBrief] = useState('')
    const [textcontent , setTextContent] = useState('')
    const navigate = useNavigate()
    const params = useParams()
    const [ id , setId ] = useState(null)


    useEffect(() => {
        fetchBlog() 
        setId(params.id)
    },[params.id])

    const fetchBlog = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/blog/${params.id}`)
        .then((res) => {
            setBlogs(res.data)
            setPersonName(res.data.person_name)
            setHeadline(res.data.headline)
            setTextBrief(res.data.textbrief)
            setTextContent(res.data.textcontent)
        })
        .catch(console.log)
    }

    useEffect(() => {
        fetchStaff() 
    },[])

    const fetchStaff = () => {
        StaffAPI.get('/')
        .then((res) => {
            setStaffs(res.data)
        })
        .catch(console.log)
    }

    const willSubmitTheEntryIntoDatabase = (e) => {
        e.preventDefault()
        let item = {
            person_name : person_name || null,
            headline,
            textbrief,
            textcontent,
        }
        navigate(-1);
        BlogAPI.post('/', item).then(()=> 
            fetchBlog())
            .catch((error) => {
                console.log("Error:", error);
              })
    }

    const toUpdateDatabaseInfo = (id) => {
        let item = {
            person_name : person_name || null,
            headline,
            textbrief,
            textcontent,
        }
    BlogAPI.patch(`/${id}/`, item).then(() => {
        setPersonName('')
        setHeadline('')
        setTextBrief('')
        setTextContent('')
        fetchBlog()
    })
    navigate(-1)
    }








  return (
    <div className="container mt-5 pb-5">
          <div className="row">
            <div className= "col-md-4"></div>
            <div className="col-md-4 ">
              <h3 className="float-left mt-5">Create a New Blog Post</h3>
              
              <Form onSubmit={willSubmitTheEntryIntoDatabase} 
              className="mt-4">
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Created By:</Form.Label>
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
                  <Form.Label>Brief</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Brief"
                    value={textbrief}
                    onChange={(e) => setTextBrief(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Text Content"
                    value={textcontent}
                    onChange={(e) => setTextContent(e.target.value)}
                  />
                </Form.Group>


                

                <div className="mt-3 float-right">
                <Button
                    variant="warning"
                    type="button"
                    onClick={(e) => toUpdateDatabaseInfo(id)}
                    className="mx-2"
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

export default BlogEdit
