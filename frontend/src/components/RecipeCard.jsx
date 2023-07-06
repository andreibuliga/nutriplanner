// src/components/RecipeCard.js
import React from 'react'
import '../index.css'

function RecipeCard({ recipe }) {
  return (
    <div className='recipe-card'>
      <div className='recipe-card-image'>
        <img
          src={
            recipe.image
              ? recipe.image
              : 'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          }
          alt={recipe.title}
        />
      </div>
      <div className='recipe-card-content'>
        <h3>{recipe.title}</h3> <p>{recipe.description}</p>
      </div>
    </div>
  )
}

export default RecipeCard
