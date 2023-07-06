import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  const isAdmin = user.isAdmin
  if (user && isAdmin) return children

  return <Navigate to='/login' />
}

export default AdminRoute
