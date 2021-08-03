import 'reflect-metadata'
import '../database'
import '@shared/container'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import { router } from './routes'
import { AppError } from '@shared/errors/AppError'
import { errors } from 'celebrate'
import { rateLimiter } from './middlewares/rateLimiter'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '../../../swagger.json'

const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(rateLimiter)
app.use(router)

app.use(errors())
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.error(err)

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})

app.listen(5000, () => console.log('Server is running'))
