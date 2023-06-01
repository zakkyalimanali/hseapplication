import {useEffect , useState} from 'react'
import IncidentAPI from '../API/IncidentAPI'
import StaffAPI from '../API/StaffAPI'
import { Table } from 'react-bootstrap'

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

    const whatIncidentCounts = {};
    const whyIncidentCounts = {}

    incidents.forEach(incident => {
        const whats = incident.what_happened;
        
        if (whatIncidentCounts[whats]) {
            whatIncidentCounts[whats] += 1;
        } else {
            whatIncidentCounts[whats] = 1;
        } 

        

    })

    incidents.forEach(incident => {
        const whys = incident.why_happened
        if (whyIncidentCounts[whys]) {
            whyIncidentCounts[whys] += 1
        }
         else {
            whyIncidentCounts[whys] = 1;
        } 
    })

    // const ZakkyPakat = () => {
    //     return incidents.filter(incident => incident.raised_by === 'Zakky Ali');
    //   }


    return(
        <div className="col-8 mx-auto mt-4">
            {/* <
            <h3>Total Number of Staff: {staffs.length}</h3>
            <h3>Total Number of Incidents: {incidents.length}</h3>
            <h3>(A) Head Protection not worn: {incidents.filter(incident => incident.what_happened === "(A) Head Protection not worn").length}</h3>
            <h3>(B) Eye protection not worn: {incidents.filter(incident => incident.what_happened === '(B) Eye protection not worn').length}</h3>
            <h3>Zakky Ali Safety Cards: {incidents.filter(incident => incident.name === 'Zakky Ali').length}</h3>         */}
            
            <h1 className="row justify-content-center mt-3">Statistics Page</h1>
            <Table className="mt-3" striped bordered hover>
                <thead>
                <tr>
                    <th scope="col" className="col-4">Stat</th>
                    <th scope="col" className="col-4">Numbers</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className="col-4" scope="row">Total Number of Staff:</th>
                        <td className="col-4">{staffs.length}</td>
                    </tr>
                    <tr>
                        <th className="col-4" scope="row">Total Number of Incidents:</th>
                        <td className="col-4">{incidents.length}</td>
                    </tr>
                    <tr>
                        <th scope="col" className="col-4">What Incidents</th>
                        <th scope="col" className="col-4"></th>
                    </tr>
                    {Object.keys(whatIncidentCounts).map(whats => (
                        <tr key={whats}>
                            <th className="col-4" scope="row">{whats}</th>
                            <td className="col-4">{whatIncidentCounts[whats]}</td>
                        </tr>
                    ))}
                    <tr>
                        <th scope="col" className="col-4">Why Incidents</th>
                        <th scope="col" className="col-4"></th>
                    </tr>
                    {Object.keys(whyIncidentCounts).map(whys => (
                        <tr key={whys}>
                            <th className="col-4" scope="row">{whys}</th>
            <td className="col-4">{whyIncidentCounts[whys]}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </Table>
        </div>
    ) 
}