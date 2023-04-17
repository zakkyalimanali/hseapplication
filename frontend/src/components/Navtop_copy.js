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
            <Navbar style={{backgroundColor: 'skyblue'}}>
                <Nav>
                    <Nav.Item><NavLink className="white" to="/">HSE Industries</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="white" to="about">About Us</NavLink></Nav.Item>
                   
                    <Nav>
                        <Dropdown title="Features">
                            <Dropdown.Item><NavLink className="white" to="stats">Stats</NavLink></Dropdown.Item>
                            <Dropdown.Item><NavLink className="white" to="attendencelist">Attendence</NavLink></Dropdown.Item>
                            <Dropdown.Item><NavLink className="white" to="toolboxtalklist">Toolbox</NavLink></Dropdown.Item>
                            <Dropdown.Item><NavLink className="white" to="stafflist">Staff</NavLink></Dropdown.Item>
                            <Dropdown.Item><NavLink className="white" to="incidenttable">Incident</NavLink></Dropdown.Item>
                            
                            
                        </Dropdown>
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
