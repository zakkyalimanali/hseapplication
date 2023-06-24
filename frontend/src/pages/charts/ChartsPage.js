import {useState , useEffect} from 'react'
import StaffAPI from '../../API/StaffAPI'
import IncidentAPI from '../../API/IncidentAPI'
import GenderChart from './GenderChart'
import StatusChart from './StatusChart'
import NumIncidents from './NumIncidents'
import SmartCardColorChart from './SmartCardColorChart'
import WhatChat from './WhatChartcopy';
import WhyChart from './WhyChart';
import LSRChart from './LSRChart';

function ChartsPage() {
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
  return (
    <div style={{overflow: 'hidden'}}>

        
        <div className="row justify-content-around">

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
                <div className="display-border col-md-4 mt-3 mb-5">
                    <WhatChat/>
                </div>
                {/* <div className="col-1">
                </div> */}
                {/* <div className="display-border col-3">
                    <StatusChart/>
                </div> */}
                <div className="display-border col-md-4 mt-3 mb-5">
                    <WhyChart/>
                </div>
                {/* <div className="col-1">
                </div> */}
                {/* <div className="display-border col-3">
                    <SmartCardColorChart/>
                </div> */}
                <div className="display-border col-md-3 mt-3 mb-5">
                    <LSRChart/>
                </div>
            </div>
            {/* <hr className="thick"></hr> */}
            
                {/* <div className="row mt-3 col-10 display-large display-border"> */}
                
              
        </div>
  )
}

export default ChartsPage
