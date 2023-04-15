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
import {AuthProvider} from './context/AuthContext'
import PrivateRoutes from './utils/PrivateRoutes';
import LoginPage from './pages/LoginPage';


function App() {
  return (
    <div className="App" style={{backgroundColor: 'beige'}}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthProvider><Layout/></AuthProvider>}>
            <Route element={<LoginPage/>} path="/loginpage"/>
            <Route element={<PrivateRoutes/>}>
              <Route path='/' element={<Home/>} exact/>
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
            </Route>
            <Route element={<LoginPage/>} path="/loginpage"/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
