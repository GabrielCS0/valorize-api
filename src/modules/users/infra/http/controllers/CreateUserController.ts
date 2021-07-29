import { CreateUserService } from '@modules/users/services/CreateUserService'
import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateUserController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { name, email, admin, password } = req.body

    const createUserService = container.resolve(CreateUserService)

    const user = await createUserService.execute({ name, email, password, admin })

    return res.status(201).json(classToClass(user))
  }
}
