import { ICreateTagDTO } from '@modules/tags/dtos/ICreateTagDTO'
import { Tag } from '@modules/tags/infra/typeorm/entities/Tag'
import { ITagsRepository } from '../ITagsRepository'

export class FakeTagsRepository implements ITagsRepository {
  private tags: Tag[] = []

  public async findByName (name: string): Promise<Tag | undefined> {
    const tag = this.tags.find(tag => tag.name === name)
    return tag
  }

  public async findById (id: string): Promise<Tag | undefined> {
    const tag = this.tags.find(tag => tag.id === id)
    return tag
  }

  public async findAllTags (): Promise<Tag[] | undefined> {
    return this.tags
  }

  public async create ({ name }: ICreateTagDTO): Promise<Tag> {
    const tag = new Tag()

    Object.assign(tag, { name })

    return tag
  }

  public async save (tag: Tag): Promise<void> {
    this.tags.push(tag)
  }
}
