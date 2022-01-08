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

  _placeLike() {
    this._like(this);
  }

  _deleteLike() {
    this._unlike(this);
  }

  _isLiked() {

    if (this.likes.some(user => user._id === this._myId)) {

      this.likeButton.classList.add('element__like-button_active')

    }

  }

  _handleLikes() {
    if (this.likes.some(user => user._id === this._myid)) {
      this._unlike(this);
      console.log(this.likes)
    }
    else {
      this._like(this);
      console.log(this.likes)
    }
  }

  _renderLikes() {

      if (this.likes.some(user => user._id === this._myid)) {

        if (!this.likeButton.classList.contains('element__like-button_active')) {
          this.likeButton.classList.add('element__like-button_active');
        }

      } else {

        if (this.likeButton.classList.contains('element__like-button_active')) {
          this._unlike(this);
          this.likeButton.classList.delete('element__like-button_active');
        }

      }

      this.likesContainer.textContent = this.likes.length;
  }

  _setLikes() {

    this._isLiked();

    this.likesContainer.textContent = this.likes.length;
  }

  _deleteCard() {
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
      this._handleCardDeletion();
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

    // this.likesContainer.textContent = this._likes.length;
    
    // this._setLikes();

    // this._isLiked();

    return this._element;
  }

}

