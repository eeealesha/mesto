import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._cardPicture = this._popup.querySelector(".popup__img");
    this._cardPictureCaption = this._popup.querySelector(".popup__figcaption");
  }

  open(data) {
    // При открытии попапа с картинкой, передаем ему информацию из карточки
    this._cardPicture.src = data.link;
    this._cardPicture.alt = data.name;
    this._cardPictureCaption.textContent = data.name;
    super.setEventListeners();
    super.open();
  }
}
