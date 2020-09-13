const validationInputs = {
    formSelector: '.popup__container',
    fieldSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.button_type_submit',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'form__item_error',
    errorClass: 'form__error-text_active'
  }

export class FormValidator {
    constructor(validationInputs, formHTMLSelector) {
        this._formSelector = validationInputs.formSelector;
        this._fieldSelector = validationInputs.fieldSelector;
        this._inputSelector = validationInputs.inputSelector;
        this._submitButtonSelector = validationInputs.submitButtonSelector;
        this._inactiveButtonClass = validationInputs.inactiveButtonClass;
        this._inputErrorClass = validationInputs.inputErrorClass;
        this._errorClass = validationInputs.errorClass;
        this._formHTMLSelector = formHTMLSelector;
    }

    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideError(formElement, inputElement);
        }
    }

    openCheckInputValidity(formElement) {
        const formInputs = Array.from(formElement.querySelectorAll(this._inputSelector));
        const formSubmitButton = formElement.querySelector(this._submitButtonSelector);
        formInputs.forEach((inputElement) => {
            this._checkInputValidity(formElement, inputElement);
        });
        this._toggleButtonState(formInputs, formSubmitButton);
    };

    _inputEventListener(evt) {
        const formElement = evt.target.form;
        const inputElement = evt.srcElement;
        const formInputs = Array.from(formElement.querySelectorAll(this._inputSelector));
        const formSubmitButton = formElement.querySelector(this._submitButtonSelector);
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(formInputs, formSubmitButton);
    }
    
    _setEventListeners(formElement) {
        const formInputs = Array.from(formElement.querySelectorAll(this._inputSelector));
        const formSubmitButton = formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(formInputs, formSubmitButton);
        formInputs.forEach(inputElement => {
            inputElement.addEventListener('input', this._inputEventListener);
        })
    }

    _findError(formElement, inputElement) {
        return formElement.querySelector(`#${inputElement.id}-error`);
    }
    
    _showError(formElement, inputElement, errorMessage) {
        const errorElement = findError(formElement, inputElement);
        inputElement.classList.add(this_.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this_.errorClass);
    }
    _hasInvalidInput(formInputs) {
        return formInputs.some(inputElement => {
            return !inputElement.validity.valid;
        })
    }
    
    _toggleButtonState(formInputs, formSubmitButton) {
        if (this._hasInvalidInput(formInputs)) {
            formSubmitButton.disabled = true;
            formSubmitButton.classList.add(this._inactiveButtonClass);
        } else {
            formSubmitButton.disabled = false;
            formSubmitButton.classList.remove(this._inactiveButtonClass);
        }
    }
    
    _hideError(formElement, inputElement) {
        const errorElement = findError(formElement, inputElement);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    }

    enableValidation() {
        const formElement = document.querySelector(this._formSelector);
        const formsList = Array.from(document.querySelectorAll(this._formSelector));
        const formSubmitButton = formElement.querySelector(this._submitButtonSelector);
        formsList.forEach(formElement => {
            formElement.addEventListener('submit', function (evt) {
                evt.preventDefault(formSubmitButton);
            })
            const fieldsetList = Array.from(formElement.querySelectorAll(this._fieldSelector));
            fieldsetList.forEach(fieldset => {
                this._setEventListeners(fieldset);
            })
        })
    }
}












