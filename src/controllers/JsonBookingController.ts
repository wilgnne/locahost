import { Request, Response } from 'express'

import { Dao } from '../dao/dao'
import { Booking } from '../models'

import { Controller } from './controller'

export class JsonBookingController implements Controller {
  constructor (private readonly dao: Dao<Booking>) {}

  async getAll (req: Request, res: Response): Promise<void> {
    const bookings = await this.dao.getAll()

    res.json(bookings)
  }

  async getById (req: Request, res: Response): Promise<void> {
    const { id } = req.params as unknown as { id: number }
    const booking = await this.dao.getById(id)

    if (booking === undefined) {
      res.sendStatus(404)
      return
    }

    res.json(booking)
  }

  async create (req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as Booking
      await this.dao.create(data)

      res.sendStatus(201)
    } catch (err) {
      res.status(400).send('Failed to register booking, check your details and try again')
    }
  }
}
