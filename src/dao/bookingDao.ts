import { Booking } from '../models'
import { Dao } from './dao'

export interface BookingDao extends Dao<Booking> {
  getBookingsByMovieId: (movieId: number) => Promise<Booking[]>
  getBookingsByClientId: (clientId: number) => Promise<Booking[]>
  getLateBookings: () => Promise<Booking[]>
  checkMovieAvailability: (movieId: number) => Promise<number>
  // bookingReturn: (bookingId: number) => Promise<BookingReturn>
}
