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
    })

    this.userTokens.push(userToken)

    return userToken
  }
}

export default FakeUserTokensRepository
