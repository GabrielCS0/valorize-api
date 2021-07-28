import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository'
import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'

export async function ensureAdmin (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req

  const usersRepository = new UsersRepository()

  const { admin } = await usersRepository.findById(userId)

  if (!admin) throw new AppError('Unauthorized User', 401)

  return next()
}
