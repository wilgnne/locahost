import { SqlDatabase } from '../infra/sqlDatabase'
import { Movie } from '../models'

import { Dao, Filter } from './dao'

export class SqlMovieDao implements Dao<Movie> {
  constructor (private readonly database: SqlDatabase) {}

  async getAll ({ search }: Filter = {}): Promise<Movie[]> {
    const sql = `SELECT * FROM movie WHERE title LIKE "%${search === undefined ? '' : search}%";`

    const response = await this.database.query<Movie[]>(sql)
    return response
  }

  async getById (id: number): Promise<Movie | undefined> {
    const sql = `SELECT * FROM movie WHERE id=${id};`

    const response = await this.database.query<Movie[]>(sql)
    return response[0]
  }

  async create (data: Movie): Promise<void> {
    const { amount, coverUrl, feeValue, leaseTime, leaseValue, posterUrl, releaseDate, synopsis, title } = data
    const query = `INSERT INTO movie (
      title,
      releaseDate,
      leaseTime,
      leaseValue,
      feeValue,
      synopsis,
      amount,
      posterUrl,
      coverUrl
    ) VALUES (
      "${title}",
      "${releaseDate}",
      ${leaseTime},
      ${leaseValue},
      ${feeValue},
      "${synopsis}",
      ${amount},
      "${posterUrl}",
      "${coverUrl}"
    )`

    await this.database.query(query)
  }
}
