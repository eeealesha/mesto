import { Popup } from "./Popup.js";

//Создайте класс PopupWithImage, который наследует от Popup. 

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    //В методе open класса PopupWithImage нужно вставлять в попап картинку и атрибут src изображения и подпись к картинке.

    openPopup(data) {
        const popupImg = this._popupSelector.querySelector(".popup__img");
        const popupFigCap = this._popupSelector.querySelector(".popup__figcaption");
        popupImg.src = data.link;
        popupImg.alt = `Изображение ${data.name}`;
        popupFigCap.textContent = data.name;
        super.openPopup();
    }
}