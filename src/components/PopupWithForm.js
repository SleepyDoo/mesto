import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popup, {submitCallback}) {
    super(popup),
    this._submit = submitCallback,
    this._form = popup.querySelector('.form'),
    this._inputs = Array.from(this._form.querySelectorAll('.form__input'))
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
