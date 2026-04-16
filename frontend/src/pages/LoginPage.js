import React , {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Form } from 'react-bootstrap'
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  console.log(loginUser)
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
      {/* <form onSubmit={loginUser}>
        <input type="text" name="username" placeholder="Enter Username"/>
        <input type="password" name="password" placeholder="Enter Password"/>
        <input type="submit" />
      </form> */}

          <Form onSubmit={loginUser}>
            <Form.Label className="mt-3">Username</Form.Label>
            <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  name ="username"
                  // value={toolbox_date}
                  // onChange={(e) => setToolBoxDate(e.target.value)}
                />

            {/* <input type="text" name="username" placeholder="Enter Username"/> */}
            <Form.Label className="mt-3">Password</Form.Label>
              <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  />
            {/* <input type="password" name="password" placeholder="Enter Password"/> */}
            <div>
              <Button className="mt-3" type="submit">Submit</Button>
            </div>
          </Form>
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
