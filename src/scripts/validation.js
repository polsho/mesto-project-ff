const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  formConfig
) => {
  //деструктурировать корфиг
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formConfig.inputErrorClass);
  errorElement.classList.add(formConfig.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, formConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formConfig.inputErrorClass);
  errorElement.classList.remove(formConfig.errorClass);
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

function setEventListeners(formElement, formConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(formConfig.inputSelector)
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, formConfig);
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

export { enableValidation };
