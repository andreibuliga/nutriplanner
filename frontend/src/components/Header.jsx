import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaPlus,
  FaList,
} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import '../styles/Header.css'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>NutriPlanner</Link>
      </div>
      <ul>
        {user ? (
          <>
            {user.isValidated && (
              <>
                <li>
                  <Link
                    className='btn-header btn-reverse'
                    to='/create-meal-plan'
                  >
                    <FaPlus /> Create a Meal Plan
                  </Link>
                </li>
                <li>
                  <Link
                    className='btn-header btn-reverse'
                    to='/saved-meal-plans'
                  >
                    <FaList /> My Plans
                  </Link>
                </li>
              </>
            )}
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <button
                className='btn'
                onClick={onLogout}
                style={{ marginRight: '1rem' }}
              >
                <FaSignOutAlt /> Delogare
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Logare
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Înregistrare
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
