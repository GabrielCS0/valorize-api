import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { IUsersRepository } from '../IUsersRepository'

export class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  public async findByEmail (email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email)
    return user
  }

  public async findById (id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id)
    return user
  }

  public async findAllUsers (): Promise<User[] | undefined> {
    return this.users
  }

  public async create ({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { name, email, password })

    return user
  }

  public async save (user: User): Promise<void> {
    this.users.push(user)
  }
}
