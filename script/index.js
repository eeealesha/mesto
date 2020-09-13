import { initialCards } from "./initialCards.js";

import { Card } from "./Card.js";

import { FormValidator } from "./FormValidator.js";

const allPopup = document.querySelectorAll(".popup");

const popup = document.querySelector(".popup_type_profile");
const buttonClose = popup.querySelector(".button_type_close");

const formName = popup.querySelector(".form__item_el_name");
const formJob = popup.querySelector(".form__item_el_job");

const formElement = document.querySelector(".popup__container");

const profile = document.querySelector(".profile");
const buttonEdit = profile.querySelector(".button_type_edit");

const profileName = profile.querySelector(".profile__title");
const profileJob = profile.querySelector(".profile__subtitle");

const buttonAdd = document.querySelector(".button_type_add");

const popupAdd = document.querySelector(".popup_type_add");
const addCardForm = popupAdd.querySelector(".popup__container_type_add");
const buttonCloseAdd = popupAdd.querySelector(".button_type_close");

const popupFig = document.querySelector(".popup_type_fig");
const buttonCloseFig = popupFig.querySelector(".button_type_close");

const cardsContainer = document.querySelector(".photo-grid__list");

const formItemPlace = addCardForm.querySelector(".form__item_el_place");
const formItemImg = addCardForm.querySelector(".form__item_el_img");

initialCards.forEach((item) => {
  const card = new Card(item, ".cardTemplate", openPopup);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
});

addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newCard = {
    name: " ",
    link: " ",
  };

  newCard.name = formItemPlace.value;
  newCard.link = formItemImg.value;

  const card = new Card(newCard, ".cardTemplate", openPopup);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);

  addCardForm.reset();

  closePopup(popupAdd);
});

function openPopup(pop) {
  pop.classList.remove("popup_closed");
  pop.addEventListener("click", closePopupOverlay);
  document.addEventListener("keydown", pressKey);
}

function closePopup(pop) {
  pop.classList.add("popup_closed");
  pop.removeEventListener("click", closePopupOverlay);
  document.removeEventListener("keydown", pressKey);
}

function openProfilePopup() {
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
  
  openPopup(popup);
}

function openAddPopup() {
  formItemPlace.value = "";
  formItemImg.value = "";
  
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
  allPopup.forEach((pop) => {
    closePopup(pop);
  });
};

const pressKey = function (e) {
  if (e.key === "Escape") {
    allPopup.forEach((pop) => {
      closePopup(pop);
    });
  }
};

const validationInputs = {
  formSelector: '.popup__container',
  fieldSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__item_error',
  errorClass: 'form__error-text_active'
}

const addFromValidator = new FormValidator(validationInputs, popupAdd);

addFromValidator.enableValidation();

const profileFromValidator = new FormValidator(validationInputs, popup);

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
formElement.addEventListener("submit", submitFormHandler);

