import { ICreateTagDTO } from '@modules/tags/dtos/ICreateTagDTO'
import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository'
import { getRepository, Repository } from 'typeorm'
import { Tag } from '../entities/Tag'

export class TagsRepository implements ITagsRepository {
  private ormTagsRepository: Repository<Tag>

  constructor () {
    this.ormTagsRepository = getRepository(Tag)
  }

  public async findByName (name: string): Promise<Tag | undefined> {
    const tag = await this.ormTagsRepository.findOne({ name })
    return tag
  }

  public async findById (id: string): Promise<Tag | undefined> {
    const tag = await this.ormTagsRepository.findOne(id)
    return tag
  }

  public async findAllTags (): Promise<Tag[] | undefined> {
    const tags = await this.ormTagsRepository.find()
    return tags
  }

  public async create ({ name }: ICreateTagDTO): Promise<Tag> {
    const tag = this.ormTagsRepository.create({ name })
    return tag
  }

  public async save (tag: Tag): Promise<void> {
    await this.ormTagsRepository.save(tag)
  }
}
