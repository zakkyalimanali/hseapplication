import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Layout from './components/Layout';
import Staff from './pages/Staff';
import Incident from './pages/Incident';
import Home from './pages/Home';
import IncidentTable from './pages/IncidentTable';
import AddIncident from './pages/AddIncidents';
import OneIncident from './pages/OneIncident';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='staff' element={<Staff/>} />
            <Route path='addincident' element={<AddIncident/>} />
            <Route path='incident' element={<Incident/>} />
            <Route path='oneincident/:id' element={<OneIncident/>}/>
            <Route path='incidenttable' element={<IncidentTable/>} >
              {/* <Route path="oneincident" element={<h1>Meow</h1>}/> */}
              {/* <Route path='incidenttable/oneincident/:id' element={<OneIncident/>} /> */}
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
