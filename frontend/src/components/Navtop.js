import React , {useContext} from 'react'
import {NavLink ,Link} from "react-router-dom"
import AuthContext from '../context/AuthContext';
import { Button } from 'react-bootstrap';

export default function Navtop() {
    const { user , logoutUser} = useContext(AuthContext);
    return (
        <div>
            <div></div>
            <header className="navtop">
                <NavLink className="navlink orange" to="/">Home</NavLink>
                <NavLink className="navlink orange" to="about">About</NavLink>
                {/* <NavLink className="navlink orange" to="login">Login Page</NavLink> */}
                {user ? ( <Button className="ms-2 me-2" variant="secondary" onClick={logoutUser}>Logout</Button>
                    ) : (
                    <Link to="/loginpage">Login</Link>
                    )
                }
                
            </header>
            <div></div>
        </div>
    )
}
