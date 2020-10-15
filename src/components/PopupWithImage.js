import {Popup} from './Popup.js'

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  open(data) {
    const LightBoxImage = this._popup.querySelector('.popup__img')
    const LightBoxCaption = this._popup.querySelector('.popup__figcaption')
    LightBoxImage.src = data.link;
    LightBoxImage.alt = data.name;
    LightBoxCaption.textContent = data.name;
    super.open();
  }
}

export {PopupWithImage};