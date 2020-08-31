const validationInputs = {
  formSelector: ".popup__container",
  fieldSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".button_type_submit",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: ".form__item_error",
  errorClass: ".form__error-text_active",
};

console.log(validationInputs.inactiveButtonClass);

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationInputs.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationInputs.inactiveButtonClass);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationInputs.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationInputs.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationInputs.inputErrorClass);
  errorElement.classList.remove(validationInputs.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationInputs.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationInputs.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (validationInputs) => {
  const formList = Array.from(
    document.querySelectorAll(validationInputs.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(
      formElement.querySelectorAll(validationInputs.fieldSelector)
    );

    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

enableValidation(validationInputs);
