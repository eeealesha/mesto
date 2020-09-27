import './pages/index.css'; // добавьте импорт главного файла стилей

import { initialCards } from "./script/initialCards.js";

import { Card } from "./script/Card.js";

import { FormValidator } from "./script/FormValidator.js";

import { Section } from "./script/Section.js";

import { Popup } from "./script/Popup.js";

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

const cardSection = new Section({ items: initialCards, renderer: (item) =>{
  return createCard(item, ".cardTemplate", openPopup);
}}, cardsContainer);

cardSection.renderItems(initialCards)

function createCard(item, selector, openFunction) {
  const card = new Card(item, selector, openFunction);
  const cardElement = card.generateCard();
  return cardElement;
}

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

function openPopup(pop) {
  pop.classList.add("popup_opened");
  pop.addEventListener("click", closePopupOverlay);
  document.addEventListener("keydown", pressKey);
}

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
buttonEdit.addEventListener("click", openProfilePopup);
buttonClose.addEventListener("click", function () {
  closePopup(popup);
});
buttonCloseAdd.addEventListener("click", function () {
  closePopup(popupAdd);
});
profileForm.addEventListener("submit", submitFormHandler);
