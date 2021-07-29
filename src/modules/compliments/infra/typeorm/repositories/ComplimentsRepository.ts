import { ICreateComplimentDTO } from '@modules/compliments/dtos/ICreateComplimentDTO'
import { IComplimentsRepository } from '@modules/compliments/repositories/IComplimentsRepository'
import { getRepository, Repository } from 'typeorm'
import { Compliment } from '../entities/Compliment'

export class ComplimentsRepository implements IComplimentsRepository {
  public async findComplimentsFromReceiveUser (userId: string): Promise<Compliment[] | undefined> {
    const ormComplimentRepository: Repository<Compliment> = getRepository(Compliment)
    const compliments = await ormComplimentRepository.find({
      where: {
        userReceiverId: userId
      },
      relations: ['userSender', 'tag']
    })

    compliments.forEach((compliment) => {
      delete compliment.userSender.password
    })

    return compliments
  }

  public async findComplimentsFromSenderUser (userId: string): Promise<Compliment[] | undefined> {
    const ormComplimentRepository: Repository<Compliment> = getRepository(Compliment)
    const compliments = await ormComplimentRepository.find({
      where: {
        userSenderId: userId
      },
      relations: ['userReceiver', 'tag']
    })

    compliments.forEach((compliment) => {
      delete compliment.userReceiver.password
    })

    return compliments
  }

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
