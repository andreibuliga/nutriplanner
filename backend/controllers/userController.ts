import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, isAdmin, isValidated } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Va rugam completati toate campurile')
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('Utilizatorul exista deja')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin,
    isValidated,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isValidated: user.isValidated,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Date utilizator invalide')
  }
})

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isValidated: user.isValidated,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Credentiale invalide')
  }
})

const getMe = asyncHandler(async (req: any, res: Response) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  }
  res.status(200).json(user)
})

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({})
  res.status(200).json(users)
})

const updateUserValidation = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.userId
    const { isValidated } = req.body

    const user = await User.findById(userId)

    if (user) {
      user.isValidated = isValidated
      const updatedUser = await user.save()

      res.status(200).json(updatedUser)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }
)

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  })
}

export { registerUser, loginUser, getMe, getUsers, updateUserValidation }
