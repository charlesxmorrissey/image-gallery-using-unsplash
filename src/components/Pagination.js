/** Class that handles gallery paging navigation. */
export default class Pagination {
  /**
   * @param {number} currentPage
   * @param {number} totalPages
   * @param {number} perPage
   * @param {Function} onPageChange
   * @constructor
   */
  constructor({ currentPage, totalPages, perPage, onPageChange }) {
    this._currentPage = currentPage
    this._totalPages = totalPages > 50 ? 50 : totalPages
    this._perPage = perPage
    this._onPageChange = onPageChange
    this._numPages = Math.ceil(this._totalPages / this._perPage)

    // Don't render the page navigation if there aren't enough results.
    if (this._numPages > 1) {
      this._render()
    }
  }

  /**
   * Add a click event to handle displaying gallery results based on page.
   * @private
   */
  _bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('pagination-nav__btn')) {
        this._currentPage = e.target.innerText

        this._onPageChange(this._currentPage)
        this._setSelectedPage()
      }
    })
  }

  /**
   * Renders the page navigation.
   * @private
   */
  _render() {
    const paginationElem = document.querySelector('.pagination')
    const paginationNavElem = document.createElement('nav')
    const pageBtnFragment = document.createDocumentFragment()

    paginationElem.append(paginationNavElem)
    paginationNavElem.className = 'pagination-nav'

    for (let i = 1; i < this._numPages + 1; i++) {
      const pageBtn = document.createElement('button')

      pageBtn.className = 'pagination-nav__btn'
      pageBtn.textContent = i

      pageBtnFragment.appendChild(pageBtn)
    }

    paginationNavElem.appendChild(pageBtnFragment)

    this._bindEvents()
    this._setSelectedPage()
  }

  /**
   * Handles the state of the active page.
   * @private
   */
  _setSelectedPage() {
    const pageBtns = document.querySelectorAll('.pagination-nav__btn')
    const activeClass = 'pagination-nav__btn--active'

    for (let i = 0; i < this._numPages; i++) {
      if (i === this._currentPage - 1) {
        pageBtns[i].classList.add(activeClass)
        pageBtns[i].disabled = true
      } else {
        pageBtns[i].classList.remove(activeClass)
        pageBtns[i].disabled = false
      }
    }
  }
}
