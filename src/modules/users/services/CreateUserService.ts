import { inject, injectable } from 'tsyringe'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../infra/typeorm/entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'

@injectable()
export class CreateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute ({ name, email, admin }: ICreateUserDTO): Promise<User> {
    if (!email) {
      throw new Error('Email incorrect')
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const user = await this.usersRepository.create({
      name,
      email,
      admin
    })

    await this.usersRepository.save(user)

    return user
  }
}
