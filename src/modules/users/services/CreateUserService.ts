import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../infra/typeorm/entities/User'
import { IHashPasswordProvider } from '../providers/HashPasswordProvider/models/IHashPasswordProvider'
import { IUsersRepository } from '../repositories/IUsersRepository'

@injectable()
class CreateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashPasswordProvider')
    private hashPasswordProvider: IHashPasswordProvider
  ) {}

  async execute ({ name, email, password, admin = false }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const hashedPassword = await this.hashPasswordProvider
      .generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      admin
    })

    await this.usersRepository.save(user)

    return user
  }
}

export { CreateUserService }
