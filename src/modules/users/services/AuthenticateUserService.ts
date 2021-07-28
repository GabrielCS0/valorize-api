import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IAuthenticateUserDTO } from '../dtos/IAuthenticateUserDTO'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

@injectable()
export class AuthenticateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute ({ email, password }: IAuthenticateUserDTO): Promise<Object> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new AppError('Email or Password incorrect')

    const matchPassword = await compare(password, user.password)

    if (!matchPassword) throw new AppError('Email or Password incorrect')

    const token = sign({
      email: user.email
    },
    process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '1d'
    })

    return { token }
  }
}
