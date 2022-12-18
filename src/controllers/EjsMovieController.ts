import { Request, Response } from 'express'

import { Dao } from '../dao/dao'
import { Movie } from '../models'

import { Controller } from './controller'

export class EjsMovieController implements Controller {
  constructor (private readonly dao: Dao<Movie>) {}

  async getAll (req: Request, res: Response): Promise<void> {
    const movies = await this.dao.getAll()

    res.render('movie/index.ejs', { movies })
  }
}
