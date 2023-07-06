import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ValidatedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  const isValidated = user.isValidated
  if (user && isValidated) return children

  return <Navigate to='/login' />
}

export default ValidatedRoute
