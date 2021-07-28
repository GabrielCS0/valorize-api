import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../infra/typeorm/entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { hash } from 'bcryptjs'

@injectable()
class CreateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute ({ name, email, password, admin = false }: ICreateUserDTO): Promise<User> {
    if (!email) {
      throw new AppError('Email incorrect')
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      admin
    })

    await this.usersRepository.save(user)

    delete user.password
    return user
  }
}

export { CreateUserService }
