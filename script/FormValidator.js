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
    fieldsetList.forEach((field) => {
      this._setEventListeners(field);
    });
  }

  openCheckValidation() {
    this._activeInputs.forEach((input) => {
      this._checkInputValidity(input);
    });
    this._toggleButtonState();
  }

  _setEventListeners(element) {
    this._activeInputs = Array.from(
      element.querySelectorAll(this._inputSelector)
    );

    this._activeInputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._inputEventListener(input);
      });
    });
  }

  _inputEventListener(input) {
    console.log(input);
    this._checkInputValidity(input);
    this._toggleButtonState();
  }

  _checkInputValidity(input) {
    const error = this._findError(input);
    if (!input.checkValidity()) {
      this._showError(input, input.validationMessage, error);
    } else {
      this._hideError(input, error);
    }
  }

  _findError(input) {
    return this._formSelector.querySelector(`#${input.id}-error`);
  }

  _toggleButtonState() {
    this._formSubmitButton = this._formSelector.querySelector(
      this._submitButtonSelector
    );
    if (this._hasInvalidInput(this._activeInputs)) {
      this._formSubmitButton.disabled = true;
      this._formSubmitButton.classList.add(this._inactiveButtonClass);
    } else {
      this._formSubmitButton.disabled = false;
      this._formSubmitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  _hasInvalidInput() {
    return this._activeInputs.some((input) => {
      return !input.checkValidity();
    });
  }

  _showError(input, errorMessage, error) {
    input.classList.add(this._inputErrorClass);
    error.classList.add(this._errorClass);
    error.textContent = errorMessage;
  }

  _hideError(input, error) {
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = "";
  }
}
