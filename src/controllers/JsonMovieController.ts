import { Request, Response } from 'express'

import { Dao } from '../dao/dao'
import { Movie } from '../models'

import { Controller } from './controller'

export class JsonMovieController implements Controller {
  constructor (private readonly dao: Dao<Movie>) {}

  async getAll (req: Request, res: Response): Promise<void> {
    const movies = await this.dao.getAll()

    res.json(movies)
  }

  async getById (req: Request, res: Response): Promise<void> {
    const { id } = req.params as unknown as { id: number }
    const movie = await this.dao.getById(id)

    res.json(movie)
  }

  async create (req: Request, res: Response): Promise<void> {
    const data = req.body as Movie
    await this.dao.create(data)

    res.sendStatus(201)
  }
}
