import { loadImage, request } from 'utils'

import Modal from './Modal'
import Pagination from './Pagination'

const { ACCESS_KEY: accessKey } = process.env

export default class Gallery {
  constructor({ elem, keyword }) {
    this._apiUrl = 'https://api.unsplash.com/search/photos'
    this._elem = document.querySelector(elem)
    this._keyword = keyword
    this._currentPage = 1
    this._perPage = 10
    this._imageData = []
    this._total = 50
  }

  _fetchImages(page = this._currentPage) {
    request(this._apiUrl, {
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
        // eslint-disable-next-line no-console
        console.error('Error:', error)
      })
  }

  _bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('gallery-card')) {
        const imageData = this._getSelectedImage(e.target.dataset.id)

        this._modal.open(...imageData)
      }
    })
  }

  _getSelectedImage(id) {
    return this._imageData.filter((a) => a.id === id)
  }

  _render() {
    const galleryElem = document.querySelector('.gallery')
    const cardFragment = document.createDocumentFragment()

    galleryElem.innerHTML = ''

    this._imageData.map(({ alt_description, id, urls }, index) => {
      const card = document.createElement('div')

      card.className = 'gallery-card'
      card.dataset.id = id

      loadImage(urls.thumb).then(() => {
        const img = new Image()

        img.alt = alt_description || ''
        img.className = 'gallery-card__image'
        img.src = urls.thumb

        card.appendChild(img)
      })

      cardFragment.appendChild(card)

      return this
    })

    galleryElem.appendChild(cardFragment)
  }

  init() {
    this._fetchImages()
    this._modal = new Modal()
    this.pagination = new Pagination({
      currentPage: this._currentPage,
      totalPages: this._total,
      perPage: this._perPage,
      onPageChange: this._fetchImages.bind(this),
    })

    this._bindEvents()
  }
}
