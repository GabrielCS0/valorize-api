import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { Tag } from '../infra/typeorm/entities/Tag'
import { ITagsRepository } from '../repositories/ITagsRepository'
import { ICreateTagDTO } from '@modules/tags/dtos/ICreateTagDTO'

@injectable()
export class CreateTagService {
  constructor (
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  async execute ({ name }: ICreateTagDTO): Promise<Tag> {
    const tagAlreadyExists = await this.tagsRepository.findByName(name)

    if (tagAlreadyExists) throw new AppError('Tag already exists')

    const tag = await this.tagsRepository.create({ name })

    await this.tagsRepository.save(tag)

    return tag
  }
}
