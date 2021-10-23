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


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.querySelector('.popup__close-button').addEventListener('click', function() {
    popup.classList.remove('popup_opened');
  })
}

// Био профиля

function submitProfileBio (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popupBio.classList.remove('popup_opened');
}

editform.addEventListener('submit', submitProfileBio);
closePopup(popupBio);

editButton.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupBio);
});

  // Работа с карточками

const elementsTemplate = document.querySelector('#elements').content;
const element = elementsTemplate.querySelector('.element').cloneNode(true);
const elements = document.querySelector('.elements');
const addButton = document.querySelector('.profile__add-button');
const popupElement = document.querySelector('.popup_content_element');
const newElementClosingButton = document.querySelector('.popup__close-button_content_add-element');
const inputCardName = document.querySelector('input[name=element-name]');
const inputImgUrl = document.querySelector('input[name=image-url]');
const newCardForm = document.querySelector('form[name=new-card-form]');
const popupImage = document.querySelector('.popup_content_big-image');
const page = document.querySelector('.page');


function placeLike() {
  const likeButton = document.querySelector('.element__like-button');
  likeButton.addEventListener('click', function(evt) {
  evt.target.classList.toggle('element__like-button_active');
  })
}

function deleteCard() {
  const deleteButtons = document.querySelectorAll('.element__delete-icon');
  deleteButtons.forEach(function(item) {
      item.addEventListener('click', function(evt) {
        evt.target.closest('.element').remove();
    })
  })

}

function addBigImagePopup() {
  const smallImages = document.querySelectorAll('.element__image');
  smallImages.forEach(function(item) {
    item.addEventListener('click', function(evt){
      popupImage.querySelector('.popup__paragraph').textContent = evt.target.parentElement.querySelector('.element__name').textContent;
      popupImage.querySelector('.popup__image').src = evt.target.src;
      openPopup(popupImage);
    })
  })

  closePopup(popupImage);

}

function addNewCard(name, link) {
  element.querySelector('.element__image').src = link;
  element.querySelector('.element__name').textContent = name;
  element.querySelector('.element__image').alt = name;

  elements.prepend(element.cloneNode(true));

  placeLike();

  deleteCard();

  addBigImagePopup();

}

initialCards.reverse().forEach(function(card) {
  addNewCard(card.name, card.link);
})

addButton.addEventListener('click', function() {
  openPopup(popupElement);
})

newCardForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  addNewCard(inputCardName.value, inputImgUrl.value);
  popupElement.classList.remove('popup_opened');
})

closePopup(popupElement);


// function nodeToElement(node) {
//   element.querySelector('.element__image').src = node.link;
//   element.querySelector('.element__name').textContent = node.name;
//   return element.cloneNode(true);
// }
// function initialCardsOpened (container, data, func) {
//   container.append(...data.map(func));
// }

// initialCardsOpened(elements, initialCards, nodeToElement);


