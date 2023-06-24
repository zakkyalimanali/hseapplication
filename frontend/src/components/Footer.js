import React from 'react'
import {NavLink ,Link, Outlet} from "react-router-dom"
import { Button } from 'react-bootstrap';
import { Navbar, Nav, Dropdown} from 'rsuite';
import '../App.css';

function Footer() {
  return (
    <div >
        <Navbar className="d-flex justify-content-center" style={{backgroundColor: 'rgba(235,114,106)', position : "absolute", bottom: '0', width: '100%'}}>
            <Nav>
                <Nav.Item>
                    <NavLink className="black" to="about">About Us</NavLink>
                </Nav.Item>
            </Nav>

        </Navbar>
      
    </div>
  )
}

export default Footer
