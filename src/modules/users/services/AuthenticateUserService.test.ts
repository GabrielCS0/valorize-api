import { AppError } from '@shared/errors/AppError'
import { FakeHashPasswordProvider } from '../providers/HashPasswordProvider/fakes/FakeHashPasswordProvider'
import { FakeRefreshTokenProvider } from '../providers/RefreshTokenProvider/fakes/FakeRefreshTokenProvider'
import { FakeTokenProvider } from '../providers/TokenProvider/fakes/FakeTokenProvider'
import { FakeRefreshTokenRepository } from '../repositories/fakes/FakeRefreshTokenRepository'
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository'
import { AuthenticateUserService } from './AuthenticateUserService'

let fakeUsersRepository: FakeUsersRepository
let authenticateUserService: AuthenticateUserService

describe('Authenticate User', () => {
  beforeAll(() => {
    fakeUsersRepository = new FakeUsersRepository()
    const fakeRefreshTokenRepository = new FakeRefreshTokenRepository()
    const fakeRefreshTokenProvider = new FakeRefreshTokenProvider(
      fakeRefreshTokenRepository
    )
    const fakeTokenProvider = new FakeTokenProvider()
    const fakeHashPasswordProvider = new FakeHashPasswordProvider()

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeRefreshTokenRepository,
      fakeRefreshTokenProvider,
      fakeTokenProvider,
      fakeHashPasswordProvider
    )
  })

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test Name',
      email: 'test@gmail.com',
      password: 'secret'
    })
    await fakeUsersRepository.save(user)

    const response = await authenticateUserService.execute({
      email: 'test@gmail.com',
      password: 'secret'
    })

    expect(response).toHaveProperty('token')
    expect(response).toHaveProperty('refreshToken')
  })

  it('Should not be able to authenticate with a non-existent user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'fakeuser@gmail.com',
        password: 'secret'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'test@gmail.com',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
