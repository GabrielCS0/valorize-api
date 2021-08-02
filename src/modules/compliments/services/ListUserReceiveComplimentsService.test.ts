import { FakeTagsRepository } from '@modules/tags/repositories/fakes/FakeTagsRepository'
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository'
import { FakeComplimentsRepository } from '../repositories/fakes/FakeComplimentsRepository'
import { CreateComplimentService } from './CreateComplimentService'
import { ListUserReceiveComplimentsService } from './ListUserReceiveComplimentsService'

let fakeComplimentsRepository: FakeComplimentsRepository
let fakeTagsRepository: FakeTagsRepository
let fakeUsersRepository: FakeUsersRepository

let createComplimentService: CreateComplimentService
let listUserReceiveComplimentsService: ListUserReceiveComplimentsService

describe('List User Receiver Compliments', () => {
  beforeAll(() => {
    fakeComplimentsRepository = new FakeComplimentsRepository()
    fakeTagsRepository = new FakeTagsRepository()
    fakeUsersRepository = new FakeUsersRepository()

    createComplimentService = new CreateComplimentService(
      fakeUsersRepository,
      fakeComplimentsRepository,
      fakeTagsRepository
    )
    listUserReceiveComplimentsService = new ListUserReceiveComplimentsService(
      fakeComplimentsRepository
    )
  })

  it('Should be able to list all compliments received', async () => {
    const tag = await fakeTagsRepository.create({ name: 'Optimistic' })

    const userReceiver = await fakeUsersRepository.create({
      name: 'User Receiver',
      email: 'userreceiver@gmail.com',
      password: 'password'
    })

    await fakeTagsRepository.save(tag)
    await fakeUsersRepository.save(userReceiver)

    await createComplimentService.execute({
      userSenderId: '123abc',
      userReceiverId: userReceiver.id,
      tagId: tag.id,
      message: 'Thank you for your help!'
    })

    const response = await listUserReceiveComplimentsService.execute(userReceiver.id)

    expect(response.length).toBe(1)
    expect(response[0]).toHaveProperty('id')
  })
})
