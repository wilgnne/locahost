import { Response } from 'express'

import { Dao } from '../dao/dao'
import { Movie } from '../models'

import { Controller, GetAllReq } from './controller'

export class EjsMovieController implements Controller {
  constructor (private readonly dao: Dao<Movie>) {}

  async getAll (req: GetAllReq, res: Response): Promise<void> {
    const { query } = req
    const movies = await this.dao.getAll(query)

    res.render('movie/index.ejs', { movies })
  }
}
