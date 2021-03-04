import { Router } from 'express'

import AppointmentsController from '@mobules/appointments/infra/http/controllers/AppointmentsController'
import ensureAuthenticated from '@mobules/users/infra/http/middlewares/ensureAuthenticated'

const appointmentsRouter = Router()
appointmentsRouter.use(ensureAuthenticated)

const appointmentsController = new AppointmentsController()

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentRepository.find()

//   return response.json(appointments)
// })

appointmentsRouter.post('/', appointmentsController.create)

export default appointmentsRouter
