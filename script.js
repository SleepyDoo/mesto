let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button')
let closeButton = document.querySelector('.popup__close-button')
let inputName = document.querySelector('.form__input_content_name');
let inputDescription = document.querySelector('.form__input_content_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let form = document.querySelector('.form');

function openPopup() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function submitProfileBio (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup();
}

form.addEventListener('submit', submitProfileBio);
closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', openPopup);
