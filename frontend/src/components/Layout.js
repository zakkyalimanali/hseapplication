import {Outlet} from 'react-router-dom'
import Navtop from './Navtop_copy'
import Sidebar from './Sidebar'
import Footer from './Footer'


export default function Layout() {
    return (
        <div>
            <Navtop/>
            {/* <Sidebar/> */}
            <Outlet/>
            {/* <Footer/> */}
        </div>
    )
}



