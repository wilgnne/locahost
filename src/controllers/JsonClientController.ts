import { Request, Response } from 'express'

import { Dao } from '../dao/dao'
import { Client } from '../models'

import { Controller, GetAllReq } from './controller'

export class JsonClientController implements Controller {
  constructor (private readonly dao: Dao<Client>) {}

  async getAll (req: GetAllReq, res: Response): Promise<void> {
    const clients = await this.dao.getAll()

    res.json(clients)
  }

  async getById (req: Request, res: Response): Promise<void> {
    const { id } = req.params as unknown as { id: number }
    const client = await this.dao.getById(id)

    if (client === undefined) {
      res.sendStatus(404)
      return
    }

    res.json(client)
  }

  async create (req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as Client
      await this.dao.create(data)

      res.sendStatus(201)
    } catch (err) {
      res.status(400).send('Failed to register client, check your details and try again')
    }
  }
}
