class Card {
  constructor({data, handleCardClick, handleDeleteClick}, templateSelector, addLike, removeLike, userId) {
    this._title = data.name;
    this._photo = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._templateSelector = templateSelector;
    this._like = this._like.bind(this);
    this._remove = this.removeCard.bind(this);
    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  _cardTemplate() {
    const createCards = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true)

    this._element = createCards;
    return this._element;
  }


  setLikes(data){
    this._likeCount.textContent = data.likes.length;
  }
  
  
  _like() {
    this._likeButton = this._element.querySelector('.button_type_like');
    this._likeCount = this._element.querySelector('.photo-grid__like-counter');
    // Если на лайке есть активный класс, то меняем класс и отнимаем 1 (с отправкой на сервер)
    if (this._likeButton.classList.contains('button_liked')) {
      this._likeButton.classList.remove('button_liked');
      this._likeCount.textContent =  String(this._likes.length -= 1);
      this._removeLike(this._cardId);
    }
    // Иначе меняем класс и добавляем 1 (с отправкой на сервер)
    else {
      this._likeButton.classList.add('button_liked');
      this._likeCount.textContent =  String(this._likes.length += 1);
      this._addLike(this._cardId);
    }
  }

  removeCard() {
    this._removeEventListeners()
    this._element.remove()
    this._element = null;
  }

  _setEventListeners() {
    // Отвечает за лайк
    this._element.querySelector('.button_type_like').addEventListener('click', this._like)

    // Отвечает за удаление
    this._element.querySelector('.button_type_delete').addEventListener('click', this._handleDeleteClick)

    // Отвечает за lightBox
    this._element.querySelector('.photo-grid__item').addEventListener('click', this._handleCardClick)
  }

  _removeEventListeners() {
    // Отвечает за лайк
    this._element.querySelector('.button_type_like').removeEventListener('click', this._like)

    // Отвечает за удаление
    this._element.querySelector('.button_type_delete').removeEventListener('click', this._handleDeleteClick)
    
    // Отвечает за lightBox
    this._element.querySelector('.photo-grid__item').removeEventListener('click', this._handleCardClick)
  }

  newCard() {
    this._cardTemplate();
    this._setEventListeners();
    const cardPhoto = this._element.querySelector('.photo-grid__item');
    cardPhoto.src = this._photo;
    cardPhoto.alt = this._title;
    this._element.querySelector('.photo-grid__title').textContent = this._title;
    this._element.querySelector('.photo-grid__like-counter').textContent = this._likes.length;
    // Если ID не совпадает, прячем "корзину"
    if (this._ownerId !== this._userId) {
      this._element.querySelector('.button_type_delete').style.display = 'none';
    }
    // Если в "лайках" найден наш ID, переключаем стиль лайка
    if (this._likes.find(item => item._id === this._userId)) {
      this._element.querySelector('.button_type_like').classList.toggle('button_liked');
    };
    return this._element;
  }
}

// Экспорт
export {Card}