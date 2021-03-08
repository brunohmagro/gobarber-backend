import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ResetPasswordService from '@mobules/users/services/ResetPasswordService'

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password, confirmPassword } = request.body

    const resetPassword = container.resolve(ResetPasswordService)

    await resetPassword.execute({
      token,
      password,
      confirmPassword,
    })

    return response.status(204).json()
  }
}
