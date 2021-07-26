import { CreateUserService } from '@modules/users/services/CreateUserService'
import { Request, Response } from 'express'
import { autoInjectable } from 'tsyringe'

@autoInjectable()
export class CreateUserController {
  constructor (
    private createUserService: CreateUserService
  ) {}

  async handle (req: Request, res: Response): Promise<Response> {
    const { name, email, admin } = req.body

    try {
      const user = await this.createUserService.execute({ name, email, admin })
      return res.status(201).json(user)
    } catch (err) {
      return res.status(400).json({
        Error: err.message || 'Unexpected error.'
      })
    }
  }
}
