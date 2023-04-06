import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Layout from './components/Layout';
import Staff from './pages/Staff';
import Incident from './pages/Incident';
import Home from './pages/Home';
import IncidentTable from './pages/IncidentTable';
import AddIncident from './pages/AddIncidents';
import OneIncident from './pages/OneIncident';
import About from './pages/About';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
{/* <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
  crossorigin="anonymous"
/>

 */}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='about' element={<About/>}/>
            <Route path='login' element={<Login/>} />
            <Route path='staff' element={<Staff/>} />
            <Route path='addincident' element={<AddIncident/>} />
            <Route path='incident' element={<Incident/>} />
            <Route path='oneincident/:id' element={<OneIncident/>}/>
            <Route path='incidenttable' element={<IncidentTable/>} >
              {/* <Route path="oneincident" element={<h1>Meow</h1>}/> */}
              {/* <Route path='incidenttable/oneincident/:id' element={<OneIncident/>} /> */}
              {/* <Route path='addincident' element={<AddIncident/>} /> */}
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
