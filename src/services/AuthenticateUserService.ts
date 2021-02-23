import { compare } from 'bcryptjs'
import { getRepository } from 'typeorm'
import { sign, verify } from 'jsonwebtoken'
import User from '../models/User'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User)

    const user = await userRepository.findOne({ where: { email } })

    if (!user) {
      throw new Error('Incorrect email/password combination')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination')
    }

    const token = sign({}, 'f3dc0474aa5da21c142a0038c8916de3', {
      subject: user.id,
      expiresIn: '1d',
    })

    return {
      user,
      token,
    }
  }
}

export default AuthenticateUserService
