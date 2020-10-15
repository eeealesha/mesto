import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._formContainer = this._popupSelector.querySelector('.popup__container');
        //this._handleSubmit = this._handleSubmit;
    }

   

    setEventListeners() {
        super.setEventListeners();
        this._formContainer.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmit();
            super.closePopup();
        });
    }

    open(){
        super.openPopup();
    }

    setHandleSubmit(item){
        this._handleSubmit = item;
        console.log(this._handleSubmit)
    }
}