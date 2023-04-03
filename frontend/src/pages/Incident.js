import {useEffect , useState} from 'react'
import IncidentAPI from '../API/IncidentAPI'
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import axios from 'axios'

export default function Incident() {
    const [short_desc , setShortDesc] = useState('')
    const [what_happened , setWhatHappened] = useState('')
    const [why_happened , setWhyHappened] = useState('')
    const [date_raisedc , setDateRaised] = useState('')
    const [raised_by , setRaisedBy] = useState('')
    const [life_saving_rule , setLifeSavingRule] = useState('')
    const [findings , setFindings] = useState('')
    const [incident_date , setIncidentDate] = useState('')
    const [location , setLocation] = useState('')
    const [discussion , setDiscussion] = useState('')
    const [target_date  , setTargetDate] = useState('')
    const [follow_up , setFollowUp] = useState('')
    const [follow_up_remarks , setFollowUpRemarks] = useState('')
    const [status , setStatus] = useState('')
    const [incident_id , setIncidentId] = useState(null)
    const [incidents , setIncidents] = useState([])
 


    return(
        <h1>Incident</h1>
    )
}