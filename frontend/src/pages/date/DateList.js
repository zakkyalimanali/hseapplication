import {useState , useEffect} from 'react'
import AddDateAPI from '../../API/AddDateAPI';
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import { ListGroup, Card, Button, Form } from 'react-bootstrap';

export default function DateList() {
    const [dates , setDates] = useState([])

    useEffect(() => {
        fetchDate();
    })

    const fetchDate = () => {
        AddDateAPI.get('/')
        .then((res) => {
            setDates(res.data)
        })
        .catch(console.log)
    }

    const onDelete = (id) => {
        AddDateAPI.delete(`/${id}/`).then((res) => {
            fetchDate();
        }).catch(console.log)
    }

    return(
        <div>
            <h1>Dates</h1>
                <div className="row justify-content-center"> 
            <div className="mt-4 col-md-10 m row justify-content-center">
            
            <Button href="/adddate" variant="secondary" className="middle col-2 mb-4">Add Attedence</Button>
            

                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th scope="col" className="col-1">ID</th>
                        <th scope="col" className="col-2">Date</th>
                        <th scope="col" className="col-1">More Info</th>
                        <th scope="col" className="col-1">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dates.map((date, index) => {
                        return (
                        <tr key={date.id}>
                            <td>{date.id}</td>
                            <td>{date.date_attendence}</td>
                            <td>
                                <Link to={`/editdate/${date.id}`}>
                                <FontAwesomeIcon icon={faPen } />
                                </Link>
                            </td>
    
                            <td className="delete" onClick={() => onDelete(date.id)}>
                            {/* <i class="fa fa-trash" aria-hidden="true"></i> */}
                            {/* <FontAwesomeIcon icon="check-square" />
        Your <FontAwesomeIcon icon="coffee" /> is hot and ready! */}
        <FontAwesomeIcon icon={faTrash } />
                            </td>
                        </tr>
                        );
                        })}
                    </tbody>


                </Table>

            
                </div>
            </div>


        </div>

    )
}