import React from 'react'
import {NavLink} from "react-router-dom"


export default function Navtop() {
    return (
        <div>
            <div></div>
            <header className="navtop">
                <NavLink className="navlink orange" to="/">Home</NavLink>
                <NavLink className="navlink orange" to="about">About</NavLink>
                <NavLink className="navlink orange" to="login">Login Page</NavLink>
                
            </header>
            <div></div>
        </div>
    )
}
