import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, { onSubmit }) {
    super(popup);
    this._onSubmit = onSubmit;
    this._submit = this._submitData.bind(this);
    this._popupForm = this._popup.querySelector(".popup__container");
  }
  open() {
    this.setEventListeners();
    super.open();
  }

  close() {
    this._popupForm.reset();
    this.removeEventListeners();
    super.close();
  }
  // Собираем данные с инпутов форм попапов
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".form__item");
    this._inputValue = {};
    this._inputList.forEach((item) => {
      this._inputValue[item.name] = item.value;
    });
    return this._inputValue;
  }

  setEventListeners() {
    this._popup.addEventListener("submit", this._submit);
    super.setEventListeners();
  }

  removeEventListeners() {
    this._popup.removeEventListener("submit", this._submit);
    super.removeEventListeners();
  }

  _submitData(event) {
    event.preventDefault();
    this._onSubmit(this._getInputValues());
  }
}
