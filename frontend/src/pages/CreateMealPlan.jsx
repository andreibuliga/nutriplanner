import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import MealPlanForm from '../components/MealPlanForm'
import authService from '../features/auth/authService'

function CreateMealPlanPage() {
  const { user } = useSelector((state) => state.auth)
  const [error, setError] = useState(null)
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    if (user && user.isValidated) {
      fetchRecipes()
    }
  }, [user])

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('/api/recipes')
      setRecipes(response.data)
    } catch (error) {
      console.error('Error fetching recipes:', error)
    }
  }

  const createMealPlan = async (mealPlans) => {
    try {
      const token = authService.getToken()
      for (const mealPlan of mealPlans) {
        if (mealPlan.recipes.length > 0) {
          await axios.post(
            '/api/mealplans',
            {
              userId: user._id,
              dayOfWeek: mealPlan.dayOfWeek,
              recipes: mealPlan.recipes,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        }
      }
      setError(null)
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError('Error creating meal plans')
      }
    }
  }

  return (
    <div>
      <h2>Create a meal plan</h2>
      {error && <p className='error'>{error}</p>}
      <MealPlanForm onSubmit={createMealPlan} recipes={recipes} />
    </div>
  )
}

export default CreateMealPlanPage
