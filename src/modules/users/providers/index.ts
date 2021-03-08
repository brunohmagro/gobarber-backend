import { container } from 'tsyringe'

import IHashProvioder from '@mobules/users/providers/HashProvider/models/IHashProvider'
import BCryptProvider from '@mobules/users/providers/HashProvider/implementations/BCryptHashProvider'

container.registerSingleton<IHashProvioder>('BCryptProvider', BCryptProvider)
