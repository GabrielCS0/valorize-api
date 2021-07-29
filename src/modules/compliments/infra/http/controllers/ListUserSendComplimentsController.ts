import { ListUserSendComplimentsService } from '@modules/compliments/services/ListUserSendComplimentsService'
import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ListUserSendComplimentsController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { userId } = req

    const listUserSendComplimentsService = container.resolve(
      ListUserSendComplimentsService
    )

    const compliments = await listUserSendComplimentsService.execute(userId)

    return res.status(200).json(classToClass(compliments))
  }
}
