export default class Card {
  constructor(data, template, handleCardClick, handleCardDeletion, like, unlike) {
    this._name = data.name,
    this._image = data.link,
    this._likes = data.likes,
    this._ownerId = data.owner._id,
    this._myId = "5902957a1a9d867c4efbc2e7",
    this._cardId = data._id,
    this._template = template,
    this._element = template.querySelector('.element').cloneNode(true),
    this._smallImage = this._element.querySelector('.element__image'),
    this._likeButton = this._element.querySelector('.element__like-button'),
    this._deleteButton = this._element.querySelector('.element__delete-icon'),
    this._elementName = this._element.querySelector('.element__name'),
    this._likesContainer = this._element.querySelector('.element__likes-counter'),
    this._handleCardClick = handleCardClick,
    this._handleCardDeletion = handleCardDeletion,
    this._like = like,
    this._unlike = unlike
  }

  _placeLike() {
    this._likeButton.classList.add('element__like-button_active');
    this._like();
  }

  _deleteLike() {
    this._likeButton.classList.remove('element__like-button_active');
    this._unlike();
  }

  _isLiked() {
    this._likes.forEach((owner) => {
      if (owner._id === this._myId) {
        this._likeButton.classList.add('element__like-button_active');
      }
    })
  }

  setLikes() {
    this._likesContainer.textContent = this._likes.length;
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

    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('element__like-button_active')) {
        this._deleteLike();
      }
      else {
        this._placeLike();
      }
      
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
    
    this.setLikes();

    this._isLiked();

    return this._element;
  }

}

