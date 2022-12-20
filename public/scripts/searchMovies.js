
const divMovies = document.getElementById('movies')

const butSearch = document.getElementById('butSearch')
const inpSearch = document.getElementById('inpSearch')

butSearch.addEventListener('click', () => {
  getMovies(inpSearch.value)
})

async function getMovies (search) {
  divMovies.innerHTML = ''
  const response = await fetch(`/api/movie?${new URLSearchParams({ search })}`)
  const movies = await response.json()
  movies.forEach(movie => {
    divMovies.appendChild(createMovie(movie))
  })
  emitMoviesLoaded()
}

function createMovie (movie, status) {
  const movieCard = document.createElement('div')
  movieCard.style.border = status === undefined ? '' : `5px solid ${status}`
  movieCard.id = `movie-${movie.id}`
  movieCard.classList.add('movie')

  const plus = document.createElement('img')
  plus.classList.add('plus')
  plus.src = 'img/plus.svg.svg'
  movieCard.appendChild(plus)

  const poster = document.createElement('img')
  poster.classList.add('poster')
  poster.src = movie.posterUrl
  movieCard.appendChild(poster)

  // description
  const description = document.createElement('div')
  description.classList.add('description')

  const title = document.createElement('p')
  title.classList.add('title')
  title.innerText = movie.title.slice(0, 35)
  description.appendChild(title)

  const date = document.createElement('p')
  date.classList.add('date')
  date.innerText = `(${new Date(movie.releaseDate).toLocaleDateString()})`
  description.appendChild(date)

  const price = document.createElement('p')
  price.classList.add('price')
  price.innerText = `$${movie.leaseValue.toFixed(2)} / ${movie.leaseTime} day(s)`
  description.appendChild(price)

  movieCard.appendChild(description)

  return movieCard
}

function emitMoviesLoaded () {
  // eslint-disable-next-line no-undef
  const event = new CustomEvent('moviesLoaded', {
    bubbles: true,
    cancelable: true,
    composed: false
  })
  document.dispatchEvent(event)
}

document.addEventListener('DOMContentLoaded', () => {
  emitMoviesLoaded()
})
