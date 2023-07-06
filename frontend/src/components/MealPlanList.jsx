import React, { useState } from 'react'
import RecipeCard from './RecipeCard'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import authService from '../features/auth/authService'
import axios from 'axios'

Modal.setAppElement('#root')

function MealPlanList({ mealPlans, onMealPlanUpdate }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [currentDayMeals, setCurrentDayMeals] = useState(null)

  const openModal = (meals) => {
    setCurrentDayMeals(meals)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const handleRemoveRecipeFromMeal = async (mealPlanId, recipeId) => {
    try {
      const token = authService.getToken()
      await axios.delete(`/api/meal-plans/${mealPlanId}/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const updatedMealPlans = mealPlans.map((mealPlan) =>
        mealPlan._id === mealPlanId
          ? {
              ...mealPlan,
              meals: Object.keys(mealPlan.meals).reduce((acc, mealType) => {
                acc[mealType] = mealPlan.meals[mealType].filter(
                  (recipe) => recipe.recipeId._id !== recipeId
                )
                return acc
              }, {}),
            }
          : mealPlan
      )

      onMealPlanUpdate(updatedMealPlans)
    } catch (error) {
      console.error('Error removing recipe from meal plan:', error)
    }
  }

  return (
    <div className='mealplan-container'>
      <h1 className='mealplan-title'>Your Meal Plans</h1>
      <p className='mealplan-description'>
        Explore your meal plans for the week, and discover new recipes to try!
      </p>
      <Link to='/create-meal-plan' className='create-mealplan-link'>
        Create New Meal Plan
      </Link>
      <div className='mealplan-list'>
        {mealPlans.map((mealPlan) => (
          <div
            key={mealPlan._id}
            className='mealplan'
            onClick={() => openModal(mealPlan.meals)}
          >
            <h3 className='mealplan__day'>Day {mealPlan.dayOfWeek}</h3>
          </div>
        ))}
      </div>
      {currentDayMeals && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <div className='mealplan__meal-types-grid'>
            {Object.entries(currentDayMeals).map(([mealType, recipes]) => (
              <div key={mealType} className='mealplan__meal-type'>
                <h4 className='mealplan__meal-type-title'>
                  {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                </h4>
                <div className='recipe-card-row'>
                  {recipes.map((recipe) => {
                    return (
                      <div
                        key={recipe.recipeId._id}
                        className='recipe-card-container'
                      >
                        <RecipeCard recipe={recipe} />
                        <Link
                          to={`/recipe-details/${recipe.recipeId._id}`}
                          className='view-details-link'
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() =>
                            handleRemoveRecipeFromMeal(
                              currentDayMeals._id,
                              recipe.recipeId._id
                            )
                          }
                          className='remove-recipe-link'
                        >
                          Remove
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className='mid'>
            <button className='btn' onClick={closeModal}>
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default MealPlanList
