import { ICreateComplimentDTO } from '@modules/compliments/dtos/ICreateComplimentDTO'
import { Compliment } from '@modules/compliments/infra/typeorm/entities/Compliment'
import { IComplimentsRepository } from '../IComplimentsRepository'

export class FakeComplimentsRepository implements IComplimentsRepository {
  private compliments: Compliment[] = []

  public async findComplimentsFromReceiveUser (
    userId: string
  ): Promise<Compliment[] | undefined> {
    const compliments = this.compliments.filter(compliment => {
      if (compliment.userReceiverId === userId) return compliment
      return undefined
    })

    return compliments
  }

  public async findComplimentsFromSenderUser (
    userId: string
  ): Promise<Compliment[] | undefined> {
    const compliments = this.compliments.filter(compliment => {
      if (compliment.userSenderId === userId) return compliment
      return undefined
    })

    return compliments
  }

  public async create ({
    userSenderId,
    userReceiverId,
    tagId,
    message
  }: ICreateComplimentDTO): Promise<Compliment> {
    const compliment = new Compliment()

    Object.assign(compliment, {
      userSenderId,
      userReceiverId,
      tagId,
      message
    })

    return compliment
  }

  public async save (compliment: Compliment): Promise<void> {
    this.compliments.push(compliment)
  }
}
