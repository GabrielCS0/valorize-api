import { ListTagsService } from '@modules/tags/services/ListTagsService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ListTagsController {
  async handle (req: Request, res: Response): Promise<Response> {
    const listTagsService = container.resolve(ListTagsService)
    const tags = await listTagsService.execute()
    return res.status(200).json(tags)
  }
}
