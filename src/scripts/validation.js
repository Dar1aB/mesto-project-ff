export function enableValidation(data) {
  const formList = document.querySelectorAll(data.formSelector);
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(data.inputSelector));
    const btnElement = formElement.querySelector(data.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, data);
        togglePopupSaveBtnState(inputList, btnElement, data);
      });
    });
    togglePopupSaveBtnState(inputList, btnElement, data);
  });
};

function isValid(formElement, inputElement, data) {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, data);
  } else {
    hideInputError(formElement, inputElement, data);
  }
}; 

function showInputError(formElement, inputElement, errorMessage, data) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(data.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(data.errorClass);
};

function hideInputError(formElement, inputElement, data) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(data.inputErrorClass);
  errorElement.classList.remove(data.errorClass);
  errorElement.textContent = '';
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function togglePopupSaveBtnState(inputList, btnElement, data) {
  if (hasInvalidInput(inputList)) {
    btnElement.disabled = true;
    btnElement.classList.add(data.inactiveButtonClass);
  } else {
    btnElement.disabled = false;
    btnElement.classList.remove(data.inactiveButtonClass);
  }
};

export function clearValidation(formElement, data) {
  const inputList = Array.from(formElement.querySelectorAll(data.inputSelector));
  const btnElement = formElement.querySelector(data.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity("");
    hideInputError(formElement, inputElement, data);
  });

  btnElement.disabled = true;
  btnElement.classList.add(data.inactiveButtonClass);
};