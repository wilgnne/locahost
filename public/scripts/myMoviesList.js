const myMoviesList = []
const listPrice = document.getElementById('listPrice')
const moviesList = document.getElementById('moviesList')

function refreshPrice () {
  const price = myMoviesList.reduce((prev, curr) => {
    return (prev + curr.leaseValue)
  }, 0)
  listPrice.innerText = `$${price.toFixed(2)}`
}

document.addEventListener('moviesLoaded', () => {
  const butsPlus = document.querySelectorAll('.plus')
  butsPlus.forEach(butPlus => {
    butPlus.addEventListener('click', () => {
      addMovie(butPlus.parentNode.id)
    })
  })
})

async function addMovie (id) {
  id = id.split('-')[1]
  if (myMoviesList.filter(value => { return value.id === parseInt(id) }).length > 0) return
  myMoviesList.push(await getMovie(id))
  refreshPrice()
}

async function getMovie (id) {
  const response = await fetch(`/api/movie/${id}`)
  const movie = await response.json()
  moviesList.appendChild(createMovieMyList(movie))
  return movie
}

function createMovieMyList (movie) {
  const movieCard = document.createElement('div')
  movieCard.classList.add('movie')

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

  movieCard.appendChild(description)

  movieCard.addEventListener('click', () => {
    removeMovie(movieCard, movie.id)
    refreshPrice()
  })

  return movieCard
}

function removeMovie (movie, id) {
  moviesList.removeChild(movie)
  myMoviesList.splice(myMoviesList.findIndex(value => value.id === parseInt(id)), 1)
}

// eslint-disable-next-line no-unused-vars
function filterLease () {
  const min = Math.min(...myMoviesList.map(movie => movie.leaseTime))
  const max = Math.max(...myMoviesList.map(movie => movie.leaseTime))
  return { min, max }
}
