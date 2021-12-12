import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup),
    this._popupPhoto = popup.querySelector('.popup__image'),
    this._popupDescription = popup.querySelector('.popup__paragraph')
  }

  open(name, link) {
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
    this._popupDescription.textContent = name;
    super.open();
  }

}
