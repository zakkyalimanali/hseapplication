import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import IncidentAPI from '../../API/IncidentAPI';

export default function WhyChart() {
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
            '(1) Not Informed',
            '(2) Languague Problem',
            '(3) Not reasing permit',
            '(4) Wrong interpretation of risk',
            '(5) Wrong instruction',
            '(6) No procedure',
            '(7) Lack of HSE Coaching / training',
            '(8) Behavior & Attitude (intentionally)',
            '(9) Negligence',
            '(10) Working condition',
            '(11) Working layout',
            '(12) The design of equipment / tools',
            '(13) Work habits',
            '(14) Lack of skill',
            '(15) Time pressure',
            '(16) Not requested',
            '(17) Physical limitations',
            '(18) Not supplied/available',
            '(19) Lack of ownership',
            '(20) Behavior & Attitude (not intentionally)',
                      
          ],
    
    datasets: [
      {
        
        data: [
          incidents.filter(incident => incident.why_happened === '').length, 
          incidents.filter(incident => incident.why_happened === '(1) Not Informed').length, 
          incidents.filter(incident => incident.why_happened === '(2) Languague Problem').length, 
          incidents.filter(incident => incident.why_happened === '(3) Not reasing permit').length, 
          incidents.filter(incident => incident.why_happened === '(4) Wrong interpretation of risk').length, 
          incidents.filter(incident => incident.why_happened === '(5) Wrong instruction').length, 
          incidents.filter(incident => incident.why_happened === '(6) No procedure').length, 
          incidents.filter(incident => incident.why_happened === '(7) Lack of HSE Coaching / training').length, 
          incidents.filter(incident => incident.why_happened === '(8) Behavior & Attitude (intentionally)').length, 
          incidents.filter(incident => incident.why_happened === '(9) Negligence').length, 
          incidents.filter(incident => incident.why_happened === '(10) Working condition').length, 
          incidents.filter(incident => incident.why_happened === '(11) Working layout').length, 
          incidents.filter(incident => incident.why_happened === '(12) The design of equipment / tools').length, 
          incidents.filter(incident => incident.why_happened === '(13) Work habits').length, 
          incidents.filter(incident => incident.why_happened === '(14) Lack of skill').length, 
          incidents.filter(incident => incident.why_happened === '(15) Time pressure').length, 
          incidents.filter(incident => incident.why_happened === '(16) Not requested').length, 
          incidents.filter(incident => incident.why_happened === '(17) Physical limitations').length, 
          incidents.filter(incident => incident.why_happened === '(18) Not supplied/available').length, 
          incidents.filter(incident => incident.why_happened === '(19) Lack of ownership').length, 
          incidents.filter(incident => incident.why_happened === '(20) Behavior & Attitude (not intentionally)').length, 
           
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
        text: 'Why Incident Chart',
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