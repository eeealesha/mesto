export class FormValidator {
  constructor(validationInputs, formHTMLSelector) {
    this._fieldSelector = validationInputs.fieldSelector;
    this._inputSelector = validationInputs.inputSelector;
    this._submitButtonSelector = validationInputs.submitButtonSelector;
    this._inactiveButtonClass = validationInputs.inactiveButtonClass;
    this._inputErrorClass = validationInputs.inputErrorClass;
    this._errorClass = validationInputs.errorClass;
    this._formSelector = formHTMLSelector;
  }

  enableValidation() { 
    this._formSelector.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    const fieldsetList = Array.from(
      this._formSelector.querySelectorAll(this._fieldSelector)
    );
    fieldsetList.forEach((element) => {
      this._setEventListeners(element);
    });
  }

  openCheckValidation() {
    this._activeInputs.forEach((inputElement) => {
      this._checkInputValidity(inputElement);
    });
    this._toggleButtonState();
  }

  _setEventListeners(element) {
    this._activeInputs = Array.from(
      element.querySelectorAll(this._inputSelector)
    );
    
    this._activeInputs.forEach((element) => {
      element.addEventListener("input", () => {
        this._inputEventListener();
      });
    });
  }

  _inputEventListener() {
    this._activeInputs.forEach((element) => {
        console.log(element)
        this._checkInputValidity(element);
        this._toggleButtonState();
        });
  }

  _checkInputValidity(element) {
    const error = this._findError(element);
    if (!element.checkValidity()) {
      this._showError(element, element.validationMessage, error);
    } else {
      this._hideError(element, error);
    }
  }

  _findError(element) {
    return this._formSelector.querySelector(`#${element.id}-error`);
  }

  _toggleButtonState() {
    this._formSubmitButton = this._formSelector.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput(this._activeInputs)) {
      this._formSubmitButton.disabled = true;
      this._formSubmitButton.classList.add(this._inactiveButtonClass);
    } else {
      this._formSubmitButton.disabled = false;
      this._formSubmitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  _hasInvalidInput() {
    return this._activeInputs.some((element) => {
      return !element.validity.valid;
    });
  }

  _showError(inputElement, errorMessage, error) {
    inputElement.classList.add(this._inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._errorClass);
  }

  _hideError(inputElement, error) {
    inputElement.classList.remove(this._inputErrorClass);
    error.textContent = "";
    error.classList.remove(this._errorClass);
  }

  

  
}
