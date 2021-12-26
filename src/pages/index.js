import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import './index.css';
import { 
  initialCards,
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




// Био профиля

const profileBio = new UserInfo({nameElement: profileName, descriptionElement: profileDescription});
const popupBioClass = new PopupWithForm(popupBio, {submitCallback: (data) => {
  profileBio.setUserInfo(data);
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

function generateCard(item) {
  const card = new Card(item, elementsTemplate, handleCardClick);
  return card.createCard();
}

const cardList = new Section({
  renderer: (item) => { 
    const card = generateCard(item);  
    cardList.addItem(card);
  }
},
  elements);



  cardList.renderItems(initialCards.reverse());

const popupWithImage = new PopupWithImage(popupImage);

popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

const newCardPopupClass = new PopupWithForm(newCardPopup, {submitCallback: (data) => {
  cardList.renderItems([data]);
  newCardPopupClass.close();
}});

newCardPopupClass.setEventListeners();

addButton.addEventListener('click', function() {
  formValidators[newCardForm.name].resetValidation();
  newCardPopupClass.open();
})



