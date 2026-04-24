import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { hasMinRole } from './roleUtils'

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext)
  return user ? <Outlet /> : <Navigate to="/loginpage" />
}

/**
 * Wraps a route that requires a minimum role.
 * Usage in App.js:
 *   <Route element={<RoleRoute minRole="hse_officer" />}>
 *     <Route path="addstaff" element={<AddStaff />} />
 *   </Route>
 */
export const RoleRoute = ({ minRole }) => {
  const { user, userRole } = useContext(AuthContext)
  if (!user) return <Navigate to="/loginpage" />
  if (!hasMinRole(userRole, minRole)) return <Navigate to="/stafflog" />
  return <Outlet />
}

export default PrivateRoutes
