import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import StaffAPI from "../API/StaffAPI";
import {useState , useEffect} from 'react'
import zakkyImage from '../images/ZakkyAliPhoto.JPG';
// import WhatChat from "./charts/WhatChartcopy";
// import WhyChart from "./charts/WhyChart";
// import LSRChart from "./charts/LSRChart";
export default function About() {
    const [staffs , setStaff] = useState([])

    // useEffect(() => {
    //     StaffAPI.get('/')
    //     .then((res) => {
    //         setStaff(res.data)
    //         console.log(res.data)
    //     })
    //     .catch(console.log)
    // },[])

    
    // const data = {
    //     labels: ["Male", "Female"],
    //     datasets: [
    //         {
    //             label: "# of Votes",
    //             data: [
    //                 staffs.filter((staff) => staff.gender === "Male").length,
    //                 staffs.filter((staff) => staff.gender === "Female").length,
    //             ],
    //             backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
    //             borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
    //             borderWidth: 1,
    //         },
    //     ],
    // };

    // const options = {
    //     plugins: {
    //         title: {
    //             display: true,
    //             text: "My Pie Chart",
    //         },
    //     },
    //     responsive: true,
    //     maintainAspectRatio: false,
    // };

    return(
        // // <>
        // {/* <div>
        //    <Pie data={data} options={options} />
        // </div> */}
        // {/* <div className="display-border  col-12">
        // <LSRChart/> */}
        // {/* </div>
        // </> */}
        <div className="row justify-content-center">
            <div className="about_us col-md-8 m-5 p-3">
                <h3 className="text-center">About This Project</h3>
                <div>
                    <div className="text-justify">
                        <p className="mt-3">"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam</p>

                        <p className="mt-3">est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
                    </div>
                </div>
            </div>
            <div className="development_team row col-md-8">
                <div className="zakky_intro col-md-6 p-5 mt-auto mb-auto">
                    <h3>Developer: Zakky Ali</h3>
                    <p>est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
                </div>
                <div className="col-md-6 text-center p-5">
                    {/* <img src="frontend\public\images\ZakkyAliPhoto.JPG" alt="zakkyimage"></img> */}
                    <img className=" zakky_image" src={zakkyImage} alt="zakkyimage" />
                </div>
            </div>
            <div className="col-md-8 m-5 p-3">
                <div className="zakky_intro col-md-6 p-5 mt-auto mb-auto">
                    <h3>HSE Application Project Management</h3>
                    <p>est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
                </div>
            </div>

        </div>
    )
}