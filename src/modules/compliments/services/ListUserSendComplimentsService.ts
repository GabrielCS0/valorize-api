import { inject, injectable } from 'tsyringe'
import { Compliment } from '../infra/typeorm/entities/Compliment'
import { IComplimentsRepository } from '../repositories/IComplimentsRepository'

@injectable()
export class ListUserSendComplimentsService {
  constructor (
    @inject('ComplimentsRepository')
    private complimentsRepository: IComplimentsRepository
  ) {}

  async execute (userId: string): Promise<Compliment[]> {
    const compliments = await this.complimentsRepository.findComplimentsFromSenderUser(userId)
    return compliments
  }
}
