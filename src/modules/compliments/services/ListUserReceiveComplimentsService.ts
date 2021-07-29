import { inject, injectable } from 'tsyringe'
import { Compliment } from '../infra/typeorm/entities/Compliment'
import { IComplimentsRepository } from '../repositories/IComplimentsRepository'

@injectable()
export class ListUserReceiveComplimentsService {
  constructor (
    @inject('ComplimentsRepository')
    private complimentsRepository: IComplimentsRepository
  ) {}

  async execute (userId: string): Promise<Compliment[]> {
    const compliments = await this.complimentsRepository.findComplimentsFromReceiveUser(userId)
    return compliments
  }
}
