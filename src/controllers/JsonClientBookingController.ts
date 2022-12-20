import { Request, Response } from 'express'
import { BookingDao } from '../dao/bookingDao'

import { Controller } from './controller'

export class JsonClientBookingController implements Controller {
  constructor (private readonly dao: BookingDao) {}

  async getById (req: Request, res: Response): Promise<void> {
    const { id } = req.params as unknown as { id: number }
    const bookings = await this.dao.getBookingsByClientId(id)

    res.json(bookings)
  }
}
