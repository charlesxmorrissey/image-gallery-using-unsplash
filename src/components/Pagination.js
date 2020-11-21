export default class Pagination {
  constructor({ currentPage, totalPages, perPage, onPageChange }) {
    this._currentPage = currentPage
    this._totalPages = totalPages
    this._perPage = perPage
    this._onPageChange = onPageChange
    this._numPages = Math.ceil(this._totalPages / this._perPage)

    this._render()
  }

  _bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('pagination-nav__btn')) {
        this._currentPage = e.target.innerText

        this._onPageChange(this._currentPage)
        this._setSelectedPage()
      }
    })
  }

  _render() {
    const paginationElem = document.querySelector('.pagination')
    const paginationNavElem = document.createElement('nav')

    paginationElem.append(paginationNavElem)
    paginationNavElem.classList.add('pagination-nav')

    for (let i = 1; i < this._numPages + 1; i++) {
      const pageBtn = `<button class="pagination-nav__btn">${i}</button>`

      paginationNavElem.innerHTML += pageBtn
    }

    this._bindEvents()
    this._setSelectedPage()
  }

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
