import axios from 'axios'
import authService from '../auth/authService'

export const createMealPlan = async (mealPlan) => {
  const token = authService.getToken()
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const { data } = await axios.post('/api/mealplans', mealPlan, config)

  return data
}
