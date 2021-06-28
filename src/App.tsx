import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DailyTestingCard from './components/DailyTestingCard';

function App() {


  const [newCases, setNewCases] = useState(0);
  const [dailyTestings, setDailyTestings] = useState([]);


  useEffect(() => {


    axios.get('https://www.hpb.health.gov.lk/api/get-current-statistical')
      .then(res => {
        if (res.status === 200) {
          const cases = res.data.data
          setNewCases(cases.local_new_cases)
          setDailyTestings(cases.daily_pcr_testing_data)
        }
      })

    console.log('Component has been Rendered');

    return function cleanup() {
      console.log('Component has been Destroyed');
    }
  }, []);



  const Add10Handler = () => {
    console.log('Called');
  }


  return (
    <div>
      <div className="container">
        <h1>Calculator</h1>

        <p>Total New Cases = <b>{newCases}</b>  </p>

        <hr></hr>
        {dailyTestings
          .map((testing: any) => (
          
          <div className='mb-2' key={testing.date}> 
             <DailyTestingCard date={testing.date} count={testing.count}/> 
          </div> 
          
          )
        )
        }

      </div>

    </div>
  );
}

export default App;
