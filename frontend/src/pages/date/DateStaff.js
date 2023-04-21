import {useState , useEffect} from 'react'
import StaffAPI from '../../API/StaffAPI'
import AddDateAPI from '../../API/AddDateAPI';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

export default function DateStaff() {
    const [staff_name , setStaffName] = useState('')
    const [attendence_status , setAttendenceStatus] = useState('')
    const [staffs , setStaff] = useState([])
    const [dates, setDates] = useState([])

    useEffect(() => {
        fetchStaff();
        fetchDate();
    },[])

    const fetchStaff = () => {
        axios.get('http://127.0.0.1:8000/hseapp/staff/')
        .then((res) => {
            setStaffs(res.data)
        })
        .catch(console.log)
    }

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
            <Table></Table>
        </div>
    )
}
