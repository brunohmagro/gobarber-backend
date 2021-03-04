import { Router } from 'express'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '@mobules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import CreateAppointmentService from '@mobules/appointments/services/CreateAppointmentService'

import ensureAuthenticated from '@mobules/users/infra/http/middlewares/ensureAuthenticated'

const appointmentRepository = new AppointmentsRepository()

const appointmentsRouter = Router()
appointmentsRouter.use(ensureAuthenticated)

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentRepository.find()

//   return response.json(appointments)
// })

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService(appointmentRepository)

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  })

  return response.json(appointment)
})

export default appointmentsRouter
