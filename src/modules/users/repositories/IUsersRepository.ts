import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../infra/typeorm/entities/User'

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<User | undefined>
  findAllUsers(): Promise<User[] | undefined>
  create(data: ICreateUserDTO): Promise<User>
  save(user: User): Promise<void>
}
