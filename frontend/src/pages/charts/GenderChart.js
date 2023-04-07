import {useEffect, useState} from 'react'
import StaffAPI from '../../API/StaffAPI'
import { Pie } from "react-chartjs-2";

export default function GenderChart() {
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
        labels: ["Male", "Female"],
        datasets: [
            {
                label: "Gender",
                data: [
                    staffs.filter((staff) => staff.gender === "Male").length,
                    staffs.filter((staff) => staff.gender === "Female").length,
                ],
                backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: "Gender Pie Chart",
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