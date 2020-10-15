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

// Выбор попапа с формой изменения имени и статуса
export const popupEdit = document.querySelector('.popup_type_profile');
// Выбор попапа с формой изменения имени и статуса
export const avatarEdit = document.querySelector('.popup_type_avatar');
// Выбор кнопки "карандаш"
export const editButtonInfo = document.querySelector('.button_type_edit');
// Кнопка "карандаш" (аватар)
export const editButtonAvatar = document.querySelector('.botton_type_avatar');
// Выбор инпута смены имени
export const nameChange = document.querySelector('.form__item_el_name');
// Выбор инпута смены статуса
export const statusChange = document.querySelector('.form__item_el_job');
// Секция cards
export const sectionCards = document.querySelector('.photo-grid__list');
//
export const lightBox = document.querySelector('.popup_type_fig');
// Попап для добавления карточек
// Выбор попапа с формой добавления фотокарточки
export const popupCardAdd = document.querySelector('.popup_type_add');
// Выбор кнопки "плюс"
export const cardAddButton = document.querySelector('.button_type_add');
// Выбор попапа удаления
export const popupDeleteCard = document.querySelector('.popup_type_confirm');

// Выбор тега имени и статуса
const aboutUser = new UserInfo(
  {
    profileName: '.profile__title',
    profileStatus: '.profile__subtitle',
    profileAvatar: '.profile__picture'
  }
);

// Выбор попапа "lightbox"
const lightBoxOpen = new PopupWithImage(lightBox);
// Выбор класса FormValidator для работы функций
//const form = new FormValidator(formValidationOptions, formValidation);

//Для каждой проверяемой формы создайте экземпляр класса FormValidator

const addFromValidator = new FormValidator(validationInputs, popupCardAdd);
const profileFromValidator = new FormValidator(validationInputs, popupEdit);
const avatarFormValidator = new FormValidator(validationInputs, avatarEdit);

// Выбор API
const api = new API({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '2cbbf139-db5f-40de-8d4c-6c77fbe4b91c',
    'Content-Type': 'application/json'
  },
});

// Пустая переменная для ID
let userId;

// Функция загрузки имени из сервера
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

// Функция информирующая о загрузке
function renderLoad(isLoading, blockPop, value) {
  const buttonSaveForm = blockPop.querySelector('.button_type_submit');
  if (isLoading) {
    buttonSaveForm.textContent = 'Загрузка...';
    buttonSaveForm.setAttribute('disabled', true);
  } else {
    buttonSaveForm.textContent = value;
    buttonSaveForm.removeAttribute('disabled', true);
  }
}

// Сохраняет изменения в форме изменения имени и статуса
const saveChanges = new PopupWithForm(popupEdit, {
  onSubmit: (item) => {
    renderLoad(true, popupEdit, 'Сохранить');
    api.sendUserInfo(item.name, item.job)
      .then((res) => {
        aboutUser.setUserInfo(res)
        saveChanges.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoad(false, popupEdit, 'Сохранить');
      })
  }
});

// Открытие попапа с пустыми инпутами (форма изменения имени и статуса) 
const openPopupEdit = () => {

  const userData = aboutUser.getUserInfo();
  nameChange.value = userData.nameInput;
  statusChange.value = userData.statusInput;
  profileFromValidator.openCheckValidation();
  saveChanges.open();
}

// Открытие попапа с пустыми инпутами (форма изменения профиля аватара)
const openAvatarEdit = () => {
  avatarFormValidator.openCheckValidation();
  saveAvatar.open();
}

// Сохранение нового аватара (форма изменения профиля аватара)
const saveAvatar = new PopupWithForm(avatarEdit, {
  onSubmit: (item) => {
    renderLoad(true, avatarEdit, 'Создать');
    api.sendUserAvatar(item.link)
      .then((res) => {
        aboutUser.setUserInfo(res)
        saveAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoad(false, avatarEdit, 'Создать');
      })
  }
})

// Функция рендера карт
function renderCard(item, position) {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      lightBoxOpen.open(item);
    },
    handleDeleteClick: () => {
      const deleteCard = new PopupWithForm(popupDeleteCard, {
        onSubmit: () => {
          renderLoad(true, popupDeleteCard, 'Да');
          api.deleteCard(card._cardId)
            .then((res) => {
              card._remove(res);
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
            console.log(item)
            item.setLikes(res);
          }),
    () => api.removeLike(item._id), userId);
  const cardElement = card.newCard();
  loadCards.addItem(cardElement, position);
}

// Константа: при вызове загрузит карты из массива
const loadCards = new Section({
  renderer: (item) => {
    renderCard(item, 'append');
  }
}, sectionCards)

// Открытие попапа с пустыми инпутами (форма добавления фотокарточек)
const openPopupCardAdd = () => {
  addFromValidator.openCheckValidation();
  popupNewCard.open();
}

// Добавляет новые фотокарточки
const popupNewCard = new PopupWithForm(popupCardAdd, {
  onSubmit: (item) => {
    renderLoad(true, popupCardAdd, 'Создать');
    api.postNewCard(item.place, item.img)
      .then((res) => {
        renderCard(res, 'prepend');
        popupNewCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoad(false, popupCardAdd, 'Создать');
      })
  }
});

// Кнопка "карандаш"
editButtonInfo.addEventListener('click', () => openPopupEdit());
// Кнопка "плюс"
cardAddButton.addEventListener('click', () => openPopupCardAdd());
// Кнопка "карандаш" (аватар)
editButtonAvatar.addEventListener('click', () => openAvatarEdit());

// Загружаем имя и статус с сервера
getUserInfo();

// Загружаем фотокарточки
api.getInitialCards()
  .then((res) => {
    loadCards.renderItems(res)
  })
  .catch((err) => {
    console.log(err);
  });

// Функция валидации из модуля
addFromValidator.enableValidation();
profileFromValidator.enableValidation();
avatarFormValidator.enableValidation();
