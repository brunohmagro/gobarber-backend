import 'reflect-metadata'
import 'dotenv/config'

import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import { errors } from 'celebrate'
import 'express-async-errors'

import RateLimter from '@shared/infra/http/middlewares/RateLimiter'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import routes from './routes'

import '@shared/infra/typeorm'
import '@shared/container'

const app = express()
app.use(RateLimter)
app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.uploadFolder))
app.use(routes)

app.use(errors())

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.log(err)
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  }

  return response.status(500).json({
    success: false,
    message: 'Internal server error',
  })
})

app.listen(3335, () => {
  console.log('🚀 Server is started on port 3335!')
})
