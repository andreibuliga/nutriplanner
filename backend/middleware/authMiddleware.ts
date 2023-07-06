import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel'

import '../types'

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
          id: string
        }
        req.user = await User.findById(decoded.id).select(
          '-password -__v -createdAt -updatedAt'
        )

        if (!req.user) {
          res.status(401)
          throw new Error('Neautorizat')
        }

        req.isAdmin = req.user.isAdmin

        next()
      } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Neautorizat')
      }
    }

    if (!token) {
      res.status(401)
      throw new Error('Neautorizat')
    }
  }
)

export { protect }
