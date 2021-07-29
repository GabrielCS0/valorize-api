import { ensureAuthenticate } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { CreateComplimentController } from '../controllers/CreateComplimentController'
import { ListUserReceiveComplimentsController } from '../controllers/ListUserReceiveComplimentsController'
import { ListUserSendComplimentsController } from '../controllers/ListUserSendComplimentsController'

const complimentsRouter = Router()

const createComplimentController = new CreateComplimentController()
const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController()
const listUserSendComplimentsController =
  new ListUserSendComplimentsController()

complimentsRouter.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    userReceiverId: Joi.string().uuid().required(),
    tagId: Joi.string().uuid().required(),
    message: Joi.string().required()
  })
}), ensureAuthenticate, createComplimentController.handle)

complimentsRouter.get('/user/receive', ensureAuthenticate, listUserReceiveComplimentsController.handle)
complimentsRouter.get('/user/send', ensureAuthenticate, listUserSendComplimentsController.handle)

export { complimentsRouter }
