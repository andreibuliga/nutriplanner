import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import MealPlanList from '../components/MealPlanList'
import { useSelector } from 'react-redux'
import authService from '../features/auth/authService'

function SavedMealPlansPage() {
  const [mealPlans, setMealPlans] = useState([])
  const { user } = useSelector((state) => state.auth)
  const token = authService.getToken()

  const fetchMealPlans = useCallback(async () => {
    try {
      const response = await axios.get(`/api/mealplans?userId=${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setMealPlans(response.data)
    } catch (error) {
      console.error('Error fetching meal plans:', error)
    }
  }, [user, token])

  useEffect(() => {
    fetchMealPlans()
  }, [fetchMealPlans])

  const handleMealPlanUpdate = (updatedMealPlans) => {
    setMealPlans(updatedMealPlans)
  }

  return (
    <div>
      <h2>Saved meal plans</h2>
      <MealPlanList
        mealPlans={mealPlans}
        onMealPlanUpdate={handleMealPlanUpdate}
      />
    </div>
  )
}

export default SavedMealPlansPage
