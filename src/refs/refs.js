export const link = {
  list: document.querySelector('.list'),
  form: document.querySelector('.form'),
  output: document.querySelector('.output'),
  prevPage: document.querySelector('.prev-pages'),
  nextPage: document.querySelector('.next-pages'),
  body: document.querySelector('body'),

  fetcher: fetch(
    'https://api.themoviedb.org/3/movie/popular?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=1',
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data.results;
    }),
};
