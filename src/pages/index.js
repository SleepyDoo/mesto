import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js"
import './index.css';
import {
  elementsTemplate,
  elements,
  popupBio,
  editButton,
  inputName,
  inputDescription,
  profileName,
  profileDescription,
  editform,
  addButton,
  newCardPopup,
  newCardForm,
  popupImage,
  formsSettings} from '../utils/constants.js'
import Popup from "../components/Popup.js";


// сервер

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-32', 
    {authorization: 'e018c56f-d4b3-4bdf-9daa-134c345b8c23',
    'Content-Type': 'application/json'})

api.getUserInfo()
.then((data) => {
  profileBio.setUserInfo(data);
  profileBio.setAvatar(data);
  console.log(data)
})
.catch((err) => {
  console.log(err);
});



// Био профиля

const profileBio = new UserInfo({nameElement: profileName, descriptionElement: profileDescription, avatarElement: document.querySelector('.profile__avatar')});
const popupBioClass = new PopupWithForm(popupBio, {submitCallback: (data) => {
  popupBioClass.renderLoading(true);
  profileBio.setUserInfo(data);
  api.editProfileBio(data)
  .catch((err) => {
    popupBioClass.showError(err);
  })
  .finally(popupBioClass.renderLoading(false))
  popupBioClass.close();
}})

popupBioClass.setEventListeners();

editButton.addEventListener('click', function() {
  const data = profileBio.getUserInfo();
  inputName.value = data.name;
  inputDescription.value = data.about;
  formValidators[editform.name].resetValidation();
  popupBioClass.open();
});

const editAvatarPopup = document.querySelector('.popup_content_new-avatar');

const editAvatarPopupClass = new PopupWithForm(editAvatarPopup, {submitCallback: (data) => {
  editAvatarPopupClass.renderLoading(true);

  api.setAvatar(data)
  .then((res) => {
    profileBio.setAvatar(res);
  })
  .catch((err) => {
    editAvatarPopupClass.showError(err);
  })
  .finally( editAvatarPopupClass.renderLoading(false));

  editAvatarPopupClass.close();
}
})

editAvatarPopupClass.setEventListeners();

document.querySelector('.profile__avatar-edit-button').addEventListener('click', () => {
  editAvatarPopupClass.open();
})


// Формы


const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((form) => {
    const validateForm = new FormValidator(config, form);
    formValidators[ form.name ] = validateForm;
    validateForm.enableValidation();
  });
};

enableValidation(formsSettings);




// Работа с карточками

const deletionPopup = new Popup(document.querySelector('.popup_content_delete-popup'));

function handleCardDeletion() {
deletionPopup.open();
const saveButton = document.querySelector('.form__save-button_content_delete-popup');
saveButton.addEventListener('click', () => {
  api.removeCard(this._cardId)
  .then(this._deleteCard())
  .catch((err) => {
    console.log(err);
  });
  
  deletionPopup.close()
})
}

deletionPopup.setEventListeners;

function likeCard() {
  api.setLike(this._cardId)
  .then((res) => {
    this._likesContainer.textContent = res.likes.length;
  })
  .catch((err) => {
    console.log(err);
  });
}

function unlikeCard() {
  api.unlike(this._cardId)
  .then((res) => {
    this._likesContainer.textContent = res.likes.length;
  })
  .catch((err) => {
    console.log(err);
  });
}



function generateCard(item) {
  const card = new Card(item, elementsTemplate, handleCardClick, handleCardDeletion, likeCard, unlikeCard);
  return card.createCard();
}

const cardList = new Section({
  renderer: (item) => { 
    const card = generateCard(item);
    cardList.addItem(card);
  }
},
  elements);

api.getInitialCards()
.then((data) => {
  cardList.renderItems(data);
})
.catch((err) => {
  console.log(err);
});

  
const popupWithImage = new PopupWithImage(popupImage);

popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

const newCardPopupClass = new PopupWithForm(newCardPopup, {submitCallback: (data) => {
  newCardPopupClass.renderLoading(true);
  api.addNewCard(data)
  .then((res) => {
    cardList.renderItems([res]);
  })
  .catch((err) => {
    newCardPopupClass.showError(err);
  })
  .finally(newCardPopupClass.renderLoading(false))
  
  newCardPopupClass.close();
}});

newCardPopupClass.setEventListeners();

addButton.addEventListener('click', function() {
  formValidators[newCardForm.name].resetValidation();
  newCardPopupClass.open();
})



