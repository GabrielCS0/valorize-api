import { inject, injectable } from 'tsyringe'
import { User } from '../infra/typeorm/entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'

@injectable()
export class ListUsersService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute (): Promise<User[]> {
    const users = await this.usersRepository.findAllUsers()
    return users
  }
}
