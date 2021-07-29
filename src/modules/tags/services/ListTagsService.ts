import { inject, injectable } from 'tsyringe'
import { Tag } from '../infra/typeorm/entities/Tag'
import { ITagsRepository } from '../repositories/ITagsRepository'

@injectable()
export class ListTagsService {
  constructor (
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  async execute (): Promise<Tag[]> {
    const tags = await this.tagsRepository.findAllTags()
    return tags
  }
}
