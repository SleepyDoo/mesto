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
  if (input.validity.valid) {
    hideInputError(input, form, objSettings)
  } else {
    showInputError(input, form, objSettings);
  }
}


function showInputError(input, form, objSettings) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(objSettings.inputErrorClass);
  error.textContent = input.validationMessage;
}

function hideInputError(input, form, objSettings) {
  const error = form.querySelector(`#${input.id}-error`);
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


