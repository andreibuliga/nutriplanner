import path from 'path'
import express, { Request, Response, NextFunction } from 'express'
import 'colors'
import dotenv from 'dotenv'
import { errorHandler } from './middleware/errorMiddleware'
import connectDB from './config/db'
import generateSitemap from './sitemap'

import userRoutes from './routes/userRoutes'
import recipeRoutes from './routes/recipeRoutes'
import mealPlanRoutes from './routes/mealPlanRoutes'

dotenv.config()
const PORT = process.env.PORT || 3000

generateSitemap()
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', userRoutes)
app.use('/api/recipes', recipeRoutes)
app.use('/api/mealplans', mealPlanRoutes)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
} else {
  app.get('/', (_, res) => {
    res.status(200).json({ message: 'Platforma Rezervari Initializata' })
  })
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
