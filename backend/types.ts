import { Request } from 'express'
import mongoose, { Document } from 'mongoose'
import { IUser } from './models/userModel'

export type UserDocument = IUser & Document

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument
      isAdmin?: boolean
    }
  }
}

export type Recipe = {
  recipeId: mongoose.Schema.Types.ObjectId
}

export type Meals = {
  breakfast: Recipe[]
  lunch: Recipe[]
  dinner: Recipe[]
  snack1: Recipe[]
  snack2: Recipe[]
}
