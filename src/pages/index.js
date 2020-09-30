import './index.css'; // добавьте импорт главного файла стилей

import { initialCards } from "../script/initialCards.js";

import { Card } from "../script/Card.js";

import { FormValidator } from "../script/FormValidator.js";

import { Section } from "../script/Section.js";

import { PopupWithImage } from "../script/PopupWithImage.js"

import { UserInfo } from "../script/UserInfo.js"

import { PopupWithForm } from '../script/PopupWithForm.js';

import { validationInputs } from '../utils/constants.js';

const popup = document.querySelector(".popup_type_profile");


const formName = popup.querySelector(".form__item_el_name");
const formJob = popup.querySelector(".form__item_el_job");



const profile = document.querySelector(".profile");
const buttonEdit = profile.querySelector(".button_type_edit");

const profileName = profile.querySelector(".profile__title");
const profileJob = profile.querySelector(".profile__subtitle");

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
  info.setUserInfo(data.name, data.job);
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

//Создаем экземпляр класса UserInfo

const info = new UserInfo({ name: profileName, info: profileJob });

// Устанавливаем начальное имя и описание

info.setUserInfo("Жак-Ив Кусто́", "Французский исследователь Мирового океана, фотограф, режиссёр, изобретатель, автор множества книг и фильмов");

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
  const userProfile = info.getUserInfo();
  formName.value = userProfile.name;
  formJob.value = userProfile.info;
  profilePop.openPopup();
  profileFromValidator.openCheckValidation();

}

function openAddPopup() {
  addFromValidator.openCheckValidation();
  addPop.openPopup();
}


//Для каждой проверяемой формы создайте экземпляр класса FormValidator

addFromValidator.enableValidation();

profileFromValidator.enableValidation();

buttonAdd.addEventListener("click", openAddPopup);
buttonEdit.addEventListener("click", openProfilePopup);
