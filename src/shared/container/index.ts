import { container } from 'tsyringe'

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'

import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository'
import { TagsRepository } from '@modules/tags/infra/typeorm/repositories/TagsRepository'

import { IComplimentsRepository } from '@modules/compliments/repositories/IComplimentsRepository'
import { ComplimentsRepository } from '@modules/compliments/infra/typeorm/repositories/ComplimentsRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<ITagsRepository>(
  'TagsRepository',
  TagsRepository
)

container.registerSingleton<IComplimentsRepository>(
  'ComplimentsRepository',
  ComplimentsRepository
)
