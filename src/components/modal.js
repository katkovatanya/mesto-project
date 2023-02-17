import { toggleButtonState, vConfig } from './validate.js';
import { addCard } from './card.js';
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

// попапы
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.element-popup');
const popups = document.querySelectorAll('.popup');

//форма профиля и её поля
const formProfilePopup = document.querySelector('.popup__form');
const nameInput = formProfilePopup.querySelector('[name="name-field"]');
const jobInput = formProfilePopup.querySelector('[name="text-field"]');


// Форма места и её поля
const formPlace = document.querySelector('.element-popup__form');
const namePlaceInput = document.querySelector('[name="name-place"]');
const linkPlaceInput = document.querySelector('[name="link-place"]');

const closeButtons = document.querySelectorAll('.popup__close-button');

//функция закрытия кнопкой Esc

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

//функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
}

//функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
}

// функция для открытия формы редактирования профиля
function clickProfileEditButton() {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
}

//Функция открытия формы формы добавления новой карточки
function clickPlusButton(vConfig) {
  openPopup(cardPopup);
  const button = cardPopup.querySelector(vConfig.submitButtonSelector);
  const inputs = Array.from(cardPopup.querySelectorAll(vConfig.inputSelector));
  toggleButtonState(button, vConfig, inputs);
}

// Обработчик отправки формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopup(profilePopup);
}

//отправка формы карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const card = {};
  card.name = namePlaceInput.value;
  card.link = linkPlaceInput.value;
  addCard(card);
  closePopup(cardPopup);
  evt.target.reset();
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  })
})

export { clickProfileEditButton, clickPlusButton, handleProfileFormSubmit, formProfilePopup, handleCardFormSubmit, formPlace, openPopup };