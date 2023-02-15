//функциональность валидации форм вынесите в файл

const vConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
};

//функция для валидации одного поля
function validateInput(formElement, input, config) {
  //нашли span с текстом ошибки по классу
  const errorElement = formElement.querySelector(`.${input.id}-error`); 
  if (input.validity.valid) {
    //удаляем класс, стилизующий поле с ошибкой, удаляем текст span и класс видимоости этого текста
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
  }
  //иначе наоборот - добавляем стили и текст ошибки
  else {
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(config.errorClass);
  }
}

//проверка всех полей формы на валидность
function hasInvalidInputs(inputs) {
  return inputs.every(input => input.validity.valid);
}

//функция блокировки кнопки
function toggleButtonState(button, config, inputs) {
  if (hasInvalidInputs(inputs)) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  }
  else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
}

//навешаем слушатели событий на инпуты принимаемой формы
function setInputListeners(formElement, config) {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  const button = formElement.querySelector(config.submitButtonSelector);

  inputs.forEach(input => {
    input.addEventListener('input', e => {
      validateInput(formElement, input, config);
      toggleButtonState(button, config, inputs);
    });
  });
}

//функция создаёт массив из форм и для каждой отменяет перезагрузку, вызывает функцию слушателей инпутов
function enableValidation(validationConfig) {
  const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
  forms.forEach(form => {
    // form.addEventListener('submit', evt => evt.preventDefault());
    setInputListeners(form, validationConfig);
  });
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation(vConfig); 
export {vConfig, toggleButtonState};