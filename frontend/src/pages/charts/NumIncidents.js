import {useEffect , useState} from 'react'
import StaffAPI from '../../API/StaffAPI'
import IncidentAPI from '../../API/IncidentAPI';
import { Bar } from 'react-chartjs-2';

export default function NumIncidents() {
    const [incidents , setIncidents] = useState([])
    const [staffs , setStaff] = useState([])

    

    const StaffMap = () => {
        const incidentCounts = staffs.map(staff => {
          const count = incidents.filter(incident => incident.name === staff.name).length;
          return { name: staff.name, count };
        });
        return incidentCounts;
      };
    
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


    const data = {
        labels: StaffMap().map(staff => staff.name),

            datasets: [
             {    
            //     data: [incidents.filter((incident) => incident.name === "Simon Carson").length,
            //     incidents.filter((incident) => incident.name === "Zakky Ali").length,
            // ],
            data: StaffMap().map(staff => staff.count),
           

                
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
            text: 'Incident Status Chart'
          },
          legend: {
            display: false,
          }
        }
      };
    

     
    return(
        <div>
            <Bar data={data} options={options}/>
        </div>
    )
}