import { Router } from 'express'
import { AuthenticateUserController } from '../controllers/AuthenticateUserController'
import { CreateUserController } from '../controllers/CreateUserController'

const usersRouter = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

usersRouter.post('/', createUserController.handle)
usersRouter.post('/login', authenticateUserController.handle)

export { usersRouter }
