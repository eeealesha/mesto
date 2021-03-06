export class Card {
  constructor(
    { data, clickOnCard, clickOnDeleteButton },
    templateSelector,
    addLike,
    removeLike,
    userID
  ) {
    this._title = data.name;
    this._photo = data.link;
    this._likes = data.likes;
    this._cardID = data._id;
    this._ownerID = data.owner._id;
    this._creatorName = data.owner.name;
    this._creationTime = data.createdAt;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._userID = userID;
    this._clickOnCard = clickOnCard;
    this._clickOnDeleteButton = clickOnDeleteButton;
    this._templateSelector = templateSelector;
    this._like = this._like.bind(this);
    this._clickOnCard = this._clickOnCard.bind(this);
    this._clickOnDeleteButton = this._clickOnDeleteButton.bind(this);
  }
  // Находим макет карточки
  _cardTemplate() {
    const createCards = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._element = createCards;
    return this._element;
  }

  // Публичный метод для создание карточек
  generateNewCard() {
    this._cardTemplate();
    this._setEventListeners();
    const cardPicture = this._element.querySelector(".photo-grid__item");
    cardPicture.src = this._photo;
    cardPicture.alt = this._title;
    this._element.querySelector(".photo-grid__title").textContent = this._title;
    this._element.querySelector(
      ".photo-grid__like-counter"
    ).textContent = this._likes.length;
    // Проставляем лайки с сервера
    if (this._likes.some((like) => like._id === this._userID)) {
      this._element
        .querySelector(".button_type_like")
        .classList.add("button_liked");
    }
    // Удаляем из кнопку удаления карточки, если не мы ее создали
    if (this._ownerID !== this._userID) {
      this._element
        .querySelector(".button_type_delete")
        .setAttribute("hidden", true);
    }
    return this._element;
  }

  // Публичный метод удаления карточки
  removeCard() {
    this._removeEventListeners();
    this._element.remove();
  }

  // Ставим или убираем лайк в зависимости от статуса лайка
  _like() {
    this._likeButton = this._element.querySelector(".button_type_like");
    this._likeCount = this._element.querySelector(".photo-grid__like-counter");

    if (this._likeButton.classList.contains("button_liked")) {
      this._removeLike(this._cardID)
        .then((res) => {
          this._likeButton.classList.remove("button_liked");
          this._likeCount.textContent = res.likes.length;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this._addLike(this._cardID)
        .then((res) => {
          this._likeButton.classList.add("button_liked");
          this._likeCount.textContent = res.likes.length;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // Устнавливаем слушатели на элементы карточки
  _setEventListeners() {
    this._element
      .querySelector(".button_type_like")
      .addEventListener("click", this._like);

    this._element
      .querySelector(".button_type_delete")
      .addEventListener("click", this._clickOnDeleteButton);

    this._element
      .querySelector(".photo-grid__item")
      .addEventListener("click", this._clickOnCard);
  }
  // Убираем слушатели с элементов карточки
  _removeEventListeners() {
    this._element
      .querySelector(".button_type_like")
      .removeEventListener("click", this._like);

    this._element
      .querySelector(".button_type_delete")
      .removeEventListener("click", this._clickOnDeleteButton);

    this._element
      .querySelector(".photo-grid__item")
      .removeEventListener("click", this._clickOnCard);
  }
}
