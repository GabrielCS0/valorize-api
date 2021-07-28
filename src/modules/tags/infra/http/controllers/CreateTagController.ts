import { CreateTagService } from '@modules/tags/services/CreateTagService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateTagController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { name } = req.body

    const createTagService = container.resolve(CreateTagService)

    const tag = await createTagService.execute({ name })

    return res.status(201).json(tag)
  }
}
