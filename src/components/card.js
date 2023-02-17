import {openPopup} from './modal.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elements = document.querySelector('.elements');
const popupImage = document.querySelector('.image-popup');
const imagePopupCaption = popupImage.querySelector('.popup__caption');
const imagePopupPicture = popupImage.querySelector('.popup__image');

//функция создания карточки
function createCard(elem) {
  const element = document.querySelector('#element').content;
  const cardElement = element.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  cardElement.querySelector('.element__name').textContent = elem.name;
  cardImage.src = elem.link;
  cardImage.alt = elem.name;
  //добавляем сразу слушатели событий для лайка и корзины
  const likeButton = cardElement.querySelector('.element__like-button');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle("element__like-button_active");
  });
  const deleteButton = cardElement.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', () => {
    const card = deleteButton.closest('.element');
    card.remove();
  });
  //добавляем функцию открытия попапа с картинкой
  const openImage = cardElement.querySelector('.element__open-button');
  openImage.addEventListener('click', () => {
    openPopup(popupImage);
    imagePopupPicture.src = elem.link;
    imagePopupPicture.alt = elem.name;
    imagePopupCaption.textContent = elem.name;
  });
  return cardElement;
}

//функция добавления карточки
function addCard(item) {
  const cardElement = createCard(item);
  elements.prepend(cardElement);
}

//загрузка на страницу карточек из массива
initialCards.forEach(addCard);


export {addCard};