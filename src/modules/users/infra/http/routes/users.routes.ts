import { Router } from 'express'
import { container } from 'tsyringe'
import { CreateUserController } from '../controllers/CreateUserController'

const usersRouter = Router()

const createUserController = container.resolve(CreateUserController)

usersRouter.post('/', (req, res) => {
  createUserController.handle(req, res)
})

export { usersRouter }
