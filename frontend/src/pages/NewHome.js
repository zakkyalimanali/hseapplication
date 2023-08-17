import React from 'react'
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {NavLink ,Link, Outlet} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap'
import HomeImage from '../images/HomeImage.jpg'
import SteamHill from '../images/SteamHill.jpg'
import Carousel from 'react-bootstrap/Carousel';
import LimaPasir from '../images/LimaPasir.jpg'
import Melaku from '../images/Melaku.jpg'

function NewHome() {
  return (
    <div style={{backgroundColor: '#FAF9F6', height: '100vh'}}>
        <Navbar className="p-3 sticky-top" expand="lg" style={{backgroundColor: '#F4F5F7'}}>
            <Navbar.Brand className="mx-5">
                <NavLink style={{color: '#E15047', fontWeight: 'bold'}} to="#">Ali Industries</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="mx-2">
                <Button variant="warning">
                    <NavLink style={{color: '#E15047' , textDecoration:'none'}} to="#">Login</NavLink>
                </Button>
            </Nav>
            <Nav className="mx-2">
                <NavLink style={{color: '#E15047' , textDecoration:'none'}} to="#">Projects</NavLink>
            </Nav>
      
            <Nav className="mx-2">
                <NavLink style={{color: '#E15047' , textDecoration:'none'}} to="#">Mission and Vision</NavLink>
            </Nav>
      
            <Nav className="mx-2">
                <NavLink style={{color: '#E15047' , textDecoration:'none'}} to="#">About Us</NavLink>
            </Nav>
    
            <Nav className="mx-2">
                <NavLink style={{color: '#E15047' , textDecoration:'none'}} to="#">Newsletter</NavLink>
            </Nav>
    
            <Nav className="mx-2">
                <NavLink style={{color: '#E15047' , textDecoration:'none'}} to="#">Contact Us</NavLink>
            </Nav>
           
    
 
            </Navbar.Collapse>
            

        </Navbar>
      {/* <div>
        <img src={HomeImage} alt="HomeImage" style={{width: '100%' , height: '95vh'}}/>
        <div className="p-3 text-center" style={{backgroundColor: 'red', width: '25rem', borderRadius: "25px"}}>
            <h1>The Future Of Safety Is Digital</h1>
        </div>
      </div> */}
      

<div style={{ position: 'relative' }}>
    <img src={HomeImage} alt="HomeImage" style={{ width: '100%', height: '95vh' }} />
    <div
        className="p-3 text-center"
        style={{
            backgroundColor: 'rgba(250, 249, 246, 0.8)',
            width: '35rem',
            borderRadius: '25px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }}
    >
        <h1 style={{fontSize: '4rem', color: '#E15047'}}>The Future Of Safety Is Digital</h1>
    </div>
</div>
<div>
    <h1 className="mt-4 text-center" style={{color: '#E15047'}}>Our Projects</h1>
    <div className="row justify-content-center">
        <div className="col-md-10">
            <div className="mt-3 text-center">
                {/* <h3 className="m-3 p-2" style={{color: '#E15047'}}>Steam Hill Project</h3>
                <div style={{ position: 'relative' }}>
                <img className="mb-3"src={SteamHill} alt="steamhill" style={{ width: '80%', height: '65vh' }}/>
                <div
                    className="p-3 text-center"
                    style={{
                        backgroundColor: 'rgba(250, 249, 246, 0.8)',
                        width: '20rem',
                        borderRadius: '25px',
                        position: 'absolute',
                        top: '50%',
                        left: '33%',
                        transform: 'translate(-50%, -50%)',
                    }}
    >
                <p className="text-start" style={{fontSize: '1rem'}}>Nullam placerat ligula id euismod facilisis. Suspendisse at eros nec orci venenatis fringilla eget ut ante. Praesent feugiat erat tortor, eu ullamcorper ligula dignissim sit amet. <br/><br/>Cras interdum odio non fermentum pharetra.
                Aliquam suscipit dolor eget erat sagittis, nec dictum urna vehicula. Curabitur ullamcorper interdum auctor. Sed ultricies mauris id vehicula convallis.</p>



    </div>
    </div> */}
            {/* <Carousel>
                <Carousel.Item>
                    <SteamHill text="First Slide"/>
                    <Carousel.Caption>
                    <p className="text-start" style={{fontSize: '1rem'}}>Nullam placerat ligula id euismod facilisis. Suspendisse at eros nec orci venenatis fringilla eget ut ante. Praesent feugiat erat tortor, eu ullamcorper ligula dignissim sit amet. <br/><br/>Cras interdum odio non fermentum pharetra.
                Aliquam suscipit dolor eget erat sagittis, nec dictum urna vehicula. Curabitur ullamcorper interdum auctor. Sed ultricies mauris id vehicula convallis.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <SteamHill text="First Slide"/>
                    <Carousel.Caption>
                    <p className="text-start" style={{fontSize: '1rem'}}>Nullam placerat ligula id euismod facilisis. Suspendisse at eros nec orci venenatis fringilla eget ut ante. Praesent feugiat erat tortor, eu ullamcorper ligula dignissim sit amet. <br/><br/>Cras interdum odio non fermentum pharetra.
                Aliquam suscipit dolor eget erat sagittis, nec dictum urna vehicula. Curabitur ullamcorper interdum auctor. Sed ultricies mauris id vehicula convallis.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                    <LimaPasir text="Second Slide"/>
                    <Carousel.Caption>
                    <p className="text-start" style={{fontSize: '1rem'}}>Nullam placerat ligula id euismod facilisis. Suspendisse at eros nec orci venenatis fringilla eget ut ante. Praesent feugiat erat tortor, eu ullamcorper ligula dignissim sit amet. <br/><br/>Cras interdum odio non fermentum pharetra.
                Aliquam suscipit dolor eget erat sagittis, nec dictum urna vehicula. Curabitur ullamcorper interdum auctor. Sed ultricies mauris id vehicula convallis.</p>
                    </Carousel.Caption>
            </Carousel> */}

<Carousel>
    <Carousel.Item>
        {/* <h3 className="m-3 p-2 text-center" style={{color: '#E15047'}}>Steam Hill</h3> */}
        <img className="col-md-9" src={SteamHill} alt="SteamHill" />
        <Carousel.Caption>
            <h3 className="m-3 p-2 text-center" style={{color: '#E15047', backgroundColor: 'rgba(250, 249, 246, 0.8)', borderRadius: '20px'}}>Steam Hill</h3>
            <p className="text-start p-5" style={{fontSize: '1rem' , color: 'black',  width: '20rem', backgroundColor: 'rgba(250, 249, 246, 0.8)', borderRadius: '20px'}}>
                Nullam placerat ligula id euismod facilisis. Suspendisse at eros nec orci venenatis fringilla eget ut ante. Praesent feugiat erat tortor, eu ullamcorper ligula dignissim sit amet.
                <br/>
                <br/>
                Cras interdum odio non fermentum pharetra.
                Aliquam suscipit dolor eget erat sagittis, nec dictum urna vehicula. Curabitur ullamcorper interdum auctor. Sed ultricies mauris id vehicula convallis.
            </p>
        </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
        {/* <h3 className="m-3 p-2 text-center" style={{color: '#E15047'}}>Lima Pasir</h3> */}
        <img className="col-md-9" src={LimaPasir} alt="LimaPasir"/>
        <Carousel.Caption >
        <h3 className="m-3 p-2 text-center" style={{color: '#E15047', backgroundColor: 'rgba(250, 249, 246, 0.8)', borderRadius: '20px'}}>Lima Pasir</h3>
        <div className="d-flex justify-content-center align-items-center">
            <p className="text-start p-5" style={{fontSize: '1rem' , color: 'black',  width: '20rem', backgroundColor: 'rgba(250, 249, 246, 0.8)', borderRadius: '20px'}}>
                Nullam placerat ligula id euismod facilisis. Suspendisse at eros nec orci venenatis fringilla eget ut ante. Praesent feugiat erat tortor, eu ullamcorper ligula dignissim sit amet.
                <br/>
                <br/>
                Cras interdum odio non fermentum pharetra.
                Aliquam suscipit dolor eget erat sagittis, nec dictum urna vehicula. Curabitur ullamcorper interdum auctor. Sed ultricies mauris id vehicula convallis.
            </p>
        </div>    
        </Carousel.Caption>
    </Carousel.Item>
    {/* <Carousel.Item>
        <h3 className="m-3 p-2 text-center" style={{color: '#E15047'}}>Melaku</h3>
        <div  className="d-flex justify-content-center align-items-center">
        <img className="col-md-9" src={Melaku} alt="Melaku" />
        
            <Carousel.Caption >   
                <p className="text-start p-5" style={{fontSize: '1rem' , color: 'black',  width: '20rem', backgroundColor: 'rgba(250, 249, 246, 0.8)', borderRadius: '20px'}}>
                        Nullam placerat ligula id euismod facilisis. Suspendisse at eros nec orci venenatis fringilla eget ut ante. Praesent feugiat erat tortor, eu ullamcorper ligula dignissim sit amet.
                        <br/>
                        <br/>
                        Cras interdum odio non fermentum pharetra.
                        Aliquam suscipit dolor eget erat sagittis, nec dictum urna vehicula. Curabitur ullamcorper interdum auctor. Sed ultricies mauris id vehicula convallis.
                    </p>
            </Carousel.Caption>
        </div>
    </Carousel.Item> */}
    {/* <Carousel.Item>
    <h3 className="m-3 p-2 text-center" style={{color: '#E15047'}}>Melaku</h3>
    <div className="d-flex justify-content-center align-items-center">
        <img className="col-md-9" src={Melaku} alt="Melaku" />
        <Carousel.Caption>
            <p className="text-start p-5" style={{fontSize: '1rem', color: 'black', width: '20rem', backgroundColor: 'rgba(250, 249, 246, 0.8)', borderRadius: '20px'}}>
                Nullam placerat ligula id euismod facilisis. Suspendisse at eros nec orci venenatis fringilla eget ut ante. Praesent feugiat erat tortor, eu ullamcorper ligula dignissim sit amet.
                <br/><br/>
                Cras interdum odio non fermentum pharetra. Aliquam suscipit dolor eget erat sagittis, nec dictum urna vehicula. Curabitur ullamcorper interdum auctor. Sed ultricies mauris id vehicula convallis.
            </p>
        </Carousel.Caption>
    </div>
</Carousel.Item> */}

            <Carousel.Item>
                {/* <h3 className="m-3 p-2 text-center" style={{color: '#E15047'}}>Melaku</h3> */}
                {/* <div className="d-flex justify-content-center align-items-center"> */}
                    <img className="col-md-9" src={Melaku} alt="Melaku" />
                {/* </div> */}
                <Carousel.Caption>
                <h3 className="m-3 p-2 text-center" style={{color: '#E15047', backgroundColor: 'rgba(250, 249, 246, 0.8)', borderRadius: '20px'}}>Melaku</h3>
                    <div className="d-flex justify-content-end align-items-center">
                        <p className="text-start p-5" style={{fontSize: '1rem', color: 'black', width: '20rem', backgroundColor: 'rgba(250, 249, 246, 0.8)', borderRadius: '20px'}}>
                            Nullam placerat ligula id euismod facilisis. Suspendisse at eros nec orci venenatis fringilla eget ut ante. Praesent feugiat erat tortor, eu ullamcorper ligula dignissim sit amet.
                            <br/><br/>
                            Cras interdum odio non fermentum pharetra. Aliquam suscipit dolor eget erat sagittis, nec dictum urna vehicula. Curabitur ullamcorper interdum auctor. Sed ultricies mauris id vehicula convallis.
                        </p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>


            </div>
        </div>
    </div>
</div>

<h1>About Us</h1>


    </div>
  )
}

export default NewHome
