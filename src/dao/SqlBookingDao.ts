import { SqlDatabase } from '../infra/sqlDatabase'
import { Booking } from '../models'
import { BookingDao } from './bookingDao'

export class SqlBookingDao implements BookingDao {
  constructor (private readonly database: SqlDatabase) {}

  async getAll (): Promise<Booking[]> {
    const sql = 'SELECT * FROM booking;'

    const response = await this.database.query<Booking[]>(sql)
    return response
  }

  async getById (id: number): Promise<Booking | undefined> {
    const sql = `SELECT * FROM booking WHERE id=${id};`

    const response = await this.database.query<Booking[]>(sql)
    return response[0]
  }

  async create (data: Booking): Promise<void> {
    const { cpf, idMovie } = data
    const query = `INSERT INTO client (
      idClient,
      idMovie
    ) VALUES (
      ${cpf},
      ${idMovie}
    )`

    await this.database.query(query)
  }

  async getBookingsByMovieId (movieId: number): Promise<Booking[]> {
    const sql = `SELECT * FROM booking WHERE idMovie=${movieId};`

    const response = await this.database.query<Booking[]>(sql)
    return response
  }

  async getBookingsByClientId (clientId: number): Promise<Booking[]> {
    const sql = `SELECT * FROM booking WHERE idClient=${clientId};`

    const response = await this.database.query<Booking[]>(sql)
    return response
  }

  async checkMovieAvailability (movieId: number): Promise<number> {
    const sql = `SELECT amount - (SELECT COUNT(*) FROM booking WHERE idMovie = ${movieId}) AS availability FROM movie WHERE id=${movieId};`

    const response = await this.database.query<{ availability: number }>(sql)
    return response.availability
  }

  async getLateBookings (): Promise<Booking[]> {
    const sql = `
SELECT
  booking.*
FROM
  booking
  JOIN movie ON booking.idMovie = movie.id
WHERE
  (
    CURDATE() NOT BETWEEN booking.startDate
    AND DATE_ADD(booking.startDate, INTERVAL movie.leaseTime DAY)
  )
  AND booking.returnDate IS NULL
    `

    const response = await this.database.query<Booking[]>(sql)

    return response
  }
}
