import React from 'react'
import '../styles/RecipeDetails.css'

function RecipeDetails({ recipe }) {
  const {
    title,
    description,
    imageUrl,
    ingredients,
    instructions,
    totalCalories,
    macros,
  } = recipe

  return (
    <div className='recipe-details'>
      <h2>{title}</h2>
      <p>{description}</p>
      <img src={imageUrl} alt={title} className='recipe-image' />
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <ol>
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
      <h3>Nutrition Facts</h3>
      <p>Total Calories: {totalCalories}</p>
      <p>Protein: {macros.protein}g</p>
      <p>Fat: {macros.fat}g</p>
      <p>Carbohydrates: {macros.carbohydrates}g</p>
    </div>
  )
}

export default RecipeDetails
