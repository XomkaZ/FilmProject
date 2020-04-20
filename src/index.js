import "./style.css";
import services from "./comp/services";


services.defaultFilms()

let count = 1;

const handleSearch = e => {
    e.preventDefault()
    const query = e.target.querySelector("input").value;
    services.searchNewFilms(query);
};

const NextPageLoad = e => {
    e.preventDefault()
    count++;
    services.nextPage();
    services.defaultFilms();
    if(count >= 2){
        services.refs.backSlide.style.display = "block"
    }
};


const LastPageLoad = e => {
    e.preventDefault()
    count--;
    services.beforePage()
    services.defaultFilms()
    if(count <= 1){
        services.refs.backSlide.style.display = "none"
    } else {
        services.refs.backSlide.style.display = "block"
    }
};

const toWatch = e => {
    e.preventDefault()
    while (services.refs.filmConteiner.firstChild) {
        services.refs.filmConteiner.removeChild(services.refs.filmConteiner.firstChild);
      }
      while (services.refs.buttons.firstChild) {
        services.refs.buttons.removeChild(services.refs.buttons.firstChild);
      }
}

const handleSubmit = event => {
    event.preventDefault()
    console.log(event.target.closest("div[data-id]").dataset.id)
}

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});

// services.refs.form.addEventListener("submit", handleSearch);
services.refs.backSlide.addEventListener("click", LastPageLoad);
services.refs.loadMore.addEventListener("click", NextPageLoad);
// services.refs.watch.addEventListener("click", toWatch);
// services.refs.filmConteiner.addEventListener("click", handleSubmit);




