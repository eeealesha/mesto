//Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
export class Popup {
    //Принимает в конструктор единственный параметр — селектор попапа.
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        
    }
    //Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
    openPopup () {
        
        this._popupSelector.classList.add("popup_opened");
        this._popupSelector.addEventListener("click", this._closePopupOverlay);
        document.addEventListener("keydown", this._pressKey);
    }

    closePopup() {
        this._popupSelector.classList.remove("popup_opened");
        this._popupSelector.removeEventListener("click", this._closePopupOverlay);
        document.removeEventListener("keydown", this._pressKey);
    }
    //Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.      
    _pressKey(event) {
        if (event.key === "Escape") {
            this.closePopup();
        }
    };
    _closePopupOverlay(event) {
        if (event.target !== event.currentTarget) return;
        this.closePopup();
    };
    //Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
    setEventListeners() {
        this._button = this._popupSelector.querySelector(".button_type_close");
        this._button.addEventListener("click", () => {
            this.closePopup();
        });
    }
}




