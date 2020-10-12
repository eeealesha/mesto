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
//let profileName = profile.querySelector(".profile__title");
//let profileJob = profile.querySelector(".profile__subtitle");
const buttonEdit = profile.querySelector(".button_type_edit");

const buttonAdd = document.querySelector(".button_type_add");

const popupAdd = document.querySelector(".popup_type_add");
const addCardForm = document.forms["card"];


const popupFig = document.querySelector(".popup_type_fig");


const cardsContainer = document.querySelector(".photo-grid__list");


//Для каждой проверяемой формы создайте экземпляр класса FormValidator

const addFromValidator = new FormValidator(validationInputs, popupAdd);
const profileFromValidator = new FormValidator(validationInputs, popup);

//Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
//Создаем попап с картинкой

const imgPop = new PopupWithImage(popupFig);
imgPop.setEventListeners();

//Создаем попап с формой/профилем

const profilePop = new PopupWithForm(popup, profileSubmit);
profilePop.setEventListeners();

//Функция обработки формы профиля 

function profileSubmit(data) {
  Info.setUserInfo(data.name, data.job);
}

//Создаем попап с функцией добавления карточки 

const addPop = new PopupWithForm(popupAdd, addSubmit);
addPop.setEventListeners();

//Функция обработки формы профиля 

function addSubmit(item) {
  console.log(item)

  cardSection.addItem(createCard({
    data: {name:item.place, link:item.img}, openPopup: () => {
      imgPop.openPopup({name:item.place, link:item.img})
    }
  }, ".cardTemplate"));
}





//Создаем экземпляр класса Section для класса Card

const cardSection = new Section({
  items: initialCards, renderer: (item) => {
    return createCard({
      data: item, openPopup: () => {
        imgPop.openPopup(item)
      }
    }, ".cardTemplate");
  }
}, cardsContainer);

//Отрисовываем все карточки с помощью метода renderItems класса Section

cardSection.renderItems(initialCards);

//Функция создания экземпляра класса Card, применения метода generateCard и возврата готовой карточки

function createCard(item, openFunction, selector) {
  const card = new Card(item, openFunction, selector);
  const cardElement = card.generateCard();
  return cardElement;
}

function openProfilePopup() {
  const userProfile = Info.getUserInfo();
  formName.value = userProfile.name;
  formJob.value = userProfile.info;
  profilePop.openPopup();
  profileFromValidator.openCheckValidation();

}

function openAddPopup() {
  addFromValidator.openCheckValidation();
  addPop.openPopup();
}

// Загружаю информацию профиля на сайт

Promise.all([Api.getUserProfile()])
  .then((data) => {
    const [info] = data;
    console.log(info);
    //Создаем экземпляр класса UserInfo
    const Info = new UserInfo({ name: "", info: "" });
    // Устанавливаем начальное имя и описание с сервера
    Info.setUserInfo(info.name, info.about);
    // Устанавливаем начальный аватар с сервера 
    Info.setUserImg(info.avatar);
  })




//Для каждой проверяемой формы создайте экземпляр класса FormValidator

addFromValidator.enableValidation();

profileFromValidator.enableValidation();

buttonAdd.addEventListener("click", openAddPopup);
buttonEdit.addEventListener("click", openProfilePopup);
