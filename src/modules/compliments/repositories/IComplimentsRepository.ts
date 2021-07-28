import { ICreateComplimentDTO } from '../dtos/ICreateComplimentDTO'
import { Compliment } from '../infra/typeorm/entities/Compliment'

export interface IComplimentsRepository {
  create(data: ICreateComplimentDTO): Promise<Compliment>
  save(compliment: Compliment): Promise<void>
}
