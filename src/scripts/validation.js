const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, formConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      formConfig
    );
  } else {
    hideInputError(formElement, inputElement, formConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (
  inputList,
  buttonElement,
  { inactiveButtonClass }
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

function setEventListeners(formElement, formConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(formConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    formConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, formConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, formConfig);
      toggleButtonState(inputList, buttonElement, formConfig);
    });
  });
}

function enableValidation(formConfig) {
  const formList = Array.from(
    document.querySelectorAll(formConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, formConfig);
  });
}

function clearValidation(formElement, formConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(formConfig.inputSelector)
  );
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, formConfig);
  });

  const buttonElement = formElement.querySelector(
    formConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, formConfig);
}

export { enableValidation, clearValidation };
