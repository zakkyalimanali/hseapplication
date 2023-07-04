import React , {useEffect , useState , useContext} from 'react'
import PermitToWorkAPI from '../../../API/PermitToWorkAPI';
import SignituresAPI from '../../../API/SignituresAPI';
import StaffAPI from '../../../API/StaffAPI';
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link} from 'react-router-dom';
import AuthContext from "../../../context/AuthContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'

// Others 
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom';


function SignituresEdit(props) {
    const [permittoworks , setPermitToWorks] = useState([])
    const [signitures , setSignitures] = useState([])
    const [staffs , setStaffs] = useState([])
    const permit_to_work = props.permittowork
    const [person_name , setPersonName] = useState('')
    const [person_signiture , setPersonSigniture] = useState(null)
    const [signiture_for , setSignitureFor] = useState('')
    const [position_class , setPositionClass] = useState('')
    const navigate = useNavigate()
    const {authTokens} = useContext(AuthContext);
    const [id , setId] = useState(null)
    const params = useParams()

    useEffect(() => {
        fetchPermitToWork()
        fetchStaff()
    },[])

    const fetchPermitToWork = () => {
        PermitToWorkAPI.get('/')
        .then((res) => {
            setPermitToWorks(res.data)
        })
        .catch(console.log)
    }

    const fetchStaff = () => {
        StaffAPI.get('/')
        .then((res) => {
            setStaffs(res.data)
        })
        .catch(console.log)
    }

    useEffect(() => {
        setId(params.id)
        fetchSignitures()
    },[params.id])

    const fetchSignitures = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/signitures/${params.id}`)
        .then((res) => {
            setSignitures(res.data)
            setPersonName(res.data.person_name)
            setPersonSigniture(res.data.person_signiture)
            setSignitureFor(res.data.signiture_for)
            setPositionClass(res.data.position_class)
        })
        .catch(console.log)
    }

    const willSubmitTheEntryIntoDatabase = (e) => {
        e.preventDefault()
        let item = {
            person_name,
            person_signiture,
            signiture_for,
            position_class,
            permit_to_work
        }
        navigate(0)
        let token= authTokens.access
        SignituresAPI.post('/' , item , {
          headers: {
              'content-type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            },
            responseType: 'blob'
      }) 
      .then(() => fetchSignitures())
    }


const updateEntryToDatabase = (id) => {
    let item = {
        person_name,
        person_signiture,
        signiture_for,
        position_class,
        permit_to_work
    }
        let token= authTokens.access
  
        SignituresAPI.patch(`/${id}/`, item , {
          headers: {
              'content-type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            },
            responseType: 'blob'
      }) 
        .then(() => { 
            setPersonName('')
            setPersonSigniture('')
            setSignitureFor('')
            setPositionClass('')
            fetchSignitures()
          }
        )
        navigate(-1)
      }

      const handleImageChange = (e) => {
        setPersonSigniture(e.target.files[0]);
      };


  return (
    <div className="container mt-5">
          <div className="row">
            <div className= "col-md-12"></div>
            <div className="col-md-12 ">
              <h3 className="float-left">Create a Signitures</h3>
              
              <Form onSubmit={willSubmitTheEntryIntoDatabase} 
              className="mt-4">

                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Person Name</Form.Label>
                  <Form.Control
                    as ="select"
                    placeholder="Person Name"
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
                    <Form.Label>Person Signiture</Form.Label>
                        <Form.Control
                            type="file"
                  // placeholder="Enter Responsible Party"
                            onChange={handleImageChange}
                        />
              </Form.Group>


                
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Signiture For</Form.Label>
                    <Form.Control
                        as="select"
                        placeholder="Signiture For"
                        value={signiture_for}
                        onChange={(e) => setSignitureFor(e.target.value)}
                    >
                        <option value=''>------</option>
                        <option value='Details Of Work'>Details Of Work</option>
                        <option value='Acceptance'>Acceptance</option>
                        <option value='Completion'>Completion</option>
                        <option value='Final Sign Off'>Final Sign Off</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Position Class</Form.Label>
                    <Form.Control
                        as="select"
                        placeholder="position_class"
                        value={position_class}
                        onChange={(e) => setPositionClass(e.target.value)}
                    >
                        <option value=''>------</option>
                        <option value='Compenent Person'>Competent Person</option>
                        <option value='Worker'>Worker</option>
                        <option value='Authorizer'>Authorizer</option>
                    </Form.Control>
                </Form.Group>
       
              
       
                <div className="mt-3 d-flex justify-content-center">
                  {/* <Button
                    variant="primary"
                    type="submit"
                    onClick={willSubmitTheEntryIntoDatabase}
                    className="mx-2"
                  >
                    Save
                  </Button> */}
                  <Button
                    variant="primary"
                    onClick= {(e) => updateEntryToDatabase (id)}
                    className="mx-2">
                      Update
                  </Button>
                </div>
              </Form>    
            </div>            
          </div>
        </div>
  )
}

export default SignituresEdit
