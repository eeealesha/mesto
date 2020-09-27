import { Popup } from "./Popup.js";

//Создайте класс PopupWithImage, который наследует от Popup. 

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    //В методе open класса PopupWithImage нужно вставлять в попап картинку и атрибут src изображения и подпись к картинке.

    openPopup(name, link) {
        super.openPopup();
        popupImg.src = link;
        popupImg.alt = `Изображение ${name}`;
        popupFigCap.textContent = name;
        //this._openPopup(popupFig);
    }
}