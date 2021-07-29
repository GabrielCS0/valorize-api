import { ensureAuthenticate } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { CreateTagController } from '../controllers/CreateTagController'
import { ListTagsController } from '../controllers/ListTagsController'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const tagsRouter = Router()

const createTagController = new CreateTagController()
const listTagsController = new ListTagsController()

tagsRouter.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required()
  })
}), ensureAuthenticate, ensureAdmin, createTagController.handle)

tagsRouter.get('/', ensureAuthenticate, listTagsController.handle)

export { tagsRouter }
