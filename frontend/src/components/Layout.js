import {Outlet} from 'react-router-dom'
import Navtop from './Navtop_copy'
import Sidebar from './Sidebar'


export default function Layout() {
    return (
        <div>
            <Navtop/>
            {/* <Sidebar/> */}
            <Outlet/>
        </div>
    )
}



