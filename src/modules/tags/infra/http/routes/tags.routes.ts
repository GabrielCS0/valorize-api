import { ensureAuthenticate } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { Router } from 'express'
import { CreateTagController } from '../controllers/CreateTagController'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const tagsRouter = Router()

const createTagController = new CreateTagController()

tagsRouter.post('/', ensureAuthenticate, ensureAdmin, createTagController.handle)

export { tagsRouter }
