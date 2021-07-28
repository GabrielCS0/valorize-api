import { ICreateTagDTO } from '../dtos/ICreateTagDTO'
import { Tag } from '../infra/typeorm/entities/Tag'

export interface ITagsRepository {
  findByName(name: string): Promise<Tag | undefined>
  findById(id: string): Promise<Tag | undefined>
  create(data: ICreateTagDTO): Promise<Tag>
  save(tag: Tag): Promise<void>
}
