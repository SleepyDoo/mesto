import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popup, {submitCallback}) {
    super(popup),
    this._submit = submitCallback,
    this._form = popup.querySelector('.form'),
    this._inputs = Array.from(this._form.querySelectorAll('.form__input')),
    this._submitButton = this._form.querySelector('.form__save-button'),
    this._submitButtonText = this._submitButton.textContent
  }

  showError(err) {
    this._submitButton.textContent = `Произошла ошибка ${err}`;
  }

  renderLoading(isLoading) {
    if(isLoading) { 
      this._submitButton.textContent = 'Сохранение...';
    }
    else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  _getInputValues() {
    const data = {};
    this._inputs.forEach((input) => {
      data[input.name] = input.value;
      
    });
    return data;
  }

  setEventListeners() {
    this._form.addEventListener('submit', () => {
      this._submit(this._getInputValues());
    })
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }

}
