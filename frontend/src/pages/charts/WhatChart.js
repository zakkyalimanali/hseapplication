// import {useEffect , useState} from 'react'
// import IncidentAPI from '../../API/IncidentAPI';
// import { Bar } from 'react-chartjs-2';

// export default function WhatChat() {
//     const [incidents , setIncidents] = useState([])

//     useEffect(() => {
//         IncidentAPI.get('/')
//         .then((res) => {
//             setIncidents(res.data)
//             console.log(res.data)
//         })
//         .catch(console.log)
//     },[])

//     const data = {
//         labels: ["A", "B", 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' , 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', "X", 'Y', 'Z', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ', 'KK', 'LL', 'MM', 'NN', 'OO', 'PP', 'QQ', 'RR', 'SS', 'TT', 'UU', 'VV', 'WW', 'XX', 'YY', 'ZZ', 'AAA'],

//             datasets: [
//                 {
//                 data: incidents.map(incident => incident.what_happened.length),
//                 backgroundColor: ['rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'],
//                 borderColor: ['rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'],
//                 borderWidth: 1,
//             },
//         ],
//     };

//     const options = {
//         plugins: {
//           title: {
//             display: true,
//             text: 'Incident Status Chart'
//           },
//           legend: {
//             display: false,
//           }
//         }
//       };
    
//     return(
//         <div className=" row justify-content-center" style={{height:'300px'}}>
//             <Bar data={data} options={options}/>
//         </div>

//     )
// }

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import IncidentAPI from '../../API/IncidentAPI';

export default function WhatChat() {
  const [incidents, setIncidents] = useState([]);

  // const customLabels = {
  //   1: '(A) Head Protection not worn',
  //   2: '(B) Eye protection not worn',
  //   3: '(C) Face protection not worn',
  // };

  useEffect(() => {
    IncidentAPI.get('/')
      .then((res) => {
        setIncidents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const data = {
    // labels: [
    //   'A',
    //   'B',
    //   'C',
    // ],
    //   'D',
    //   'E',
    //   'F',
    //   'G',
    //   'H',
    //   'I',
    //   'J',
    //   'K',
    //   'L',
    //   'M',
    //   'N',
    //   'O',
    //   'P',
    //   'Q',
    //   'R',
    //   'S',
    //   'T',
    //   'U',
    //   'V',
    //   'W',
    //   'X',
    //   'Y',
    //   'Z',
    //   'AA',
    //   'BB',
    //   'CC',
    //   'DD',
    //   'EE',
    //   'FF',
    //   'GG',
    //   'HH',
    //   'II',
    //   'JJ',
    //   'KK',
    //   'LL',
    //   'MM',
    //   'NN',
    //   'OO',
    //   'PP',
    //   'QQ',
    //   'RR',
    //   'SS',
    //   'TT',
    //   'UU',
    //   'VV',
    //   'WW',
    //   'XX',
    //   'YY',
    //   'ZZ',
    //   'AAA',
    // ],
    // labels: [
    //   '(A) Head Protection not worn',
    //   '(B) Eye protection not worn',
    //   '(C) Face protection not worn',
     
    // ],

    labels: [
            '(A) Head Protection not worn',
            '(B) Eye protection not worn',
            '(C) Face protection not worn',
            '(D) Ear protection not worn', 
            '(E) Protective clothing not worn', 
            '(F) Leg/Feet protection not worn',
            '(G) Hand protection not worn',
            '(H) PPE in bad condition', 
            '(I) Wrong PPE for the job',
            '(J) Substandard PPE',
            '(K) PPE not worn properly',
            '(L) Respiration protection not worn',
            '(M) Body Protection not worn',
            '(N) Wrong tool for the job',
            '(O) Tools in bad condition',
            '(P) Tools not inpected',
            '(Q) Misuse',
            '(R) Uncertified tools',
            '(S) Too heaving for manual lifting',
            '(T) Wrong mechanical manual lifting',
            '(U) Lifting tool not inspected',
            '(V) Chemical not properly handled',
            '(W) Waste not properly disposed',
            '(X) In danger of struck',
            '(Y) In danger of striking against',
            '(Z) In danger of caught by',
            '(AA) In danger of fall/slip/trip',
            '(BB) In danger of electrocution',
            '(CC) In danger of burnt',
            '(DD) Access obstructed',
            '(EE) Tools/materials disorganized',
            '(FF) Poor/Improper roping of',
            '(GG) Accumulation of rubbish',
            '(HH) Water is being polluted',
            '(II) Air being polluted',
            '(JJ) Too much noise',
            '(KK) Soil being polluted',
            '(LL) Poor illumination',
            '(MM) Work without permission',
            '(NN) Wrong permit',
            '(OO) Procedures / Standard not followed',
            '(PP) Wrong instruction on permit',
            '(QQ) Permit procedure not follow',
            '(RR) Inadequate HIP', 
            '(SS) Toolbox talk not given',
            '(TT) Driving recklessly',
            '(UU) Not wearing seat belt',
            '(VV) Road traffic violation',
            '(WW) Vehicles / Transportation abuse',
            '(XX) Not inspected for compliance',
            '(YY) Vehicle defects',
            '(ZZ) Compliance',
            '(AAA) Behavior & Attitude',


           
          ],
    
    datasets: [
      {
        // data: incidents.map((incident) => incident.what_happened.length),
        // data: incidents.length > 0 ? incidents.map(incident => incident.what_happened.length) : [],
        // data: incidents.length > 0 ? incidents.map(incident => incident.what_happened.length) : [],
        //data: [incidents.map((incident) => incident.what_happened)],
        // data: [incidents.map((incident) => incident.what_happened === '(A) Head Protection not worn'),
        
        //     incidents.map((incident) => incident.what_happened === '(B) Eye protection not worn' )], 
        data: [
            incidents.filter(incident => incident.what_happened === '(A) Head Protection not worn').length, 
            incidents.filter(incident => incident.what_happened === '(B) Eye protection not worn').length, 
            incidents.filter(incident => incident.what_happened === '(C) Face protection not worn').length,
            incidents.filter(incident => incident.what_happened === '(D) Ear protection not worn').length,
            incidents.filter(incident => incident.what_happened === '(E) Protective clothing not worn').length,
            incidents.filter(incident => incident.what_happened === '(F) Leg/Feet protection not worn').length,
            incidents.filter(incident => incident.what_happened === '(G) Hand protection not worn').length,
            incidents.filter(incident => incident.what_happened === '(H) PPE in bad condition').length,
            incidents.filter(incident => incident.what_happened === '(I) Wrong PPE for the job').length,
            incidents.filter(incident => incident.what_happened === '(J) Substandard PPE').length,
            incidents.filter(incident => incident.what_happened === '(K) PPE not worn properly').length,
            incidents.filter(incident => incident.what_happened === '(L) Respiration protection not worn').length,
            incidents.filter(incident => incident.what_happened === '(M) Body Protection not worn').length,
            incidents.filter(incident => incident.what_happened === '(N) Wrong tool for the job').length,
            incidents.filter(incident => incident.what_happened === '(O) Tools in bad condition').length,
            incidents.filter(incident => incident.what_happened === '(P) Tools not inpected').length,
            incidents.filter(incident => incident.what_happened === '(Q) Misuse').length,
            incidents.filter(incident => incident.what_happened === '(R) Uncertified tools').length,
            incidents.filter(incident => incident.what_happened === '(S) Too heaving for manual lifting').length,
            incidents.filter(incident => incident.what_happened === '(T) Wrong mechanical manual lifting').length,
            incidents.filter(incident => incident.what_happened === '(U) Lifting tool not inspected').length,
            incidents.filter(incident => incident.what_happened === '(V) Chemical not properly handled').length,
            incidents.filter(incident => incident.what_happened === '(W) Waste not properly disposed').length,
            incidents.filter(incident => incident.what_happened === '(X) In danger of struck').length,
            incidents.filter(incident => incident.what_happened === '(Y) In danger of striking against').length,
            incidents.filter(incident => incident.what_happened === '(Z) In danger of caught by').length,
            incidents.filter(incident => incident.what_happened === '(AA) In danger of fall/slip/trip').length,
            incidents.filter(incident => incident.what_happened === '(BB) In danger of electrocution').length,
            incidents.filter(incident => incident.what_happened === '(CC) In danger of burnt').length,
            incidents.filter(incident => incident.what_happened === '(DD) Access obstructed').length,
            incidents.filter(incident => incident.what_happened === '(EE) Tools/materials disorganized').length,
            incidents.filter(incident => incident.what_happened === '(FF) Poor/Improper roping of').length,
            incidents.filter(incident => incident.what_happened === '(GG) Accumulation of rubbish').length,
            incidents.filter(incident => incident.what_happened === '(HH) Water is being polluted').length,
            incidents.filter(incident => incident.what_happened === '(II) Air being polluted').length,
            incidents.filter(incident => incident.what_happened === '(JJ) Too much noise').length,
            incidents.filter(incident => incident.what_happened === '(KK) Soil being polluted').length,
            incidents.filter(incident => incident.what_happened === '(LL) Poor illumination').length,
            incidents.filter(incident => incident.what_happened === '(MM) Work without permission').length,
            incidents.filter(incident => incident.what_happened === '(NN) Wrong permit').length,
            incidents.filter(incident => incident.what_happened === '(OO) Procedures / Standard not followed').length,
            incidents.filter(incident => incident.what_happened === '(PP) Wrong instruction on permit').length,
            incidents.filter(incident => incident.what_happened === '(QQ) Permit procedure not follow').length,
            incidents.filter(incident => incident.what_happened === '(RR) Inadequate HIP').length,
            incidents.filter(incident => incident.what_happened === '(SS) Toolbox talk not given').length,
            incidents.filter(incident => incident.what_happened === '(TT) Driving recklessly').length,
            incidents.filter(incident => incident.what_happened === '(UU) Not wearing seat belt').length,
            incidents.filter(incident => incident.what_happened === '(VV) Road traffic violation').length,
            incidents.filter(incident => incident.what_happened === '(WW) Vehicles / Transportation abuse').length,
            incidents.filter(incident => incident.what_happened === '(XX) Not inspected for compliance').length,
            incidents.filter(incident => incident.what_happened === '(YY) Vehicle defects').length,
            incidents.filter(incident => incident.what_happened === '(ZZ) Compliance').length,
            incidents.filter(incident => incident.what_happened === '(AAA) Behavior & Attitude').length,

        ],
        indexAxis: 'y',

        // labels: [
        //     '(A) Head Protection not worn',
        //     '(B) Eye protection not worn',
        //     '(C) Face protection not worn',
           
        //   ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Incident Status Chart',
      },
      legend: {
        display: false,
      },
      // scales: {
      //   yAxes: [
      //     {
      //       ticks: {
      //         beginAtZero: true,
      //       },
      //       display: false, // hide Y axis labels
      //     },
      //   ],
      // },
      scales: {
        y: {
          ticks: {
            display: false,
          },
        },
      },
      // scales: {
      //   y: {
      //     ticks: {
      //       display: false,
      //     },
      //   },
      // },


      // yAxes: [{
      //   scaleLabel: {
      //     display: false,
      //   },
      // }],


      // tooltip: {
        
        // display: '(A) Head Protection not worn' , '(B) Eye protection not worn' , '(C) Face protection not worn'
        // callbacks: {
        //     label: function (tooltipItem, data) {
        //       const label = data.labels[tooltipItem.index];
        //       const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        //       return `${label}: ${value}`;
    //     label: function (tooltipItem, data) {
    //         const customLabel = '(A) Head Protection not worn'; 
    //         const value = data.datasets[0].data[tooltipItem.index];
    //         return `${customLabel}: ${value}`;
  
    //   }

    // label: function(tooltipItem, data) {
    //     const value = data.datasets[0].data[tooltipItem.index];
    //     return `${customLabels[value]}: ${value}`;
    //   }
    // },
}
  
    
}

  return (
    <div className=" row justify-content-center" style={{ height: '800px'}}>
      <Bar 
      // type="horizontalBar'"
      data={data}
      options={options}

      
    //   data={data} options={options} 
      
      />
    </div>
    // <div className=" row justify-content-center" style={{ height: '300px' }}>
    // {incidents.length > 0 ? (
    //   <Bar data={data} options={options} />
    // ) : (
    //   <p>Loading chart...</p>
    // )}
//   </div>
  );
}