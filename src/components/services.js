export default {
  refs: {
    filmContainer: document.querySelector('.filmContainer'),
    form: document.querySelector('.form'),
    next: document.querySelector('.next'),
    previous: document.querySelector('.previous'),
    output: document.querySelector('.output'),
    img: document.querySelectorAll('.list-item__image'),
    input: document.querySelector('.input'),
    favs: document.querySelector('.favorite'),
    li: document.querySelector('.li'),
  },

  // isLibrary: false,
  // isWatched: false,
  // isQueu: false,

  filmName: '',

  arr: [],

  getFilmName(value){
    this.filmName = value
  },

  nextFilms(page){
    fetch(
      `https://api.themoviedb.org/3/search/movie/?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&query=${this.filmName}&page=${page}`,
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.draw(data.results);
      });
  },

  draw(param) {
    console.log('param', param);
    const films = param
      .map(
        film =>
          `<li class="li" id="${film.id}"><h2 class="title">${film.title}</h2><img src="https://image.tmdb.org/t/p/w500/${film.poster_path}"></li>`,
      )
      .join(' ');
    // console.log('films :', films);
    this.refs.filmContainer.innerHTML = films;
  },
  searchNewFilms(query) {
    // console.log(query)
    fetch(
      `https://api.themoviedb.org/3/search/movie/?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&query=${query}`,
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.draw(data.results);
      });
  },

  number: 1,
  defaultFilms() {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${this.number}`,
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.draw(data.results);
      });
  },

  showModal(id) {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=e9f6322f77334e3f0406d6b8eabd79ce`,
    )
      .then(response => response.json())
      .then(data => {
        this.arr.push(data)
        localStorage.setItem('data', JSON.stringify(this.arr))
        const filmData = {
          filmTitle: data.title,
          filmDescription: data.overview,
          filmImg: data.poster_path,
          filmRating: data.vote_average,
        };
        console.log(filmData.filmImg);
        Swal.fire({
          title: filmData.filmTitle,
          text: filmData.filmDescription,
          imageUrl: `https://image.tmdb.org/t/p/w300/${filmData.filmImg}`,
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: `${filmData.filmTitle} image`,
        }).then(data => {
          Swal.fire('Done!', 'Added to favorites!', 'success');
        });
        console.log(filmData);
      });
  },

  nextPage() {
    this.number += 1;
    this.nextFilms(this.number)
  },
  prevPage() {
    this.number -= 1;
  },
};
