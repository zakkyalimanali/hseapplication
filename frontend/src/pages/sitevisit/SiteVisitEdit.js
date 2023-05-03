import React , {useEffect , useState} from 'react'
import StaffAPI from '../../API/StaffAPI'
import SiteVisitAPI from '../../API/SiteVisitAPI'
import axios from 'axios'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'


function SiteVisitEdit() {
    const [siteVisits , setSiteVisits] = useState([])
    const [staffs , setStaffs] = useState([])
    const params = useParams()
  return (
    <div>
      
    </div>
  )
}

export default SiteVisitEdit
