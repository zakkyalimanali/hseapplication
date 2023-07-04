import {useState , useEffect, useContext, useRef} from 'react'
import PermitToWorkAPI from '../../../API/PermitToWorkAPI';
import SignituresAPI from '../../../API/SignituresAPI';
import StaffAPI from '../../../API/StaffAPI';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import AuthContext from "../../../context/AuthContext";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'
import { useParams } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas'
import html2canvas from 'html2canvas';

function SignituresAdd(props) {
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
    const canvasRef = useRef();


    useEffect(() => {
        fetchPermitToWork()
        fetchSignitures()
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

    const fetchSignitures = () => {
        SignituresAPI.get('/')
        .then((res) => {
            setSignitures(res.data)
        })
        .catch(console.log)
    }

    // const willSubmitTheEntryIntoDatabase = (e) => {
    //     e.preventDefault()
    //     let item = {
    //         person_name,
    //         person_signiture,
    //         signiture_for,
    //         position_class,
    //         permit_to_work
    //     }
    //     navigate(0)
    //     let token= authTokens.access
    //     SignituresAPI.post('/' , item , {
    //       headers: {
    //           'content-type': 'multipart/form-data',
    //           'Authorization': `Bearer ${token}`
    //         },
    //         responseType: 'blob'
    //   }) 
    //   .then(() => fetchSignitures())
    // }

    // const handleImageChange = (e) => {
    //     setPersonSigniture(e.target.files[0]);
    //   };

    // const willSubmitTheEntryIntoDatabase = (e) => {
    //   e.preventDefault();
    
    //   // Create a new FormData object
    //   const formData = new FormData();
    
    //   // Append the signature file to the FormData object
    //   formData.append('person_signiture', person_signiture);
    
    //   // Append other form data to the FormData object
    //   formData.append('person_name', person_name);
    //   formData.append('signiture_for', signiture_for);
    //   formData.append('position_class', position_class);
    //   formData.append('permit_to_work', permit_to_work);
    //   // navigate(0)
    
    //   // Make the API request
    //   let token = authTokens.access;
    // //   SignituresAPI.post('/', formData, {
    // //     headers: {
    // //       'Authorization': `Bearer ${token}`,
    // //       'Content-Type': 'multipart/form-data', // Set the content type to 'multipart/form-data'
    // //     },
    // //     responseType: 'blob'
    // //   })
    // //     .then(() => fetchSignitures())
    // //     .catch(console.error);
    // // };
    // SignituresAPI.post('/' , formData, {
    //         headers: {
    //             // 'content-type': 'multipart/form-data',
    //             'Authorization': `Bearer ${token}`
    //           },
    //           responseType: 'blob'
    //     }) 
    //     .then(() => fetchSignitures())
    //     .catch(console.error);
    //   }

    const willSubmitTheEntryIntoDatabase = (e) => {
      e.preventDefault();
    
      const canvas = canvasRef.current;
      const signatureImage = canvas.toDataURL(); // Get the data URL of the signature image
    
      const formData = new FormData();
      formData.append('person_signiture', signatureImage);
      formData.append('person_name', person_name);
      formData.append('signiture_for', signiture_for);
      formData.append('position_class', position_class);
      formData.append('permit_to_work', permit_to_work);
    
      let token = authTokens.access;
      SignituresAPI.post('/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob'
      })
        .then(() => fetchSignitures())
        .catch(console.error);
    };

    
    // const handleImageChange = () => {
    //   const canvas = canvasRef.current;
    
    //   // Use html2canvas to capture the canvas as an image
    //   html2canvas(canvas)
    //     .then((canvas) => {
    //       // Convert the canvas to an image URL
    //       const imageUrl = canvas.toDataURL('image/png');
    
    //       // Perform any required actions with the image URL (e.g., save it, display it, etc.)
    //       console.log(imageUrl);
    //     })
    //     .catch((error) => {
    //       console.error('Error saving canvas as image:', error);
    //     });
    // };

    const handleImageChange = () => {
      const canvas = canvasRef.current;
    
      // Convert the canvas to a Blob
      canvas.toBlob((blob) => {
        // Create a new File object from the Blob
        const file = new File([blob], 'signature.png', { type: 'image/png' });
    
        // Use the File object for further processing or upload
        setPersonSigniture(file);
      }, 'image/png');
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

                {/* <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Person Signiture</Form.Label>
                        <Form.Control
                            type="file"
                  // placeholder="Enter Responsible Party"
                            onChange={handleImageChange}
                        />
              </Form.Group> */}

{/* <SignatureCanvas penColor='green'
    canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} onChange={handleImageChange}/>, */}
<Form.Group className="mb-3" controlId="formName">
<Form.Label>Signiture</Form.Label>
  <SignatureCanvas
        ref={canvasRef}
        penColor="green"
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
        onChange={handleImageChange}
      />
</Form.Group>
  
    {/* <button onClick={handleImageChange}>Save as Image</button> */}



              


                
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
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={willSubmitTheEntryIntoDatabase}
                    className="mx-2"
                    // onChange={handleImageChange}
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

export default SignituresAdd
