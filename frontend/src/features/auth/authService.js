import axios from 'axios'

const API_URL = '/api/users/'

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user && user.token) {
    return user.token
  }
  return null
}

const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const logout = () => localStorage.removeItem('user')

const authService = {
  register,
  logout,
  login,
  getToken,
}

export default authService
