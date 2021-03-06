export default class FormValidator {
  constructor(settings, form) {
    this._formSelector = settings.formSelector,
    this._inputSelector = settings.inputSelector,
    this._submitButtonSelector = settings.submitButtonSelector,
    this._inactiveButtonClass = settings.inactiveButtonClass,
    this._inputErrorClass = settings.inputErrorClass,
    this._errorClass = settings.errorClass,
    this._form = form,
    this._button = this._form.querySelector(this._submitButtonSelector),
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector))
}

resetValidation() {

  this._toggleButtonState();

  this._inputs.forEach((input) => {
    this._hideInputError(input)
  });

}



  enableValidation() {
    this._setEventListeners();
}

_setEventListeners() {

  this._form.addEventListener('submit', this._handleSubmit)
  this._form.addEventListener('input', () => {
    this._toggleButtonState();
  })

  this._inputs.forEach((input) => {
    input.addEventListener('input', () => {
      this._checkInputValidity(input);
    })
  })

  this._toggleButtonState();

}



_checkInputValidity(input) {
  if (input.validity.valid) {
    this._hideInputError(input)
  } else {
    this._showInputError(input);
  }
}


_showInputError(input) {
  const error = this._form.querySelector(`#${input.id}-error`);
  input.classList.add(this._inputErrorClass);
  error.textContent = input.validationMessage;
}

_hideInputError(input) {
  const error = this._form.querySelector(`#${input.id}-error`);
  input.classList.remove(this._inputErrorClass);
  error.textContent = '';
}

_handleSubmit(evt) {
  evt.preventDefault();
}

_toggleButtonState() {
  this._button.disabled = !this._form.checkValidity();
  this._button.classList.toggle(this._inactiveButtonClass, !this._form.checkValidity());
}

}
