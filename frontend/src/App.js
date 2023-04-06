import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Layout from './components/Layout';
import AddStaff from './pages/AddStaff';
import Incident from './pages/Incident';
import Home from './pages/Home';
import IncidentTable from './pages/IncidentTable';
import AddIncident from './pages/AddIncidents';
import OneIncident from './pages/OneIncident';
import About from './pages/About';
import Login from './pages/Login';
import StaffList from './pages/StaffList';
import EditStaff from './pages/EditStaff';
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
            <Route path='addstaff' element={<AddStaff/>} />
            <Route path='editstaff/:id' element={<EditStaff/>} />
            <Route path='addincident' element={<AddIncident/>} />
            <Route path='incident' element={<Incident/>} />
            <Route path='oneincident/:id' element={<OneIncident/>}/>
            <Route path='incidenttable' element={<IncidentTable/>} >

            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
