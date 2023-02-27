//этот файл - точка сборки, сюда надо всё импортировать

import './pages/index.css';
import { clickProfileEditButton, clickPlusButton, handleProfileFormSubmit, formProfilePopup, handleCardFormSubmit, formPlace, clickAvatar, handleAvatarSubmit, avatarForm } from './components/modal.js';
import { vConfig } from './components/validate.js';
import { getProfile, getInitialCards, apiConfig } from './components/api.js';
import { renderingProfile } from './components/utils.js';
import { addCard } from './components/card.js';

Promise.all([getProfile(apiConfig), getInitialCards(apiConfig)])
  .then(([userData, cards]) => {
    renderingProfile(userData);
    let initialCards = Array.from(cards.reverse());
    initialCards.forEach(elem => {
      addCard(elem);
    })
  })
  .catch((err) => {
    console.log(err);
  });

const profileEditButton = document.querySelector('.profile__edit-button');
//кнопка открытия формы добавления новой карточки
const plusButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar-button');


avatarButton.addEventListener('click', () => clickAvatar(vConfig));

profileEditButton.addEventListener('click', clickProfileEditButton);

plusButton.addEventListener('click', () => clickPlusButton(vConfig));

formProfilePopup.addEventListener('submit', handleProfileFormSubmit);

formPlace.addEventListener('submit', handleCardFormSubmit);

avatarForm.addEventListener('submit', handleAvatarSubmit);
