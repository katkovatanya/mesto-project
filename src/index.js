//этот файл - точка сборки, сюда надо всё импортировать
// import './pages/index.css'; // добавьте импорт главного файла стилей 
import './pages/index.css';

const profileEditButton = document.querySelector('.profile__edit-button');
//кнопка открытия формы добавления новой карточки
const plusButton = document.querySelector('.profile__add-button');

import { clickProfileEditButton, clickPlusButton, handleProfileFormSubmit, formProfilePopup, handleCardFormSubmit, formPlace } from './components/modal.js';
import { vConfig } from './components/validate.js';

profileEditButton.addEventListener('click', clickProfileEditButton);

plusButton.addEventListener('click', () => clickPlusButton(vConfig));

formProfilePopup.addEventListener('submit', handleProfileFormSubmit);

formPlace.addEventListener('submit', handleCardFormSubmit);