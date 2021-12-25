export const initialCards = [
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
  export const elementsTemplate = document.querySelector('#elements').content;
  export const elements = document.querySelector('.elements');
  export const popupBio = document.querySelector('.popup_content_bio');
  export const editButton = document.querySelector('.profile__edit-button')
  export const inputName = document.querySelector('.form__input_content_name');
  export const inputDescription = document.querySelector('.form__input_content_description');
  export const profileName = document.querySelector('.profile__name');
  export const profileDescription = document.querySelector('.profile__description');
  export const editform = document.querySelector('form[name=profile-info-form]');
  
  export const addButton = document.querySelector('.profile__add-button');
  export const newCardPopup = document.querySelector('.popup_content_element');
  export const newCardForm = document.querySelector('form[name=new-card-form]');
  export const popupImage = document.querySelector('.popup_content_big-image');

  export const formsSettings = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible'
  };
  