const navHome = document.getElementById('navHome')
const navCheckout = document.getElementById('navCheckout')

const home = document.getElementById('home')
const checkout = document.getElementById('checkout')

const myList = document.getElementById('myList')

navHome.addEventListener('click', () => {
  if (navHome.classList.contains('active')) return
  navHome.classList.add('active')
  navCheckout.classList.remove('active')
  home.classList.add('active')
  checkout.classList.remove('active')
  myList.classList.add('active')
})

const divMoviesChekout = document.getElementById('moviesChekout')

navCheckout.addEventListener('click', () => {
  // eslint-disable-next-line no-undef
  if (myMoviesList.length === 0) return
  if (checkout.classList.contains('active')) return
  navCheckout.classList.add('active')
  navHome.classList.remove('active')
  checkout.classList.add('active')
  home.classList.remove('active')
  myList.classList.remove('active')
  divMoviesChekout.innerHTML = ''
  // eslint-disable-next-line no-undef
  myMoviesList.forEach(movie => {
    // eslint-disable-next-line no-undef
    divMoviesChekout.appendChild(createMovie(movie))
  })
  assignInformation()
})

const informations = document.querySelectorAll('.mainCheckout .informations span')

function assignInformation () {
  // eslint-disable-next-line no-undef
  const { min, max } = filterLease()
  informations[0].innerText = new Date(new Date().getTime() + (60 * 60 * 24 * 1000 * min)).toLocaleDateString()
  informations[1].innerText = new Date(new Date().getTime() + (60 * 60 * 24 * 1000 * max)).toLocaleDateString()
  // eslint-disable-next-line no-undef
  informations[2].innerText = listPrice.innerText
}

const chekoutForm = document.getElementById('chekoutForm')

chekoutForm.addEventListener('submit', (event) => {
  const inpCPF = document.getElementById('cpf')
  event.preventDefault()
})

function checkCPF (cpf) {
  cpf = cpf.replaceAll('.', '')
  cpf = cpf.replaceAll('-', '')
  if (cpf === 11) return cpf
  return false
}
