import handlebars from 'handlebars'
import fs from 'fs'

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'
import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO'

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file, variables }: IParseMailTemplateDTO): Promise<string> {
    const tempateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    })
    const parseTemplate = handlebars.compile(tempateFileContent)

    return parseTemplate(variables)
  }
}

export default HandlebarsMailTemplateProvider
