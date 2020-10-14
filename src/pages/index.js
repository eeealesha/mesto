import './index.css'; // добавьте импорт главного файла стилей

import { initialCards } from "../utils/constants.js";

import { Card } from "../components/Card.js";

import { FormValidator } from "../components/FormValidator.js";

import { Section } from "../components/Section.js";

import { PopupWithImage } from "../components/PopupWithImage.js"

import { UserInfo } from "../components/UserInfo.js"

import { PopupWithForm } from '../components/PopupWithForm.js';

//Импортирую класс АПИ

import { API } from "../components/API.js"

//Импортрую токен 

import { validationInputs, token } from '../utils/constants.js';

//Создаю экземпляр класса АПИ

console.log(token)

const Api = new API(token);

const popup = document.querySelector(".popup_type_profile");


const formName = popup.querySelector(".form__item_el_name");
const formJob = popup.querySelector(".form__item_el_job");

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__title");
const profileJob = profile.querySelector(".profile__subtitle");
const buttonEdit = profile.querySelector(".button_type_edit");

const buttonAdd = document.querySelector(".button_type_add");

const popupAdd = document.querySelector(".popup_type_add");
const addCardForm = document.forms["card"];


const popupFig = document.querySelector(".popup_type_fig");

const buttonAvatar = document.querySelector(".botton_type_avatar");

const cardsContainer = document.querySelector(".photo-grid__list");

//Находим попап для замены аватарки

const avatarPop = document.querySelector(".popup_type_avatar")

//Для каждой проверяемой формы создайте экземпляр класса FormValidator

const addFromValidator = new FormValidator(validationInputs, popupAdd);
const profileFromValidator = new FormValidator(validationInputs, popup);
const avatarFormValidator = new FormValidator(validationInputs, avatarPop);
//Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
//Создаем попап с картинкой

const imgPop = new PopupWithImage(popupFig);
imgPop.setEventListeners();









//Функция создания экземпляра класса Card, применения метода generateCard и возврата готовой карточки

function createCard(item, openFunction, selector) {
  const card = new Card(item, openFunction, selector);
  const cardElement = card.generateCard();
  return cardElement;
}





// Загружаю информацию профиля на сайт

Promise.all([Api.getUserProfile(), Api.loadCards()])
  .then((data) => {
    const [info, cards] = data;
    //Создаем экземпляр класса UserInfo
    const Info = new UserInfo({ name: info.name, info: info.about });
    // Устанавливаем начальное имя и описание с сервера
    Info.setUserInfo(info.name, info.about);
    // Устанавливаем начальный аватар с сервера 
    Info.setUserImg(info.avatar);
    // Сохрвняем нам уникальный ID 
    const userID = info._id;
    //Создаем попап с формой/профилем
    const profilePop = new PopupWithForm(popup, profileSubmit);
    //Устанавливаем слушатели
    profilePop.setEventListeners();
    //Создаем функцию открытия попапа для редактирования профиля
    function openProfilePopup() {
      formName.value = profileName.textContent;
      formJob.value = profileJob.textContent;
      profilePop.openPopup();
      profileFromValidator.openCheckValidation();
    }
    //Добавляем слушателя кнопке редактирования профиля
    buttonEdit.addEventListener("click", openProfilePopup);
    //Функция обработки формы профиля 
    function profileSubmit(data) {
      //Отравка данных на сервер
      Api.setUserProfile(data.name, data.job)
        .then((data) => {
          //сохранение данных
          Info.setUserInfo(data.name, data.about);
        })
        .then(() => {
          //возвращаю нормальное состояние кнопке сохранить
          popup.querySelector(".button_type_submit").textContent = "Сохранить";
          profilePop.closePopup();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //Создаем экземпляр попапа для редактирования попапа
    const avatarPopUP = new PopupWithForm(avatarPop, avatarSubmit);
    //Устанавливаем слушатели
    avatarPopUP.setEventListeners();
    //Добавляем слушателя кнопке редактирования аватара
    buttonAvatar.addEventListener("click", openAvatarPopup);
    //Функция открытия попапа с аватаром
    function openAvatarPopup() {
      avatarPopUP.openPopup();
      avatarFormValidator.openCheckValidation();
    }
    //Функция обработки формы аватара
    function avatarSubmit(avatar) {
      //Отравка данных на сервер
      Api.setUserAvatar(avatar)
        .then((avatar) => {
          //сохранение данных
          Info.setUserImg(avatar);
        })
        .then(() => {
          //возвращаю нормальное состояние кнопке сохранить
          popup.querySelector(".button_type_submit").textContent = "Сохранить";
          profilePop.closePopup();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //Создаем экземпляр класса Section для класса Card

    const cardSection = new Section({
      items: cards, renderer: (item) => {
        return createCard({
          data: item, userID: userID, openPopup: () => {
            imgPop.openPopup(item)
          }, cardPutLike: () => { Api.cardPutLike(item._id) },
          cardDeleteLike: () => { Api.cardDeleteLike(item._id) }
        }, ".cardTemplate");
      }
    }, cardsContainer);

    //Отрисовываем все карточки с помощью метода renderItems класса Section
    cardSection.renderItems(cards);

    //Создаем попап с функцией добавления карточки 
    const addPop = new PopupWithForm(popupAdd, addSubmit);

    buttonAdd.addEventListener("click", openAddPopup);

    addPop.setEventListeners();

    function openAddPopup() {
      addFromValidator.openCheckValidation();
      addPop.openPopup();
    }

    //Функция обработки формы профиля 

    function addSubmit(item) {
      Api.setCard(item.place, item.img)
        .then((item) => {
          cardSection.addItem(createCard({
            data: item, userID: userID, openPopup: () => {
              imgPop.openPopup(item)
            }, cardPutLike: () => { Api.cardPutLike(item._id) },
            cardDeleteLike: () => { Api.cardDeleteLike(item._id) }
          }, ".cardTemplate"));
        })
        .then(() => {
          //возвращаю нормальное состояние кнопке сохранить
          addPop.querySelector(".button_type_submit").textContent = "Сохранить";
          addPop.closePopup();
        })
        .catch((err) => {
          console.log(err);
        });
    }

  })




//Для каждой проверяемой формы создайте экземпляр класса FormValidator

addFromValidator.enableValidation();

profileFromValidator.enableValidation();

avatarFormValidator.enableValidation();



