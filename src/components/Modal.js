export default class Modal {
  constructor() {
    this._body = document.body
    this._overlay = document.querySelector('.overlay')
    this._modal = document.querySelector('.modal')
  }

  get _cssClasses() {
    return {
      modal: 'modal',
      modalOpen: 'modal--is-open',
      overlay: 'overlay',
      overlayOpen: 'overlay--is-open',
    }
  }

  close() {}

  open(config = {}) {
    console.log('open::', config)
    this._modal.classList.add(this._cssClasses.modalOpen)
    this._overlay.classList.add(this._cssClasses.overlayOpen)
  }
}
