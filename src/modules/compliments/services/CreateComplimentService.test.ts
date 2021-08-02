import { FakeTagsRepository } from '@modules/tags/repositories/fakes/FakeTagsRepository'
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { FakeComplimentsRepository } from '../repositories/fakes/FakeComplimentsRepository'
import { CreateComplimentService } from './CreateComplimentService'

let fakeUsersRepository: FakeUsersRepository
let fakeComplimentsRepository: FakeComplimentsRepository
let fakeTagsRepository: FakeTagsRepository
let createComplimentService: CreateComplimentService

describe('Create Compliment', () => {
  beforeAll(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeComplimentsRepository = new FakeComplimentsRepository()
    fakeTagsRepository = new FakeTagsRepository()

    createComplimentService = new CreateComplimentService(
      fakeUsersRepository,
      fakeComplimentsRepository,
      fakeTagsRepository
    )
  })

  it('Should be able to create a compliment', async () => {
    const userReceiver = await fakeUsersRepository.create({
      name: 'User Receiver',
      email: 'userreceiver@gmail.com',
      password: 'password'
    })

    const tag = await fakeTagsRepository.create({ name: 'Optimistic' })

    await fakeUsersRepository.save(userReceiver)
    await fakeTagsRepository.save(tag)

    const response = await createComplimentService.execute({
      userSenderId: '123456',
      userReceiverId: userReceiver.id,
      tagId: tag.id,
      message: 'Thank you for your help!'
    })

    expect(response).toHaveProperty('id')
  })

  it('An user should not be able to create a compliment for itself', async () => {
    await expect(
      createComplimentService.execute({
        userSenderId: '123abc',
        userReceiverId: '123abc',
        tagId: '123456',
        message: 'Thank you for your help!'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a compliment for a nonexistent user receiver', async () => {
    await expect(
      createComplimentService.execute({
        userSenderId: '123456',
        userReceiverId: '123abc',
        tagId: '123456',
        message: 'Thank you for your help!'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a compliment without a tag', async () => {
    const userReceiver = await fakeUsersRepository.create({
      name: 'User Receiver',
      email: 'userreceiver2@gmail.com',
      password: 'password'
    })
    await fakeUsersRepository.save(userReceiver)

    await expect(
      createComplimentService.execute({
        userSenderId: '123456',
        userReceiverId: userReceiver.id,
        tagId: '123456',
        message: 'Thank you for your help!'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
