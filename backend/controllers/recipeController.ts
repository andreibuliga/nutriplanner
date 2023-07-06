import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Recipe from '../models/recipeModel'

export const getRecipes = asyncHandler(async (req: Request, res: Response) => {
  const recipes = await Recipe.find({})
  res.json(recipes)
})

export const createRecipe = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      title,
      description,
      ingredients,
      instructions,
      imageUrl,
      totalCalories,
      macros,
    } = req.body

    const recipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      imageUrl,
      totalCalories,
      macros,
    })

    const createdRecipe = await recipe.save()
    res.status(201).json(createdRecipe)
  }
)

export const getRecipeById = asyncHandler(
  async (req: Request, res: Response) => {
    const recipe = await Recipe.findById(req.params.id)

    if (recipe) {
      res.json(recipe)
    } else {
      res.status(404)
      throw new Error('Recipe not found')
    }
  }
)

export const updateRecipe = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      title,
      description,
      ingredients,
      instructions,
      imageUrl,
      totalCalories,
      macros,
    } = req.body

    const recipe = await Recipe.findById(req.params.id)

    if (recipe) {
      recipe.title = title
      recipe.description = description
      recipe.ingredients = ingredients
      recipe.instructions = instructions
      recipe.imageUrl = imageUrl
      recipe.totalCalories = totalCalories
      recipe.macros = macros

      const updatedRecipe = await recipe.save()
      res.json(updatedRecipe)
    } else {
      res.status(404)
      throw new Error('Recipe not found')
    }
  }
)

export const deleteRecipe = asyncHandler(
  async (req: Request, res: Response) => {
    const recipe = await Recipe.findById(req.params.id)

    if (recipe) {
      await recipe.remove()
      res.json({ message: 'Recipe removed' })
    } else {
      res.status(404)
      throw new Error('Recipe not found')
    }
  }
)
