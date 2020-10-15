export class Popup {
  constructor(popup) {
    this._popup = popup;
    this._buttonPopupClose = this._popup.querySelector(".button_type_close");
    this._clickOnCloseButton = this._clickOnCloseButton.bind(this);
    this._clickOnOverlay = this._clickOnOverlay.bind(this);
    this._clickOnEscape = this._clickOnEscape.bind(this);
  }
  // Публичный метод открытия попапа
  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
  }
  // Публичный метод закрытия попапа
  close() {
    this._popup.classList.remove("popup_opened");
    this.removeEventListeners();
  }
  // Закрытие попапа по крестику
  _clickOnCloseButton() {
    this.close();
  }
  // Закрытие попапа, если кликнули мышкой вне попап а
  _clickOnOverlay(event) {
    if (event.target !== event.currentTarget) return;
    this.close();
  }
  // Закрытие попапа, если нажали на Escape
  _clickOnEscape(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  // Устанавливаем слушатели на кнопоку закрытия, клавишу Escape и оверлей
  setEventListeners() {
    this._buttonPopupClose.addEventListener("click", this._clickOnCloseButton);
    this._popup.addEventListener("click", this._clickOnOverlay);
    document.addEventListener("keydown", this._clickOnEscape);
  }
  // Удаляем слушатели с кнопоки закрытия, клавиши Escape и оверлея
  removeEventListeners() {
    this._buttonPopupClose.removeEventListener(
      "click",
      this._clickOnCloseButton
    );
    this._popup.removeEventListener("click", this._clickOnOverlay);
    document.removeEventListener("keydown", this._clickOnEscape);
  }
}
