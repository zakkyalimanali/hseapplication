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
import safetycard from '../images/SafetyImage.jpg';
import safetycard2 from '../images/SafetyImage2.jpg';
import safetycard3 from '../images/SafetyImage3.jpg';
import { Link } from 'react-router-dom';


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
        <div>
            <div className="mt-4 row  p-5 Introduction">
                <h1 className="d-flex justify-content-center">Welcome To Zakky Industries</h1>
                <br/>
                <h3 className="mt-3 d-flex justify-content-center">The Future of Health And Safety is Digital</h3>
            </div>
            <div className="row  d-flex justify-content-around">
                {/* <div className="col-md-4">
                    <div className='container mt-5'>
                        <div className="card main-card" >
                            <img className="card-img-top card-image" src={safetycard} alt="card-image"/>
                            <div className="card-body">
                                <h4 className="card-title">Safety Cards</h4>
                                <p className="card-text">Number of Safety Cards submitted and resolved</p>
                                <a href="#" class="btn btn-primary">See Profile</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className='container mt-5'>
                        <div className="card main-card" >
                            <img className="card-img-top card-image" src={safetycard} alt="card-image"/>
                            <div className="card-body">
                                <h4 className="card-title">Safety Cards</h4>
                                <p className="card-text">Number of Safety Cards submitted and resolved</p>
                                <a href="#" class="btn btn-primary">See Profile</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className='container mt-5'>
                        <div className="card main-card" >
                            <img className="card-img-top card-image" src={safetycard} alt="card-image"/>
                            <div className="card-body">
                                <h4 className="card-title">Safety Cards</h4>
                                <p className="card-text">Number of Safety Cards submitted and resolved</p>
                                <a href="#" class="btn btn-primary">See Profile</a>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="col-md-3 mt-5 pb-5">
                    <div className="card">
                        <img className="card-image" src={safetycard} alt="Avatar"/>
                        <div class="container">
                            {/* <h4 className="d-flex justify-content-center"><b><a href="">Safety Cards</a></b></h4> */}
                            {/* <h4 className="d-flex justify-content-center"><b><a href="">Safety Cards</a></b></h4> */}
                            <Link className="mt-2 d-flex justify-content-center" to="incidenttable"><h3><b>Safety Cards</b></h3></Link>
                            <p className="mt-2">Here you will be able to see how many safety have been submit, by whom and if they have been resolved</p>

                            
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mt-5 pb-5">
                    <div className="card">
                        <img className="card-image" src={safetycard2} alt="Avatar"/>
                        <div class="container">
                            {/* <h4 className="d-flex justify-content-center"><b><a href="">Safety Cards</a></b></h4> */}
                            {/* <h4 className="d-flex justify-content-center"><b><a href="">Safety Cards</a></b></h4> */}
                            <Link className="mt-2 d-flex justify-content-center" to="sitevisitlist"><h3><b>Site Vist</b></h3></Link>
                            <p className="mt-2">Here you will be able to check on site visits, where they have been conducted, by whom and if they have been when they were done</p>

                            
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mt-5 pb-5">
                    <div className="card">
                        <img className="card-image" src={safetycard3} alt="Avatar"/>
                        <div class="container">
                            {/* <h4 className="d-flex justify-content-center"><b><a href="">Safety Cards</a></b></h4> */}
                            {/* <h4 className="d-flex justify-content-center"><b><a href="">Safety Cards</a></b></h4> */}
                            <Link className="mt-2 d-flex justify-content-center" to="incidentinvestigationlist"><h3><b>Incident Investigation</b></h3></Link>
                            <p className="mt-2">Here you will be able to see how many incident investigations have been done, by whom and if they have been resolved</p>

                            
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-3 mt-5 pb-5">
                    <div className="card">
                        <img className="card-image" src={safetycard} alt="Avatar"/>
                        <div class="container">
                            <h4><b>John Doe</b></h4>
                            <p>Architect & Engineer</p>
                        </div>
                    </div>
                </div> */}
                {/* <div className="col-md-3 mt-5 pb-5">
                    <div className="card">
                        <img className="card-image" src={safetycard} alt="Avatar"/>
                        <div class="container">
                            <h4><b>John Doe</b></h4>
                            <p>Architect & Engineer</p>
                        </div>
                    </div>
                </div>
                 */}
            </div>
        </div>

    </div>
    )
}