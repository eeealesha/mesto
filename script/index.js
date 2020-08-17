let popup = document.querySelector(".popup_type_profile");
const buttonClose = popup.querySelector(".button_type_close");

let formName = popup.querySelector(".form__item_el_name");
let formJob = popup.querySelector(".form__item_el_job");

let formElement = document.querySelector(".popup__container");

let profile = document.querySelector(".profile");
const buttonEdit = profile.querySelector(".button_type_edit");

let profileName = profile.querySelector(".profile__title");
let profileJob = profile.querySelector(".profile__subtitle");

const buttonAdd = document.querySelector(".button_type_add");

let popupAdd = document.querySelector(".popup_type_add");
let addCardForm = popupAdd.querySelector(".popup__container_type_add");
const buttonCloseAdd = popupAdd.querySelector(".button_type_close");

let popupFig = document.querySelector(".popup_type_fig");
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


const addCardToContainer = initialCard => {

  const cardElement = document.querySelector(".cardTemplate").content.cloneNode(true)

  cardElement.querySelector(".photo-grid__title").textContent = initialCard.name
  cardElement.querySelector(".photo-grid__item").src = initialCard.link

  cardElement.querySelector(".button_type_delete").addEventListener("click", event => {
    const card = event.target.closest(".card__element")
    card.remove()
  })

  cardElement.querySelector(".button_type_like").addEventListener("click", event => {
    const button = event.target.closest(".button")
    button.classList.toggle("button_liked")
  })

  cardElement.querySelector(".photo-grid__item").addEventListener("click", event => {
    document.querySelector(".popup__img").src = initialCard.link
    document.querySelector(".popup__figcaption").textContent = initialCard.name
    popupFig.classList.toggle("popup_closed")
  })

  cardsContainer.prepend(cardElement)
}

initialCards.forEach(addCardToContainer)

addCardForm.addEventListener("submit", event => {

  event.preventDefault()

  const newCard = {
    name: " ",
    link: " "
  }

  newCard.name = addCardForm.querySelector(".form__item_el_place").value;
  newCard.link = addCardForm.querySelector(".form__item_el_img").value;

  addCardToContainer(newCard)

  addCardForm.reset()

  popupAddClose()
})

function popupOpen() {
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
  popup.classList.remove("popup_closed");
}

function popupAddOpen() {
  popupAdd.classList.remove("popup_closed");
}

function popupClose() {
  popup.classList.add("popup_closed");
}

function popupAddClose() {
  popupAdd.classList.add("popup_closed");
}

function popupFigClose() {
  popupFig.classList.add("popup_closed");
}

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = formName.value;
  profileJob.textContent = formJob.value;
  popupClose();
}

buttonCloseFig.addEventListener("click", popupFigClose);
buttonAdd.addEventListener("click", popupAddOpen);
buttonEdit.addEventListener("click", popupOpen);
buttonClose.addEventListener("click", popupClose);
buttonCloseAdd.addEventListener("click", popupAddClose);
formElement.addEventListener("submit", formSubmitHandler);
