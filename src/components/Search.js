export default class Search {
  constructor({ elem, keyword }) {
    this._elem = elem
    this._keyword = keyword

    this._create()
  }

  _create() {
    const searchFragment = document.createDocumentFragment()
    const firstChild = this._elem.firstChild

    this._searchForm = document.createElement('form')
    this._searchForm.classList.add('search')

    this._searchFormInput = document.createElement('input')
    this._searchFormInput.classList.add('search__input')
    this._searchFormInput.placeholder = 'Search'
    this._searchFormInput.type = 'text'
    this._searchFormInput.value = this._keyword

    this._searchFormBtn = document.createElement('button')
    this._searchFormBtn.classList.add('search__btn')
    this._searchFormBtn.textContent = 'Submit'
    this._searchFormBtn.type = 'submit'

    this._searchForm.append(this._searchFormInput, this._searchFormBtn)

    searchFragment.append(this._searchForm)

    this._elem.insertBefore(searchFragment, firstChild)
  }
}
