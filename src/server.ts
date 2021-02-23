import 'reflect-metadata'

import express from 'express'
import routes from './routes'
import uploadConfig from './config/upload'

import './database'

const app = express()
app.use(express.json())
app.use('/files', express.static(uploadConfig.diretory))
app.use(routes)

app.listen(3335, () => {
  console.log('🚀 Server is started on port 3335!')
})
