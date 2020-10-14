import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._formContainer = this._popupSelector.querySelector('.popup__container');
    }

    setHandleSubmit(item){
        this._handleSubmit = item;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formContainer.addEventListener('submit', (event) => {
            event.preventDefault();
            //this._handleSubmit();
            super.closePopup();
        });
    }

    open(){
        super.openPopup();
    }

}