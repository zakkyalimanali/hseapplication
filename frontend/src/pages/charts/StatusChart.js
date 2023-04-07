import {useEffect, useState} from 'react'
import IncidentAPI from '../../API/IncidentAPI';
import { Pie } from "react-chartjs-2";

export default function StatusChart() {
    const [incidents , setIncidents] = useState([])

    useEffect(() => {
        IncidentAPI.get('/')
        .then((res) => {
            setIncidents(res.data)
            console.log(res.data)
        })
        .catch(console.log)
    },[])

    
    const data = {
        labels: ["No Further Action Required", "Resolved", 'Ongoing', 'Not Stated'],
        datasets: [
            {
                label: "Gender",
                data: [
                    incidents.filter((incident) => incident.status === "No Further Action Required").length,
                    incidents.filter((incident) => incident.status === "Resolved").length,
                    incidents.filter((incident) => incident.status === "Ongoing").length,
                    incidents.filter((incident) => incident.status === null ).length,
                    
                ],
                backgroundColor: ['rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: "Status Pie Chart",
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };
    
    return(
        <div>
            <Pie data={data} options={options} />
        </div>
        
    )
}