import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Layout from './components/Layout';
import AddStaff from './pages/staff/AddStaff';
import Incident from './pages/incidents/Incident';
import Home from './pages/Home';
import IncidentTable from './pages/incidents/IncidentTable';
import AddIncident from './pages/incidents/AddIncidents';
import EditIncident from './pages/incidents/EditIncident';
import About from './pages/About';
import Login from './pages/Login';
import StaffList from './pages/staff/StaffList';
import EditStaff from './pages/staff/EditStaff';
import Stats from './pages/Stats';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='stafflist' element={<StaffList/>} />
            <Route path='about' element={<About/>}/>
            <Route path='login' element={<Login/>} />
            <Route path='stats' element={<Stats/>}/>
            <Route path='addstaff' element={<AddStaff/>} />
            <Route path='editstaff/:id' element={<EditStaff/>} />
            <Route path='addincident' element={<AddIncident/>} />
            <Route path='incident' element={<Incident/>} />
            <Route path='editincident/:id' element={<EditIncident/>}/>
            <Route path='incidenttable' element={<IncidentTable/>} >

            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
