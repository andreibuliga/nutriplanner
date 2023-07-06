import React, { useEffect, useState } from 'react'
import axios from 'axios'
import authService from '../features/auth/authService'
import RecipeForm from '../components/RecipeForm'
import RecipeCard from './RecipeCard'

const AdminRecipeManagement = () => {
  const [recipes, setRecipes] = useState([])
  const token = authService.getToken()

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios.get('/api/recipes', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setRecipes(response.data)
    }

    fetchRecipes()
  }, [token])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setRecipes(recipes.filter((recipe) => recipe._id !== id))
    } catch (error) {
      console.error('Error deleting recipe:', error)
    }
  }

  return (
    <div style={{ padding: '2rem 0 5rem 0' }}>
      <h2>Add a Recipe</h2>
      <RecipeForm />
      <h2>Existing Recipes</h2>
      <div className='recipe-list'>
        {recipes.map((recipe) => (
          <div key={recipe._id} className='recipe-card-container'>
            <RecipeCard recipe={recipe} />
            <button
              className='view-details-link'
              onClick={() => handleDelete(recipe._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminRecipeManagement
