import {useState , useEffect } from 'react'
import StaffAPI from '../API/StaffAPI'
import IncidentAPI from '../API/IncidentAPI'

export default function Home() {
    const [staffs , setStaff] = useState([])
    const [incidents , setIncidents] = useState([])

    useEffect(() => {
        StaffAPI.get('/')
        .then((res) => {
            setStaff(res.data)
            console.log(res.data)
        })
        .catch(console.log)
    },[])

    useEffect(() => {
        IncidentAPI.get('/')
        .then((res) => {
            setIncidents(res.data)
            console.log(res.data)
        })
        .catch(console.log)
    },[])



    return(
        <div>
        <h1>Home Page/Dashboard</h1>
        <h3>Total Number of Staff: {staffs.length}</h3>
        <h3>Total Number of Incidents: {incidents.length}</h3>
        <h3>(A) Head Protection not worn: {incidents.filter(incident => incident.what_happened === "(A) Head Protection not worn").length}</h3>
        <h3>(B) Eye protection not worn: {incidents.filter(incident => incident.what_happened === '(B) Eye protection not worn').length}</h3>
        </div>
    )
}