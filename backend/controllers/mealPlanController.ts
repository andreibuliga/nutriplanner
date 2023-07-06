import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import MealPlan from '../models/mealPlanModel'
import { Recipe, Meals } from '../types'
import { ObjectId } from 'mongodb'
import { Schema } from 'mongoose'

export const getMealPlans = asyncHandler(
  async (req: Request, res: Response) => {
    const mealPlans = await MealPlan.find({
      userId: (req.user as any)._id,
    }).populate(
      'meals.breakfast.recipeId meals.lunch.recipeId meals.dinner.recipeId meals.snack1.recipeId meals.snack2.recipeId'
    )
    res.json(mealPlans)
  }
)

export const createMealPlan = asyncHandler(
  async (req: Request, res: Response) => {
    const { dayOfWeek, meals } = req.body

    const existingMealPlan = await MealPlan.findOne({
      userId: (req.user as any)._id,
      dayOfWeek,
    })

    if (existingMealPlan) {
      res.status(400)
      throw new Error('A meal plan already exists for this day')
    } else {
      const mealPlan = new MealPlan({
        userId: (req.user as any)._id,
        dayOfWeek,
        meals,
      })

      const createdMealPlan = await mealPlan.save()
      res.status(201).json(createdMealPlan)
    }
  }
)

export const getMealPlanById = asyncHandler(
  async (req: Request, res: Response) => {
    const mealPlan = await MealPlan.findById(req.params.id).populate(
      'meals.breakfast.recipeId meals.lunch.recipeId meals.dinner.recipeId meals.snack1.recipeId meals.snack2.recipeId'
    )

    if (mealPlan) {
      res.json(mealPlan)
    } else {
      res.status(404)
      throw new Error('Meal plan not found')
    }
  }
)

export const deleteMealPlan = asyncHandler(
  async (req: Request, res: Response) => {
    const mealPlan = await MealPlan.findById(req.params.id)

    if (mealPlan) {
      await mealPlan.remove()
      res.json({ message: 'Meal plan removed' })
    } else {
      res.status(404)
      throw new Error('Meal plan not found')
    }
  }
)

export const updateMealPlan = asyncHandler(
  async (req: Request, res: Response) => {
    const { dayOfWeek, meals } = req.body

    const mealPlan = await MealPlan.findById(req.params.id)

    if (mealPlan) {
      mealPlan.dayOfWeek = dayOfWeek
      mealPlan.meals = meals

      const updatedMealPlan = await mealPlan.save()
      res.json(updatedMealPlan)
    } else {
      res.status(404)
      throw new Error('Meal plan not found')
    }
  }
)

export const removeRecipeFromMealPlan = asyncHandler(
  async (req: Request, res: Response) => {
    const mealPlan = await MealPlan.findById(req.params.id)

    if (mealPlan) {
      const recipeId = req.params.recipeId

      for (let mealType in mealPlan.meals) {
        mealPlan.meals[mealType as keyof Meals] = (mealPlan.meals as Meals)[
          mealType as keyof Meals
        ].filter(
          (recipe: Recipe) => recipe.recipeId.toString() !== recipeId
        ) as [{ recipeId: Schema.Types.ObjectId }]
      }

      const updatedMealPlan = await mealPlan.save()
      res.json(updatedMealPlan)
    } else {
      res.status(404)
      throw new Error('Meal plan not found')
    }
  }
)
