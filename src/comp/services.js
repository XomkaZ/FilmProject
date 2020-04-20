export default {
    refs: {
        filmConteiner: document.querySelector(".FilmPaths"),
        form: document.querySelector(".form"),
        buttons: document.querySelector(".buttons"),
        films: document.querySelectorAll(".Film"),
        loadMore: document.querySelector(".loadMore"),
        backSlide: document.querySelector(".backSlide"),
        watch: document.querySelector(".menuItem"),
        hiddenWatch: document.querySelector(".hidden-a"),
    },

    
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
            `<div class="Film" data-id="${film.id}">
            <div class="all">
            <img src="https://image.tmdb.org/t/p/w500/${film.poster_path}"/>
            <div class="hidden-menu">
            <div class="hidden-a">
            Add to watch
            </div>
            </div>
            </div>
            <h2>${this.formatString(film.title)}</h2>
            </div>`).join("");
            this.refs.filmConteiner.innerHTML = films;
        },
        
        page: 1,
        
    defaultFilms(){
        fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${this.page}`
            )
            .then(res => res.json())
            .then(data => {
                this.draw(data.results);
                this.idFilm();
            })
            console.log(this.refs.hiddenWatch)
    },
    
    nextPage() {
        this.page += 1;
    },
    
    beforePage() {
        this.page -= 1;
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

    watch: [],

    idFilm(){
            console.log(this.refs.hiddenWatch)
            this.refs.hiddenWatch.addEventListener("click", e => {
                const id = e.target.closest("div[data-id]").dataset.id;
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e9f6322f77334e3f0406d6b8eabd79ce`)
                .then(res => res.json())
                .then(data => console.log(data));
                  })},   
        
}
