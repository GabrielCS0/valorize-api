import { AppError } from '@shared/errors/AppError'
import { FakeHashPasswordProvider } from '../providers/HashPasswordProvider/fakes/FakeHashPasswordProvider'
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository'
import { CreateUserService } from './CreateUserService'

let createUserService: CreateUserService

describe('Create User', () => {
  beforeAll(() => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashPasswordProvider = new FakeHashPasswordProvider()

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashPasswordProvider
    )
  })

  it('Should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Test Name',
      email: 'test@gmail.com',
      password: 'secret'
    })

    expect(user).toHaveProperty('id')
  })

  it('Should not be able to create a user with an exists email', async () => {
    await expect(
      createUserService.execute({
        name: 'Test Name',
        email: 'test@gmail.com',
        password: 'secret'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
