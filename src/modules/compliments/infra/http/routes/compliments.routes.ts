import { ensureAuthenticate } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { Router } from 'express'
import { CreateComplimentController } from '../controllers/CreateComplimentController'

const complimentsRouter = Router()

const createComplimentController = new CreateComplimentController()

complimentsRouter.post('/', ensureAuthenticate, createComplimentController.handle)

export { complimentsRouter }
