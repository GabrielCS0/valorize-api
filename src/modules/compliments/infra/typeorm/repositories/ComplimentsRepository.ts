import { ICreateComplimentDTO } from '@modules/compliments/dtos/ICreateComplimentDTO'
import { IComplimentsRepository } from '@modules/compliments/repositories/IComplimentsRepository'
import { getRepository, Repository } from 'typeorm'
import { Compliment } from '../entities/Compliment'

export class ComplimentsRepository implements IComplimentsRepository {
  public async create ({
    userSenderId,
    userReceiverId,
    tagId,
    message
  }: ICreateComplimentDTO): Promise<Compliment> {
    const ormComplimentRepository: Repository<Compliment> = getRepository(Compliment)
    const compliment = ormComplimentRepository.create({
      userSenderId,
      userReceiverId,
      tagId,
      message
    })

    return compliment
  }

  public async save (compliment: Compliment): Promise<void> {
    const ormComplimentRepository: Repository<Compliment> = getRepository(Compliment)
    await ormComplimentRepository.save(compliment)
  }
}
