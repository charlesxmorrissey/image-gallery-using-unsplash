/** Class that creates a modal overlay to provide a detailed view. */
export default class Modal {
  /**
   * @constructor
   */
  constructor() {
    this._body = document.body
    this._overlay = document.querySelector('.overlay')
    this._modal = document.querySelector('.modal')

    this._bindEvents()
  }

  /**
   * Returns the CSS classes used by the modal.
   * @return {Object} The CSS classes.
   * @private
   */
  get _cssClasses() {
    return {
      modal: 'modal',
      modalCloseBtn: 'modal__close-btn',
      modalContent: 'modal__content',
      modalOpen: 'modal--is-open',
      overlay: 'overlay',
      overlayOpen: 'overlay--is-open',
    }
  }

  /**
   * Adds event listeners to control the modal.
   * @private
   */
  _bindEvents() {
    document.addEventListener('click', (e) => {
      const target = e.target

      if (
        target.classList.contains(this._cssClasses.overlayOpen) ||
        target.classList.contains(this._cssClasses.modalCloseBtn)
      ) {
        this.close()
      }
    })

    document.addEventListener('keydown', (e) => {
      if (
        e.keyCode === 27 &&
        this._overlay.classList.contains(this._cssClasses.overlayOpen)
      ) {
        this.close()
      }
    })
  }

  /**
   * Renders the modal view.
   * @private
   */
  _render() {
    const modalContent = document.querySelector(
      `.${this._cssClasses.modalContent}`
    )

    modalContent.innerHTML = this._modalData
  }

  /**
   * Closes the modal and overlay.
   */
  close() {
    this._modal.classList.remove(this._cssClasses.modalOpen)
    this._overlay.classList.remove(this._cssClasses.overlayOpen)
  }

  /**
   * Opens the modal and overlay.
   * @param {Object} data
   */
  open(data) {
    this._modalData = data
    this._modal.classList.add(this._cssClasses.modalOpen)
    this._overlay.classList.add(this._cssClasses.overlayOpen)

    this._render()
  }
}
