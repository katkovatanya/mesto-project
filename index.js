// массив карточек
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

//напишем функцию добавления карточки
function addCard(elem) {
  const element = document.querySelector('#element').content;
  let userElement = element.querySelector('.element').cloneNode(true);
  userElement.querySelector('.element__name').textContent = elem.name;
  userElement.querySelector('.element__image').src = elem.link;
  const elements = document.querySelector('.elements');
  elements.prepend(userElement);
  //добавляем сразу слушатели событий для лайка и корзины
  const likeButton = userElement.querySelector('.element__like-button');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle("element__like-button_active");
  });
  const deleteButton = userElement.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', () => {
    const card = deleteButton.closest('.element');
    card.remove();
  });
  //добавляем функцию открытия попапа с картинкой
  const openImage = userElement.querySelector('.element__open-button');
  openImage.addEventListener('click', () => {
    const popupImage = document.querySelector('.image-popup');
    popupImage.classList.add('popup_opened');
    popupImage.querySelector('.popup__image').src = elem.link;
    popupImage.querySelector('.popup__caption').textContent = elem.name;
  });
}

//загрузка на страницу карточек из массива
initialCards.forEach(addCard);

//создадим массив из кнопок "like"
let likeButtons = Array.from(document.querySelectorAll('.element__like-button'));

// Находим форму в DOM
const formElement = document.querySelector('.popup__form')
// Находим поля формы в DOM
const nameInput = formElement.querySelector('[name="name-field"]');
const jobInput = formElement.querySelector('[name="text-field"]');

const editButton = document.querySelector('.profile__edit-button');

// функция для открытия формы редактирования профиля
function clickEditButton() {
  let popup = document.querySelector('.profile-popup');
  popup.classList.add('popup_opened');
  nameInput.value = document.querySelector('.profile__name').textContent;
  jobInput.value = document.querySelector('.profile__text').textContent;
}

editButton.addEventListener('click', clickEditButton);

const closeButton = document.querySelector('.popup__close-button');
const closeButtonElement = document.querySelector('#popup__close-button');

function clickCloseButton() {
  let popup = document.querySelector('.profile-popup');
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', clickCloseButton);

function clickCloseButtonElement() {
  let popupElement = document.querySelector('.element-popup');
  popupElement.classList.remove('popup_opened');
}

closeButtonElement.addEventListener('click', clickCloseButtonElement);

//кнопка открытия формы добавления новой карточки
const addButton = document.querySelector('.profile__add-button');
// Находим поля формы в DOM
let namePlaceInput = document.querySelector('[name="name-place"]');
let linkPlaceInput = document.querySelector('[name="link-place"]');

//Функция открытия формы формы добавления новой карточки
function clickAddButton() {
  let popup = document.querySelector('.element-popup');
  popup.classList.add('popup_opened');
  namePlaceInput.value = '';
  linkPlaceInput.value = '';
}

addButton.addEventListener('click', clickAddButton);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__text').textContent = jobInput.value;
  const popup = document.querySelector('.profile-popup');
  popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

// функция нажатия на кнопку "создать" (карточку)
function clickPopupAddButton(evt) {
  evt.preventDefault();
  let card = {};
  card.name = namePlaceInput.value;
  card.link = linkPlaceInput.value;
  addCard(card);
  const popup = document.querySelector('.element-popup');
  popup.classList.remove('popup_opened');
}
const formPlace = document.querySelector('.element-popup__form')
//кнопка добавления карточки через попап
formPlace.addEventListener('submit', clickPopupAddButton);
// кнопка закрытия попапа с фото
const imageCloseButton = document.querySelector('.popup__close-button_image');

function clickCloseButtonImage() {
  const popupImage = document.querySelector('.image-popup');
  popupImage.classList.remove('popup_opened');
}
imageCloseButton.addEventListener('click', clickCloseButtonImage);