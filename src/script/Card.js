const popupImg = document.querySelector(".popup__img");
const popupFig = document.querySelector(".popup_type_fig");
const popupFigCap = document.querySelector(".popup__figcaption");

export class Card {
  constructor(data, cardSelector, openPopup) {//принимает в конструктор её данные и селектор её template-элемента;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
  }

  //содержит приватные методы, которые работают с разметкой,
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__element")
      .cloneNode(true);

    return cardElement;
  }
  //содержит приватные методы для каждого обработчика;
  _cardDelete(event) {
    const card = event.target.closest(".card__element");
    card.remove();
  }
  _cardLike(event) {
    const button = event.target.closest(".button");
    button.classList.toggle("button_liked");
  }

  // устанавливают слушателей событий;
  _setEventListeners() { 
    //удаление карточки
    this._element
      .querySelector(".button_type_delete")
      .addEventListener("click", (event) => {
        this._cardDelete(event);
      });
    
    //лайк карточки
    this._element
      .querySelector(".button_type_like")
      .addEventListener("click", (event) => {
        this._cardLike(event);
      });
    //открытие попапа карточки
    this._element
      .querySelector(".photo-grid__item")
      .addEventListener("click", () => {
        this._openPopup(this._name, this._link);
      });
  }

  generateCard() {//содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardTitle = this._element.querySelector(".photo-grid__title");
    const cardImg = this._element.querySelector(".photo-grid__item");
    cardTitle.textContent = this._name;
    cardImg.src = this._link;
    cardImg.alt = `Изображение ${this._name}`;
    return this._element;
  }
}
