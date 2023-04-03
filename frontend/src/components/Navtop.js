import React from 'react'
import {NavLink} from "react-router-dom"

export default function Navtop() {
    return (
        <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="staff">Staff</NavLink>
            <NavLink to="incident">Incident</NavLink>
        </div>
    )
}
