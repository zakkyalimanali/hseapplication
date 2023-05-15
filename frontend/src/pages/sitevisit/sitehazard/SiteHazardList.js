import React, {useState, useEffect} from 'react'
import SiteHazardAPI from '../../../API/SiteHazardAPI'
import SiteVisitAPI from '../../../API/SiteVisitAPI'
import axios from 'axios'
import { Link, parsePath } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import { useOutletContext } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function SiteHazardList(props) {
    const  [siteHazards , setSiteHazards] = useState([])
    const  [siteVisits , setSiteVisits] = useState([])
    // const visit = props.sitevisit
    const params = useParams()
    // const visits = 
    const [id , setId] = useState(null)

    useEffect(() => {
        // fetchHazard()
        fetchVisit()
    },[]) 

    useEffect(() => {
        fetchHazard()
        setId(params.id)
    },[params.id])

    const fetchHazard = () => {
        axios.get(`http://127.0.0.1:8000/hseapp/sitehazard/${params.id}/`)
        .then((res) => {
            setSiteHazards(res.data)
        })
        .catch(console.log)
    }

    const fetchVisit = () => {
        SiteVisitAPI.get('/')
        .then((res) => {
            setSiteVisits(res.data)
        })
        .catch(console.log)
    }

    const onDelete = (id) => {
        SiteHazardAPI.delete(`/${id}/`).then((res) => {
            fetchHazard();
        }).catch(console.log)
    }


  return (
    <div>
        <Table striped bordered hover className='mt-3'>
          <thead>
              <tr>
                <th scope="col" className="col-1">ID</th>
                <th scope="col" className="col-5">Hazard</th>
                <th scope="col" className="col-1">Status</th>
                <th scope="col" className="col-5">Notes</th> 
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* {siteHazards.filter ((siteHazard) => siteHazard.visit === Number(params.id)) */}
              {siteHazards.map((siteHazard) => {
                return (
                  <tr key={siteHazard.id}>
                    <td>{siteHazard.id}</td>
                    <td>{siteHazard.hazard}</td>
                    <td>{siteHazard.status}</td>
                    <td>{siteHazard.notes}</td>
                    <td>
                        <Link to={`/sitehazardedit/${siteHazard.id}`}><FontAwesomeIcon icon={faPen } /></Link>  
                        {/* <Button onClick= {toogleShown}>Edit</Button>                                           */}
                    </td>
                    <td className="delete" onClick={() => onDelete(siteHazard.id)}>
                      <FontAwesomeIcon icon={faTrash } />
                    </td>
              
                  </tr>
                );
              })}
              
            </tbody>
          </Table> 
      
    </div>
  )
}

export default SiteHazardList
