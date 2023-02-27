import { toggleButtonState, vConfig } from './validate.js';
import { addCard } from './card.js';
import { postCard, editProfile, editAvatar, apiConfig } from './api.js';
import { renderingProfile } from './utils.js';
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

// попапы
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.element-popup');
const avatarPopup = document.querySelector('.avatar-popup');
const popups = document.querySelectorAll('.popup');

//форма профиля и её поля
const formProfilePopup = document.querySelector('.popup__form');
const nameInput = formProfilePopup.querySelector('[name="name-field"]');
const jobInput = formProfilePopup.querySelector('[name="text-field"]');


// Форма места и её поля
const formPlace = document.querySelector('.element-popup__form');
const namePlaceInput = document.querySelector('[name="name-place"]');
const linkPlaceInput = document.querySelector('[name="link-place"]');

//Форма смены аватара и её поле
const avatarForm = document.querySelector('.avatar-popup__form');
const avatarInput = avatarPopup.querySelector('[name="link-avatar"]');

//кнопки попапов
const closeButtons = document.querySelectorAll('.popup__close-button');
const createCardButton = document.querySelector('.popup__add-button');
const avatarSaveButton = document.querySelector('.popup__avatar-save-button');
const profileSubmitButton = document.querySelector('.popup__save-button');
const avatar = document.querySelector('.profile__avatar');

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

// Обработчик отправки формы профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileSubmitButton.textContent = "Сохранение...";
  editProfile(nameInput, jobInput, apiConfig)
    .then((res) => {
      renderingProfile(res);
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileSubmitButton.textContent = "Сохранить";
    });
}


//отправка формы карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  createCardButton.textContent = "Сохранение..."
  const card = {};
  card.name = namePlaceInput.value;
  card.link = linkPlaceInput.value;
  postCard(card, apiConfig)
    .then(res => {
      addCard(res);
      closePopup(cardPopup);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      createCardButton.textContent = 'Создать';
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  avatarSaveButton.textContent = "Сохранение...";
  editAvatar(avatarInput, apiConfig)
    .then((res) => {
      renderingProfile(res);
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarSaveButton.textContent = "Сохранить";
    })
}


//попап аватара
function clickAvatar(vConfig) {
  openPopup(avatarPopup);
  avatarInput.value = "";
  const button = avatarPopup.querySelector(vConfig.submitButtonSelector);
  const input = Array.from(avatarPopup.querySelectorAll(vConfig.inputSelector));
  toggleButtonState(button, vConfig, input);
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

export { clickProfileEditButton, clickPlusButton, handleProfileFormSubmit, formProfilePopup, handleCardFormSubmit, formPlace, openPopup, profileName, profileText, clickAvatar, handleAvatarSubmit, avatarForm, createCardButton, closePopup, cardPopup, profilePopup, avatarPopup, avatarSaveButton, profileSubmitButton, avatar };