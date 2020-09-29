import { Popup } from "./Popup.js";
const popupImg = document.querySelector(".popup__img");
const popupFigCap = document.querySelector(".popup__figcaption");
//Создайте класс PopupWithImage, который наследует от Popup. 

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    //В методе open класса PopupWithImage нужно вставлять в попап картинку и атрибут src изображения и подпись к картинке.

    openPopup(data) {
        
        popupImg.src = data.link;
        popupImg.alt = `Изображение ${data.name}`;
        popupFigCap.textContent = data.name;
        super.openPopup();
        
    }
}