import IHashProvioder from '@mobules/users/providers/HashProvider/models/IHashProvider'

class FakeHashProvider implements IHashProvioder {
  public async generateHash(payload: string): Promise<string> {
    return payload
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed
  }
}

export default FakeHashProvider
