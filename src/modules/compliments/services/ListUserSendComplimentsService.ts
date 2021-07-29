import { inject, injectable } from 'tsyringe'
import { IComplimentsRepository } from '../repositories/IComplimentsRepository'

@injectable()
export class ListUserSendComplimentsService {
  constructor (
    @inject('ComplimentsRepository')
    private complimentsRepository: IComplimentsRepository
  ) {}

  async execute (userId: string) {
    const compliments = await this.complimentsRepository.findComplimentsFromSenderUser(userId)
    return compliments
  }
}
