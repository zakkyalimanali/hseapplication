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
import management from '../images/Management.jpg';
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
                <div className="col-md-3 mt-5 pb-5">
                    <div class="card_border">
                        <img className="card-image" src={safetycard} alt="Avatar"/>
                        <div class="container">
                            <Link className="mt-2 d-flex justify-content-center" to="incidenttable"><h3><b>Safety Cards</b></h3></Link>
                            <p className="mt-2">Here you will be able to see how many safety have been submit, by whom and if they have been resolved</p>              
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mt-5 pb-5">
                    <div class="card_border">
                        <img className="card-image" src={safetycard2} alt="Avatar"/>
                        <div class="container">
                            {/* <h4 className="d-flex justify-content-center"><b><a href="">Safety Cards</a></b></h4> */}
                            {/* <h4 className="d-flex justify-content-center"><b><a href="">Safety Cards</a></b></h4> */}
                            <Link className="mt-2 d-flex justify-content-center" to="sitevisitlist"><h3><b>Site Visit</b></h3></Link>
                            <p className="mt-2">Here you will be able to check on site visits, where they have been conducted, by whom and if they have been when they were done</p>

                            
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mt-5 pb-5">
                    <div class="card_border">
                        <img className="card-image" src={safetycard3} alt="Avatar"/>
                        <div class="container">
                            {/* <h4 className="d-flex justify-content-center"><b><a href="">Safety Cards</a></b></h4> */}
                            {/* <h4 className="d-flex justify-content-center"><b><a href="">Safety Cards</a></b></h4> */}
                            <Link className="mt-2 d-flex justify-content-center" to="incidentinvestigationlist"><h3><b>Incident Investigation</b></h3></Link>
                            <p className="mt-2">Here you will be able to see how many incident investigations have been done, by whom and if they have been resolved</p>

                            
                        </div>
                    </div>
                </div>
                
            
            </div>

            <div className="mt-3 row mb-5 p-5 Commitment_To_Safety">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-3 me-2">
                        <img className="card-image" src={management} alt="Avatar"/>
                    </div>
                    <div className="col-md-3 ms-2">
                        <h1>Our Commitment to Safety</h1>
                        <p>veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                    </div>
                </div>
            </div>
            <div className="mt-3 row mb-5 p-5">
            <div className="col-md-6">
                    <div className='row p-3 card_border'>
                        <div className="col-md-8 ms-2">
                            <h5>New Team Member</h5>
                            <p>veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit </p>
                        </div>
                        <div className="col-md-3 me-2 d-flex justify-content-center">
                            <img className="news-image" src={management} alt="Avatar"/>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
    )
}