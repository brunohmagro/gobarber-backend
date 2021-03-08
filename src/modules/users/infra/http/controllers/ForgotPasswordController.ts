import { Request, Response } from 'express'
import { container } from 'tsyringe'

import SendForgotPasswordService from '@mobules/users/services/SendForgotPasswordService'

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const authenticateUser = container.resolve(SendForgotPasswordService)

    await authenticateUser.execute({
      email,
    })

    return response.status(204).json()
  }
}
