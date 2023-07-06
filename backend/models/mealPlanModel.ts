import mongoose from 'mongoose'

interface IMealPlan {
  userId: mongoose.Schema.Types.ObjectId
  dayOfWeek: number
  meals: {
    breakfast: [{ recipeId: mongoose.Schema.Types.ObjectId }]
    lunch: [{ recipeId: mongoose.Schema.Types.ObjectId }]
    dinner: [{ recipeId: mongoose.Schema.Types.ObjectId }]
    snack1: [{ recipeId: mongoose.Schema.Types.ObjectId }]
    snack2: [{ recipeId: mongoose.Schema.Types.ObjectId }]
  }
}

const mealPlanSchema = new mongoose.Schema<IMealPlan>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dayOfWeek: {
      type: Number,
      required: true,
    },
    meals: {
      breakfast: [
        {
          recipeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
          },
        },
      ],
      lunch: [
        {
          recipeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
          },
        },
      ],
      dinner: [
        {
          recipeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
          },
        },
      ],
      snack1: [
        {
          recipeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
          },
        },
      ],
      snack2: [
        {
          recipeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
)

const MealPlan = mongoose.model<IMealPlan>('MealPlan', mealPlanSchema)

export default MealPlan
