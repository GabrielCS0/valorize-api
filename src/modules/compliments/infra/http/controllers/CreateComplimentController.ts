import { CreateComplimentService } from '@modules/compliments/services/CreateComplimentService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateComplimentController {
  async handle (req: Request, res: Response): Promise<Response> {
    const {
      userReceiverId,
      tagId,
      message
    } = req.body
    const { userId } = req

    const createComplimentService = container.resolve(CreateComplimentService)

    const compliment = await createComplimentService.execute({
      userSenderId: userId,
      userReceiverId,
      tagId,
      message
    })

    return res.status(201).json(compliment)
  }
}
