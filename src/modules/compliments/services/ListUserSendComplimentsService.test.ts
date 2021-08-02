import { FakeComplimentsRepository } from '../repositories/fakes/FakeComplimentsRepository'
import { ListUserSendComplimentsService } from './ListUserSendComplimentsService'
import { FakeTagsRepository } from '@modules/tags/repositories/fakes/FakeTagsRepository'
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository'
import { CreateComplimentService } from './CreateComplimentService'

let fakeComplimentsRepository: FakeComplimentsRepository
let fakeUsersRepository: FakeUsersRepository
let fakeTagsRepository: FakeTagsRepository
let listUserSendComplimentsService: ListUserSendComplimentsService
let createComplimentService: CreateComplimentService

describe('List of compliments the user sent', () => {
  beforeAll(() => {
    fakeComplimentsRepository = new FakeComplimentsRepository()
    fakeUsersRepository = new FakeUsersRepository()
    fakeTagsRepository = new FakeTagsRepository()

    createComplimentService = new CreateComplimentService(
      fakeUsersRepository,
      fakeComplimentsRepository,
      fakeTagsRepository
    )

    listUserSendComplimentsService = new ListUserSendComplimentsService(
      fakeComplimentsRepository
    )
  })

  it('Should be able to list all compliments sent', async () => {
    const userSender = await fakeUsersRepository.create({
      name: 'User Sender',
      email: 'usersender@gmail.com',
      password: 'password'
    })

    const userReceiver = await fakeUsersRepository.create({
      name: 'User Receiver',
      email: 'userreceiver@gmail.com',
      password: 'password'
    })

    const tag = await fakeTagsRepository.create({ name: 'Proactive' })

    await fakeUsersRepository.save(userSender)
    await fakeUsersRepository.save(userReceiver)
    await fakeTagsRepository.save(tag)

    await createComplimentService.execute({
      userSenderId: userSender.id,
      userReceiverId: userReceiver.id,
      tagId: tag.id,
      message: 'Thank you for your help!'
    })

    const response = await listUserSendComplimentsService.execute(userSender.id)

    expect(response.length).toBe(1)
    expect(response[0]).toHaveProperty('id')
  })
})
