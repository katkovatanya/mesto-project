//этот файл - точка сборки, сюда надо всё импортировать
// import './pages/index.css'; // добавьте импорт главного файла стилей 
import './pages/index.css';

const profileEditButton = document.querySelector('.profile__edit-button');
//кнопка открытия формы добавления новой карточки
const plusButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar-button');


import { clickProfileEditButton, clickPlusButton, handleProfileFormSubmit, formProfilePopup, handleCardFormSubmit, formPlace, clickAvatar, handleAvatarSubmit, avatarForm } from './components/modal.js';
import { vConfig } from './components/validate.js';
import { getProfile, getInitialCards } from './components/api.js';

avatarButton.addEventListener('click', clickAvatar);

profileEditButton.addEventListener('click', clickProfileEditButton);

plusButton.addEventListener('click', () => clickPlusButton(vConfig));

formProfilePopup.addEventListener('submit', handleProfileFormSubmit);

formPlace.addEventListener('submit', handleCardFormSubmit);

avatarForm.addEventListener('submit', handleAvatarSubmit);

getProfile();

getInitialCards();