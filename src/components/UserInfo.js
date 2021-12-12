export default class UserInfo {
  constructor({nameElement, descriptionElement}) {
    this._name = nameElement,
    this._description = descriptionElement,
    this._inputName = document.querySelector('.form__input_content_name'),
    this._inputDescription = document.querySelector('.form__input_content_description')
  }

  getUserInfo() {

      const infoObject = {
      name: this._name.textContent,
      description: this._description.textContent
    }

    return infoObject;
  }

  setUserInfo() {
    this._name.textContent = this._inputName.value;
    this._description.textContent = this._inputDescription.value;
  }

}
