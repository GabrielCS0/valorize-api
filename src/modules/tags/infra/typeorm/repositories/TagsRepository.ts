import { ICreateTagDTO } from '@modules/tags/dtos/ICreateTagDTO'
import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository'
import { getRepository, Repository } from 'typeorm'
import { Tag } from '../entities/Tag'

export class TagsRepository implements ITagsRepository {
  public async findByName (name: string): Promise<Tag | undefined> {
    const ormTagsRepository: Repository<Tag> = getRepository(Tag)
    const tag = await ormTagsRepository.findOne({ name })
    return tag
  }

  public async findById (id: string): Promise<Tag | undefined> {
    const ormTagsRepository: Repository<Tag> = getRepository(Tag)
    const tag = await ormTagsRepository.findOne(id)
    return tag
  }

  public async create ({ name }: ICreateTagDTO): Promise<Tag> {
    const ormTagsRepository: Repository<Tag> = getRepository(Tag)
    const tag = ormTagsRepository.create({ name })

    return tag
  }

  public async save (tag: Tag): Promise<void> {
    const ormTagsRepository: Repository<Tag> = getRepository(Tag)
    await ormTagsRepository.save(tag)
  }
}
