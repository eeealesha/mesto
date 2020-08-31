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

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardsContainer = document.querySelector(".photo-grid__list");

const card = document.querySelector(".cardTemplate").content;

const popupImg = document.querySelector(".popup__img");
const popupFigCap = document.querySelector(".popup__figcaption");

const formItemPlace = addCardForm.querySelector(".form__item_el_place");
const formItemImg = addCardForm.querySelector(".form__item_el_img");

const addCardToContainer = (initialCard) => {
  const cardElement = card.cloneNode(true);

  cardElement.querySelector(".photo-grid__title").textContent =
    initialCard.name;
  cardElement.querySelector(".photo-grid__item").src = initialCard.link;

  cardElement
    .querySelector(".button_type_delete")
    .addEventListener("click", (event) => {
      const card = event.target.closest(".card__element");
      card.remove();
    });

  cardElement
    .querySelector(".button_type_like")
    .addEventListener("click", (event) => {
      const button = event.target.closest(".button");
      button.classList.toggle("button_liked");
    });

  cardElement
    .querySelector(".photo-grid__item")
    .addEventListener("click", (event) => {
      popupImg.src = initialCard.link;
      popupFigCap.textContent = initialCard.name;
      openPopup(popupFig);
      popupFig.addEventListener("click", closePopupOverlay);
    });

  cardsContainer.prepend(cardElement);
};

initialCards.forEach(addCardToContainer);

addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newCard = {
    name: " ",
    link: " ",
  };

  newCard.name = formItemPlace.value;
  newCard.link = formItemImg.value;

  addCardToContainer(newCard);

  addCardForm.reset();

  closePopup(popupAdd);
});

function openPopup(pop) {
  pop.classList.remove("popup_closed");
}

function closePopup(pop) {
  pop.classList.add("popup_closed");
}

function openProfilePopup() {
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
  openCheckInputValidity(formElement);
  openPopup(popup);
  popup.addEventListener("click", closePopupOverlay);
  document.addEventListener("keydown", keyPress);
}

function openAddPopup() {
  formItemPlace.value = "";
  formItemImg.value = "";
  openCheckInputValidity(addCardForm);
  openPopup(popupAdd);
  popupAdd.addEventListener("click", closePopupOverlay);
  document.addEventListener("keydown", keyPress);
}

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = formName.value;
  profileJob.textContent = formJob.value;
  closePopup(popup);
}

const closePopupOverlay = function (event) {
  if (event.target !== event.currentTarget) return;
  allPopup.forEach((pop) => {
    closePopup(pop);
    pop.removeEventListener("click", closePopupOverlay);
  });
};

const keyPress = function (e) {
  if (e.key === "Escape") {
    allPopup.forEach((pop) => {
      closePopup(pop);
      pop.removeEventListener("click", keyPress);
    });
  }
};

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
formElement.addEventListener("submit", formSubmitHandler);
