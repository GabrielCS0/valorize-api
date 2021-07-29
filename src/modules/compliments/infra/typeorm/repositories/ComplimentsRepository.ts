import { ICreateComplimentDTO } from '@modules/compliments/dtos/ICreateComplimentDTO'
import { IComplimentsRepository } from '@modules/compliments/repositories/IComplimentsRepository'
import { getRepository, Repository } from 'typeorm'
import { Compliment } from '../entities/Compliment'

export class ComplimentsRepository implements IComplimentsRepository {
  private ormComplimentsRepository: Repository<Compliment>

  constructor () {
    this.ormComplimentsRepository = getRepository(Compliment)
  }

  public async findComplimentsFromReceiveUser (userId: string): Promise<Compliment[] | undefined> {
    const compliments = await this.ormComplimentsRepository.find({
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
    const compliments = await this.ormComplimentsRepository.find({
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
    const compliment = this.ormComplimentsRepository.create({
      userSenderId,
      userReceiverId,
      tagId,
      message
    })

    return compliment
  }

  public async save (compliment: Compliment): Promise<void> {
    await this.ormComplimentsRepository.save(compliment)
  }
}
