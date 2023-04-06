import React from 'react'
import {NavLink} from "react-router-dom"

export default function Navtop() {
    return (
        <div>
            <div></div>
            <header className="navtop">
                <NavLink className="navlink" to="/">Home</NavLink>
                <NavLink className="navlink"to="staff">Staff</NavLink>
                {/* <NavLink className="navlink"to="addincident">Add Incident</NavLink> */}
                {/* <NavLink className="navlink" to="incident">Incident</NavLink> */}
                <NavLink className="navlink" to="incidenttable">List of Incidents</NavLink>
                {/* <NavLink className="navlink" to="oneincident">One Incident</NavLink> */}
                <NavLink className="navlink" to="about">About</NavLink>
                <NavLink className="navlink" to="login">Login Page</NavLink>
                
            </header>
            <div></div>
        </div>
    )
}
