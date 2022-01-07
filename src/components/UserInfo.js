export default class UserInfo {
  constructor({nameElement, descriptionElement, avatarElement}) {
    this._name = nameElement,
    this._about = descriptionElement,
    this._avatar = avatarElement
  }

  getUserInfo() {

      const infoObject = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    }

    return infoObject;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    
  }

  setAvatar(data) {
    this._avatar.src = data.avatar;
  }

}
