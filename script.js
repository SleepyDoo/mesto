let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button')
let closeButton = document.querySelector('.popup__close-button')

function openPopup() {
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

let InputName = document.querySelector('.form__input_content_name');
let InputDescription = document.querySelector('.form__input_content_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let form = document.querySelector('.form');

InputName.setAttribute('value', profileName.textContent);
InputDescription.setAttribute('value', profileDescription.textContent);

function submitProfileBio (evt) {
  evt.preventDefault();
  profileName.textContent = InputName.value;
  profileDescription.textContent = InputDescription.value;
  popup.classList.remove('popup_opened');
}

form.addEventListener('submit', submitProfileBio);
