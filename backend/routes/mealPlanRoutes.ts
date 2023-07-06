import express from 'express'
import { protect } from '../middleware/authMiddleware'
import {
  createMealPlan,
  getMealPlans,
  getMealPlanById,
  deleteMealPlan,
  updateMealPlan,
  removeRecipeFromMealPlan,
} from '../controllers/mealPlanController'

const router = express.Router()

router.route('/').get(protect, getMealPlans).post(protect, createMealPlan)
router
  .route('/:id')
  .get(protect, getMealPlanById)
  .delete(protect, deleteMealPlan)
  .put(protect, updateMealPlan)

router.delete(
  '/mealplans/:id/recipes/:recipeId',
  protect,
  removeRecipeFromMealPlan
)

export default router
