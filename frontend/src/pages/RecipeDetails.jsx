import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import RecipeDetails from '../components/RecipeDetails'

function RecipeDetailsPage() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${id}`)
        setRecipe(response.data)
      } catch (error) {
        console.error('Error fetching recipe details:', error)
      }
    }

    fetchRecipe()
  }, [id])

  return (
    <div>
      {recipe ? (
        <RecipeDetails recipe={recipe} />
      ) : (
        <p>Loading recipe details...</p>
      )}
    </div>
  )
}

export default RecipeDetailsPage
