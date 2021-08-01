import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { AuthenticateUserController } from '../controllers/AuthenticateUserController'
import { CreateUserController } from '../controllers/CreateUserController'
import { ListUsersController } from '../controllers/ListUsersController'
import { UserRefreshTokenController } from '../controllers/UserRefreshTokenController'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticated'

const usersRouter = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const listUsersController = new ListUsersController()
const userRefreshTokenController = new UserRefreshTokenController()

usersRouter.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    admin: Joi.boolean().default(false)
  })
}), createUserController.handle)

usersRouter.post('/login', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}), authenticateUserController.handle)

usersRouter.get('/', ensureAuthenticate, listUsersController.handle)

usersRouter.post('/refresh-token', celebrate({
  [Segments.BODY]: Joi.object().keys({
    refreshTokenId: Joi.string().uuid().required()
  })
}), userRefreshTokenController.handle)

export { usersRouter }
