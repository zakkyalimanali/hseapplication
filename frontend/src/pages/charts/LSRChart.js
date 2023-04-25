import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import IncidentAPI from '../../API/IncidentAPI';

export default function LSRChart() {
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
            '(1) Work with a valid work permit when required',
            '(2) Conduct gas test when required',
            '(3) Verify isolation before work begins and use the specific life protecting equipment',
            '(4) Obtain authorization before entering a confined space',
            '(5) Obatin authorization before overriding or disabiling safety critical equipment',
            '(6) Protect yourself against a fall when working at height',
            '(7) Do not walk under a suspended load',
            '(8) Do not smoke outside designated smoking area',
            '(9) No alcohol or drugs while working or driving',
            '(10) While driving , do not use your phone and do not exceed limit',
            '(11) Wear your seat belts',
            '(12) Follow prescribed Journey Management Plan',

                      
          ],
    
    datasets: [
      {
        
        data: [
          incidents.filter(incident => incident.life_saving_rule === '').length, 
          incidents.filter(incident => incident.life_saving_rule === '(1) Work with a valid work permit when required').length, 
          incidents.filter(incident => incident.life_saving_rule === '(2) Conduct gas test when required').length, 
          incidents.filter(incident => incident.life_saving_rule === '(3) Verify isolation before work begins and use the specific life protecting equipment').length, 
          incidents.filter(incident => incident.life_saving_rule === '(4) Obtain authorization before entering a confined space').length, 
          incidents.filter(incident => incident.life_saving_rule === '(5) Obatin authorization before overriding or disabiling safety critical equipment').length, 
          incidents.filter(incident => incident.life_saving_rule === '(6) Protect yourself against a fall when working at height').length, 
          incidents.filter(incident => incident.life_saving_rule === '(7) Do not walk under a suspended load').length, 
          incidents.filter(incident => incident.life_saving_rule === '(8) Do not smoke outside designated smoking area').length, 
          incidents.filter(incident => incident.life_saving_rule === '(9) No alcohol or drugs while working or driving').length, 
          incidents.filter(incident => incident.life_saving_rule === '(10) While driving , do not use your phone and do not exceed limit').length, 
          incidents.filter(incident => incident.life_saving_rule === '(11) Wear your seat belts').length, 
          incidents.filter(incident => incident.life_saving_rule === '(12) Follow prescribed Journey Management Plan').length, 
           
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
        text: 'Life Saving Rule Chart',
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
    <div className=" row justify-content-center" style={{ height: '200px'}}>
      {/* <Bar 
      data={data}
      options={options}
      /> */}
      <Bar data={data} options={options} />
    </div>
  );
}