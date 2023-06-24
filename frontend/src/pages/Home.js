import {useState , useEffect , useContext} from 'react'
import AuthContext from "../context/AuthContext";
import StaffAPI from '../API/StaffAPI'
import IncidentAPI from '../API/IncidentAPI'
import GenderChart from './charts/GenderChart'
import StatusChart from './charts/StatusChart'
import NumIncidents from './charts/NumIncidents'
import SmartCardColorChart from './charts/SmartCardColorChart'
import WhatChat from './charts/WhatChartcopy';
import WhyChart from './charts/WhyChart';
import LSRChart from './charts/LSRChart';



export default function Home() {
    // const [staffs , setStaff] = useState([])
    // const [incidents , setIncidents] = useState([])
    // const {authTokens , logoutUser} = useContext(AuthContext);
    // console.log(authTokens)
    let {loginUser} = useContext(AuthContext)
    console.log(loginUser)

    // useEffect(() => {
    //     StaffAPI.get('/')
    //     .then((res) => {
    //         setStaff(res.data)
    //         console.log(res.data)
    //     })
    //     .catch(console.log)
    // },[])

    // useEffect(() => {
    //     IncidentAPI.get('/')
    //     .then((res) => {
    //         setIncidents(res.data)
    //         console.log(res.data)
    //     })
    //     .catch(console.log)
    // },[])



    return(
        <div className="pt-5">
        {/* <h1>Home Page/Dashboard</h1> */}
        {/* <h3>Total Number of Staff: {staffs.length}</h3>
        <h3>Total Number of Incidents: {incidents.length}</h3>
        <h3>(A) Head Protection not worn: {incidents.filter(incident => incident.what_happened === "(A) Head Protection not worn").length}</h3>
        <h3>(B) Eye protection not worn: {incidents.filter(incident => incident.what_happened === '(B) Eye protection not worn').length}</h3> */}
        <div>
            
            <div class="mt-4 p-5 bg-primary text-white rounded">
                <h1 className="mx-auto">Welcome Back</h1>
            </div>
        </div>

        </div>
    )
}