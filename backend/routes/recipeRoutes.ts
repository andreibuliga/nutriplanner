import express from 'express'
import { protect } from '../middleware/authMiddleware'
import {
  createRecipe,
  deleteRecipe,
  getRecipeById,
  getRecipes,
  updateRecipe,
} from '../controllers/recipeController'

const router = express.Router()

router.route('/').get(getRecipes).post(protect, createRecipe)

router
  .route('/:id')
  .get(getRecipeById)
  .put(protect, updateRecipe)
  .delete(protect, deleteRecipe)

export default router
