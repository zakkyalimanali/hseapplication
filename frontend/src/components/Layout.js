import {Outlet} from 'react-router-dom'
import Navtop from './Navtop'

export default function Layout() {
    return (
        <div>
            <Navtop/>
            <Outlet/>
        </div>
    )
}



