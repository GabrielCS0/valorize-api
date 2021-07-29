import { inject, injectable } from 'tsyringe'
import { IComplimentsRepository } from '../repositories/IComplimentsRepository'

@injectable()
export class ListUserReceiveComplimentsService {
  constructor (
    @inject('ComplimentsRepository')
    private complimentsRepository: IComplimentsRepository
  ) {}

  async execute (userId: string) {
    const compliments = await this.complimentsRepository.findComplimentsFromReceiveUser(userId)
    return compliments
  }
}
