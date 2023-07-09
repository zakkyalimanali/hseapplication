import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import AuthContext from "../../context/AuthContext";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import HSEManagementAPI from '../../API/HSEManagementAPI';
import { Link , useNavigate } from 'react-router-dom';
import { ListGroup, Card, Button, Form } from "react-bootstrap";


function Hsemanagement() {
    const [hsemanagements , setHSEManagements] = useState([])
    const [title , setTitle] = useState('')
    const [content , setContent] = useState('')
    const [id , setId] = useState(null)
    const [management_commitment_document, setManagementCommitmentDocument] = useState(null)
    const {authTokens} = useContext(AuthContext);

    useEffect(() => {
        fetchHSEManagement()
    },[]) 

    const fetchHSEManagement = () => {
        HSEManagementAPI.get('/')
        .then((res) => {
            setHSEManagements(res.data);
        }).catch(console.log)
    }

    const onSubmit = (e) => {
        let item = {title, content , management_commitment_document}
        let token= authTokens.access
        HSEManagementAPI.post('/', item, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
              },
              responseType: 'blob'
        }) 
        .then(() => fetchHSEManagement())
        console.log(authTokens)
    }

    const handleFileChange = (e) => {
        setManagementCommitmentDocument(e.target.files[0])
    } 
    const forDeletingHSEManagement = (id) => {
        let token = authTokens.access
        HSEManagementAPI.delete(`/${id}/`, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
              },
              responseType: 'blob'
            })
    //    .then((res) => {
    //      fetchHSEManagement();
    //      }).catch(console.log)
            .then(() => fetchHSEManagement()) 

     }
     console.log(authTokens)

  return (
    
    
    <div className="container mt-5 pb-5">
        <div className="row">
          <div className= "col-md-2"></div>
            <div className="col-md-8 ">
                <h3 className="float-left mt-5">Add HSE Management File</h3>
            
            <Form onSubmit={onSubmit} className="update mt-4">
              
              



          
       
              
             
              
               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Title</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="Title"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                 />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formStaffIdNumber=">
                 <Form.Label>Content</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="Context"
                   value={content}
                   onChange={(e) => setContent(e.target.value)}
                 />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Management Commitment Document</Form.Label>
                <Form.Control
                  type="file"
                  // placeholder="Enter Responsible Party"
                  onChange={handleFileChange}
                />
              </Form.Group>
{/*               
              <Button
                  variant="primary"
                  type="submit"
                  onClick={onSubmit}
                  className="mx-2"
                >
                  <Link className="white" to="/incidenttable">Save</Link>
                </Button> */}
                {/* <Link  onClick={onSubmit} className="white" to="/incidenttable">Save</Link> */}
                  <Button
                    variant="primary"
                    onClick={onSubmit}>
                      Save
                  </Button>
  
            </Form>

            

            
            </div>
            {/* <div><a href={`http://127.0.0.1:8000/media/post_documents/${hsemanagements.management_commitment_document}`} download>Download</a></div> */}

        </div>

        <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th scope="col" className="col-1">ID</th>
                        <th scope="col" className="col-3">Title</th>
                        <th scope="col" className="col-6">Content</th>
                        <th scope="col" className="col-1">Download</th>
                        {/* <th scope="col" className="col-1">Edit</th> */}
                        <th scope="col" className="col-1">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {hsemanagements.map((hsemanagement) => {
                        return (
                            <tr key={hsemanagement.id}>
                                <td>{hsemanagement.id}</td>
                                <td>{hsemanagement.title}</td>
                                <td>{hsemanagement.content}</td>
                                {/* <td>{hsemanagement.context}</td> */}
                                <td><a href={`${hsemanagement.management_commitment_document}`} download={hsemanagement.management_commitment_document}>Download</a></td>

                                {/* <td>Edit</td> */}
                                <td className='delete' onClick={() => forDeletingHSEManagement(hsemanagement.id)}><FontAwesomeIcon icon={faTrash } /></td>
                            </tr>
                        )
                    })}
                </tbody>
        </Table>
        
    </div>
  )
}

export default Hsemanagement
