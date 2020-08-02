let popup = document.querySelector(".popup");
let buttonClose = popup.querySelector(".button_type_close");

let formName = popup.querySelector(".form__item_el_name");
let formJob = popup.querySelector(".form__item_el_job");

let formElement = document.querySelector(".popup__container");

let profile = document.querySelector(".profile");
let buttonEdit = profile.querySelector(".button_type_edit");

let profileName = profile.querySelector(".profile__title");
let profileJob = profile.querySelector(".profile__subtitle");

function popupOpen() {
    popup.classList.remove("popup_closed");
    formName.value = profileName.textContent;
    formJob.value = profileJob.textContent;
}

function popupClose() {
    popup.classList.add("popup_closed");
}

buttonEdit.addEventListener("click", popupOpen);
buttonClose.addEventListener("click", popupClose);

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = formName.value;
    profileJob.textContent = formJob.value;
    popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);

