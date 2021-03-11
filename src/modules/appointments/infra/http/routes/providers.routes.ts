import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

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
providersRouter.get(
  '/:provider_id/disponibilidade-mes',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityController.index,
)
providersRouter.get(
  '/:provider_id/disponibilidade-dia',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityController.index,
)

export default providersRouter
