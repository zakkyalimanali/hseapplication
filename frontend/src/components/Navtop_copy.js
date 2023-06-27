import React , {useContext} from 'react'
import {NavLink ,Link, Outlet} from "react-router-dom"
import AuthContext from '../context/AuthContext';
import { Button } from 'react-bootstrap';
import { Navbar, Nav, Dropdown} from 'rsuite';
import ExploreIcon from '@rsuite/icons/Explore';
import AdminIcon from '@rsuite/icons/Admin';
import PlusIcon from '@rsuite/icons/Plus';
import SettingIcon from '@rsuite/icons/Setting';
import 'rsuite/dist/rsuite.min.css';


export default function Navtop() {
    const { user , logoutUser} = useContext(AuthContext);
    return (
        // <div>
        //     <nav className="navbar navbar-expand-lg bg-light">
        //         <div className="container-fluid">
        //             <a className="navbar-brand" href="/">Industry HSE</a>
        //             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //             </button>
        //             <div className="collapse navbar-collapse" id="navbarNavDropdown">
        //             <ul className="navbar-nav">
        //                 <li className="nav-item">
        //                 <a className="nav-link" href="about">About</a>
        //                 </li>
        //                 <Dropdown>
        //                     <Dropdown.Toggle variant="success">
        //                     Open Menu
        //                     </Dropdown.Toggle>
        //                     <Dropdown.Menu>
        //                     <Dropdown.Item href="#">
        //                         Home Page
        //                     </Dropdown.Item>
        //                     <Dropdown.Item href="#">
        //                         Settings
        //                     </Dropdown.Item>
        //                     <Dropdown.Item href="#">
        //                         Logout
        //                     </Dropdown.Item>
        //                     </Dropdown.Menu>
        //                 </Dropdown>
        //                 {/* </li> */}
        //             </ul>
        //             {user ? ( <Button className="ms-2 me-2" variant="secondary" onClick={logoutUser}>Logout</Button>
        //             ) : (
        //             <Link to="/loginpage">Login</Link>
        //             )
        //     }
        //             </div>
        //         </div>
        //         </nav>
        // </div>

        // <div style={{
        //     display: 'block', width: 700, paddingLeft: 30
        //     }}>
        //     <h4>React Suite Nav Component</h4>
        //     <Navbar>
        //         <Navbar.Header>
        //         <a href="/home" className="navbar-brand logo">
        //         CompanyName
        //         </a>
        //         </Navbar.Header>
        //         <Navbar.Body>
        //         <Nav>
        //             <Nav.Item>Login</Nav.Item>
        //             <Nav.Item>Signup</Nav.Item>
        //             <Dropdown title="Features">
        //             <Dropdown.Item>Settings</Dropdown.Item>
        //             <Dropdown.Item>About</Dropdown.Item>
        //             </Dropdown>
        //         </Nav>
        //         </Navbar.Body>
        //     </Navbar>
        //     </div>

        <div>

            {/* <Navbar style={{backgroundColor: 'skyblue'}}> */}
            {/* <Navbar style={{backgroundColor: 'rgba(235,114,106, 0.5)'}}> */}
            <Navbar  style={{backgroundColor: 'rgba(245,184,180,96)', position : "absolute", top: '0', width: '100%'}}>
                <Nav>
                    <Nav.Item><NavLink className="black" to="/">Zakky Industries</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="black" to="chartspage">Charts</NavLink></Nav.Item>
                    {/* <Nav.Item><NavLink className="black" to="about">About Us</NavLink></Nav.Item> */}
                   
                    <Nav>
                        <Nav.Menu className="black" title="HSE">
                            <Nav.Item><NavLink  to="stats" className="inprogress">Statistics (In Progress)</NavLink></Nav.Item>
                            <Nav.Item><NavLink  to="toolboxtalklist">Toolbox</NavLink></Nav.Item>
                            <Nav.Item><NavLink  to="incidenttable">Safety Card</NavLink></Nav.Item>
                            <Nav.Item><NavLink  to="traininglist">Training</NavLink></Nav.Item>
                            <Nav.Item><NavLink  to="sitevisitlist">Site Visit</NavLink></Nav.Item>
                            <Nav.Item><NavLink  to="safeworkpracticelist" className="inprogress">Safe Work Practice (In Progress)</NavLink></Nav.Item>
                            <Nav.Item><NavLink  to="hsereferenceslist" className="inprogress">HSE References (In Progress)</NavLink></Nav.Item>
                            <Nav.Item><NavLink  to="workplaceruleslist" className="inprogress">Work Place Rules (In Progress)</NavLink></Nav.Item>
                            <Nav.Item><NavLink  to="riskmitigationlist" className="inprogress">Risk Mitigation (In Progress)</NavLink></Nav.Item>
                            <Nav.Item><NavLink  to="hseauditlist" className="inprogress">HSE Audit (In Progress)</NavLink></Nav.Item>
                            <Nav.Item><NavLink  to="emergencyplanlist" className="inprogress">Emergency Plan (In Progress)</NavLink></Nav.Item>
                            <Nav.Item><NavLink  to="hsemanagement">HSE Management</NavLink></Nav.Item>
                            <Nav.Item><NavLink  to="riskmanagementlist" className="inprogress">Risk Management (In Progress)</NavLink></Nav.Item>
                            <Nav.Item><NavLink  to="reportinglist" className="inprogress">Reporting (In Progress)</NavLink></Nav.Item>
                            <Nav.Item><NavLink  to="incidentinvestigationlist">Incident Investigation</NavLink></Nav.Item>
                            <Nav.Item><NavLink  to="riskregisterlist">Risk Register</NavLink></Nav.Item>
                            <Nav.Item><NavLink  to="permittowork" className="inprogress">Permit to Work (In Progress)</NavLink></Nav.Item>
                            <Nav.Item><NavLink  to="jobsafetyanalysis">Job Safety Analysis</NavLink></Nav.Item>
                        </Nav.Menu>
                    </Nav>
                    <Nav>
                        <Nav.Menu className="black" title="Staff">
                            <Nav.Item><NavLink to="attendencelist">Attendence</NavLink></Nav.Item>
                            <Nav.Item><NavLink  to="stafflist">Staff</NavLink></Nav.Item>
                        </Nav.Menu>
                    </Nav>
                    <Nav>
                        <Nav.Menu className="black" title="Equipment and Items">
                            <Nav.Item><NavLink to="equipment" >Equipment and Items</NavLink></Nav.Item>
                        </Nav.Menu>
                    </Nav>
                </Nav>
                <div className="me-5" style={{float : "right"}}>
                {user ? ( <Button className="me-auto mt-2" variant="secondary" onClick={logoutUser}>Logout</Button>
                    ) : (
                    <Button className="me-auto mt-2"  variant="secondary"><Link to="/loginpage">Login</Link></Button>
                    )
                    }
                </div>
            </Navbar>
            
        {/* {Outlet} */}
        </div>
    )
}
