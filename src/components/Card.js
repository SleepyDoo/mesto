export default class Card {
  constructor(data, template, handleCardClick) {
    this._name = data.name,
    this._image = data.link,
    this._template = template,
    this._element = template.querySelector('.element').cloneNode(true),
    this._smallImage = this._element.querySelector('.element__image'),
    this._likeButton = this._element.querySelector('.element__like-button'),
    this._deleteButton = this._element.querySelector('.element__delete-icon'),
    this._elementName = this._element.querySelector('.element__name'),
    this._handleCardClick = handleCardClick
  }

  _placeLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _deleteCard() {
      this._deleteButton.closest('.element').remove();
  }


  _setEventListeners() {

    this._likeButton.addEventListener('click', () => {
      this._placeLike();
    })

    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    })


    this._smallImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._image);
    })
  }


  createCard() {

    this._setEventListeners();

    this._smallImage.src = this._image;
    this._elementName.textContent = this._name;
    this._smallImage.alt = this._name;

    return this._element;
  }

}

