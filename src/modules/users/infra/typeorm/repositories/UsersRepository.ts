import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { getRepository, Repository } from 'typeorm'
import { User } from '../entities/User'

export class UsersRepository implements IUsersRepository {
  private ormUsersRepository: Repository<User>

  constructor () {
    this.ormUsersRepository = getRepository(User)
  }

  public async findByEmail (email: string): Promise<User | undefined> {
    const user = await this.ormUsersRepository.findOne({ email })
    return user
  }

  public async findById (id: string): Promise<User | undefined> {
    const user = await this.ormUsersRepository.findOne(id)
    return user
  }

  public async findAllUsers (): Promise<User[] | undefined> {
    const users = await this.ormUsersRepository.find()
    return users
  }

  public async create ({ name, email, password, admin }: ICreateUserDTO): Promise<User> {
    const user = this.ormUsersRepository.create({
      name,
      email,
      password,
      admin
    })

    return user
  }

  public async save (user: User): Promise<void> {
    await this.ormUsersRepository.save(user)
  }
}
