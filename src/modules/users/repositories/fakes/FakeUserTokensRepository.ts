import { v4 as uuid } from 'uuid'

import UserToken from '@mobules/users/infra/typeorm/entities/UserToken'
import IUsersTokensRepository from '@mobules/users/repositories/IUserTokensRepository'

class FakeUserTokensRepository implements IUsersTokensRepository {
  private userTokens: UserToken[] = []

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    })

    this.userTokens.push(userToken)

    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const findUserToken = this.userTokens.find(userToken => userToken.token === token)

    return findUserToken
  }
}

export default FakeUserTokensRepository
