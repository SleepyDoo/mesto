import { openPopup } from "./index.js";
export default class Card {
  constructor(data, template) {
    this._name = data.name,
    this._image = data.link,
    this._template = template
  }

  _placeLike(element) {
    const likeButton = element.querySelector('.element__like-button');
    likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('element__like-button_active');
  })
  }

  _deleteCard(element) {
    const deleteButton = element.querySelector('.element__delete-icon');
    deleteButton.addEventListener('click', () => {
      deleteButton.closest('.element').remove();
    })
  }

  _addBigImagePopup(element) {
    const smallImage = element.querySelector('.element__image');
    smallImage.addEventListener('click', (evt) => {
      const currentName = evt.target.parentElement.parentElement.querySelector('.element__name');
      const popupImage = document.querySelector('.popup_content_big-image');

      popupImage.querySelector('.popup__paragraph').textContent = currentName.textContent;
      popupImage.querySelector('.popup__image').src = evt.target.src;
      popupImage.querySelector('.popup__image').alt = currentName.textContent;

      openPopup(popupImage);
    })

  }

  createCard() {
    const element = this._template.querySelector('.element').cloneNode(true);

    this._placeLike(element);

    this._deleteCard(element);

    this._addBigImagePopup(element);


    element.querySelector('.element__image').src = this._image;
    element.querySelector('.element__name').textContent = this._name;
    element.querySelector('.element__image').alt = this._name;






    return element;
  }

}

