import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading } = useSelector((state) => state.auth)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Parolele nu corespund')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
        .unwrap()
        .then((user) => {
          toast.success(`User inregistrat  - ${user.name}`)
          navigate('/')
        })
        .catch(toast.error)
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Inregistrare
        </h1>
        <p>Creati-va un cont pentru a acesa aplicatia de programari</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Introduceti numele'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Introduceti adresa de email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Introduceti parola'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirmati parola'
              required
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Inregistrare</button>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <p>
              <input
                type='checkbox'
                required
                name='gdpr'
                id='gdpr'
                style={{ marginRight: '1em' }}
              />
              Prin bifarea acestei casute, îmi dau consimţământul pentru
              prelucrarea, transmiterea şi stocarea datelor cu caracter
              personal.
              <br />
              <a
                style={{
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  color: 'black',
                  '&:visited': { color: 'black', textDecoration: 'none' },
                }}
                href='https://nutriplanner.webflow.io/termeni-si-conditii'
                target={' _blank'}
              >
                Cititi Termenii si Conditile
              </a>
            </p>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
