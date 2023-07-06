import { Request, Response, NextFunction } from 'express'

const errorHandler = (
  error: Error,
  _: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = res.statusCode < 400 ? 500 : res.statusCode
  console.log('error middleware')
  console.log('error:', error)
  console.log('statusCode:', statusCode)

  res.status(statusCode)
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  })
}

export { errorHandler }
