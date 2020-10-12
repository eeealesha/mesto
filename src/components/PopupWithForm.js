import { Popup } from "./Popup.js";
//Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
export class PopupWithForm extends Popup {
    //Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
    constructor(popupSelector, formSubmit){
        super(popupSelector);
        this._formSubmit = formSubmit;
    }
    //Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
    _getInputValues(){
        this._allInputs = this._popupSelector.querySelectorAll(".form__item");
        this._inputValues = {};
        this._allInputs.forEach(item => {
            this._inputValues[item.name] = item.value;
        });
        return this._inputValues
    }
    //Перезаписывает родительский метод setEventListeners. 
    //Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, 
    //но и добавлять обработчик сабмита формы.
    setEventListeners(){
        super.setEventListeners();
        this._form = this._popupSelector.querySelector(".popup__container");
        this._form.addEventListener("submit", (event)=>{
            event.preventDefault();
            
            this._formSubmit(this._getInputValues());
            this.closePopup();
        });
    }
    //Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
   
    closePopup(){
        super.closePopup();
        this._form.reset();
    }

}
