import { hash, compare } from 'bcryptjs'

import IHashProvioder from '@mobules/users/providers/HashProvider/models/IHashProvider'

class BCryptProvider implements IHashProvioder {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8)
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed)
  }
}

export default BCryptProvider
