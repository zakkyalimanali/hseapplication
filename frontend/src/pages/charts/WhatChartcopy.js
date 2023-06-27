import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import IncidentAPI from '../../API/IncidentAPI';

export default function WhatChat() {
  const [incidents, setIncidents] = useState([]);

   useEffect(() => {
    IncidentAPI.get('/')
      .then((res) => {
        setIncidents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const data = {
    labels: [
            'Not Stated',
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
        
        data: [
            incidents.filter(incident => incident.what_happened === '').length, 
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
        // indexAxis: 'y',

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
        text: 'What Incident Chart',
      },
      legend: {
        display: false,
      },
    },
      scales: {
        x: {
          ticks: {
            display: false,
          },
        },
      },
}

  return (
    <div className=" row justify-content-center" style={{ height: '225px'}}>
      {/* <Bar 
      data={data}
      options={options}
      /> */}
      <Bar data={data} options={options} />
    </div>
  );
}