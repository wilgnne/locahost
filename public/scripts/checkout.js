const nav = document.querySelectorAll('.nav li')
const contents = document.querySelectorAll('#contents > div')

function desactiveAll () {
  nav.forEach(li => {
    li.classList.remove('active')
  })
  contents.forEach(div => {
    div.classList.remove('active')
  })
}

const myList = document.getElementById('myList')

const divMoviesCheckout = document.getElementById('moviesCheckout')

nav.forEach((li, index) => {
  li.addEventListener('click', () => {
    if (index === 1) {
      // eslint-disable-next-line no-undef
      if (myMoviesList.length === 0) return
      myList.classList.remove('active')
      refreshCheckout()
    } else {
      myList.classList.add('active')
    }
    desactiveAll()
    li.classList.add('active')
    contents[index].classList.add('active')
  })
})

function refreshCheckout () {
  // eslint-disable-next-line no-undef
  refreshPrice()
  assignInformation()
  divMoviesCheckout.innerHTML = ''
  // eslint-disable-next-line no-undef
  myMoviesList.forEach(movie => {
    // eslint-disable-next-line no-undef
    divMoviesCheckout.appendChild(createMovie(movie))
  })
}

const informations = document.querySelectorAll('.mainCheckout .informations span')

function assignInformation () {
  // eslint-disable-next-line no-undef
  const { min, max } = filterLease()
  informations[0].innerText = new Date(new Date().getTime() + (60 * 60 * 24 * 1000 * min)).toLocaleDateString()
  informations[1].innerText = new Date(new Date().getTime() + (60 * 60 * 24 * 1000 * max)).toLocaleDateString()
  // eslint-disable-next-line no-undef
  informations[2].innerText = listPrice.innerText
}

const checkoutForm = document.getElementById('checkoutForm')

checkoutForm.addEventListener('submit', async (event) => {
  const inpCPF = document.getElementById('cpf')
  event.preventDefault()
  if (!checkCPF(inpCPF.value)) return
  const cpf = checkCPF(inpCPF.value)
  // eslint-disable-next-line no-undef
  const req = myMoviesList.map(movie => {
    return {
      cpf,
      idMovie: movie.id
    }
  })
  const status = await fetch('/api/booking', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(req)
  })
  if (status.status === 201) {
    // eslint-disable-next-line no-undef
    while (myMoviesList.length > 0) {
    // eslint-disable-next-line no-undef
      myMoviesList.pop()
    }
    refreshCheckout()
    forHome()
    // eslint-disable-next-line no-undef
    moviesList.innerHTML = ''
  }
})

function checkCPF (cpf) {
  cpf = cpf.replaceAll('.', '')
  cpf = cpf.replaceAll('-', '')
  if (cpf.length === 11) return cpf
  return false
}

function forHome () {
  desactiveAll()
  nav[0].classList.add('active')
  contents[0].classList.add('active')
  myList.classList.add('active')
}
