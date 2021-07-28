import { complimentsRouter } from '@modules/compliments/infra/http/routes/compliments.routes'
import { tagsRouter } from '@modules/tags/infra/http/routes/tags.routes'
import { usersRouter } from '@modules/users/infra/http/routes/users.routes'
import { Router } from 'express'

const router = Router()

router.use('/users', usersRouter)
router.use('/tags', tagsRouter)
router.use('/compliments', complimentsRouter)

export { router }
