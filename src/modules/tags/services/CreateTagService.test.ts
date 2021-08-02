import { AppError } from '@shared/errors/AppError'
import { FakeTagsRepository } from '../repositories/fakes/FakeTagsRepository'
import { CreateTagService } from './CreateTagService'

let createTagService: CreateTagService

describe('Create Tag', () => {
  beforeAll(() => {
    const fakeTagsRepository = new FakeTagsRepository()
    createTagService = new CreateTagService(
      fakeTagsRepository
    )
  })

  it('Should be able to create a new tag', async () => {
    const response = await createTagService.execute({
      name: 'Optimistic'
    })

    expect(response).toHaveProperty('id')
  })

  it('Should not be able to create a tag with an existing name', async () => {
    await expect(
      createTagService.execute({
        name: 'Optimistic'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
