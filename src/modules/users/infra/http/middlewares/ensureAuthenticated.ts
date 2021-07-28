import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export function ensureAuthenticate (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) throw new AppError('No token provided', 401)

  const parts = authHeader.split(' ')

  if (parts.length !== 2) throw new AppError('Token error', 401)

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) throw new AppError('Malformatted token', 401)

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload
    req.userId = sub
    return next()
  } catch (err) {
    throw new AppError('Token invalid', 401)
  }
}
