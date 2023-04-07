import {useState, useEffect} from 'react'
import StaffAPI from '../../API/StaffAPI'
import { Pie } from "react-chartjs-2";

export default function SmartCardColorChart() {
    const [staffs , setStaff] = useState([])

    useEffect(() => {
        StaffAPI.get('/')
        .then((res) => {
            setStaff(res.data)
            console.log(res.data)
        })
        .catch(console.log)
    },[])

    
    const data = {
        labels: ["Yellow", "Red" , "Green" , 'Not Stated'],
        datasets: [
            {
                label: "Smart Card Colour",
                data: [
                    staffs.filter((staff) => staff.smart_card_colour === "Yellow").length,
                    staffs.filter((staff) => staff.smart_card_colour === "Red").length,
                    staffs.filter((staff) => staff.smart_card_colour === "Green").length,
                    staffs.filter((staff) => staff.smart_card_colour === null).length,
               
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
                text: "Smart Card Colour Pie Chart",
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