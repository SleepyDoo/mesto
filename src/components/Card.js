export default class Card {
  constructor(data, userId, template, handleCardClick, handleCardDeletion, like, unlike) {
    this._name = data.name,
    this._image = data.link,
    this.likes = data.likes,
    this._ownerId = data.owner._id,
    this._myId = userId,
    this.cardId = data._id,
    this._template = template,
    this._element = template.querySelector('.element').cloneNode(true),
    this._smallImage = this._element.querySelector('.element__image'),
    this.likeButton = this._element.querySelector('.element__like-button'),
    this._deleteButton = this._element.querySelector('.element__delete-icon'),
    this._elementName = this._element.querySelector('.element__name'),
    this.likesContainer = this._element.querySelector('.element__likes-counter'),
    this._handleCardClick = handleCardClick,
    this._handleCardDeletion = handleCardDeletion,
    this._like = like,
    this._unlike = unlike
  }

  _handleLikes() {

    if (this.likes.some(user => {return user._id === this._myId}, this)) {
      this._unlike(this)
      .then(() => {
        this._renderLikes();
      });
    }
    else {
      this._like(this)
      .then(() => {
        this._renderLikes();
      });
    }

  }

  _renderLikes() {

      if (this.likes.some(user => {return user._id === this._myId}, this)) {

        if (!this.likeButton.classList.contains('element__like-button_active')) {
          this.likeButton.classList.add('element__like-button_active');
        }

      } else {

        if (this.likeButton.classList.contains('element__like-button_active')) {
          this.likeButton.classList.remove('element__like-button_active');
        }

      }

      this.likesContainer.textContent = this.likes.length;
  }
  deleteCard() {
      this._deleteButton.closest('.element').remove();
  }

  _hideDeleteButton() {
    if (!(this._ownerId === this._myId)) {
      this._deleteButton.remove()
    }
  }

  _setEventListeners() {

    this.likeButton.addEventListener('click', () => {
      this._handleLikes()
    })

    this._deleteButton.addEventListener('click', () => {
      this._handleCardDeletion(this);
    })


    this._smallImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._image);
    })

  }


  createCard() {

    this._setEventListeners();

    this._hideDeleteButton();

    this._smallImage.src = this._image;
    this._elementName.textContent = this._name;
    this._smallImage.alt = this._name;

    this._renderLikes();

    this._element.id = this.cardId;

    return this._element;
  }

}

