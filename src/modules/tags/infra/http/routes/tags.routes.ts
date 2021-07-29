import { ensureAuthenticate } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { Router } from 'express'
import { CreateTagController } from '../controllers/CreateTagController'
import { ListTagsController } from '../controllers/ListTagsController'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const tagsRouter = Router()

const createTagController = new CreateTagController()
const listTagsController = new ListTagsController()

tagsRouter.post('/', ensureAuthenticate, ensureAdmin, createTagController.handle)
tagsRouter.get('/', ensureAuthenticate, listTagsController.handle)

export { tagsRouter }
