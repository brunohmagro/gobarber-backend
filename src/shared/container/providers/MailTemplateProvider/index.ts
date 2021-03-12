import { container } from 'tsyringe'

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'

import HandlebarsMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider'

const providers = {
  handleBares: HandlebarsMailTemplateProvider,
}

container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', providers.handleBares)
