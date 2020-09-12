import { initialCards } from "./initialCards.js";

const cardsContainer = document.querySelector(".photo-grid__list");

class Card {
    constructor(data, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
    }
    _getTemplate() {
      const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".card__element")
      .cloneNode(true);
  
      return cardElement
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._element.querySelector(".photo-grid__title").textContent = this._name;
      this._element.querySelector(".photo-grid__item").src = this._link;
      this._element.querySelector(".photo-grid__item").alt = `Изображение ${this._name}`;
      return this._element;
    }
  }
  
  initialCards.forEach((item) =>{
    const card = new Card(item, ".cardTemplate");
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);
  });