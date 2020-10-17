import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._cardPicture = this._popup.querySelector(".popup__img");
    this._cardPictureCaption = this._popup.querySelector(".popup__figcaption-text");
    this._cardCreator = this._popup.querySelector(".popup__figcaption-owner");
    this._cardDate = this._popup.querySelector(".popup__figcaption-date");
  }

  open(data) {
    // При открытии попапа с картинкой, передаем ему информацию из карточки
    this._cardPicture.src = data.link;
    this._cardPicture.alt = data.name;
    this._cardPictureCaption.textContent = data.name;
    this._cardCreator.textContent = data.owner.name;
    this._cardDate.textContent = data.createdAt;
    super.setEventListeners();
    super.open();
  }
}
