import 'reflect-metadata'
import cors from 'cors'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import routes from './routes'
import uploadConfig from './config/upload'
import AppError from './errors/AppError'

import './database'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.diretory))
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
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
