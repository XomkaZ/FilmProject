const refs = {
    main: document.querySelector('.main'),
    find: document.querySelector('.input'),
    submit: document.querySelector('.submit'),
    previous: document.querySelector('.previous'),
    next: document.querySelector('.next'),
    modal: document.querySelector('.modal'),
    content: document.querySelector('.content'),
    srcChange: document.querySelector('.description_image'),
    overlay: document.querySelector('description_overlay'),
    short_description: document.querySelector('.short_description'),
    home: document.querySelector('.home'),
    favourites: document.querySelector('.favourites'),  
    subNav: document.querySelector('.sub_navigation'),
    closeModal1: document.querySelector('.close')
}
const fetcher = (number) => { 
  return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${number}`)
  }
let number=1
fetcher(number).then(response => {
  if(response.ok){
    return response.json();
  }
}).then(data => {
    console.log(data.results)
    data.results.map(elem => refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = 
      `<li class="film" data-id="${elem.id}">
      <div class="title_box"><h2 class="title">${elem.original_title}</h2>
      </div>
      <img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/>
      </li>`).join(''))
})
let isSearch = false
refs.home.classList = 'home active_button'

const searchClick = (e) => {
    e.preventDefault()
    const searchFetch = () =>{
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${number}&include_adult=false&query=${refs.search.value}`)
  .then(response => {
      if(response.ok){
        return response.json();
      }})
      .then(data => {
        refs.loader.classList = 'loader not_show'
        refs.loaderBox.classList = 'loader_box'
          return(refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = 
            `<li class="film" data-id="${elem.id}">
            <div class="title_box">
            <h2 class="title">${elem.original_title}</h2>
            </div>
            <img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/>
            </li>`).join(''))
      })}
      refs.main.innerHTML = ''
    if(refs.find.value !== ''){
    isFind=true
    }   
    }
refs.submit.addEventListener('click', findClick)

const nextClick = (e) => {
  const findFetch2 =()=>{
    if(isFind){
    number+=1
    e.preventDefault()
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${number}&include_adult=false&query=${refs.search.value}`)
      .then(response => {
      if(response.ok){
        return response.json();
      }})
      .then(data => {
          return(refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = 
            `<li class="film" data-id="${elem.id}">
            <div class="title_box">
            <h2 class="title">${elem.original_title}</h2>
            </div>
            <img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/>
            </li>`).join(''))
      })
    } else {
      number+=1
      fetcher(number).then(response => {
          if(response.ok){
            return response.json();
          }
        }).then(data => {
            console.log(data.results)
            data.results.map(elem => refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = 
              `<li class="film" data-id="${elem.id}">
              <div class="title_box">
              <h2 class="title">${elem.original_title}</h2>
              </div>
              <img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/>
              </li>`).join(''))
        })
    }}
}
refs.next.addEventListener('click', nextClick)

const previousClick = (e) => {
  const searchFetch3 =()=>{
  refs.loader.classList = 'loader not_show'
        refs.loaderBox.classList = 'loader_box'
  if(isSearch){
    if(number>=2){
    number-=1
    e.preventDefault()
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${number}&include_adult=false&query=${refs.search.value}`)
      .then(response => {
      if(response.ok){
        return response.json();
      }})
      .then(data => {
          return(refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = 
            `<li class="film" data-id="${elem.id}">
            <div class="title_box">
            <h2 class="title">${elem.original_title}</h2>
            </div>
            <img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/>
            </li>`).join(''))
      })
    } else{
      number = 1
    }
    } else {
      if (number>=2){
        number-=1
        fetcher(number).then(response => {
          if(response.ok){
            return response.json();
          }
        }).then(data => {
            console.log(data.results)
            data.results.map(elem => refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = 
              `<li class="film" data-id="${elem.id}">
              <div class="title_box">
              <h2 class="title">${elem.original_title}</h2>
              </div>
              <img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/>
              </li>`).join(''))
        })
      }
      else{
        number = 1
      }
    }}
    refs.loader.classList = 'loader show'
      refs.loaderBox.classList = 'loader_box loader_while_open'
      refs.main.innerHTML = ''
      setTimeout(searchFetch3, 1000)
}
refs.previous.addEventListener('click', previousClick)

const modalClick = (e) => {
  let element = e.target.closest('li')
  console.log(element.children[1])
  refs.srcChange.src = element.children[1].src
  let modalId = e.target.closest('li').dataset.id
  console.log(modalId)
  fetch(`https://api.themoviedb.org/3/movie/${modalId}?api_key=e9f6322f77334e3f0406d6b8eabd79ce`)
  .then(response => {
    if(response.ok){
      return response.json();
    }
  }).then(data => {
      refs.overview.innerHTML = 
      `<p class="overview_text">${data.overview}</p>`
      refs.rating.innerHTML = `
      <h2 class="film_title_modal">${data.original_title}(${data.release_date})</h2>
      <table class="info">
      <tr><td><p>Rating:</p></td><td><h5>${data.vote_average}</h5></td></tr>
      <tr><td><p>Voted:</p></td><td><h5>${data.vote_count}</h5></td></tr>
      <tr><td><p>Popularity:</p></td><td><h5>${data.popularity}</h5></td></tr>
      </table>
      `
  })
  refs.modal.classList = 'modal isOn'
  refs.modal.dataset.id = modalId
}
refs.main.addEventListener('click', modalClick)

const modalExit = (e) => {
  refs.modal.classList = 'modal'
}
refs.overlay.addEventListener('click', modalExit)
  let localArray = [];
  let localArray2 = [];
const watchedAdding = (e) => {
  let thisId = e.target.closest('.modal').dataset.id
  console.log(thisId)
  fetch(`https://api.themoviedb.org/3/movie/${thisId}?api_key=e9f6322f77334e3f0406d6b8eabd79ce`).then(response => {
    if(response.ok){
      return response.json();
    }
  }).then(data => {
    if(localStorage.getItem('favourites') === null){
      localStorage.setItem('favourites', JSON.stringify([]))
      localArray = JSON.parse(localStorage.getItem('favourites'))
      if(!localArray.includes(data)){
        localArray.push(data)
        }
      localStorage.setItem('favourites', JSON.stringify(localArray))
    } else{
      localArray = JSON.parse(localStorage.getItem('favourites'))
      if(!localArray.includes(data)){
        localArray.push(data)
        }
        localStorage.setItem('favourites', JSON.stringify(localArray))
    }
    Swal.fire(
      'Film has been add to the "favourites"'
    )
  })
}
refs.watchedButton.addEventListener('click', watchedAdding)

const homeButton = (e) => {
  const searchFetch4 =()=>{
  number=1
  isFind = false
  fetcher(number).then(response => {
    if(response.ok){
      return response.json();
    }
  }).then(data => {
      console.log(data.results)
      data.results.map(elem => refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = 
        `<li class="film" data-id="${elem.id}">
        <div class="title_box"><h2 class="title">${elem.original_title}</h2>
        </div>
        <img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/>
        </li>`).join(''))
  })
  refs.favourites.classList = 'favourites not_show'
  refs.find.classList = 'input show'
  refs.submit.classList = 'submit show'
  refs.home.classList = 'home active_button'
  refs.favourites.classList = 'favourites'
  refs.next.classList = 'next show'
  refs.previous.classList = 'previous show'}
}
refs.home.addEventListener('click', homeButton)

const favouritesButton = (e) => {
  const searchFetch5 =()=>{
  let elements = JSON.parse(localStorage.getItem('favourites'))
  console.log(elements)
  refs.libraryWatched.classList = 'favourites show'
  refs.search.classList = 'input not_show'
  refs.submit.classList = 'submit not_show'
  refs.library.classList = 'library active_button'
  refs.home.classList = 'home'
  refs.next.classList = 'next not_show'
  refs.previous.classList = 'previous not_show'
  refs.main.innerHTML = elements.map(elem => refs.main.innerHTML = 
  `<li class="film" data-id="${elem.id}">
  <div class="title_box">
  <h2 class="title">${elem.original_title}</h2>
  </div>
  <img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/>
  </li>`).join('')
  }
  refs.main.innerHTML = ''
  setTimeout(searchFetch5, 1000)
}
refs.library.addEventListener('click', favouritesButton)

const favouritesButtonButton2 = (e) => {
  let elements = JSON.parse(localStorage.getItem('watched'))
  refs.main.innerHTML = elements.map(elem => refs.main.innerHTML = `
  <li class="film" data-id="${elem.id}">
  <div class="title_box">
  <h2 class="title">${elem.original_title}</h2>
  </div>
  <img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/>
  </li>`).join('')
}
refs.libraryWatched.addEventListener('click', favouritesButtonButton2)