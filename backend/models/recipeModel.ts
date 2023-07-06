import mongoose from 'mongoose'

interface IRecipe {
  title: string
  description: string
  ingredients: [
    {
      name: string
      quantity: number
      unit: string
    }
  ]
  instructions: string[]
  imageUrl: string
  totalCalories: number
  macros: {
    protein: number
    fat: number
    carbohydrates: number
  }
}

const recipeSchema = new mongoose.Schema<IRecipe>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      unit: { type: String, required: true },
    },
  ],
  instructions: {
    type: [String],
    required: true,
  },
  imageUrl: {
    type: String,
  },
  totalCalories: {
    type: Number,
    required: true,
  },
  macros: {
    protein: { type: Number, required: true },
    fat: { type: Number, required: true },
    carbohydrates: { type: Number, required: true },
  },
})

const Recipe = mongoose.model<IRecipe>('Recipe', recipeSchema)

export default Recipe
