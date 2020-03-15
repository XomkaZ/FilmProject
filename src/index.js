import './styles.css';
import { link } from './refs/refs';

let amount = 2;

console.log(link);

link.fetcher.then(value => {
  console.log(value.map(elem => elem));
  return value.map(elem =>
    link.list.insertAdjacentHTML(
      'beforeend',
      `<li class = 'list-item'><img class = 'list-item__image' src = 'https://image.tmdb.org/t/p/w500/${elem.poster_path}'><h3 class = 'heading'>${elem.title}</h3></li>`,
    ),
  );
});

const changeFindFilm = e => {
  e.preventDefault();

  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=1&include_adult=false&query=${link.output.value}`,
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      link.list.innerHTML = `${data.results
        .map(
          elem =>
            `<li class = 'list-item'><img class = 'list-item__image' src = 'https://image.tmdb.org/t/p/w500/${elem.poster_path}'><h2 class = 'heading'>${elem.title}</h2></li>`,
        )
        .join('')}`;
    });
};

const prevPageOfFilms = e => {
  e.preventDefault();

  if (amount < 1) {
    amount = 1;
  } else if (amount > 1) {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${(amount =
        amount - 1)}`,
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (link.output.value !== '') {
          fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${(amount =
              amount - 1)}&include_adult=false&query=${link.output.value}`,
          )
            .then(response => {
              return response.json();
            })
            .then(data => {
              return (link.list.innerHTML = `${data.results
                .map(
                  elem =>
                    `<li class = 'list-item'><img class = 'list-item__image' src = 'https://image.tmdb.org/t/p/w500/${elem.poster_path}'><h2 class = 'heading'>${elem.title}</h2></li>`,
                )
                .join('')}`);
            });
        }
      });
  }
};

const nextPageOfFIlms = e => {
  e.preventDefault();

  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${amount++}`,
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (link.output.value !== '') {
        return fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${amount++}&include_adult=false&query=${
            link.output.value
          }`,
        )
          .then(response => {
            return response.json();
          })
          .then(data => {
            return (link.list.innerHTML = `${data.results
              .map(
                elem =>
                  `<li class = 'list-item'><img class = 'list-item__image' src = 'https://image.tmdb.org/t/p/w500/${elem.poster_path}'><h2 class = 'heading'>${elem.title}</h2></li>`,
              )
              .join('')}`);
          });
      }

      link.list.innerHTML = `${data.results
        .map(
          elem =>
            `<li class = 'list-item'><img class = 'list-item__image' src = 'https://image.tmdb.org/t/p/w500/${elem.poster_path}'><h2 class = 'heading'>${elem.title}</h2></li>`,
        )
        .join('')}`;
    });
};

link.prevPage.addEventListener('click', prevPageOfFilms);
link.nextPage.addEventListener('click', nextPageOfFIlms);
link.form.addEventListener('submit', changeFindFilm);
