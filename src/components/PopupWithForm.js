import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popup, {submitCallback}) {
    super(popup),
    this._submit = submitCallback,
    this._inputs = Array.from(popup.querySelectorAll('.form__input'))
    this._form = popup.querySelector('.form')
  }

  _getInputValues() {
    const data = {};
    this._inputs.forEach((input) => {
      data[input.name] = input.value;
    })
    return data;
  }

  setEventListeners() {
    this._form.addEventListener('submit', () => {
      this._submit();
    })
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }

}
