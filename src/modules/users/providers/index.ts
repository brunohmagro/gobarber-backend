import { container } from 'tsyringe'

import IHashProvioder from '@mobules/users/providers/HashProvider/models/IHashProvioder'
import BCryptProvider from '@mobules/users/providers/HashProvider/implementations/BCryptHashProvider'

container.registerSingleton<IHashProvioder>('BCryptProvider', BCryptProvider)
