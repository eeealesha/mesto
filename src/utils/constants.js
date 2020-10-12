export const validationInputs = {
    fieldSelector: ".form",
    inputSelector: ".form__item",
    submitButtonSelector: ".button_type_submit",
    inactiveButtonClass: "button_inactive",
    inputErrorClass: "form__item_error",
    errorClass: "form__error-text_active",
  };

  export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

  export const token = { 
    generalURL: "https://mesto.nomoreparties.co/v1/cohort-16",
    headers: {
      authorization: "2cbbf139-db5f-40de-8d4c-6c77fbe4b91c",
      "Content-Type":"application/json"
    }
  }