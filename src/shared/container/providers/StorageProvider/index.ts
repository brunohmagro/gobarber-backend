import { container } from 'tsyringe'

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider'

const storages = {
  disk: DiskStorageProvider,
}

container.registerSingleton<IStorageProvider>('StorageProvider', storages.disk)
