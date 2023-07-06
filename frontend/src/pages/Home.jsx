import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import '../index.css'
import '../styles/Home.css'

function Home() {
  const { user } = useSelector((state) => state.auth)
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

  return (
    <>
      <section className='heading'>
        <h1>Weekly Meal Planer</h1>
        <p>Below you can see the available recipes</p>
      </section>

      {user && user.isAdmin && (
        <Link to='/admin' className='btn btn-block'>
          Admin Dashboard
        </Link>
      )}

      {user && !user.isValidated && !user.isAdmin && (
        <h1>Please wait until you are validated!</h1>
      )}

      {user && user.isValidated && (
        <>
          <div className='recipe-list'>
            {recipes.map((recipe) => (
              <div key={recipe._id} className='recipe-card-container'>
                <RecipeCard recipe={recipe} />
                <Link
                  to={`/recipe-details/${recipe._id}`}
                  className='view-details-link'
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default Home
