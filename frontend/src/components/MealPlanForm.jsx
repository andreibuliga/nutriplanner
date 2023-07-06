import { useState } from 'react'
import '../styles/MealPlanForm.css'
import { createMealPlan } from '../features/services/mealPlanService'

function MealPlanForm({ onSubmit, recipes }) {
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack1', 'snack2']

  const [selectedRecipes, setSelectedRecipes] = useState(
    Array(7)
      .fill()
      .map(() => mealTypes.reduce((acc, curr) => ({ ...acc, [curr]: '' }), {}))
  )

  const [selectedMeals, setSelectedMeals] = useState(
    Array(7)
      .fill()
      .map(() => mealTypes.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}))
  )

  const handleSelectMeal = (day, mealType, recipeId) => {
    setSelectedMeals((prevSelectedMeals) => {
      const newSelectedMeals = [...prevSelectedMeals]
      if (!newSelectedMeals[day][mealType].includes(recipeId)) {
        newSelectedMeals[day][mealType] = [
          ...newSelectedMeals[day][mealType],
          recipeId,
        ]
      } else {
        alert(
          'This recipe is already in the meal plan for this day and meal type.'
        )
      }
      return newSelectedMeals
    })

    setSelectedRecipes((prevSelectedRecipes) => {
      const newSelectedRecipes = [...prevSelectedRecipes]
      newSelectedRecipes[day][mealType] = recipeId
      return newSelectedRecipes
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const mealPlans = selectedMeals.reduce((acc, meals, index) => {
      const mappedMeals = Object.entries(meals).reduce(
        (mealAcc, [mealType, recipes]) => {
          if (recipes.length > 0) {
            mealAcc[mealType] = recipes.map((recipeId) => ({ recipeId }))
          }
          return mealAcc
        },
        {}
      )

      if (Object.keys(mappedMeals).length > 0) {
        acc.push({
          dayOfWeek: index + 1,
          meals: mappedMeals,
        })
      }
      return acc
    }, [])

    try {
      for (const mealPlan of mealPlans) {
        await createMealPlan(mealPlan)
      }
      alert('Meal plan created successfully')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='mealplan-form'>
      {selectedMeals.map((dayMeals, index) => (
        <div key={index} className='mealplan-form__day'>
          <h3>Day {index + 1}</h3>
          {mealTypes.map((mealType) => (
            <div key={mealType} className='mealplan-form__meal-type'>
              <h4>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h4>
              <select
                value={selectedRecipes[index][mealType]}
                onChange={(e) =>
                  handleSelectMeal(index, mealType, e.target.value)
                }
                className='mealplan-form__select'
              >
                <option value=''>Select a recipe</option>
                {recipes.map((recipe) => (
                  <option key={recipe._id} value={recipe._id}>
                    {recipe.title}
                  </option>
                ))}
              </select>
              <ul className='mealplan-form__recipe-list'>
                {dayMeals[mealType].map((recipeId) => {
                  const recipe = recipes.find((r) => r._id === recipeId)
                  return (
                    <li key={recipeId} className='mealplan-form__recipe'>
                      {recipe.title}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      ))}
      <button type='submit' className='mealplan-form__submit-button'>
        Save Meal Plan
      </button>
    </form>
  )
}

export default MealPlanForm
