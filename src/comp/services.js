export default {
    refs: {
        filmConteiner: document.querySelector(".FilmPaths"),
        form: document.querySelector(".form"),
        
    },

    page: 1,

    formatString(string) {
        let smth = string.split("");
        if(smth.length > 20){
        do {
          smth.pop()
        } while (smth.length > 20);
        smth.push("...")
          return smth.join("")
        } else {
         return string
        }
    },

    draw(elem){
        const films = elem.map(film =>
        `<div class="Film">
        <img src="https://image.tmdb.org/t/p/w500/${film.poster_path}"/>
        <h2>${this.formatString(film.title)}</h2>
        </div>`).join("");
        this.refs.filmConteiner.innerHTML = films;

    },

    searchNewFilms(query){
        this.refs.filmConteiner.innerHTML = "";
        fetch(
            `https://api.themoviedb.org/3/search/movie/?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${this.page}&query=${query}`
        ).then(res => res.json())
        .then(data => {
            this.draw(data.results);
        });
    },

    defaultFilms(){
        fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${this.page}`
        )
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.draw(data.results);
        })
    },

    nextPage() {
        this.page += 1;
    },

    lastPage() {
        this.page -= 1;
    }
}
