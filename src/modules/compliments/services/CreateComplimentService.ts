import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateComplimentDTO } from '../dtos/ICreateComplimentDTO'
import { Compliment } from '../infra/typeorm/entities/Compliment'
import { IComplimentsRepository } from '../repositories/IComplimentsRepository'

@injectable()
export class CreateComplimentService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ComplimentsRepository')
    private complimentsRepository: IComplimentsRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  async execute ({
    userSenderId,
    userReceiverId,
    tagId,
    message
  }: ICreateComplimentDTO): Promise<Compliment> {
    if (userSenderId === userReceiverId) throw new AppError('Invalid receiver user')

    const userReceiverExists = await this.usersRepository.findById(userReceiverId)

    if (!userReceiverExists) throw new AppError('User receiver does not exists')

    const tagExists = await this.tagsRepository.findById(tagId)

    if (!tagExists) throw new AppError('Tag does not exists')

    const compliment = await this.complimentsRepository.create({
      userSenderId,
      userReceiverId,
      tagId,
      message
    })

    await this.complimentsRepository.save(compliment)

    return compliment
  }
}
