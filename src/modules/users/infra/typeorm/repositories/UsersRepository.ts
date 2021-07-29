import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { getRepository, Repository } from 'typeorm'
import { User } from '../entities/User'

export class UsersRepository implements IUsersRepository {
  public async findByEmail (email: string): Promise<User | undefined> {
    const ormUsersRepository: Repository<User> = getRepository(User)
    const user = await ormUsersRepository.findOne({ email })
    return user
  }

  public async findById (id: string): Promise<User | undefined> {
    const ormUsersRepository: Repository<User> = getRepository(User)
    const user = await ormUsersRepository.findOne(id)
    return user
  }

  public async findAllUsers (): Promise<User[] | undefined> {
    const ormUsersRepository: Repository<User> = getRepository(User)
    const users = await ormUsersRepository.find()

    users.forEach((user) => {
      delete user.password
    })

    return users
  }

  public async create ({ name, email, password, admin }: ICreateUserDTO): Promise<User> {
    const ormUsersRepository: Repository<User> = getRepository(User)
    const user = ormUsersRepository.create({
      name,
      email,
      password,
      admin
    })

    return user
  }

  public async save (user: User): Promise<void> {
    const ormUsersRepository: Repository<User> = getRepository(User)
    await ormUsersRepository.save(user)
  }
}
