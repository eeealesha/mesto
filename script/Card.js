const popupImg = document.querySelector(".popup__img");
const popupFig = document.querySelector(".popup_type_fig");
const popupFigCap = document.querySelector(".popup__figcaption");

export class Card {
  constructor(data, cardSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    //удаление карточки
    this._element
      .querySelector(".button_type_delete")
      .addEventListener("click", (event) => {
        const card = event.target.closest(".card__element");
        card.remove();
      });
    //лайк карточки
    this._element
      .querySelector(".button_type_like")
      .addEventListener("click", (event) => {
        const button = event.target.closest(".button");
        button.classList.toggle("button_liked");
      });
    //открытие попапа карточки
    this._element
      .querySelector(".photo-grid__item")
      .addEventListener("click", () => {
        popupImg.src = this._link;
        popupImg.alt = `Изображение ${this._name}`;
        popupFigCap.textContent = this._name;
        this._openPopup(popupFig);
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".photo-grid__title").textContent = this._name;
    this._element.querySelector(".photo-grid__item").src = this._link;
    this._element.querySelector(
      ".photo-grid__item"
    ).alt = `Изображение ${this._name}`;
    return this._element;
  }
}
