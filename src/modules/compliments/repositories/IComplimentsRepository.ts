import { ICreateComplimentDTO } from '../dtos/ICreateComplimentDTO'
import { Compliment } from '../infra/typeorm/entities/Compliment'

export interface IComplimentsRepository {
  findComplimentsFromReceiveUser(userId: string): Promise<Compliment[] | undefined>
  findComplimentsFromSenderUser(userId: string): Promise<Compliment[] | undefined>
  create(data: ICreateComplimentDTO): Promise<Compliment>
  save(compliment: Compliment): Promise<void>
}
