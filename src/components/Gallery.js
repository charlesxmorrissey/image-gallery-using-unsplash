import { loadImage, request } from 'utils'

import Modal from './Modal'
import Pagination from './Pagination'
import Search from './Search'

const { ACCESS_KEY: accessKey } = process.env

/** Class that creates a image gallery based on keyword. */
export default class Gallery {
  /**
   * @param {!string} elem The gallery element selector.
   * @param {string} keyword The search term.
   * @constructor
   */
  constructor({ elem, keyword }) {
    this._apiUrl = 'https://api.unsplash.com/search/photos'
    this._elem = document.querySelector(elem)
    this._keyword = keyword
    this._currentPage = 1
    this._perPage = 10
    this._imageData = []
    this._initLoad = true

    this._create()
  }

  /**
   * Creates the DOM element to display the gallery.
   * @private
   */
  _create() {
    this._gallery = document.createElement('section')
    this._gallery.classList.add('gallery')

    this._elem.append(this._gallery)
  }

  /**
   * Adds a click event to handle the display of a modal detail view.
   * @private
   */
  _bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('gallery-card')) {
        const modalImg = this._getSelectedImage(e.target.dataset.id)[0]
        const { alt_description, urls } = modalImg

        loadImage(urls.regular).then(() => {
          const imgTemplate = `
            <img
              class="modal__content-image"
              src="${urls.regular}"
              alt="${alt_description || ''}" />
          `

          this._modal.open(imgTemplate)
        })
      }
    })
  }

  /**
   * Fetches image data from the api.
   * @param {number} page
   * @private
   */
  _fetchImages(page = this._currentPage, query = this._keyword) {
    request(this._apiUrl, {
      headers: {
        authorization: `Client-ID ${accessKey}`,
      },
      queryParams: {
        orientation: 'landscape',
        page,
        per_page: this._perPage,
        query,
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

  /**
   * Filters the selected image to display in the modal.
   * @param {string} id
   * @return {Object}
   * @private
   */
  _getSelectedImage(id) {
    return this._imageData.filter((obj) => obj.id === id)
  }

  /**
   * Renders the gallery view.
   * @private
   */
  _render() {
    const cardFragment = document.createDocumentFragment()

    this._gallery.innerHTML = ''

    this._imageData.forEach(({ alt_description, id, urls }, index) => {
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
    })

    this._gallery.appendChild(cardFragment)

    // Initializes the pagination and modal component instances.
    // Adds event listeners to images.
    if (this._initLoad) {
      this._initLoad = false
      this._modal = new Modal()
      this.pagination = new Pagination({
        currentPage: this._currentPage,
        elem: this._elem,
        limit: 50,
        onPageChange: this._fetchImages.bind(this),
        perPage: this._perPage,
        totalPages: this._total,
      })
      this.search = new Search({
        elem: this._elem,
        keyword: this._keyword,
        onKeywordChange: this._fetchImages.bind(this),
      })
      this._bindEvents()
    }
  }

  /**
   * Initializes the gallery instance.
   */
  init() {
    this._fetchImages()
  }
}
