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
  formsSettings,
  editAvatarPopup,
  newAvatarForm
} from '../utils/constants.js'
import PopupWithConfirm from "../components/PopupWithConfirm.js";

// сервер

let userId;

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-32', 
    {authorization: 'e018c56f-d4b3-4bdf-9daa-134c345b8c23',
    'Content-Type': 'application/json'})

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    profileBio.setUserInfo(userData);
    profileBio.setAvatar(userData);
    userId = userData._id;
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });


// Био профиля

const profileBio = new UserInfo({nameElement: profileName, descriptionElement: profileDescription, avatarElement: document.querySelector('.profile__avatar')});
const popupBioClass = new PopupWithForm(popupBio, {submitCallback: (data) => {
  popupBioClass.renderLoading(true);
  api.editProfileBio(data)
  .then((data) => {
    profileBio.setUserInfo(data);
    popupBioClass.close();
  })
  .catch((err) => {
    popupBioClass.showError(err);
  })
  .finally(() => {
    popupBioClass.renderLoading(false);
  })
  
}})

popupBioClass.setEventListeners();

editButton.addEventListener('click', function() {
  const data = profileBio.getUserInfo();
  inputName.value = data.name;
  inputDescription.value = data.about;
  formValidators[editform.name].resetValidation();
  popupBioClass.open();
});



const editAvatarPopupClass = new PopupWithForm(editAvatarPopup, {submitCallback: (data) => {
  editAvatarPopupClass.renderLoading(true);

  api.setAvatar(data)
  .then((res) => {
    profileBio.setAvatar(res);
    editAvatarPopupClass.close();
  })
  .catch((err) => {
    editAvatarPopupClass.showError(err);
  })
  .finally(() => {
    editAvatarPopupClass.renderLoading(false);
  });

  
}
})



editAvatarPopupClass.setEventListeners();

document.querySelector('.profile__avatar-edit-button').addEventListener('click', () => {
  formValidators[newAvatarForm.name].resetValidation();
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

const deletionPopup = new PopupWithConfirm(document.querySelector('.popup_content_delete-popup'));

deletionPopup.setEventListeners();


function handleCardDeletion(card) {

function cardDeletion() {
  return api.removeCard(card.cardId)
  .then(() => {
    card.deleteCard()
    deletionPopup.close();
  })
  .catch((err) => {
    console.log(err);
  });
  }

  deletionPopup.setCallback(cardDeletion);
  deletionPopup.open();
}

deletionPopup.setEventListeners();

function likeCard(card) {
  return api.setLike(card.cardId)
  .then((res) => {
    card.likes = res.likes;
  })
  .catch((err) => {
    console.log(err);
  });
}

function unlikeCard(card) {
  return api.unlike(card.cardId)
  .then((res) => {
    card.likes = res.likes;
  })
  .catch((err) => {
    console.log(err);
  });
}

function generateCard(item) {
  const card = new Card(item, userId, elementsTemplate, handleCardClick, handleCardDeletion, likeCard, unlikeCard);
  return card.createCard();
}

const cardList = new Section({
  renderer: (item) => { 
    const card = generateCard(item);
    cardList.addItem(card);
  }
},
  elements);

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
    newCardPopupClass.close();
  })
  .catch((err) => {
    newCardPopupClass.showError(err);
  })
  .finally(() => {
    newCardPopupClass.renderLoading(false);
  })
  
  
}});

newCardPopupClass.setEventListeners();

addButton.addEventListener('click', function() {
  formValidators[newCardForm.name].resetValidation();
  newCardPopupClass.open();
})



