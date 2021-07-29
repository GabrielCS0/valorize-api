import { Router } from 'express'
import { AuthenticateUserController } from '../controllers/AuthenticateUserController'
import { CreateUserController } from '../controllers/CreateUserController'
import { ListUsersController } from '../controllers/ListUsersController'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticated'

const usersRouter = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const listUsersController = new ListUsersController()

usersRouter.post('/', createUserController.handle)
usersRouter.post('/login', authenticateUserController.handle)
usersRouter.get('/', ensureAuthenticate, listUsersController.handle)

export { usersRouter }
