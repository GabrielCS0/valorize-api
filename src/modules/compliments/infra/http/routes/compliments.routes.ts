import { ensureAuthenticate } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
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

complimentsRouter.post('/', ensureAuthenticate, createComplimentController.handle)
complimentsRouter.get('/user/receive', ensureAuthenticate, listUserReceiveComplimentsController.handle)
complimentsRouter.get('/user/send', ensureAuthenticate, listUserSendComplimentsController.handle)

export { complimentsRouter }
