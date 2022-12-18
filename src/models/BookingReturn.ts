import { Booking } from './Booking'

export interface BookingReturn extends Omit<Booking, 'returnDate'> {
  returnDate: string
  due: number
}
