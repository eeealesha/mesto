// Импортируем компоненты, стили и константы
import "./index.css";
import { API } from '../components/API.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js'
import { UserInfo } from '../components/UserInfo.js'
import { Section } from '../components/Section.js'
import { validationInputs } from '../utils/constants.js';

// Находим на странице попап, отвечающий за редактирование профиля
const popupEditProfile = document.querySelector('.popup_type_profile');
// Находим на странице кнопку, которая будет открывать popupEditProfile
const buttonEditProfile = document.querySelector('.button_type_edit');
// Находим в popupEditProfile инпут нового имени 
const inputEditName = popupEditProfile.querySelector('.form__item_el_name');
// Находим в popupEditProfile инпут нового описания 
const inputEditAbout = document.querySelector('.form__item_el_job');
// Находим на странице попап, отвечающий за изменение аватара
const popupEditAvatar = document.querySelector('.popup_type_avatar');
// Находим на странице кнопку, которая будет открывать popupEditAvatar
const buttonEditAvatar = document.querySelector('.botton_type_avatar');
// Находим контейнер, в который будем добавлять карточки
const sectionForCards = document.querySelector('.photo-grid__list');
// Находим попап, который будет открываться при клике на картинку 
const popupWithImg = document.querySelector('.popup_type_fig');
// Находим попап, отвечающий за добавление новых карточку
const popupAddCard = document.querySelector('.popup_type_add');
// Находим кнопку, которая будет открывать popupAddCard
const buttonAddNewCard = document.querySelector('.button_type_add');
// Находим попап, отвечающий за удаление карточки 
const popupDeleteCard = document.querySelector('.popup_type_confirm');
// Создаем переменную, в которую внесем уникальый ID пользователя
let userId;

// Создаем экземпляр класса с информацией о пользователе
const aboutUser = new UserInfo(
  {
    profileNameSelector: '.profile__title',
    profileAboutSelector: '.profile__subtitle',
    profilePictureSelector: '.profile__picture'
  }
);

// Создаем экземпляр попапа с картинкой 
const popupWithImgClass = new PopupWithImage(popupWithImg);

//Для каждой проверяемой формы создааем экземпляр класса FormValidator

const addCardFromValidator = new FormValidator(validationInputs, popupAddCard);
const editProfileFromValidator = new FormValidator(validationInputs, popupEditProfile);
const editAvatarFormValidator = new FormValidator(validationInputs, popupEditAvatar);

// Создаем экземпляр класса АПИ с нашими настройками
const api = new API({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '2cbbf139-db5f-40de-8d4c-6c77fbe4b91c',
    'Content-Type': 'application/json'
  },
});



// Загружаем информацию о пользователе с сервера (имя, описание аватар) и присываем ID 
function getUserInfo() {
  api.getUserInfo()
    .then((user) => {
      aboutUser.getUserInfo(user.name, user.about, user.avatar);
      aboutUser.setUserInfo(user);
      userId = user._id;
    })
    .catch((err) => {
      console.log(err);
    });
}

// Имитация загрузки 
function renderLoad(isLoading, activePopUp, value) {
  const buttonSaveForm = activePopUp.querySelector('.button_type_submit');
  if (isLoading) {
    buttonSaveForm.textContent = 'Загрузка...';
    buttonSaveForm.setAttribute('disabled', true);
  } else {
    buttonSaveForm.textContent = value;
    buttonSaveForm.removeAttribute('disabled', true);
  }
}

// Сохраняем новую информацию о пользователе и создаем экземпляр класса попапа для редактирования
const saveProfileChanges = new PopupWithForm(popupEditProfile, {
  onSubmit: (item) => {
    renderLoad(true, popupEditProfile, 'Сохранить');
    api.sendUserInfo(item.name, item.job)
      .then((res) => {
        aboutUser.setUserInfo(res)
        saveProfileChanges.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoad(false, popupEditProfile, 'Сохранить');
      })
  }
});

// Функция, отвечающиая за открытие попапа для редактирования профиля
const openPopupEdit = () => {

  const userData = aboutUser.getUserInfo();
  inputEditName.value = userData.nameInput;
  inputEditAbout.value = userData.statusInput;
  editProfileFromValidator.openCheckValidation();
  saveProfileChanges.open();
}

// Функция, отвечающая за открытие попапа для редактирования аватара
const openPopupAvatarEdit = () => {
  editAvatarFormValidator.openCheckValidation();
  saveNewAvatar.open();
}

// Сохраняем новую аватарку и создаем экземпляр класса попапа для редактирования автара
const saveNewAvatar = new PopupWithForm(popupEditAvatar, {
  onSubmit: (item) => {
    renderLoad(true, popupEditAvatar, 'Сохранить');
    api.sendUserAvatar(item.link)
      .then((res) => {
        aboutUser.setUserInfo(res)
        saveNewAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoad(false, popupEditAvatar, 'Сохранить');
      })
  }
})

// Функция, отвечающая за отрисоку карт и создание экземпляра класса кард
function renderCard(item, position) {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      popupWithImgClass.open(item);
    },
    handleDeleteClick: () => {
      const deleteCard = new PopupWithForm(popupDeleteCard, {
        onSubmit: () => {
          renderLoad(true, popupDeleteCard, 'Да');
          api.deleteCard(card._cardId)
            .then((res) => {
              card.removeCard(res);
              deleteCard.close();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              renderLoad(false, popupDeleteCard, 'Да');
            })
        }
      });
      deleteCard.open(item);
    }
  }, '.card-template',
    () => api.addLike(item._id)
          .then((res)=>{
            card.setLikes(res);
          }),
    () => api.removeLike(item._id), userId);
  const cardElement = card.newCard();
  loadCards.addItem(cardElement, position);
}

// Функция, отвечающая за добавление карточек и создание экземпляра класса Section
const loadCards = new Section({
  renderer: (item) => {
    renderCard(item, 'append');
  }
}, sectionForCards)

// Функций, отвечающая за открытие попапа для добавление новой карточки
const openPopupCardAdd = () => {
  addCardFromValidator.openCheckValidation();
  popupAddNewCard.open();
}

// Добавление нвой карточи и создание экземпляра попапа для доабвлние карточек
const popupAddNewCard = new PopupWithForm(popupAddCard, {
  onSubmit: (item) => {
    renderLoad(true, popupAddCard, 'Создать');
    api.postNewCard(item.place, item.img)
      .then((res) => {
        renderCard(res, 'prepend');
        popupAddNewCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoad(false, popupAddCard, 'Создать');
      })
  }
});

// Устанавливаем слушателя на кнопку редактирования
buttonEditProfile.addEventListener('click', () => openPopupEdit());
// Устанавливаем слушателя на кнопку добавления карточки
buttonAddNewCard.addEventListener('click', () => openPopupCardAdd());
// Устанавливаем слушателя на кнопку сохранения нового автара
buttonEditAvatar.addEventListener('click', () => openPopupAvatarEdit());

// Загружаем информацию о пользователе 
getUserInfo();

// Загружаем карочки с сервера 

api.getInitialCards()
  .then((res) => {
    loadCards.renderItems(res)
  })
  .catch((err) => {
    console.log(err);
  });

// Активирвуем валидацию форм 

addCardFromValidator.enableValidation();
editProfileFromValidator.enableValidation();
editAvatarFormValidator.enableValidation();
