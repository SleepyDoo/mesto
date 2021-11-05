const formsSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

function enableValidation(objSettings) {
  const forms = Array.from(document.querySelectorAll(objSettings.formSelector));

  forms.forEach(function(form) {
  setEventListeners(form, objSettings);
  })
}

function setEventListeners(form, objSettings) {
  form.addEventListener('submit', handleSubmit)
  form.addEventListener('input', function() {
    toggleButtonState(form, objSettings);
  })


  const inputs = Array.from(form.querySelectorAll(objSettings.inputSelector));
  inputs.forEach(function(input) {
    input.addEventListener('input', function() {
      checkInputValidity(input, form, objSettings);
    })
  })

  toggleButtonState(form, objSettings);

}



function checkInputValidity(input, form, objSettings) {
  if (!input.validity.valid) {
    showInputError(input, form, objSettings);
  }
  else {
    hideInputError(input, form, objSettings)
  }
}


function showInputError(input, form, objSettings) {
  const error = form.querySelector(`#${input.id}-error`);
  console.log(error);
  input.classList.add(objSettings.inputErrorClass);
  error.textContent = input.validationMessage;
}

function hideInputError(input, form, objSettings) {
  const error = form.querySelector(`#${input.id}-error`);
  console.log(error);
  input.classList.remove(objSettings.inputErrorClass);
  error.textContent = '';
}

function handleSubmit(evt) {
  evt.preventDefault();
}

function toggleButtonState(form, objSettings) {
  const button = form.querySelector(objSettings.submitButtonSelector);
  button.disabled = !form.checkValidity();
  button.classList.toggle(objSettings.inactiveButtonClass, !form.checkValidity());
}


enableValidation(formsSettings);

// function showInputError(formElement, inputElement, errorMessage) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(formsSettings.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(formsSettings.errorClass);
// }

// function hideInputError(formElement, inputElement) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(formsSettings.inputErrorClass);
//   errorElement.classList.remove(formsSettings.errorClass);
//   errorElement.textContent = '';
// }

// function checkInputValidity(formElement, inputElement) {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// }

// function setEventListeners(formElement) {
//   const inputList = Array.from(formElement.querySelectorAll(formsSettings.inputSelector));
//   const buttonElement = formElement.querySelector(formsSettings.submitButtonSelector);
//   // console.log(buttonElement);
//   toggleButtonState(inputList, buttonElement);
//   inputList.forEach(function(inputElement) {
//     inputElement.addEventListener('input', function() {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     })
//   })
// }


// function hasInvalidInput(inputList) {
//   return inputList.some(function(inputElement) {
//     return !inputElement.validity.valid;
//   })
// }

// function toggleButtonState(inputList, buttonElement) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(formsSettings.inactiveButtonClass);
//   }
//   else {
//     buttonElement.classList.remove(formsSettings.inactiveButtonClass);

//   }
// }



// function enableValidation() {
//   const formList = document.querySelectorAll(formsSettings.formSelector);
//   formList.forEach(function(formElement) {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//   });
//   const fieldsetList = formElement.querySelectorAll('.form__fieldset');
//     fieldsetList.forEach(function(item) {
//       setEventListeners(item);
//     })
//   });
// };

// enableValidation();


