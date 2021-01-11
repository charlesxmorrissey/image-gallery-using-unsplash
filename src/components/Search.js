import searchIcon from 'images/search.svg'

/** Class that creates a keyword search. */
export default class Search {
  /**
   * @param {!string} elem The gallery element selector.
   * @param {string} keyword The search term.
   * @param {Function} onKeywordChange
   *
   * @constructor
   */
  constructor({ elem, keyword, onKeywordChange }) {
    this._elem = elem
    this._keyword = keyword
    this._onKeywordChange = onKeywordChange

    this._create()
  }

  /**
   * Creates the DOM elements to display the search form.
   * @private
   */
  _create() {
    const searchFragment = document.createDocumentFragment()
    const firstChild = this._elem.firstChild

    this._searchForm = document.createElement('form')
    this._searchForm.classList.add('search')

    this._searchFormInput = document.createElement('input')
    this._searchFormInput.classList.add('search__input')
    this._searchFormInput.placeholder = 'Search'
    this._searchFormInput.type = 'search'
    this._searchFormInput.value = this._keyword

    this._searchFormBtn = document.createElement('button')
    this._searchFormBtn.classList.add('search__btn')
    this._searchFormBtn.type = 'submit'
    this._searchFormBtn.innerHTML = searchIcon

    this._searchForm.append(this._searchFormInput, this._searchFormBtn)

    searchFragment.append(this._searchForm)

    this._elem.insertBefore(searchFragment, firstChild)

    this._bindEvents()
  }

  /**
   * Add a click event to handle displaying search results based on query.
   * @private
   */
  _bindEvents() {
    this._searchFormBtn.addEventListener('click', (e) => {
      e.preventDefault()
      this._onKeywordChange(1, this._searchFormInput.value)
    })
  }
}
