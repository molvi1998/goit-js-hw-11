import { refs } from "./refs";
import axios from "axios";

export default class FetchApi {
    constructor() {
        this.BASE_URL = ""
        this.key = "26842987-082bbd3c37dcbed35dbe75126"
        this.page = 1
    }

  ferchApi(query) {
      return fetch(`https://pixabay.com/api/?key=${this.key}&q=${query}&image_type=photo&page=${this.page}&per_page=40&orientation=horizontal`)
      .then(r => r.json())
      .then(img => {return img.hits})
  }

  pageUpdate() {
    this.page += 1
  }

  pageOne() {
    this.page = 1
  }


}