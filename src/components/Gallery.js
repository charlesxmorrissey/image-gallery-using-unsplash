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
    this._initLoad = true
  }

  _fetchImages(page = this._currentPage) {
    request(this._apiUrl, {
      headers: {
        authorization: `Client-ID ${accessKey}`,
      },
      queryParams: {
        query: this._keyword,
        per_page: this._perPage,
        orientation: 'landscape',
        page,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this._imageData = json.results
        this._total = json.total

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
    return this._imageData.filter((obj) => obj.id === id)
  }

  _render() {
    const galleryElem = document.querySelector('.gallery')
    const cardFragment = document.createDocumentFragment()

    galleryElem.innerHTML = ''

    this._imageData.map(({ alt_description, id, urls }, index) => {
      const card = document.createElement('div')

      card.className = 'gallery-card'
      card.dataset.id = id

      loadImage(urls.small).then(() => {
        const img = new Image()

        img.alt = alt_description || ''
        img.className = 'gallery-card__image'
        img.src = urls.small

        card.appendChild(img)
      })

      cardFragment.appendChild(card)

      return this
    })

    galleryElem.appendChild(cardFragment)

    if (this._initLoad) {
      this._initLoad = false
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

  init() {
    this._fetchImages()
  }
}
