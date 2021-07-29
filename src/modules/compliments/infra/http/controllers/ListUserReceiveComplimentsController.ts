import { ListUserReceiveComplimentsService } from '@modules/compliments/services/ListUserReceiveComplimentsService'
import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ListUserReceiveComplimentsController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { userId } = req

    const listUserReceiveComplimentsService = container.resolve(
      ListUserReceiveComplimentsService
    )

    const compliments = await listUserReceiveComplimentsService.execute(userId)

    return res.status(200).json(classToClass(compliments))
  }
}
