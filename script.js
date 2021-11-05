const popupBio = document.querySelector('.popup_content_bio');
const editButton = document.querySelector('.profile__edit-button')
const closingEditingButton = document.querySelector('.popup__close-button_content_edit-bio');
const inputName = document.querySelector('.form__input_content_name');
const inputDescription = document.querySelector('.form__input_content_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editform = document.querySelector('form[name=profile-info-form]');
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

function closePopupWithEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}


function openPopup(popup) {
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

  const saveButton = popupBio.querySelector('.form__save-button');
  saveButton.removeAttribute('disabled');
  saveButton.classList.remove('form__save-button_disabled');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  deleteMistakes(inputName, popupBio);
  deleteMistakes(inputDescription, popupBio);

  openPopup(popupBio);
});

  // Работа с карточками

const elementsTemplate = document.querySelector('#elements').content;
const elements = document.querySelector('.elements');
const addButton = document.querySelector('.profile__add-button');
const popupElement = document.querySelector('.popup_content_element');
const newElementClosingButton = document.querySelector('.popup__close-button_content_add-element');
const inputCardName = document.querySelector('input[name=element-name]');
const inputImgUrl = document.querySelector('input[name=image-url]');
const newCardForm = document.querySelector('form[name=new-card-form]');
const popupImage = document.querySelector('.popup_content_big-image');
const page = document.querySelector('.page');

function placeLike(element) {
  const likeButton = element.querySelector('.element__like-button');
  likeButton.addEventListener('click', function() {
  likeButton.classList.toggle('element__like-button_active');
  })
}

function deleteCard(element) {
  const deleteButton = element.querySelector('.element__delete-icon');
  deleteButton.addEventListener('click', function() {
    deleteButton.closest('.element').remove();
  })
}

function addBigImagePopup(element) {
  const smallImage = element.querySelector('.element__image');
  smallImage.addEventListener('click', function(evt) {
    const currentName = evt.target.parentElement.querySelector('.element__name');

    popupImage.querySelector('.popup__paragraph').textContent = currentName.textContent;
    popupImage.querySelector('.popup__image').src = evt.target.src;
    popupImage.querySelector('.popup__image').alt = currentName.textContent;

    openPopup(popupImage);
  })

  popupImage.querySelector('.popup__close-button').addEventListener('click', function() {
  closePopup(popupImage);
  })
}

function createCard(name, link) {
  const element = elementsTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = link;
  element.querySelector('.element__name').textContent = name;
  element.querySelector('.element__image').alt = name;


  placeLike(element);

  deleteCard(element);

  addBigImagePopup(element);



  return element;
}

function addNewCard(name, link, place) {

  const element = createCard(name, link);

  place.prepend(element);

}

initialCards.reverse().forEach(function(card) {
  addNewCard(card.name, card.link, elements);
})

addButton.addEventListener('click', function() {
  popupElement.querySelectorAll('.form__input').forEach(function(input) {
    deleteMistakes(input, popupElement);
  });
  popupElement.querySelector('.form').reset();
  openPopup(popupElement);
})

newCardForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  addNewCard(inputCardName.value, inputImgUrl.value, elements);
  closePopup(popupElement);
})

popupElement.querySelector('.popup__close-button').addEventListener('click', function() {

  closePopup(popupElement);
  })

const popups = document.querySelectorAll('.popup');

popups.forEach(function(popup) {
popup.addEventListener('click', function(evt) {
if (evt.target.classList.contains('popup')) {
  closePopup(popup);
}
})
})


