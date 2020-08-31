const validationInputs = {
    formSelector: '.popup__container',
    fieldsetSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.button_type_submit',
    inactiveButtonClass: '.button_inactive',
    inputErrorClass: '.form__item_error',
    errorClass: '.form__error-text_active'
}

function findError(formElement, inputElement) {
    return formElement.querySelector(`#${inputElement.id}-error`);
}

function showError(formElement, inputElement, errorMessage) {
    const errorElement = findError(formElement, inputElement);
    inputElement.classList.add(validationInputs.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationInputs.errorClass);
}

function hideError(formElement, inputElement) {
    const errorElement = findError(formElement, inputElement);
    inputElement.classList.remove(validationInputs.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(validationInputs.errorClass);
}

function hasInvalidInput(formInputs) {
    return formInputs.some(inputElement => {
        return !inputElement.validity.valid;
    })
}

function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideError(formElement, inputElement);
    }
}

function toggleButtonState(formInputs, formSubmitButton) {
    if (hasInvalidInput(formInputs)) {
        formSubmitButton.disabled = true;
        formSubmitButton.classList.add(validationInputs.inactiveButtonClass);
    } else {
        formSubmitButton.disabled = false;
        formSubmitButton.classList.remove(validationInputs.inactiveButtonClass);
    }
}

function inputEventListener(evt) {
    const formElement = evt.target.form;
    const inputElement = evt.srcElement;
    const formInputs = Array.from(formElement.querySelectorAll(validationInputs.inputSelector));
    const formSubmitButton = formElement.querySelector(validationInputs.submitButtonSelector);
    checkInputValidity(formElement, inputElement);
    toggleButtonState(formInputs, formSubmitButton);
}

function openCheckValidity(formElement) {
    const formInputs = Array.from(formElement.querySelectorAll(validationInputs.inputSelector));
    const formSubmitButton = formElement.querySelector(validationInputs.submitButtonSelector);
    formInputs.forEach((inputElement) => {
        checkInputValidity(formElement, inputElement);
    });
    toggleButtonState(formInputs, formSubmitButton);
};

function setEventListeners(formElement) {
    const formInputs = Array.from(formElement.querySelectorAll(validationInputs.inputSelector));
    const formSubmitButton = formElement.querySelector(validationInputs.submitButtonSelector);
    toggleButtonState(formInputs, formSubmitButton);
    formInputs.forEach(inputElement => {
        inputElement.addEventListener('input', inputEventListener);
    })
}

function enableValidation(settingsObject) {
    const formsList = Array.from(document.querySelectorAll(settingsObject.formSelector));
    formsList.forEach(formElement => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        })
        const fieldsetList = Array.from(formElement.querySelectorAll(settingsObject.fieldsetSelector));
        fieldsetList.forEach(fieldset => {
            setEventListeners(fieldset);
        })
    })
}

enableValidation(validationInputs);

