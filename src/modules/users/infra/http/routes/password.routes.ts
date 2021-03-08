import { Router } from 'express'

import ForgotPasswordController from '@mobules/users/infra/http/controllers/ForgotPasswordController'
import ResetPasswordController from '@mobules/users/infra/http/controllers/ResetPasswordController'

const passwordRouter = Router()
const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

passwordRouter.post('/forgot', forgotPasswordController.create)
passwordRouter.post('/reset', resetPasswordController.create)

export default passwordRouter
