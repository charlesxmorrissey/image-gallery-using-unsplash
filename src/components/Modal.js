import { loadImage } from 'utils'

export default class Modal {
  constructor() {
    this._body = document.body
    this._overlay = document.querySelector('.overlay')
    this._modal = document.querySelector('.modal')

    this._bindEvents()
  }

  get _cssClasses() {
    return {
      modal: 'modal',
      modalContent: 'modal__content',
      modalOpen: 'modal--is-open',
      overlay: 'overlay',
      overlayOpen: 'overlay--is-open',
    }
  }

  _bindEvents() {
    document.addEventListener('click', (e) => {
      const target = e.target

      if (
        target.classList.contains(this._cssClasses.overlayOpen) ||
        target.classList.contains('modal__close-btn')
      ) {
        this.close()
      }
    })
  }

  _render() {
    const modalContent = document.querySelector(
      `.${this._cssClasses.modalContent}`
    )

    modalContent.innerHTML = ''

    loadImage(this._modalData.urls.regular).then(() => {
      const img = new Image()

      img.alt = this._modalData.alt_description || ''
      img.className = 'modal__content-image'
      img.src = this._modalData.urls.regular

      modalContent.appendChild(img)
    })
  }

  close() {
    this._modal.classList.remove(this._cssClasses.modalOpen)
    this._overlay.classList.remove(this._cssClasses.overlayOpen)
  }

  open(data) {
    this._modalData = data
    this._modal.classList.add(this._cssClasses.modalOpen)
    this._overlay.classList.add(this._cssClasses.overlayOpen)

    this._render()
  }
}
