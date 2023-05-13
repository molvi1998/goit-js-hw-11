import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { refs } from "./js/refs"; 
import FetchApi from "./js/api-service";
import Notiflix from "notiflix";


const API = new FetchApi
let query = ""

refs.gallery.addEventListener("click", initModal) 

refs.loadMoreBtn.style.display = "none"

refs.form.addEventListener("submit", (e) => {
    e.preventDefault()
    refs.loadMoreBtn.style.display = "block"
    API.pageOne()
    query = e.currentTarget.query.value
    refs.gallery.textContent = ""
    API.ferchApi(query).then(r => {
        if(r.length === 0){
            Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.")
        }else {r.map(i => {createMarkup(i)})}
        if (r.length < 40) {
            refs.loadMoreBtn.style.display = "none" 
        }
        if (query === "") {
            Notiflix.Notify.info("Нет запроса")
            refs.gallery.textContent = ""
            refs.loadMoreBtn.style.display = "none"
        }
})})

refs.loadMoreBtn.addEventListener("click", () => {
    API.pageUpdate()
    API.ferchApi(query).then(r => {
        r.map(i => {
        createMarkup(i)
        scrollToElement()    
    })}) 
})

function createMarkup(i) {
    refs.gallery.insertAdjacentHTML("beforeend", markup(i))
} 

function initModal() {
    return new SimpleLightbox('.gallery a', {
         captions: true,
         captionsData: 'alt',
         captionDelay: 250,
         sourceAttr: 'link',
         nav: true
     })
    }

    function scrollToElement() {
        const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();
      
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });
      }


      function markup(i) {
    return (
        `
        <a class="photo-card"  link="${i.largeImageURL}">
        <img class="photo-card__img" src="${i.webformatURL}" alt="${i.id}" loading="lazy" />
        <ul class="info">
        <li>
          <p class="info-item">
            <b>Likes</b>
          </p>
          <p>${i.likes}</p>
        </li>
        <li>
          <p class="info-item">
            <b>Views</b>
          </p>
          <p>${i.views}</p>
        </li>
        <li>
          <p class="info-item">
            <b>Comments</b>
          </p>
          <p>${i.comments}</p>
        </li>
        <li>
          <p class="info-item">
            <b>Downloads</b>
          </p>
          <p>${i.downloads}</p>
        </li>
      </ul>
         </a>
        `
    )
} 