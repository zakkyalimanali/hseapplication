import {useEffect , useState} from 'react'
import IncidentAPI from '../API/IncidentAPI'
import StaffAPI from '../API/StaffAPI'

export default function Stats() {
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

    // const ZakkyPakat = () => {
    //     return incidents.filter(incident => incident.raised_by === 'Zakky Ali');
    //   }


    return(
        <div>
            <h1>Stats Page</h1>
            <h3>Total Number of Staff: {staffs.length}</h3>
            <h3>Total Number of Incidents: {incidents.length}</h3>
            <h3>(A) Head Protection not worn: {incidents.filter(incident => incident.what_happened === "(A) Head Protection not worn").length}</h3>
            <h3>(B) Eye protection not worn: {incidents.filter(incident => incident.what_happened === '(B) Eye protection not worn').length}</h3>
            <h3>Zakky Ali Safety Cards: {incidents.filter(incident => incident.name === 'Zakky Ali').length}</h3>        
            
            </div>
    ) 
}