import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class AuthenticateUserController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const authenticateUserService = container.resolve(AuthenticateUserService)

    const token = await authenticateUserService.execute({ email, password })

    return res.status(200).json(token)
  }
}
