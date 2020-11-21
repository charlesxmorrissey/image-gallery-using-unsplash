import { request } from 'utils'

import Pagination from './Pagination'

const { ACCESS_KEY: accessKey } = process.env

export default class Gallery {
  constructor({ elem, keyword }) {
    this._elem = document.querySelector(elem)
    this._keyword = keyword
    this._currentPage = 1
    this._perPage = 10
    this._imageData = []
    this._total = 50

    console.log('this._elem', this._elem)
  }

  _render() {
    const galleryElem = document.querySelector('.gallery')

    galleryElem.innerHTML = ''

    this._imageData.map((image, index) => {
      const imgCard = `
        <div class="gallery-card" data-id="${image.id}">
          <img class="gallery-card__image" src="${image.urls.thumb}" alt="" />
        </div>
      `

      return (galleryElem.innerHTML += imgCard)
    })
  }

  _fetchImages(page = this._currentPage) {
    request('https://api.unsplash.com/search/photos', {
      headers: {
        authorization: `Client-ID ${accessKey}`,
      },
      queryParams: {
        query: this._keyword,
        per_page: this._perPage,
        orientation: 'portrait',
        page,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('Success:', json)
        this._imageData = json.results

        this._render()
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  init() {
    this._fetchImages()

    this.pagination = new Pagination({
      currentPage: this._currentPage,
      totalPages: this._total,
      perPage: this._perPage,
      onPageChange: this._fetchImages.bind(this),
    })
  }
}
