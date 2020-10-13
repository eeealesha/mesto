export class Card {
  constructor({ data, userID, openPopup, cardPutLike, cardDeleteLike }, cardSelector) {//принимает в конструктор её данные и селектор её template-элемента;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ID = data._id;
    this._userID = userID;
    this._ownerID = data.owner._id;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
    this._openPopup = this._openPopup.bind(this);
    this._cardPutLike = cardPutLike;
    this._cardDeleteLike = cardDeleteLike;
    this._cardLike = this._cardLike.bind(this);
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
  //Постановка лайка на карточку
  _cardLike() {
    this._button = this._element.querySelector(".button_type_like");
    this._likesAmount =this._element.querySelector(".photo-grid__like-counter")
    if (!this._button.classList.contains("button_liked")) {
        this._cardPutLike(this._ID)
        this._likesAmount.textContent = this._likes.length += 1;
        this._button.classList.add("button_liked");
    }
    else {
      this._cardDeleteLike(this._ID)
      this._likesAmount.textContent = this._likes.length -= 1;
      this._button.classList.remove("button_liked");
    }

  }

  //Проверка постановки лайка на карточку пользователем 

  _isCardLiked() {
    return this._likes.some((like) => {
      return like._id === this.userID;
    });
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
      .addEventListener("click", this._cardLike);
    //открытие попапа карточки
    this._element
      .querySelector(".photo-grid__item")
      .addEventListener("click", this._openPopup);
  }

  generateCard() {//содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardTitle = this._element.querySelector(".photo-grid__title");
    const cardImg = this._element.querySelector(".photo-grid__item");
    const cardDelete = this._element.querySelector(".button_type_delete");
    const cardLikeCounter = this._element.querySelector(".photo-grid__like-counter");
    const cardLikeButton = this._element.querySelector(".button_type_like");
    cardLikeCounter.textContent = this._likes.length;
    cardTitle.textContent = this._name;
    cardImg.src = this._link;
    cardImg.alt = `Изображение ${this._name}`;
    if (this._ownerID !== this._userID) {
      cardDelete.setAttribute("hidden", "");
    }
    
    if (this._likes.some(like => like._id === this._userID)) {
      cardLikeButton.classList.add("button_liked");
    };
    return this._element;
  }
}
