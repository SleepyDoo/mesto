import Card from "./Card.js";
import FormValidator from "./FormValidator.js";


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
const bioSaveButton = popupBio.querySelector('.form__save-button');

const addButton = document.querySelector('.profile__add-button');
const popupElement = document.querySelector('.popup_content_element');
const elSaveButton = popupElement.querySelector('.form__save-button');
const inputCardName = document.querySelector('input[name=element-name]');
const inputImgUrl = document.querySelector('input[name=image-url]');
const newCardForm = document.querySelector('form[name=new-card-form]');
const popupImage = document.querySelector('.popup_content_big-image');

// Работа с попапами

function closePopupWithEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}


export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc);
}

// Био профиля

function submitProfileBio (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupBio);
}

editform.addEventListener('submit', submitProfileBio);

popupBio.querySelector('.popup__close-button').addEventListener('click', function() {
  closePopup(popupBio);

})

function deleteMistakes (input, popup) {
  if (input.classList.contains(formsSettings.inputErrorClass)) {
    const error = popup.querySelector(`#${input.id}-error`);
    input.classList.remove(formsSettings.inputErrorClass);
    error.textContent = '';
  }
}

editButton.addEventListener('click', function() {


  bioSaveButton.removeAttribute('disabled');
  bioSaveButton.classList.remove('form__save-button_disabled');

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  deleteMistakes(inputName, popupBio);
  deleteMistakes(inputDescription, popupBio);

  openPopup(popupBio);
});


// Работа с карточками

popupImage.querySelector('.popup__close-button').addEventListener('click', function() {
  closePopup(popupImage);
})

function addNewCard(place, data, template) {

  const element = new Card(data, template);

  place.prepend(element.createCard());

}

initialCards.reverse().forEach(function(card) {
  addNewCard(elements, card, elementsTemplate);
})


addButton.addEventListener('click', function() {
  popupElement.querySelectorAll('.form__input').forEach(function(input) {
    deleteMistakes(input, popupElement);
  });
  popupElement.querySelector('.form').reset();


  elSaveButton.setAttribute('disabled', true);
  elSaveButton.classList.add('form__save-button_disabled');

  openPopup(popupElement);
})

newCardForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const cardData = {
    name: inputCardName.value,
    link: inputImgUrl.value
  }

  addNewCard(elements, cardData, elementsTemplate);
  closePopup(popupElement);
})


popupElement.querySelector('.popup__close-button').addEventListener('click', function() {

  closePopup(popupElement);
  })

const popups = document.querySelectorAll('.popup');

popups.forEach(function(popup) {
popup.addEventListener('mousedown', function(evt) {
if (evt.target.classList.contains('popup')) {
  closePopup(popup);
}
})
})

// Формы

const formsSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

  const forms = Array.from(document.querySelectorAll(formsSettings.formSelector));

  forms.forEach(function(form) {
    const formElement = new FormValidator(formsSettings, form);

    formElement.enableValidation();
  })
