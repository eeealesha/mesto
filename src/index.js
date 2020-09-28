import './pages/index.css'; // добавьте импорт главного файла стилей

import { initialCards } from "./script/initialCards.js";

import { Card } from "./script/Card.js";

import { FormValidator } from "./script/FormValidator.js";

import { Section } from "./script/Section.js";

import { PopupWithImage } from "./script/PopupWithImage.js"

import { UserInfo } from "./script/UserInfo.js"

import { Popup } from './script/Popup.js';

const validationInputs = {
  fieldSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".button_type_submit",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__item_error",
  errorClass: "form__error-text_active",
};

const popup = document.querySelector(".popup_type_profile");
const buttonClose = popup.querySelector(".button_type_close");

const formName = popup.querySelector(".form__item_el_name");
const formJob = popup.querySelector(".form__item_el_job");

const profileForm = document.forms["profile"];

const profile = document.querySelector(".profile");
const buttonEdit = profile.querySelector(".button_type_edit");

const profileName = profile.querySelector(".profile__title");
const profileJob = profile.querySelector(".profile__subtitle");

const buttonAdd = document.querySelector(".button_type_add");

const popupAdd = document.querySelector(".popup_type_add");
const addCardForm = document.forms["card"];
const buttonCloseAdd = popupAdd.querySelector(".button_type_close");

const popupFig = document.querySelector(".popup_type_fig");
const buttonCloseFig = popupFig.querySelector(".button_type_close");

const cardsContainer = document.querySelector(".photo-grid__list");

const formItemPlace = addCardForm.querySelector(".form__item_el_place");
const formItemImg = addCardForm.querySelector(".form__item_el_img");

//Для каждой проверяемой формы создайте экземпляр класса FormValidator

const addFromValidator = new FormValidator(validationInputs, popupAdd);
const profileFromValidator = new FormValidator(validationInputs, popup);

//Создаем попап с картинкой
const profilePop = new Popup(popup);
const imgPop = new PopupWithImage(popupFig);
profilePop.setEventListeners();
imgPop.setEventListeners();

//Создаем экземпляр класса Section для класса Card

const cardSection = new Section({
  items: initialCards, renderer: (item) => {
    return createCard({data:item, openPopup:() => {
      imgPop.openPopup(item)}}, ".cardTemplate");
  }
}, cardsContainer);

//Отрисовываем все карточки с помощью метода renderItems класса Section

cardSection.renderItems(initialCards);

//Функция создания экземпляра класса Card, применения метода generateCard и возврата готовой карточки

function createCard(item, selector, openFunction) {
  const card = new Card(item, selector, openFunction);
  const cardElement = card.generateCard();
  return cardElement;
}

//Создаем экземпляр класса UserInfo

const info = new UserInfo({ name: profileName, info: profileJob });

// Устанавливаем начальное имя и описание

info.setUserInfo("Жак-Ив Кусто́", "Французский исследователь Мирового океана, фотограф, режиссёр, изобретатель, автор множества книг и фильмов");

addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newCard = {
    name: " ",
    link: " ",
  };

  newCard.name = formItemPlace.value;
  newCard.link = formItemImg.value;

  addCardtoContainer(createCard(newCard, ".cardTemplate", openPopup))

  addCardForm.reset();

  closePopup(popupAdd);
});

function closePopup(pop) {
  pop.classList.remove("popup_opened");
  pop.removeEventListener("click", closePopupOverlay);
  document.removeEventListener("keydown", pressKey);
}

function openProfilePopup() {
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
  profileFromValidator.openCheckValidation();
  openPopup(popup);
}

function openAddPopup() {
  addCardForm.reset();
  addFromValidator.openCheckValidation();
  openPopup(popupAdd);
}

function submitFormHandler(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileJob.textContent = formJob.value;
  closePopup(popup);
}

const closePopupOverlay = function (event) {
  if (event.target !== event.currentTarget) return;
  closePopup(document.querySelector(".popup_opened"));
};

const pressKey = function (e) {
  if (e.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

//Для каждой проверяемой формы создайте экземпляр класса FormValidator

addFromValidator.enableValidation();

profileFromValidator.enableValidation();




buttonCloseFig.addEventListener("click", function () {
  closePopup(popupFig);
});
buttonAdd.addEventListener("click", openAddPopup);
buttonEdit.addEventListener("click", () => {profilePop.openPopup()});
buttonClose.addEventListener("click", function () {
  closePopup(popup);
});
buttonCloseAdd.addEventListener("click", function () {
  closePopup(popupAdd);
});
profileForm.addEventListener("submit", submitFormHandler);
