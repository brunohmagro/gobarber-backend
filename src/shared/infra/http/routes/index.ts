import { Router } from 'express'

import appointmentsRouter from '@mobules/appointments/infra/http/routes/appointments.routes'
import usersRouter from '@mobules/users/infra/http/routes/users.routes'
import sessionsRoute from '@mobules/users/infra/http/routes/sessions.routes'
import passwordRoute from '@mobules/users/infra/http/routes/password.routes'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRoute)
routes.use('/password', passwordRoute)

export default routes
