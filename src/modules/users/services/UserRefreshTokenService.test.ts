import { AppError } from '@shared/errors/AppError'
import { FakeRefreshTokenProvider } from '../providers/RefreshTokenProvider/fakes/FakeRefreshTokenProvider'
import { FakeTokenProvider } from '../providers/TokenProvider/fakes/FakeTokenProvider'
import { FakeRefreshTokenRepository } from '../repositories/fakes/FakeRefreshTokenRepository'
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository'
import { UserRefreshTokenService } from './UserRefreshTokenService'

let userRefreshTokenService: UserRefreshTokenService
let fakeRefreshTokenProvider: FakeRefreshTokenProvider
let fakeUsersRepository: FakeUsersRepository

describe('Refresh Token', () => {
  beforeAll(() => {
    const fakeRefreshTokenRepository = new FakeRefreshTokenRepository()
    const fakeTokenProvider = new FakeTokenProvider()
    fakeUsersRepository = new FakeUsersRepository()
    fakeRefreshTokenProvider = new FakeRefreshTokenProvider(
      fakeRefreshTokenRepository
    )

    userRefreshTokenService = new UserRefreshTokenService(
      fakeRefreshTokenRepository,
      fakeUsersRepository,
      fakeTokenProvider,
      fakeRefreshTokenProvider
    )
  })

  it('Should be able to generate a new token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@gmail.com',
      password: 'password'
    })

    await fakeUsersRepository.save(user)
    const refreshToken = await fakeRefreshTokenProvider.generateToken(user.id)

    const response = await userRefreshTokenService.execute(
      refreshToken.id
    )

    expect(response).toHaveProperty('token')
  })

  it('Should not be able to generate a new token with a non-existent ID', async () => {
    await expect(
      userRefreshTokenService.execute('123456789')
    ).rejects.toBeInstanceOf(AppError)
  })
})
