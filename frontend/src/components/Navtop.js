import React from 'react'
import {NavLink} from "react-router-dom"

export default function Navtop() {
    return (
        <div>
            <NavLink className="navlink" to="/">Home</NavLink>
            <NavLink className="navlink"to="staff">Staff</NavLink>
            <NavLink className="navlink"to="addincident">Add Incident</NavLink>
            <NavLink className="navlink" to="incident">Incident</NavLink>
            <NavLink className="navlink" to="incidenttable">Incidenttable</NavLink>
            {/* <NavLink className="navlink" to="oneincident">One Incident</NavLink> */}
            
        </div>
    )
}
