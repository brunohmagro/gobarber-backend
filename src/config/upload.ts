import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const pathUpload = path.resolve(__dirname, '..', '..', 'tmp')

export default {
  diretory: pathUpload,
  storage: multer.diskStorage({
    destination: pathUpload,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
}