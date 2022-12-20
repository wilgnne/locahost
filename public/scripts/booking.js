let bookings = []
const allBookings = document.getElementById('allBookings')

const bookingsForm = document.getElementById('bookingsForm')

bookingsForm.addEventListener('submit', async (event) => {
  console.log('call')
  event.preventDefault()
  const inpCPF = document.getElementById('booking-cpf')
  console.log(inpCPF.value)
  const cpf = checkCPF(inpCPF.value)
  console.log({ cpf })
  if (!cpf) return

  const response = await fetch(`/api/booking/client/${cpf}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
  bookings = await response.json()

  const bookingsOpened = bookings.filter(({ returnDate }) => returnDate === null)

  allBookings.innerHTML = ''
  // eslint-disable-next-line no-undef
  bookingsOpened.forEach(async ({ idMovie, returnDate, startDate }) => {
    // eslint-disable-next-line no-undef
    const movie = await getMovie(idMovie)

    const espectedReturn = new Date(new Date(startDate).getTime() + (60 * 60 * 24 * 1000 * movie.leaseTime))

    const status = new Date() - espectedReturn

    console.log({ espectedReturn, status })
    // eslint-disable-next-line no-undef
    allBookings.appendChild(createMovie(movie, status > 0 ? 'red' : 'green'))
    // eslint-disable-next-line no-undef
    moviesList.innerHTML = ''
  })
})
