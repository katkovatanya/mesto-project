import { openPopup } from './modal.js';
import { apiConfig, deleteCard, putLike, removeLike } from './api.js';

const elements = document.querySelector('.elements');
const popupImage = document.querySelector('.image-popup');
const imagePopupCaption = popupImage.querySelector('.popup__caption');
const imagePopupPicture = popupImage.querySelector('.popup__image');

function putLikeDOM(likes, newLikes, likeButton) {
  likeButton.classList.add("element__like-button_active");
  likes.textContent = newLikes.likes.length;
}

function removeLikeDOM(likes, newLikes, likeButton) {
  likeButton.classList.remove("element__like-button_active");
  likes.textContent = newLikes.likes.length;
}

//функция создания карточки
function createCard(elem) {
  const element = document.querySelector('#element').content;
  const cardElement = element.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const likes = cardElement.querySelector('.element__number-of-likes');
  const deleteButton = cardElement.querySelector('.element__delete-button');
  cardElement.querySelector('.element__name').textContent = elem.name;
  cardImage.src = elem.link;
  cardImage.alt = elem.name;
  likes.textContent = elem.likes.length;
  //добавляем сразу слушатели событий для лайка и корзины
  const likeButton = cardElement.querySelector('.element__like-button');
  //проверка, стоит ли лайк нашего пользователя на карточке
  if (elem.likes.some(obj => obj._id == '3ab45f3d9237ef32a88af094')) {
    likeButton.classList.add("element__like-button_active");
  }
  likeButton.addEventListener('click', () => {
    let newLikes = {};
    if (likeButton.classList.contains('element__like-button_active')) {
      removeLike(elem, newLikes, likes, apiConfig, likeButton);
    }
    else {
      putLike(elem, newLikes, likes, apiConfig, likeButton);
    }

  });
  if (elem.owner._id == "3ab45f3d9237ef32a88af094") {
    deleteButton.addEventListener('click', () => {
      const card = deleteButton.closest('.element');
      deleteCard(elem, apiConfig, card);
    });
  }
  else {
    deleteButton.remove();
  }
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

export { addCard, removeLikeDOM, putLikeDOM };