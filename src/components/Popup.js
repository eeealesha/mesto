class Popup {
    constructor(popup) {
      this._popup = popup;
      this._closeIcon = this._popup.querySelector('.button_type_close');
      this._closeButtonHandler = this._closeButtonHandler.bind(this);
      this._closeOverlayHandler = this._closeOverlayHandler.bind(this);
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
      this._popup.classList.add('popup_opened');
      this.setEventListeners();
    }
  
    close() {
      this._popup.classList.remove('popup_opened');
      this.removeEventListeners()
    }
  
    _closeButtonHandler() {
      this.close()
    }
  
    _closeOverlayHandler(evt) {
      if (evt.target.classList.contains('popup')) {
        this.close()
      }
    }
  
    _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close()
      }
    }
  
    setEventListeners() {
      this._closeIcon.addEventListener('click', this._closeButtonHandler)
      this._popup.addEventListener('click', this._closeOverlayHandler);
      document.addEventListener('keydown', this._handleEscClose);
    }
  
    removeEventListeners() {
      this._closeIcon.removeEventListener('click', this._closeButtonHandler)
      this._popup.removeEventListener('click', this._closeOverlayHandler);
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }
  
  export {Popup}



