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
import AttendenceList from './pages/attendence/AttendenceList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AttendenceAdd from './pages/attendence/AttendenceAdd';
import AttendenceEdit from './pages/attendence/AttendenceEdit';
import AttendenceTable from './pages/attendence/AttendenceTable';
import DateList from './pages/date/DateList';
import AddDate from './pages/date/AddDate';
import EditDate from './pages/date/EditDate';
import ToolBoxTalkList from './pages/toolboxtalk/ToolboxTalkList';
import ToolBoxTalkAdd from './pages/toolboxtalk/ToolboxTalkAdd';
import ToolBoxTalkEdit from './pages/toolboxtalk/Toolboxtalkedit';
import Traininglist from './pages/training/Traininglist';
import Trainingadd from './pages/training/Trainingadd';
import Trainingedit from './pages/training/Trainingedit';
import {AuthProvider} from './context/AuthContext'
import PrivateRoutes from './utils/PrivateRoutes';
import LoginPage from './pages/LoginPage';
import Sitevisitlist from './pages/sitevisit/Sitevisitlist';
import SiteVisitAdd from './pages/sitevisit/SiteVisitAdd';
import SiteVisitEdit from './pages/sitevisit/SiteVisitEdit';
import SiteHazardAdd from './pages/sitevisit/sitehazard/SiteHazardAdd';
import SiteHazardEdit from './pages/sitevisit/sitehazard/SiteHazardEdit';
import AttendeesEdit from './pages/sitevisit/attendees/AttendeesEdit';
import IncidentInvestigationList from './pages/incidentinvestigation/IncidentInvestigationList';



function App() {
  return (
    // <div className="App" style={{backgroundColor: 'rgb( 251, 248 ,251)'
    //   , height: '100vh'}}>
    <div className="App" style={{backgroundColor: 'white'
      , height: '100vh'}}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthProvider><Layout/></AuthProvider>}>
            <Route element={<LoginPage/>} path="/loginpage"/>
            <Route element={<PrivateRoutes/>}>
              <Route path='/' element={<Home/>} exact/>
              <Route path="incidentinvestigationlist" element={<IncidentInvestigationList/>}/>
              <Route path='stafflist' element={<StaffList/>} />
              <Route path='about' element={<About/>}/>
              <Route path='login' element={<Login/>} />
              <Route path='stats' element={<Stats/>}/>
              <Route path="datelist" element={<DateList/>}/>
              <Route path="adddate" element={<AddDate/>}/>
              <Route path="editdate/:id" element={<EditDate/>}/>
              <Route path="toolboxtalkadd" element={<ToolBoxTalkAdd/>}/>
              <Route path="toolboxtalklist" element={<ToolBoxTalkList/>}/>
              <Route path="toolboxtalkedit/:id" element={<ToolBoxTalkEdit/>}/>
              <Route path="editdate/:id" element={<EditDate/>}/>
              <Route path="attendencetable" element={<AttendenceTable/>}/>
              <Route path="attendencelist" element={<AttendenceList/>} />
              <Route path="attendenceadd" element={<AttendenceAdd/>} />
              <Route path='attendenceedit/:id' element={<AttendenceEdit/>} />
              <Route path='addstaff' element={<AddStaff/>} />
              <Route path='editstaff/:id' element={<EditStaff/>} />
              <Route path='addincident' element={<AddIncident/>} />
              <Route path='incident' element={<Incident/>} />
              <Route path='editincident/:id' element={<EditIncident/>}/>
              <Route path='incidenttable' element={<IncidentTable/>}/>
              <Route path='traininglist' element={<Traininglist/>}/>
              <Route path='trainingadd' element={<Trainingadd/>}/>
              <Route path='trainingedit/:id' element={<Trainingedit/>}/>
              <Route path="sitevisitlist" element={<Sitevisitlist/>} />
              <Route path="sitevisitadd" element={<SiteVisitAdd/>}/>
              <Route path="sitevisitedit/:id" element={<SiteVisitEdit/>}>
                <Route path="sitehazardadd" element={<SiteHazardAdd />}/>
              </Route>
              {/* <Route path="sitehazardadd" element={<SiteHazardAdd />}/> */}
              <Route path="sitehazardedit/:id" element={<SiteHazardEdit/>}/>
              <Route path="attendeeedit/:id" element={<AttendeesEdit/>}/>
              {/* <Route path="incidentinvestigationlist" element={<IncidentInvestigationList/>}/> */}
            </Route>
            <Route element={<LoginPage/>} path="/loginpage"/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
