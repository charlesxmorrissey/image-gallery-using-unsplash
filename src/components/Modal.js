import closeIcon from 'images/close.svg'

/** Class that creates a modal overlay to provide a detailed view. */
export default class Modal {
  /**
   * @constructor
   */
  constructor() {
    this._body = document.body

    this._create()
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
   * Creates the DOM elements to display the overlay and modal.
   * @private
   */
  _create() {
    const modalFragment = document.createDocumentFragment()

    this._overlay = document.createElement('div')
    this._overlay.classList.add(this._cssClasses.overlay)

    this._modal = document.createElement('div')
    this._modal.classList.add(this._cssClasses.modal)

    this._modalBtn = document.createElement('button')
    this._modalBtn.classList.add(this._cssClasses.modalCloseBtn)
    this._modalBtn.innerHTML = closeIcon

    this._modalContent = document.createElement('div')
    this._modalContent.classList.add(this._cssClasses.modalContent)

    this._modal.append(this._modalBtn, this._modalContent)

    modalFragment.append(this._overlay, this._modal)

    this._body.appendChild(modalFragment)

    this._bindEvents()
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
    this._modalContent.innerHTML = this._modalData
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
