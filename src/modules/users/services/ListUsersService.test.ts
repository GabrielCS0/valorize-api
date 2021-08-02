import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository'
import { ListUsersService } from './ListUsersService'

let fakeUsersRepository: FakeUsersRepository
let listUsersService: ListUsersService

describe('List Users', () => {
  beforeAll(() => {
    fakeUsersRepository = new FakeUsersRepository()
    listUsersService = new ListUsersService(
      fakeUsersRepository
    )
  })

  it('Should be able to return all users', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'User 1',
      email: 'user1@gmail.com',
      password: 'password'
    })

    const user2 = await fakeUsersRepository.create({
      name: 'User 2',
      email: 'user2@gmail.com',
      password: 'password'
    })

    await fakeUsersRepository.save(user1)
    await fakeUsersRepository.save(user2)

    const response = await listUsersService.execute()

    expect(response.length).toBe(2)
    expect(response[0]).toHaveProperty('id')
  })
})
