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
    const [staffs , setStaff] = useState([])
    const [incidents , setIncidents] = useState([])
    const {authTokens , logoutUser} = useContext(AuthContext);
    console.log(authTokens)

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
        <div style={{overflow: 'hidden'}}>
        {/* <h1>Home Page/Dashboard</h1> */}
        {/* <h3>Total Number of Staff: {staffs.length}</h3>
        <h3>Total Number of Incidents: {incidents.length}</h3>
        <h3>(A) Head Protection not worn: {incidents.filter(incident => incident.what_happened === "(A) Head Protection not worn").length}</h3>
        <h3>(B) Eye protection not worn: {incidents.filter(incident => incident.what_happened === '(B) Eye protection not worn').length}</h3> */}
        
        
        <div className="row justify-content-around">

            {/* <div className=" mt-3 column justify-content-around">
                <div className="display-box col-2 text-center"><h4><b>Staff: {staffs.length}</b></h4></div>
                <div className="display-box col-2 text-center"><h4><b>Incidents: {incidents.length}</b></h4></div>
                <div className="display-box col-2 text-center"><h4><b> {new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</b></h4></div>
            </div> */}
                <div className="display-box col-md-2 mt-3 text-center">
                    <br/>
                    <br/>
                    <h4><b> {new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</b></h4>
                    <br/>
                    <br/>
                    <h4><b>Incidents: {incidents.length}</b></h4>
                    <br/>
                    <br/>
                    <h4><b>Staff: {staffs.length}</b></h4>

                </div>
                <div className="display-border col-md-6 mt-3">
                        <NumIncidents/>
                </div>
                <div className="display-border col-md-3 mt-3">
                        <StatusChart/>
                </div>
            
        </div>  
            



        <div className="row justify-content-around">

                {/* <div className="display-border col-3">
                    <GenderChart/>
                </div> */}
                <div className="display-border col-md-4 mt-3">
                    <WhatChat/>
                </div>
                {/* <div className="col-1">
                </div> */}
                {/* <div className="display-border col-3">
                    <StatusChart/>
                </div> */}
                <div className="display-border col-md-4 mt-3">
                    <WhyChart/>
                </div>
                {/* <div className="col-1">
                </div> */}
                {/* <div className="display-border col-3">
                    <SmartCardColorChart/>
                </div> */}
                <div className="display-border col-md-3 mt-3">
                    <LSRChart/>
                </div>
            </div>
            {/* <hr className="thick"></hr> */}
            
                {/* <div className="row mt-3 col-10 display-large display-border"> */}
                
              
        </div>
    )
}