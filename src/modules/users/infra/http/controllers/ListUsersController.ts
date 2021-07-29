import { ListUsersService } from '@modules/users/services/ListUsersService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ListUsersController {
  async handle (req: Request, res: Response): Promise<Response> {
    const listUsersService = container.resolve(ListUsersService)
    const users = await listUsersService.execute()
    return res.status(200).json(users)
  }
}
