import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import {NavLink, Outlet} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Sidebar() {
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-1 min-vh-100 bg-dark">
            <ul>
              <li className="mt-5">
                {/* <a href="/" className="nav-link px-2">
                <FontAwesomeIcon icon={faPen } /><span className='ms-1 d-none d-sm-inline'>Home</span>
                <p>Home</p>
                </a> */}
                <NavLink className="white" to="stafflist">Staff</NavLink>
              </li>
              <li className="mt-5">
                {/* <a href="/" className="nav-link px-2">
                <FontAwesomeIcon icon={faPen } /><span className='ms-1 d-none d-sm-inline'>Home</span>
                <p>Home</p>
                </a> */}
                <NavLink className="white" to="incidenttable">Incidents</NavLink>
              </li>
              {/* <li>
                <a href="stafflist" className="nav-link px-2">
                <FontAwesomeIcon icon={faTrash } /><span className='ms-1 d-none d-sm-inline'>Trash</span>
                </a>
              </li>
              <li>
                <a href="/" className="nav-link px-2">
                <FontAwesomeIcon icon={faPen } /><span className='ms-1 d-none d-sm-inline'>Home</span>
                </a>
              </li>
              <li>
                <a href="/" className="nav-link px-2">
                <FontAwesomeIcon icon={faPen } /><span className='ms-1 d-none d-sm-inline'>Home</span>
                </a>
              </li>
              <li>
                <a href="/" className="nav-link px-2">
                <FontAwesomeIcon icon={faPen } /><span className='ms-1 d-none d-sm-inline'>Home</span>
                </a>
              </li> */}
            </ul>
                
            </div>
            <div className="col">
              <Outlet/>
            </div>
            
        </div>
        

      </div>
    );
}