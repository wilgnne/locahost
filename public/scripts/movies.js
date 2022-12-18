
const divMovies = document.getElementById('movies')

const butSearch = document.getElementById('butSearch')

butSearch.addEventListener('click', () => {
  getMovies()
})

async function getMovies () {
  const configReq = {
    method: 'GET',
    cors: 'no-cors'
  }
  const response = await fetch('/api/movie', configReq)
  const movies = await response.json()
  console.log(movies)
  movies.forEach(movie => {
    divMovies.appendChild(createMovie(movie))
  })
}

function createMovie (movie) {
  const movieCard = document.createElement('div')
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
  title.innerText = movie.title
  description.appendChild(title)

  const date = document.createElement('p')
  date.classList.add('date')
  date.innerText = `(${new Date(movie.releaseDate).toLocaleDateString()})`
  description.appendChild(date)

  const price = document.createElement('p')
  price.classList.add('price')
  price.innerText = `$${movie.leaseValue}`
  description.appendChild(price)

  movieCard.appendChild(description)

  return movieCard
}
