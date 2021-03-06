import UserToken from '@mobules/users/infra/typeorm/entities/UserToken'

export default interface IUsersTokensRepository {
  generate(user_id: string): Promise<UserToken>
}
