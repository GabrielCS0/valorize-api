import { container } from 'tsyringe'

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'

import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository'
import { TagsRepository } from '@modules/tags/infra/typeorm/repositories/TagsRepository'

import { IComplimentsRepository } from '@modules/compliments/repositories/IComplimentsRepository'
import { ComplimentsRepository } from '@modules/compliments/infra/typeorm/repositories/ComplimentsRepository'

import { IRefreshTokenRepository } from '@modules/users/repositories/IRefreshTokenRepository'
import { RefreshTokenRepository } from '@modules/users/infra/typeorm/repositories/RefreshTokenRepository'

import { IRefreshTokenProvider } from '@modules/users/providers/RefreshTokenProvider/models/IRefreshTokenProvider'
import { RefreshTokenProvider } from '@modules/users/providers/RefreshTokenProvider/implementations/RefreshTokenProvider'

import { ITokenProvider } from '@modules/users/providers/TokenProvider/models/ITokenProvider'
import { TokenProvider } from '@modules/users/providers/TokenProvider/implementations/TokenProvider'

import { IHashPasswordProvider } from '@modules/users/providers/HashPasswordProvider/models/IHashPasswordProvider'
import { HashPasswordProvider } from '@modules/users/providers/HashPasswordProvider/implementations/HashPasswordProvider'

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

container.registerSingleton<IRefreshTokenRepository>(
  'RefreshTokenRepository',
  RefreshTokenRepository
)

container.registerSingleton<IRefreshTokenProvider>(
  'RefreshTokenProvider',
  RefreshTokenProvider
)

container.registerSingleton<ITokenProvider>(
  'TokenProvider',
  TokenProvider
)

container.registerSingleton<IHashPasswordProvider>(
  'HashPasswordProvider',
  HashPasswordProvider
)
