import { Router } from 'express'

import ProvidersController from '@mobules/appointments/infra/http/controllers/ProvidersController'
import ProviderMonthAvailabilityController from '@mobules/appointments/infra/http/controllers/ProviderMonthAvailabilityController'
import ProviderDayAvailabilityController from '@mobules/appointments/infra/http/controllers/ProviderDayAvailabilityController'
import ensureAuthenticated from '@mobules/users/infra/http/middlewares/ensureAuthenticated'

const providersRouter = Router()
providersRouter.use(ensureAuthenticated)

const providersController = new ProvidersController()
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController()
const providerDayAvailabilityController = new ProviderDayAvailabilityController()

providersRouter.post('/', providersController.index)
providersRouter.get('/:provider_id/disponibilidade-mes', providerMonthAvailabilityController.index)
providersRouter.get('/:provider_id/disponibilidade-dia', providerDayAvailabilityController.index)

export default providersRouter
