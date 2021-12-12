import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from './components/Section.js';
import UserInfo from "./components/UserInfo.js";
import Popup from "./components/Popup.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import './pages/index.css';


const initialCards = [
  {
    name: 'Котик',
    link: 'https://images.unsplash.com/photo-1596854273338-cbf078ec7071?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
  },
  {
    name: 'Коала',
    link: 'https://images.unsplash.com/photo-1553445297-8bfd1c0ecfd8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80'
  },
  {
    name: 'Крыски',
    link: 'https://images.unsplash.com/photo-1575485670503-d039c615492e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80'
  },
  {
    name: 'Песик',
    link: 'https://images.unsplash.com/photo-1543523195-e0613799d7ad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80'
  },
  {
    name: 'Хорек',
    link: 'https://images.unsplash.com/photo-1615087240969-eeff2fa558f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80'
  },
  {
    name: 'Панда',
    link: 'https://images.unsplash.com/photo-1525382455947-f319bc05fb35?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=896&q=80'
  }
];
const elementsTemplate = document.querySelector('#elements').content;
const elements = document.querySelector('.elements');
const popupBio = document.querySelector('.popup_content_bio');
const editButton = document.querySelector('.profile__edit-button')
const inputName = document.querySelector('.form__input_content_name');
const inputDescription = document.querySelector('.form__input_content_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editform = document.querySelector('form[name=profile-info-form]');

const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_content_element');
const inputCardName = document.querySelector('input[name=element-name]');
const inputImgUrl = document.querySelector('input[name=image-url]');
const newCardForm = document.querySelector('form[name=new-card-form]');
const popupImage = document.querySelector('.popup_content_big-image');

// Био профиля

const profileBio = new UserInfo({nameElement: profileName, descriptionElement: profileDescription});
const popupBioClass = new PopupWithForm(popupBio, {submitCallback: () => {
  profileBio.setUserInfo();
  popupBioClass.close();
}})

popupBioClass.setEventListeners();

editButton.addEventListener('click', function() {
  const data = profileBio.getUserInfo();
  inputName.value = data.name;
  inputDescription.value = data.description;
  formValidators[editform.name].resetValidation();
  popupBioClass.open();
});




// Формы

const formsSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

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

function handleCardClick(name, link) {
  const popupWithImage = new PopupWithImage(popupImage);
  popupWithImage.open(name, link);
  popupWithImage.setEventListeners();
}

const newCardPopupClass = new PopupWithForm(newCardPopup, {submitCallback: () => {
  const cardData = [{
    name: inputCardName.value,
    link: inputImgUrl.value
  }]

  const newCardList = new Section({
    items: cardData,
    renderer: (item) => {
      const card = new Card(item, elementsTemplate, handleCardClick);
      const cardElement = card.createCard();
      newCardList.addItem(cardElement);
    }
  },
  elements);
  newCardList.renderItems();
  newCardPopupClass.close();
}});

newCardPopupClass.setEventListeners();

addButton.addEventListener('click', function() {
  newCardForm.reset();
  formValidators[newCardForm.name].resetValidation();
  newCardPopupClass.open();
})

const initialCardList = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    const card = new Card(item, elementsTemplate, handleCardClick);
    const cardElement = card.createCard();
    initialCardList.addItem(cardElement);
  }
  },
  elements);

  initialCardList.renderItems();
