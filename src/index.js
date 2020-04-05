import './styles.css';
import services from './components/services'

// let ammount = 1;

services.defaultFilms()

const handleSubmit = e => {
    e.preventDefault()
    const query = e.target.elements[0].value
    services.getFilmName(query)
    services.searchNewFilms(query)
    if(query !== ''){
        services.searchNewFilms(query)
    } else if(query === ''){
        services.defaultFilms()
    } 
}

services.refs.form.addEventListener('submit', handleSubmit)



// services.favoriteFilms()
const nextPageB = e => {
    e.preventDefault()
    services.nextPage()
    services.defaultFilms()
}

const previousPageB = e => {
    e.preventDefault()
    services.prevPage()
    services.defaultFilms()
}

services.refs.next.addEventListener('click', nextPageB)
services.refs.previous.addEventListener('click', previousPageB)

// const showFavs = e => {
//     e.preventDefault()
//     services.favFilms()
// }

const showLi = e => {
    if (e.target.nodeName !== 'IMG') {
        return
      }
    const id = e.target.closest('li').id
    services.showModal(id)

}



services.refs.filmContainer.addEventListener('click', showLi)   
// services.refs.favs.addEventListener('click', showFavs)