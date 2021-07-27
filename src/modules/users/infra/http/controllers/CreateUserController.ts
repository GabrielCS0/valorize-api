import { CreateUserService } from '@modules/users/services/CreateUserService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateUserController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { name, email, admin } = req.body

    const createUserService = container.resolve(CreateUserService)

    const user = await createUserService.execute({ name, email, admin })

    return res.status(201).json(user)
  }
}
