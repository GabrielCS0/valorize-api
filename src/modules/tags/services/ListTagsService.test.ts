import { FakeTagsRepository } from '../repositories/fakes/FakeTagsRepository'
import { ListTagsService } from './ListTagsService'

let fakeTagsRepository: FakeTagsRepository
let listTagsService: ListTagsService

describe('List Tags', () => {
  beforeAll(() => {
    fakeTagsRepository = new FakeTagsRepository()
    listTagsService = new ListTagsService(
      fakeTagsRepository
    )
  })

  it('Should be able to return all tags', async () => {
    const tag1 = await fakeTagsRepository.create({
      name: 'Optimistic'
    })

    const tag2 = await fakeTagsRepository.create({
      name: 'Proactive'
    })

    await fakeTagsRepository.save(tag1)
    await fakeTagsRepository.save(tag2)

    const response = await listTagsService.execute()

    expect(response.length).toBe(2)
    expect(response[0]).toHaveProperty('id')
  })
})
