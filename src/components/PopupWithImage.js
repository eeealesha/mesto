import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  open(data) {
    // При открытии попапа с картинкой, передаем ему информацию из карточки
    const cardPicture = this._popup.querySelector(".popup__img");
    const cardPictureCaption = this._popup.querySelector(".popup__figcaption");
    cardPicture.src = data.link;
    cardPicture.alt = data.name;
    cardPictureCaption.textContent = data.name;
    super.open();
  }
}
